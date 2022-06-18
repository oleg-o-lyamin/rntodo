import React, {useRef} from 'react';
import {TouchableOpacity, View, Animated} from 'react-native';
import {styles} from './Checkbox.styles';
import {CheckboxProps} from './Checkbox.types';
import Icon from 'react-native-vector-icons/Entypo';

export const Checkbox = ({checked, onPress, id}: CheckboxProps) => {
  const checkboxScale = useRef(new Animated.Value(0));

  const handlePress = () => {
    Animated.timing(checkboxScale.current, {
      toValue: 1.2,
      useNativeDriver: true,
      duration: 300,
    }).start(() => { 
      checkboxScale.current.setValue(0);
      onPress(id);
    });
  };

  return (
    <Animated.View
      onTouchEnd={handlePress}
      style={[
        styles.root,
        {
          transform: [
            {
              scale: checkboxScale.current.interpolate({
                inputRange: [0, 0.7, 1],
                outputRange: [1, 1.2, 1],
              }),
            },
          ],
        },
      ]}>
      {checked && <Icon name="check" size={17} color="black" />}
    </Animated.View>
  );
};
