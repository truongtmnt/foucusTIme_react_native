import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Colors } from 'react-native-paper';
import { RoundedButton } from '../components/RoundedButton';

export const Timing = ({ changeTime }) => {
  return (
    <View style={styles.timing}>
      <RoundedButton title="1" size={50} onPress={() => changeTime(1)} />
      <RoundedButton title="2" size={50} onPress={() => changeTime(2)} />
      <RoundedButton title="3" size={50} onPress={() => changeTime(3)} />
    </View>
  );
};

const styles = StyleSheet.create({
  timing: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 30,
    justifyContent: 'space-between',
  },
});
