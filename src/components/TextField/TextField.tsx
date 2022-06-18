import React, {useState} from 'react';
import {TextInput} from 'react-native';
import {styles} from './TextField.styles';
import {TextFieldProps} from './TextField.types';

export const TextField = ({onSubmit}: TextFieldProps) => {
	const [newTodoText, setNewTodoText] = useState('');

	const handleSubmit = () => {
		if (newTodoText) {
			onSubmit(newTodoText);
			setNewTodoText('');
		}
	}

	return (<TextInput value={newTodoText}
		onChangeText={setNewTodoText} style={styles.textInput}
		onSubmitEditing={handleSubmit} />);
};