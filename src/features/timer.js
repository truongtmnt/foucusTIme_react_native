import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, Vibration } from 'react-native';
import { colors } from '../utils/colors';
import { Countdown } from '../components/Countdown';
import { RoundedButton } from '../components/RoundedButton';
import { ProgressBar, Colors } from 'react-native-paper';
import { Timing } from './Timing';
import { useKeepAwake } from 'expo-keep-awake';

const DEFAULT_TIME = 0.05;

export const Timer = ({ focusSubject, onTimerEnd, cancelSubject }) => {
  useKeepAwake();
  const [isEnd, setIsEnd] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [progress, setProgress] = useState(1);
  const onProgress = (value) => {
    setProgress(value);
  };
  const [minute, setMinute] = useState(DEFAULT_TIME);
  const changeTime = (value) => {
    setMinute(value);
    setProgress(1);
    setIsStart(false);
  };
  const interval = React.useRef(null);

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 10000);
    }
    if (Platform.OS === 'android') {
      Vibration.vibrate([300, 500], true);
    }
  };

  const onEnd = () => {
    console.log('en');
    vibrate();
    setIsEnd(true);
  };

  return (
    <View style={styles.container}>
      <Countdown
        onEnd={onEnd}
        minutes={minute}
        isPaused={!isStart}
        onProgress={onProgress}
      />
      <View>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.content}>{focusSubject}</Text>
      </View>
      <ProgressBar
        progress={progress}
        color={Colors.green500}
        style={{ height: 15, margin: 5 }}
      />
      <Timing changeTime={changeTime} />
      <View style={styles.buttonWrapper}>
        {!isStart ? (
          <RoundedButton
            size={80}
            title="Start"
            onPress={() => {
              setIsStart(true);
            }}
          />
        ) : isEnd ? (
          <RoundedButton
            size={80}
            title="End"
            onPress={() => {
              Vibration.cancel();
              onTimerEnd();
            }}
          />
        ) : (
          <RoundedButton
            size={80}
            title="Pause"
            onPress={() => {
              setIsStart(false);
              Vibration.cancel();
            }}
          />
        )}
      </View>

      <View style={{alignItems:'center'}}>
        <RoundedButton size={50} title="Cancle" onPress={cancelSubject} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: colors.whiteClean,
    textAlign: 'center',
    padding: 10,
  },
  content: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 10,
  },
  buttonWrapper: {
    flex: 0.3,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
