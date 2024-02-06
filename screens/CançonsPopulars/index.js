import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Platform,
  StyleSheet,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { songsList } from "../../src/SongsLists/SongsCancons";
import TrackPlayer, {
  State,
  usePlaybackState,
  useProgress,
  Event,
} from "react-native-track-player";
import SongPlayer from "../../SongPlayer";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { width } from "../../src/constants/dimentions";

const flag333 = require("../../src/images/flag-333.png");
const flag777 = require("../../src/images/flag-777.png");

const CanconsPopulars = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const playbackState = usePlaybackState();
  const progress = useProgress();
  const [isVisible, setIsVisible] = useState(false);
  const [shouldStartPlayer, setShouldStartPlayer] = useState(true); 

  
   useEffect(() => {

    const handlePlaybackTrackChanged = async (data) => {
      if (data.nextTrack === undefined && data.position === data.duration) {
        // Reached the end of the last track
        await TrackPlayer.seekTo(0); // Start from the beginning
        await TrackPlayer.pause(); // Pause the player
        setCurrentIndex(0); // Reset to the first track
      } else if (data.nextTrack !== undefined) {
        // A new track is about to play
        await TrackPlayer.seekTo(0); // Start the new track from the beginning
        setCurrentIndex(data.nextTrack);
      }
    };
    
  
    const setupPlayer = async () => {
      try {
        console.log("Configurando TrackPlayer...");
        await TrackPlayer.reset();
        await TrackPlayer.add(songsList);
        console.log("TrackPlayer configurado con éxito");
      } catch (e) {
        console.log("Error en la configuración de TrackPlayer:", e);
      }
    };
  
    setupPlayer();
  
    const sub = TrackPlayer.addEventListener(
      Event.PlaybackTrackChanged,
      handlePlaybackTrackChanged
    );
  
    return () => {
      sub.remove();
    };
  }, []);

  
  return (
    <LinearGradient
      colors={["#fe01bf", "#ca30df", "#885ce9"]}
      style={{ flex: 1 }}
    >
      <StatusBar translucent backgroundColor={"transparent"} />

      <View
        style={{
          flexDirection: "row",
          marginTop: Platform.OS === "ios" ? 70 : 50,
          paddingHorizontal: 10,
          borderBottomWidth: 0.2,
          paddingBottom: 10,
        }}
      >
        <TouchableOpacity
          style={{ flexDirection: "row" }}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={require("../../src/images/back-white.png")}
            style={{ height: 25, width: 25, marginRight: 6 }}
          />
          <Text style={{ fontSize: 17, color: "#fff" }}>Medistoris.cat</Text>
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 17,
            color: "#fff",
            fontWeight: "500",
            marginLeft: 50,
          }}
        >
          Cultura Catalana
        </Text>
      </View>

      <View style={{ flexDirection: "row", paddingLeft: 20, marginTop: 20 }}>
        <Text style={{ color: "white", fontSize: 24, marginLeft: 0 }}>
          Cançons Populars
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          width: "90%",
          marginTop: 10,
          justifyContent: "space-between",
          alignSelf: "center",
        }}
      ></View>

      <FlatList
        data={songsList}
        scrollEnabled={true}
        keyExtractor={(item, index) => index}
        ItemSeparatorComponent={<View style={{ height: 1 }}></View>}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={{
                width: "100%",
                height: 110,
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
                paddingBottom: 10,
              }}
              onPress={async () => {
                 await TrackPlayer.pause();
                 await TrackPlayer.skip(index);
                 await TrackPlayer.play();
                 setCurrentIndex(index);
                 setIsVisible(true);
                
              }}
              activeOpacity={1}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingLeft: 20,
                  paddingRight: 20,
                }}
              >
                <View style={[styles.imageContainer, styles.shadowProp]}>
                  <Image source={item.artwork} style={styles.image} />
                </View>
                <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                  <Text
                    style={{ color: "white", fontSize: 16, width: "100%" }}
                    adjustsFontSizeToFit={true}
                    numberOfLines={1}
                  >
                    {item.title}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 5,
                    }}
                  >
                    <MaterialIcons
                      name={"record-voice-over"}
                      size={width(4)}
                      color={"#fff"}
                    />
                    {item.flag && (
                      <Image
                        source={item.flag === "333" ? flag333 : flag777}
                        style={styles.flag}
                      />
                    )}
                    <Text
                      style={{
                        color: "white",
                        fontSize: 13,
                        verticalAlign: "middle",
                        marginLeft: 5,
                      }}
                    >
                      {item.artist}
                    </Text>
                  </View>
                </View>
                {index == currentIndex && State.Playing == playbackState && (
                  <Image
                    source={require("../../src/images/playing.png")}
                    style={{
                      width: 18,
                      height: 18,
                      tintColor: "white",
                      marginLeft: 20,
                    }}
                  />
                )}
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <SongPlayer
        isVisible={isVisible}
        songsList={songsList}
        currentIndex={currentIndex}
        playbackState={playbackState}
        progress={progress}
        onChange={(x) => {
          setCurrentIndex(x);
        }}
        onClose={async () => {
          setIsVisible(false);
          await TrackPlayer.pause();
        }}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width: 100,
    height: 100,
    paddingBottom: 3,
  },
  image: {
    aspectRatio: 1, // Set aspectRatio to 1 to make height the same as width
    flex: 1,
    height: "100%",
    borderRadius: 10,
  },
  shadowProp: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    backgroundColor: "rgba(0,0,0,0)",
    elevation: 2,
  },
  flag: {
    width: 20,
    height: 20,
    marginLeft: 5,
  },
});

export default CanconsPopulars;

