import React from 'react';
import { View, Text } from 'react-native';
import globalStyles from '../styles/globalStyles';

export default function Options() {
  return (
    <View style={[globalStyles.simpleBackground, { justifyContent: 'center', alignItems: 'center' }]}>
      <Text style={{ color: 'white', fontSize: 30 }}>Options</Text>
    </View>
  );
}
