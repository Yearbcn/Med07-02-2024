import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { radio } from "../../src/SongsLists/Radio";
import { useIsFocused } from "@react-navigation/native";

import TrackPlayer, {
  Capability,
  State,
  usePlaybackState,
} from "react-native-track-player";
import auth from "@react-native-firebase/auth";
import COLORS from "../../src/constants/colors";

const flag333 = require("../../src/images/flag-333.png");
const flag777 = require("../../src/images/flag-777.png");

const Main = ({ navigation }) => {
  const playbackState = usePlaybackState();
  const isFocused = useIsFocused();

  const resetPlayer = async () => {
    if (isFocused) {
      await TrackPlayer.reset();
      await TrackPlayer.add(radio);
    }
  };

  useEffect(() => {
    if (State.Ready) {
      console.log("Player Ready");
      resetPlayer();
    }
  }, [isFocused]);

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={["#d9d600", "#760075"]} style={styles.container}>
        <StatusBar translucent backgroundColor={"transparent"} />
        <View style={styles.headerContainer}>
          <Text style={{ fontSize: 22, color: "#fff", fontWeight: "500" }}>
            Medistoris.cat
          </Text>
          <Text
            onPress={() => {
              auth().signOut();
              navigation.navigate("WelcomeScreen");
            }}
            style={{ fontSize: 16, color: "#fff", fontWeight: "500" }}
          >
            Tancar sessió
          </Text>
        </View>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../src/images/logo-medi.png")}
            style={styles.logoImg}
            resizeMode={"contain"}
          />
          <TouchableOpacity
            style={styles.playPauseBtn}
            onPress={async () => {
              console.log("here");
              console.log(playbackState);
              console.log(playbackState);
              console.log(State.Playing);
              if (State.Playing == playbackState) {
                await TrackPlayer.pause();
              } else {
                await TrackPlayer.skip(0);
                await TrackPlayer.play();
              }
            }}
          >
            <Image
              source={
                State.Playing === playbackState
                  ? require("../../src/images/pause2.png")
                  : require("../../src/images/play.png")
              }
              style={styles.playPauseImg}
              resizeMode={"contain"}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.boxContainer}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={[styles.box, { backgroundColor: "#bb7a00" }]}
            onPress={() => {
              navigation.navigate("Histories");
            }}
          >
            <View style={[styles.imageContainer, styles.shadowProp]}>
              <Image
                source={require("../../src/images/Mataro_foto.jpg")}
                style={styles.image}
              />
            </View>
            <View>
              <Text style={styles.boxText}>Històries ⚡️🎧 immersives</Text>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <Image
                  source={require("../../src/images/flag-333.png")}
                  style={styles.flag}
                />
                <Image
                  source={require("../../src/images/flag-777.png")}
                  style={styles.flag}
                />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            style={[styles.box, { backgroundColor: "#bd008a" }]}
            onPress={() => {
              navigation.navigate("Llegendes");
            }}
          >
            <View style={[styles.imageContainer, styles.shadowProp]}>
              <Image
                source={require("../../src/images/timbaler4.jpg")}
                style={styles.image}
              />
            </View>
            <View>
              <Text style={styles.boxText}>Llegendes ⚡️🎧 immersives</Text>
              <View style={{ flexDirection: "row", marginTop: 5 }}>
                <Image source={flag333} style={styles.flag} />
                <Image source={flag777} style={styles.flag} />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            style={[styles.box, { backgroundColor: "#001d9a" }]}
            onPress={() => {
              navigation.navigate("LesDites");
            }}
          >
            <View style={[styles.imageContainer, styles.shadowProp]}>
              <Image
                source={require("../../src/images/Dites.jpeg")}
                style={styles.image}
              />
            </View>
            <Text style={styles.boxText}>Dites</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.6}
            style={[styles.box, { backgroundColor: "#8d00b4" }]}
            onPress={() => {
              navigation.navigate("CanconsPopulars");
            }}
          >
            <View style={[styles.imageContainer, styles.shadowProp]}>
              <Image
                source={require("../../src/images/cancons.jpeg")}
                style={styles.image}
              />
            </View>
            <Text style={styles.boxText}>Cançons populars Catalanes</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.totalContainer}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              navigation.navigate("TotalSongs");
            }}
          >
            <View style={styles.totalButton}>
              <Text style={styles.totalBtnText}>
                Escolta tots els 🔈 àudios
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 40,
    paddingBottom: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  logoContainer: {
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  totalContainer: {
    marginTop: 10,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  totalButton: {
    width: 250,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#bf00a8",
    borderRadius: 5,
  },
  totalBtnText: {
    fontSize: 15,
    color: COLORS.white,
    fontWeight: "bold",
  },
  logoImg: {
    flex: 1,
    height: "100%",
  },
  playPauseBtn: {
    flex: 1,
    position: "absolute",
    width: 50,
    height: 50,
    backgroundColor: "#8d13b3",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    right: 10,
    bottom: 10,
  },
  playPauseImg: {
    flex: 1,
    position: "absolute",
    width: 30,
    height: 30,
  },
  boxContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  box: {
    flex: 1,
    backgroundColor: "blue", // Set your desired background color
    marginHorizontal: 0, // Remove any margin
    marginVertical: 5, // Remove any margin
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "relative",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    borderRadius: 10,
    paddingBottom: 3,
  },
  image: {
    aspectRatio: 1, // Set aspectRatio to 1 to make height the same as width
    flex: 1,
    height: "100%",
    borderRadius: 10,
  },
  boxText: {
    fontSize: 15,
    color: COLORS.white,
    fontWeight: "bold",
  },
  shadowProp: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    backgroundColor: "rgba(0,0,0,0)",
    elevation: 3,
  },
  flag: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
});
export default Main;
