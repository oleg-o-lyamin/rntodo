import React, {useCallback, useEffect, useState} from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  View,
  Button,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Checkbox} from '../../components/Checkbox/Checkbox';
import {config} from '../../config';
import {changeTodo, fetchTodos} from '../../store/actions';
import {selectRequestStatus, selectTodos} from '../../store/selectors';
import {styles} from './TodoList.styles';
import {TodoItem} from './TodoList.types';
export const TodoList = () => {
  const todos = useSelector(selectTodos);
  const requestStatus = useSelector(selectRequestStatus);
  const dispatch = useDispatch();

  const [indicator, setIndicator] = useState<boolean>(true);

  const requestTodos = async () => {
    setIndicator(true);
    await dispatch(fetchTodos());
    setIndicator(false);
  };

  const handleComplete = useCallback(
    id => {
      const todoChange = {...todos[id], completed: !todos[id].completed};
      dispatch(changeTodo(todoChange));
    },
    [todos, dispatch],
  );

  useEffect(() => {
    requestTodos();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.todosContainer}>
      {indicator && (
        <ActivityIndicator size="large" color="black" animating={indicator} />
      )}
      {requestStatus == 3 && !indicator && (<Button title="Reload" onPress={requestTodos} />)}
      {Object.values(todos).map(todo => (
        <View key={`${todo.id}-${todo.title}`} style={styles.todoContainer}>
          <Checkbox
            id={todo.id}
            onPress={handleComplete}
            checked={todo.completed}
          />
          <Pressable onPress={() => handleComplete(todo.id)}>
            <Text
              style={[
                styles.todoText,
                todo.completed && styles.todoTextCrossed,
              ]}>
              {todo.title}
            </Text>
          </Pressable>
        </View>
      ))}
    </ScrollView>
  );
};
