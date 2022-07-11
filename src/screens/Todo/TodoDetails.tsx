import React from 'react';
import {Text, View,Button} from 'react-native';
import {styles} from './TodoDetails.styles';
import {selectTodoById} from '../../store/selectors';
import {useSelector, useDispatch} from 'react-redux';
import {TextInput} from 'react-native';
import {useState, useEffect, useCallback} from 'react';
import {SaveButton} from '../../components/SaveButton/SaveButton';
import {changeTodo} from '../../store/actions';
import {launchImageLibrary} from 'react-native-image-picker';

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

	return (
		<View style={styles.container}>
			<Text>Todo Details: {route.params.todoId}</Text>
			<Text>{todo.title}</Text>
			{todo.completed && <Text>Completed</Text>}
			<TextInput value={text} onChangeText={setText} style={styles.textInput}/>
			{/*<Text>Attachments</Text>
			{
				todo.assets && todo.assets.map(asset => {
				return (
					<View key={ asset.fileName }>
						<Image source={ {uri: asset.uri } } style={ styles.image } />
					</View>
				)
				})
			}*/}
			<Button onPress={() => {
						launchImageLibrary(
							{mediaType: 'photo', selectionLimit: 0},
							({assets,}) => {
								if (assets) {
									setText('100500');
								}
							},
						)
					} 
				}
				title="Add attachment"
				color="#ffc484" />
		</View>
	);
};