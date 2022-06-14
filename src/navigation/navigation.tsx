import React from 'react';

import {TodoList} from '../screens/TodoList/TodoList';
import {Empty} from '../screens/TodoList/empty';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Todo List" component={TodoList} />
    <Tab.Screen name="Empty" component={Empty} />
  </Tab.Navigator>
);
