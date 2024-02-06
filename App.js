import React, { useEffect, useRef } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Welcome from "./screens/Welcome";
import CanconsPopulars from "./screens/CançonsPopulars";
import Histories from "./screens/Històries";
import LesDites from "./screens/LesDites";
import TotalSongs from "./screens/Toteslescançons";
import Llegendes from "./screens/Llegendes";
import Main from "./screens/Main";
import SignupScreen from "./screens/Signup";
import LoginScreen from "./screens/Login";
import ResetPassword from "./screens/ResetPassword";
import { LogBox } from "react-native";
import Privacy from "./screens/Privacy";
import TrackPlayer, { Capability } from "react-native-track-player";
LogBox.ignoreAllLogs();
const Stack = createStackNavigator();

const App = () => {
  const navRef = useRef(null);
  // const getUserInfo = async () => {
  //   if (auth().currentUser) {
  //     const uid = auth()?.currentUser?.uid;
  //     const res = await getData("Users", uid);

  //     navRef.current?.navigate("Main");
  //   }
  // };
  useEffect(() => {
    // getUserInfo();
    setupPlayer();
    // return () => {
    //   auth().signOut()
    // };
  }, []);

  const setupPlayer = async () => {
    try {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.Stop,
        ],
        compactCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
        ],
      });
      console.log("Configurando TrackPlayer...");
      console.log("TrackPlayer configurado con éxito");
    } catch (e) {
      console.log("Error en la configuración de TrackPlayer:", e);
    }
  };
  return (
    <NavigationContainer ref={navRef}>
      <Stack.Navigator initialRouteName="WelcomeScreen">
        <Stack.Screen
          name="WelcomeScreen"
          component={Welcome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignupScreen"
          component={SignupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Privacy"
          component={Privacy}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CanconsPopulars"
          component={CanconsPopulars}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Histories"
          component={Histories}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LesDites"
          component={LesDites}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Llegendes"
          component={Llegendes}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TotalSongs"
          component={TotalSongs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

//'#a34c0d', '#592804', '#241001', '#000000'
