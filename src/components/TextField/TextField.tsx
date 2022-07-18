import React, {useState} from 'react';
import {TextInput} from 'react-native';
import {styles} from './TextField.styles';
import {TextFieldProps} from './TextField.types';

export const TextField = ({onSubmit}: TextFieldProps) => {
	const [newTodoText, setNewTodoText] = useState('');

	const [textColor, setTextColor] = useState('black');

	const handleSubmit = () => {
		if (newTodoText) {
			onSubmit(newTodoText);
			setNewTodoText('');
		}
	}

	return (<TextInput value={newTodoText}
		onChangeText={setNewTodoText} style={[styles.textInput, {color: textColor}]}
		onSubmitEditing={handleSubmit} onFocus={() => setTextColor('black')}
		onBlur={() => setTextColor('grey')}/>);
};