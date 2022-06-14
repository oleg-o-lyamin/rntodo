import React from 'react';
import {ScrollView, Text} from 'react-native';
import {styles} from './TodoList.styles';

export const Empty = () => {
  return (
    <ScrollView contentContainerStyle={styles.todosContainer}>
      <Text>Empty screen</Text>
    </ScrollView>
  );
};
