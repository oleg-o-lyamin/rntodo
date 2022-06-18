import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
  todosContainer: {
    padding: 16,
  },
  todoContainer: {
    flexDirection: 'row',
    margin: 8,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  todoText: {
    marginLeft: 16,
    lineHeight: 30,
    textTransform: 'capitalize',
  },
  todoPressable:  {
    flexGrow: 1,
  },
  todoTextCrossed: {
    textDecorationLine: 'line-through',
  },
  sectionHeader: {
    height: 50,
    paddingLeft: 16,
    paddingTop: 10,
    backgroundColor: 'grey',
    fontSize: 20,
  },
  separator: {
    height: 2,
    width: '100%',
    backgroundColor: 'black',
  }
});
