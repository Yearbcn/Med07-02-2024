import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import Modal from "react-native-modal";
import LinearGradient from "react-native-linear-gradient";
import Slider from "@react-native-community/slider";
import TrackPlayer from "react-native-track-player";
import { height, width } from "./src/constants/dimentions";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import flag333 from "./src/images/flag-333.png";
import flag777 from "./src/images/flag-777.png";

const SongPlayer = ({
  songsList,
  currentIndex,
  progress,
  playbackState,
  isVisible,
  onClose,
  onChange,
}) => {
  const navigation = useNavigation();
  const [currentSongIndex, setCurrentSongIndex] = useState(currentIndex);
  const [isPlaying, setIsPlaying] = useState(
    playbackState !== "stopped" ? true : false
  );
  
  useEffect(() => {
    console.log("currentSongIndex", currentSongIndex);
    console.log("currentIndex", currentIndex);
    setCurrentSongIndex(currentIndex);
  }, [currentIndex]);

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

const skipToNext = async () => {
if (currentSongIndex < songsList.length - 1) {
  await TrackPlayer.skipToNext();
  onChange((currentSongIndex + 1) % songsList.length);
  setCurrentSongIndex((currentSongIndex + 1) % songsList.length);
  setIsPlaying(true);
} else {
  // Loop back to the first audio
  await TrackPlayer.skip(0);
}
};

const skipToPrevious = async () => {
if (currentSongIndex > 0) {
  await TrackPlayer.skipToPrevious();
  onChange((currentSongIndex - 1) % songsList.length);
  setCurrentSongIndex((currentSongIndex - 1) % songsList.length);
  setIsPlaying(true);
} else {
  // Go to the last audio in a circular manner
  await TrackPlayer.skip(songsList.length - 1);
}
};

// const restartAudio = async () => {
// await TrackPlayer.seekTo(0);
// await TrackPlayer.play();
// };



  const restartAudio = async () => {
    await TrackPlayer.seekTo(0);
  };

 

  return (
    <View>
      <StatusBar hidden={isVisible} backgroundColor={"transparent"} />
      <Modal
        isVisible={isVisible}
        style={{ margin: 0 }}
        onSwipeComplete={onClose}
        statusBarTranslucent
      >
        <LinearGradient
          colors={["#d9d600", "#760075"]}
          style={{ flex: 1, paddingTop: Platform.OS === "android" ? 20 : 0 }}
        >
          {/* <ScrollView showsVerticalScrollIndicator={false}> */}

          <TouchableOpacity
            style={{ marginTop: 0, marginLeft: 20 }}
            onPress={() => onClose()}
          >
            <Image
              source={require("./src/images/down-arrow.png")}
              style={{
                marginTop: 30,
                width: 30,
                height: 30,
                tintColor: "black",
              }}
            />
          </TouchableOpacity>
          <View style={[styles.imageContainer, styles.shadowProp]}>
            <Image
              //   source={songsList[currentSongIndex].artwork}
              source={songsList[currentIndex]?.artwork}
              style={{
                width: "100%",
                height: "100%",
                marginTop: -5,
                borderRadius: 5,
              }}
            />
          </View>
          <Text
            adjustsFontSizeToFit={true}
            numberOfLines={1}
            style={{
              fontSize: 26,
              color: "black",
              fontWeight: "600",
              marginLeft: 31,
              marginTop: 20,
              marginRight: 30,
            }}
          >
            {/* {songsList[currentSongIndex].title} */}
            {songsList[currentIndex]?.title}
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 5,
              marginLeft: 33,
            }}
          >
            <MaterialIcons
              name={"record-voice-over"}
              size={width(4)}
              color={"black"}
            />
            {songsList[currentSongIndex]?.flag && (
              <Image
                source={
                  songsList[currentSongIndex].flag === "333" ? flag333 : flag777
                }
                style={styles.flag}
              />
            )}
            <Text
              style={{
                color: "black",
                fontSize: 16,
                verticalAlign: "middle",
                marginLeft: 5,
                fontWeight: "600",
              }}
            >
              {songsList[currentSongIndex]?.artist}
            </Text>
          </View>

          <Slider
            style={{
              width: "90%",
              height: 40,
              alignSelf: "center",
              marginTop: 30,
            }}
            minimumValue={0}
            maximumValue={progress.duration}
            minimumTrackTintColor="black"
            maximumTrackTintColor="black"
            onSlidingComplete={async (value) => {
              const seconds = Math.floor(value);
              await TrackPlayer.seekTo(seconds);
            }}
            value={progress.position}
          />

          <View
            style={{
              width: "90%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignSelf: "center",
            }}
          >
            <Text style={{ color: "black" }}>{format(progress.position)}</Text>
            <Text style={{ color: "black" }}>{format(progress.duration)}</Text>
          </View>

          <View
            style={{
              width: "100%",
              justifyContent: "space-evenly",
              alignItems: "center",
              flexDirection: "row",
              alignSelf: "center",
              marginTop: height(1),
              marginBottom: height(1),
            }}
          >
            <TouchableOpacity onPress={restartAudio}>
              <MaterialIcons
                name={"restart-alt"}
                size={width(10)}
                color={"#000000"}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={skipToPrevious}>
              <MaterialIcons
                name={"skip-previous"}
                size={width(15)}
                color={"#000000"}
              />
            </TouchableOpacity>

            {/* Botón de reinicio */}

            <TouchableOpacity
              style={{
                width: width(15),
                height: width(15),
                borderRadius: 30,
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={togglePlayback}
            >
              <MaterialIcons
                name={isPlaying ? "pause" : "play-arrow"}
                size={width(13)}
                color={"#000000"}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={skipToNext}>
              <MaterialIcons
                name={"skip-next"}
                size={width(15)}
                color={"#000000"}
              />
            </TouchableOpacity>

            <MaterialIcons
              name={"queue-music"}
              size={width(10)}
              color={"#000000"}
              onPress={() => {
                onClose();
                navigation.navigate("TotalSongs");
              }}
            />
          </View>
        </LinearGradient>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: "center",
    alignItems: "flex-start",
    flexDirection: "row",
    borderRadius: 10,
    width: "90%",
    height: "40%",
    alignSelf: "center",
    backgroundColor: "#000",
    marginTop: 10,
  },
  shadowProp: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    backgroundColor: "rgba(0,0,0)",
    elevation: 4,
  },
  flag: {
    width: 20,
    height: 20,
    marginLeft: 5,
  },
});

export default SongPlayer;


