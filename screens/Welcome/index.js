import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  Image,
  StatusBar,
  StyleSheet,
  ScrollView,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Button from "../../src/components/Button";
import auth from "@react-native-firebase/auth";
import { getData } from "../../src/services/firebase";

// ... (imports and other code)

const Welcome = ({ navigation }) => {
  //=================================== States
  const [loader, setLoader] = useState(true);

  //=================================== Functions
  const getUserInfo = async () => {
    setLoader(true);
    try {
      if (auth().currentUser) {
        const uid = auth()?.currentUser?.uid;
        const res = await getData("Users", uid);
        // Do something with the data if needed
      }
      setLoader(false);
    } catch (error) {
      setLoader(false);
      console.log("error while getting user info ", error);
    }
  };

  //=================================== Hooks
  useEffect(() => {
    getUserInfo();
  }, []);

  const handleEnterPress = () => {
    // Handle the logic when the user presses "Enter"
    // Navigate to the login/signup page or main page based on user status
    const user = auth().currentUser;

    if (user) {
      const uid = user.uid;
      getData("Users", uid)
        .then(userData => {
          if (userData) {
            navigation.replace("Main");
          } else {
            navigation.navigate("LoginScreen");
          }
        })
        .catch(error => {
          console.log("error while getting user info ", error);
        });
    } else {
      navigation.navigate("LoginScreen");
    }
  };

  return (
    <LinearGradient colors={["#d9d600", "#760075"]} style={styles.container}>
      <StatusBar translucent backgroundColor={"transparent"} />

      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Image
          source={require("../../src/images/logo2.png")}
          style={styles.logo}
        />

        <Text style={styles.title}>Cultura Catalana immersiva</Text>

        {/* Moved button rendering outside of the loader check */}
        <View
          style={{
            display: "flex",
            width: "80%",
            marginTop: 100,
          }}
        >
          <Button title="Entra" filled onPress={handleEnterPress} />
        </View>

        {loader && (
          <View>
            <Text
              style={{
                color: "#fff",
                fontSize: 16,
                marginTop: 30,
              }}
            >
              {/* Loading message or spinner can be displayed here */}
            </Text>
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
  },
  contentContainer: {
    marginTop: 150,
  },
  logo: {
    height: 170,
    width: 320,
    marginBottom: 50,
  },
  title: {
    fontSize: 20,
    color: "#fff",
    marginTop: 50,
  },
  registerButton: {
    backgroundColor: "#5c10b2",
    width: 218,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginTop: 100,
  },
  registerButtonText: {
    fontSize: 16,
    color: "#fff",
  },
  loginButtonContainer: {
    flexDirection: "row",
    marginTop: 65,
  },
  loginText: {
    color: "#fff",
    fontSize: 16,
  },
  loginTextBold: {
    color: "#fff",
    fontWeight: "700",
    marginLeft: 5,
    fontSize: 16,
  },
});
// ... (styles and export statement)

export default Welcome;

