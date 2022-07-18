import React from 'react';
import {
  Pressable,
  Text,
  View,
  Image
} from 'react-native';
import {DeleteButton} from './../DeleteButton/DeleteButton.tsx';
import {Checkbox} from './../Checkbox/Checkbox.tsx';

export const TodoElement = ({todo, styles, handleComplete, handleRemove, handlePress}) => {
	return (
		<View key={`${todo.id}-${todo.title}`} style={styles.todoContainer}>
		  <Checkbox
		      id={todo.id}
		      onPress={handleComplete}
		      checked={todo.completed}
		  />
		  { todo.assets.length > 0 && <Image source={ {uri: todo.assets[0].uri} } style={styles.image} />}
		  <Pressable onPress={() => handlePress(todo.id) } style={styles.todoPressable}>
		    <Text
		      style={[
		        styles.todoText,
		        todo.completed && styles.todoTextCrossed,
		      ]}>
		      {todo.title.substring(0, 30)}
		    </Text>
		  </Pressable>
		  <DeleteButton id={todo.id} onPress={handleRemove} style={styles.deleteButton} />
  	</View>
  );
}