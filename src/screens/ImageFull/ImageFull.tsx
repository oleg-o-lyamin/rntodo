import React from 'react';
import {Button, Image, View, Alert} from 'react-native';
import {styles} from './ImageFull.styles';
import {ImageFullProps} from './ImageFull.types';
import {selectTodoById} from '../../store/selectors';
import {changeTodo} from '../../store/actions';
import {useDispatch, useSelector} from 'react-redux';
export const ImageFull = ({route, navigation}: ImageFullProps) => {
	const dispatch = useDispatch();

	const todo = useSelector(selectTodoById(route.params.todoId));

	const handleConfirm = () => {
		const newTodo = {
			...todo,
			assets: todo.assets.filter(({uri}) => uri != route.params.assetUri),
		};

		dispatch(changeTodo(newTodo));
		navigation.pop();
	};

	const handlePress = () => {
		Alert.alert('Delete image?', undefined, [
			{text: 'Delete', onPress: handleConfirm},
			{text: 'Cancel'},
			]);
		};

	return (
		<View>
			<Image
				source={{uri: route.params.assetUri}}
				resizeMode="contain"
				style={styles.image}
			/>
			<Button title="Delete image" onPress={handlePress} />
		</View>
	);
};