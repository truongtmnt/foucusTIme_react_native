import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../components/RoundedButton';

import { colors } from '../utils/colors';

import { fontSizes, paddingSizes } from '../utils/sizes';

export const Focus = ({ addSubject }) => {
  const [value, setValue] = React.useState(null);
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>What you want to focus on?</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            mode="outlined"
            label="Focus"
            theme={{ colors: { text: 'blue', primary: 'blue' } }}
            style={styles.textInput}
            onChangeText={(text) => setValue(text)}
            value={value}
            onSubmitEditing={({ nativeEvent: { text } }) => {
              setValue(text);
            }}
          />
          <RoundedButton
            title="Add"
            size={50}
            onPress={() => addSubject(value)}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
  },
  innerContainer: {
    flex: 0.5,
    padding: paddingSizes.md,
  },
  title: {
    fontSize: Platform.OS === 'android' ? fontSizes.md : fontSizes.lg,
    fontWeight: 'bold',
    color: colors.whiteClean,
    paddingBottom: paddingSizes.sm,
    textAlign: 'center',
  },
  textInput: {
    flex: 1,
    marginRight: 15,
    backgroundColor: colors.whiteClean,
  },
});
