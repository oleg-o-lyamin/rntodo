import React from 'react';

import {TodoList} from '../screens/TodoList/TodoList';
import {TodoDetails} from '../screens/Todo/TodoDetails';
import {ImageFull} from '../screens/ImageFull/ImageFull';
import {Empty} from '../screens/TodoList/empty';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Todo List" component={TodoList} />
    <Stack.Screen name="TodoDetails" component={TodoDetails} />
    <Stack.Screen name="ImageFull" component={ImageFull} />
  </Stack.Navigator>
);
