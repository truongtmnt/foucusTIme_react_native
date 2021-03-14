import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../utils/colors';
import { fontSizes } from '../utils/sizes';

const formatTime = (time) => (time < 10 ? `0${time}` : time);

const minToMilisec = (min) => min * 60 * 1000;

export const Countdown = ({ minutes = 0.1, isPaused, onProgress, onEnd }) => {
  const interval = React.useRef(null);
  const [milis, setMilis] = useState(minToMilisec(minutes));
  const second = Math.floor(milis / 1000) % 60;
  const minute = Math.floor(milis / 1000 / 60) % 60;

  const countDown = () => {
    setMilis((time) => {
      if (time === 0) {
        //finish
        clearInterval(interval.current);
        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    });
  };

  useEffect(() => {
    setMilis(minToMilisec(minutes));
  }, [minutes]);

  useEffect(() => {
    console.log(milis);
    onProgress(milis / minToMilisec(minutes));
    if (milis === 0) {
      onEnd();
    }
  }, [milis]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) {
        clearInterval(interval.current);
      }
      return;
    }
    interval.current = setInterval(countDown, 1000);

    return () => clearInterval(interval.current);
  }, [isPaused]);

  return (
    <View style={{ flex: 0.5, justifyContent: 'center' }}>
      <Text style={styles.container}>
        {formatTime(minute)} : {formatTime(second)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    color: colors.whiteClean,
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    padding: fontSizes.lg,
    textAlign: 'center',
  },
});
