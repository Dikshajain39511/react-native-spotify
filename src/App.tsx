import {
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getTrack, setupPlayer} from './musicPlayerServices';
import MusicPlayer from './screens/MusicPlayer';

const App = () => {
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  async function setup() {
    let issetup = await setupPlayer();
    if (issetup) {
      await getTrack();
    }

    setIsPlayerReady(issetup);
  }
  useEffect(() => {
    setup();
  }, []);

  if (!isPlayerReady) {
    return (
      <SafeAreaView>
        <ActivityIndicator />
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <MusicPlayer />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
