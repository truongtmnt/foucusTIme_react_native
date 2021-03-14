import * as React from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import Constants from 'expo-constants';
import { useState, useEffect } from 'react';
import { Focus } from './src/features/Focus';
import { Timer } from './src/features/timer';
import { colors } from './src/utils/colors';
import { paddingSizes } from './src/utils/sizes';
import { FocusHistory } from './src/features/FocusHistory';
import AsyncStorage from '@react-native-async-storage/async-storage';

// You can import from local files
const STATUSES = {
  COMPELTED: 1,
  CANCLED: 2,
};
export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const addFocusSubjectWithStatus = (subject, status) => {
    setFocusHistory([...focusHistory, { subject, status }]);
  };
  const onClear = () => {
    setFocusHistory([]);
  };

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory]);

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory');
      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  };
  //load when start
  useEffect(() => {
    loadFocusHistory();
  }, []);

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            addFocusSubjectWithStatus(focusSubject, STATUSES.COMPELTED);
            setFocusSubject(null);
          }}
          cancelSubject={() => {
            addFocusSubjectWithStatus(focusSubject, STATUSES.CANCLED);
            setFocusSubject(null);
          }}
        />
      ) : (
        <View style={{flex:0.9}}>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform === 'ios' ? paddingSizes.md : paddingSizes.lg,
    color: 'white',
    backgroundColor: colors.darkBLue,
  },
});
