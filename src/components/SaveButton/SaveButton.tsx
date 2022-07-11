import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {SaveButtonProps} from './SaveButton.types';
export const SaveButton = ({disabled, onPress}: SaveButtonProps) => (
	<TouchableOpacity
		disabled={disabled}
		onPress={onPress}
		>
		{/*<Icon name="check" color="white" size={20} />*/}
		{!disabled && <Text>OK</Text>}
	</TouchableOpacity>
);