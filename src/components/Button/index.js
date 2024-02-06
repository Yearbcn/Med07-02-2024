import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import COLORS from '../../constants/colors';

const Button = ({onPress, title, isLoading}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#5c10b2',
        borderRadius: 30,
        paddingVertical: 13,
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 20,
      }}
      onPress={onPress}>
      {isLoading ? (
        <ActivityIndicator size={'small'} color={COLORS.white} />
      ) : (
        <Text style={{fontSize: 18, color: 'white'}}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
