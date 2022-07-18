import React, {useCallback, useEffect, useState, useMemo} from 'react';
import {
  Pressable,
  ScrollView,
  Text,
  View,
  Button,
  ActivityIndicator,
  ListRenderItemInfo,
  FlatList,
  SafeAreaView,
  SectionList
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Checkbox} from '../../components/Checkbox/Checkbox';
import {config} from '../../config';
import {changeTodo, fetchTodos, deleteTodo} from '../../store/actions';
import {selectRequestStatus, selectTodos} from '../../store/selectors';
import {styles} from './TodoList.styles';
import {TodoItem, TodoListProps} from './TodoList.types';
import {TextField} from './../../components/TextField/TextField.tsx';
import Icon from 'react-native-vector-icons/FontAwesome';
import {DeleteButton} from './../../components/DeleteButton/DeleteButton.tsx';
import {TodoElement} from './../../components/TodoElement/TodoElement.tsx';

export const TodoList = ({navigation}: TodoListProps) => {
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

  const addTodo = (text: string) => {
   const newTodo: TodoItem = { 
    title: text,
    id: Math.floor(Math.random() * 10000000 + 1000), 
    completed:false,
    assets: [],
    }; 

    dispatch(changeTodo(newTodo));
  };

  const handleRemove = (id) => {
    const todoRemove = {...todos[id]};
    dispatch(deleteTodo(todoRemove));
  };

  const handleTodoPress = useCallback(
    (id: string) => {
      navigation.push('TodoDetails', {todoId: id});
    },
    [navigation],
  );

  const renderTodo = useCallback(
    ({item}: ListRenderItemInfo<TodoItem>) => (
      <TodoElement 
        todo={item} 
        styles={styles} 
        handleComplete={handleComplete}
        handleRemove={handleRemove}
        handlePress={handleTodoPress} />
      ),
      [handleComplete, handleRemove, handleTodoPress],
  );

  const sections = useMemo(
    () =>
      Object.values(todos).reduce<ListSection[]>(
        (acc, todo) => {
          if (!todo.completed) {
            acc[0].data.push(todo);
          } else {
            acc[1].data.push(todo);
          }
          return acc;
        },
        [
          {data: [], title: 'Todo'},
          {data: [], title: 'Complete'},
        ],
      ),
    [todos],
  );

  const renderSectionHeader = useCallback(({section}) => {
    return (
      <Text style={styles.sectionHeader}>
        {section.title}
      </Text>
    );
  }, []);

  return (
    <SafeAreaView>
      <SectionList 
        ListHeaderComponent = {() => 
          <View>
            <TextField onSubmit={addTodo} />
            {indicator && (
              <ActivityIndicator size="large" color="black" animating={indicator} />
            )}
          </View>
        }
        sections={sections}
        renderSectionHeader={renderSectionHeader}
        SectionSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={renderTodo} />
    </SafeAreaView>
  );
};
