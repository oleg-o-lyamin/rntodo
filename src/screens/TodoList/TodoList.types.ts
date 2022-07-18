import {NavigationProps} from '../../navigation/navigation.types';
import { Asset } from 'react-native-image-picker';

export interface TodoItem {
  id: string;
  title: string;
  completed: boolean;
  assets: Asset[];
}

export type TodoListProps = NavigationProps<'TodoList'>;