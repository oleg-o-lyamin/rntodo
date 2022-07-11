import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {TodoList} from './src/screens/TodoList/TodoList';
import {store} from './src/store';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigator} from './src/navigation/navigation';
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
