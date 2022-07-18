import {RouteProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';

export type IStackNavigation = {
  'Todo List': undefined;
};

export type RootStackParamList = {
  TodoList: undefined,
  TodoDetails: {
    todoId: string,
  },
  ImageFull: {
    assetUri: string,
    todoId: string,
  }
}

type ScreenNavigationProp<T extends keyof RootStackParamList> =
  StackNavigationProp<RootStackParamList, T>;
type ScreenRouteProp<T extends keyof RootStackParamList> = RouteProp<
    RootStackParamList,
    T
  >;

export type NavigationProps<T extends keyof RootStackParamList> = {
  route: ScreenRouteProp<T>;
  navigation: ScreenNavigationProp<T>;
};