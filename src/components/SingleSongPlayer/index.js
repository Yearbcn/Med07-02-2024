import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import Slider from '@react-native-community/slider';
import TrackPlayer, {State, usePlaybackState} from 'react-native-track-player';
import {height, width} from '../../constants/dimentions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const SingleSongPlayer = ({
  songDetails,
  songsList,
  currentIndex,
  progress,
  //   playbackState,
  isVisible,
  onClose,
  onChange,
}) => {
  const navigation = useNavigation();
  const playbackState = usePlaybackState();

  const [currentSongIndex, setCurrentSongIndex] = useState(currentIndex);
  const [isPlaying, setIsPlaying] = useState(
    playbackState !== 'stopped' ? true : false,
  );

    useEffect(() => {
        setCurrentSongIndex(currentIndex);
    }, [currentIndex]);

  const format = seconds => {
    let mins = parseInt(seconds / 60)
      .toString()
      .padStart(2, '0');
    let secs = (Math.trunc(seconds) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const togglePlayback = async () => {
    if (isPlaying) {
      await TrackPlayer.pause();
    } else {
      await TrackPlayer.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skipToPrevious = async () => {
    if (currentSongIndex > 0) {
      await TrackPlayer.skipToPrevious();
      setCurrentSongIndex(currentSongIndex - 1);
      onChange(currentSongIndex - 1);
      setIsPlaying(true);
    }
  };

  const skipToNext = async () => {
    if (currentSongIndex < songsList.length - 1) {
      await TrackPlayer.skipToNext();
      setCurrentSongIndex(currentSongIndex + 1);
      onChange(currentSongIndex + 1);
      setIsPlaying(true);
    }
  };

  const restartAudio = async () => {
    await TrackPlayer.seekTo(0);
    await TrackPlayer.play();
  };

  return (
    <Modal isVisible={isVisible} style={{margin: 0}} onSwipeComplete={onClose}>
      <LinearGradient colors={['#b88c08', '#60045f']} style={{flex: 1}}>
        {/* <ScrollView showsVerticalScrollIndicator={false}> */}
          <StatusBar hidden={true} />

        <TouchableOpacity
          style={{marginTop: 0, marginLeft: 20}}
          onPress={() => onClose()}>
          <Image
            source={require('../../../src/images/down-arrow.png')}
            style={{marginTop: 30, width: 30, height: 30, tintColor: 'black'}}
          />
        </TouchableOpacity>

        <Image
          source={songsList[currentSongIndex].artwork}
          style={{
            width: '90%',
            height: '40%',
            alignSelf: 'center',
            marginTop: 20,
            borderRadius: 5,
          }}
        />
        <Text
          style={{
            fontSize: 26,
            color: 'black',
            fontWeight: '600',
            marginLeft: 31,
            marginTop: 20,
          }}>
          {songsList[currentSongIndex].title}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: 'black',
            fontWeight: '600',
            marginLeft: 33,
          }}>
          {songsList[currentSongIndex].artist}
        </Text>

        <Slider
          style={{
            width: '90%',
            height: 40,
            alignSelf: 'center',
            marginTop: 30,
          }}
          minimumValue={0}
          maximumValue={progress.duration}
          minimumTrackTintColor="black"
          maximumTrackTintColor="black"
          onSlidingComplete={async value => {
            const seconds = Math.floor(value);
            await TrackPlayer.seekTo(seconds);
          }}
          value={progress.position}
        />

        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignSelf: 'center',
          }}>
          <Text style={{color: 'black'}}>{format(progress.position)}</Text>
          <Text style={{color: 'black'}}>{format(progress.duration)}</Text>
        </View>

        <View
          style={{
            width: '100%',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            flexDirection: 'row',
            alignSelf: 'center',
            marginTop: height(8),
          }}>
          <TouchableOpacity onPress={restartAudio}>
            <MaterialIcons
              name={'restart-alt'}
              size={width(10)}
              color={'#000000'}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={skipToPrevious}>
            <MaterialIcons
              name={'skip-previous'}
              size={width(15)}
              color={'#000000'}
            />
          </TouchableOpacity>

          {/* Botón de reinicio */}

          <TouchableOpacity
            style={{
              width: width(15),
              height: width(15),
              borderRadius: 30,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={togglePlayback}>
            <MaterialIcons
              name={isPlaying ? 'pause' : 'play-arrow'}
              size={width(13)}
              color={'#000000'}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={skipToNext}>
            <MaterialIcons
              name={'skip-next'}
              size={width(15)}
              color={'#000000'}
            />
          </TouchableOpacity>

          <MaterialIcons
            name={'queue-music'}
            size={width(10)}
            color={'#000000'}
            onPress={() => {
              onClose();
              navigation.navigate('TotalSongs');
            }}
          />
        </View>

        {/* </ScrollView> */}
      </LinearGradient>
    </Modal>
  );
};

export default SingleSongPlayer;
