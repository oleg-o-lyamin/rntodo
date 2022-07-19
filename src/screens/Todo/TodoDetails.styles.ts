import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  textInput: { 
    height:40, 
    borderWidth:1, 
    borderColor:'gray', 
    backgroundColor:'white', 
    borderRadius:20, 
    paddingHorizontal:20,
  },

  container: {
    padding:16,
    flex: 1, 
  },

  image: {
    width: 50,
    height: 50,
    margin: 2,
  },

  attachmentsContainer: {
    flexDirection: 'row'
  },

  attachButtonView: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 40,
  },

})