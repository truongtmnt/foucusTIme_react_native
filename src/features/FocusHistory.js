import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../components/RoundedButton';
import { fontSizes } from '../utils/sizes';

const HistoryItem = ({ item, index }) => {
  console.log(item.status);
  return <Text style={styles(item.status).historyItem}>{item.subject}</Text>;
};

export const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear();
  };
  return (
    <>
      <SafeAreaView style={{ flex: 0.8, alignItems: 'center' }}>
        {!!focusHistory.length && (
          <>
            <Text style={styles().title}>Things we focus on:</Text>
            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ flex: 1, alignItems: 'center' }}
              data={focusHistory}
              renderItem={HistoryItem}
              keyExtractor={item => item.id}
            />
            <View style={styles().clearContainer}>
              <RoundedButton size={75} title="Clear" onPress={onClear} />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = (status) =>
  StyleSheet.create({
    title: {
      color: 'white',
      fontSize: fontSizes.lg,
    },
    historyItem: {
      color: status > 1 ? 'red' : 'green',
      fontSize: fontSizes.md,
    },
    clearContainer: {
      alignItems: 'center',
      padding: 10,
    },
  });
