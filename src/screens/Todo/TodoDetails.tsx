import React from 'react';
import {TouchableOpacity, Text, View,Button, Image, Switch} from 'react-native';
import {styles} from './TodoDetails.styles';
import {selectTodoById} from '../../store/selectors';
import {useSelector, useDispatch} from 'react-redux';
import {TextInput} from 'react-native';
import {useState, useEffect, useCallback} from 'react';
import {SaveButton} from '../../components/SaveButton/SaveButton';
import {changeTodo} from '../../store/actions';
import {launchImageLibrary} from 'react-native-image-picker';
import notifee, {AndroidImportance, TimestampTrigger, TriggerType, EventType, RepeatFrequency} from '@notifee/react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export const TodoDetails = ({route, navigation}: TodoDetailsProps) => {
	const dispatch = useDispatch();

	const todo = useSelector(selectTodoById(route.params.todoId));

	const [text, setText] = useState('');

	const [isDirty, setIsDirty] = useState(false);

	useEffect(() => {
		setIsDirty(text !== todo.title)
	}, [text, todo.title]);

	const handleSave = useCallback(() => {
		dispatch(changeTodo({...todo, title: text}));
		navigation.goBack();
	}, [todo, text, dispatch, navigation]);

	useEffect(() => {
		navigation.setOptions({
			headerRight: () => 
				( <SaveButton disabled={!isDirty} onPress={handleSave} /> )
			,
		});
	}, [isDirty, navigation, handleSave]);

	const handlePress = (uri: string) => {
		navigation.push('ImageFull', {todoId: todo.id, assetUri: uri});
	};

	const handleSetPush = async (ts) => {
		const channelId = await notifee.createChannel({
			id: todo.id.toString(),
			name: 'Default Channel',
			importance: AndroidImportance.HIGH,
		});

		const trigger: TimestampTrigger = {
			type: TriggerType.TIMESTAMP,
			timestamp: ts,
		};

		await notifee.createTriggerNotification(
		{
			title: todo.id.toString(),
			body: todo.title,
			android: {
				channelId,
				importance: AndroidImportance.HIGH,
				asForegroundService: true,
				largeIcon: todo.assets.length > 0 ? todo.assets[0].uri : 'large_icon',
				pressAction: {
					id: 'default',
				},
				actions: [
          {
            title: 'Cancel',
            pressAction: {
              id: 'cancel',
            }
          },
          {
          	title: 'Snooze for 30 s',
          	pressAction: {
          		id: 'snooze',
          	}
          }
        ],
			},
			data: {
				id: todo.id.toString(),
			},
		},
		trigger,
		);
	};

	useEffect(() => {
    return notifee.onForegroundEvent(({type, detail}) => {
      handleEvent(type, detail);
    });
  }, []);

  useEffect(() => {
		return notifee.onBackgroundEvent(({type, detail}) => {
      handleEvent(type, detail);
    });
  }, []);

  const handleEvent = (type, detail) => {
  	switch (type) {
      case EventType.ACTION_PRESS: {
        switch (detail?.pressAction?.id) {
          case 'cancel': 
          	break;
          case 'snooze':
          	handleCancelPush();
          	handleSetPush(Date.now() + 30000);
          	break;
        }
        break;
      }
      case EventType.DISMISSED:
        console.log('User dismissed notification', detail.notification);
        break;
      case EventType.PRESS:
        console.log('User pressed notification', detail.notification);
        break;
    }
  }

	const handleCancelPush = async () => {
		await notifee.cancelTriggerNotification(todo.id.toString());
	};

	const handleSwitch = async () => {
		if (todo.notificationIsOn) {
			await handleCancelPush();
		} else {
			await handleSetPush(date.getTime());
		}

		dispatch(changeTodo({...todo, notificationIsOn: !todo.notificationIsOn}));
	}

	const [show, setShow] = useState(false);
	const [date, setDate] = useState(new Date());

	return (
		<View style={styles.container}>
			<Text>Todo Details: {route.params.todoId}</Text>
			<Text>{todo.title}</Text>
			{todo.completed && <Text>Completed</Text>}
			<TextInput value={text} onChangeText={setText} style={styles.textInput}/>
			<View>
				<Text>Notification</Text>
				<Switch value={todo.notificationIsOn} onChange={handleSwitch} />
				{!show && <Text>{date.toLocaleTimeString()}</Text>}
				<Button title="Choose timestamp" onPress={() => { setShow(true); }} />
				{show && <DateTimePicker value={date} mode="time" onChange={(event, selectedDate) => { setDate(selectedDate); setShow(false); }}/>}
			</View>
			<Text>Attachments</Text>
			<View style={ styles.attachmentsContainer }>
			{
				todo.assets && todo.assets.map(asset => {
				return (
					<View key={ asset.fileName }>
						<TouchableOpacity onPress={() => handlePress(asset.uri)}>
							<Image source={ {uri: asset.uri} } style={ styles.image } />
						</TouchableOpacity>
					</View>
				)
				})
			}
			</View>
			<View style={ styles.attachButtonView }>
				<Button onPress={() => {
							launchImageLibrary(
								{mediaType: 'photo', selectionLimit: 1},
								(response) => {
									if (response.uri) {
										dispatch(changeTodo({
											...todo,
											assets: todo.assets ? [...todo.assets, response] : [response],
										}));
									}
								},
							)
						} 
					}
					title="Add attachment"
					color="#ffc484" />
			</View>
		</View>
	);
};