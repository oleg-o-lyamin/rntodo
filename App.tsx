import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {TodoList} from './src/screens/TodoList/TodoList';
import {store} from './src/store';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigator} from './src/navigation/navigation';
import notifee, {AndroidImportance, TimestampTrigger, TriggerType, EventType} from '@notifee/react-native';
import {NavigationProps} from '../../navigation/navigation.types';

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar />
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
