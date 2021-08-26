import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { HamburgerMenu } from "../utils/Icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Video } from "expo-av";

function useToggle(initialValue = false) {
  const [value, setValue] = useState<boolean>(initialValue);

  const toggle = (_: any): void => {
    setValue((v) => !v);
  };

  return { value, toggle };
}

const Homescreen = ({ navigation }: any) => {
  const colorScheme = useColorScheme();
  const { value: isArmed, toggle: toggleIsArmed } = useToggle();
  const [greeting, setGreeting] = useState("");
  const [name, setName] = useState("");
  const video = useRef<Video>(null);

  const getGreetingMessage = () => {
    // Good morning (12am-12pm)
    // Good afternoon (12pm - 4pm)
    // Good evening (4pm to 9pm)
    // Good night ( 9pm to 6am)

    const timeOfDay = new Date().getHours();

    timeOfDay >= 0 && timeOfDay < 12
      ? setGreeting("Good morning")
      : timeOfDay >= 12 && timeOfDay < 16
      ? setGreeting("Good afternoon")
      : timeOfDay >= 16 && timeOfDay < 21
      ? setGreeting("Good evening")
      : timeOfDay >= 21 && timeOfDay < 24
      ? setGreeting("Good night")
      : console.log("What happened?");

    return greeting;
  };

  const getUsername = async () => {
    try {
      let name = await AsyncStorage.getItem("username");

      if (name !== null) {
        setName(name);
      }
    } catch (err) {
      alert(err);
    }
  };

  const themeTextStyle =
    colorScheme === "light" ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;
  const buttonActivatedStyle =
    isArmed === false ? styles.buttonInactive : styles.buttonActive;

  useEffect(() => {
    getGreetingMessage();
    getUsername();
  }, []);

  if (isArmed === true) {
    console.log("ARMED");
  } else if (isArmed === false) {
    console.log("DISARMED");
  }

  return (
    <View style={[styles.Homescreen, themeContainerStyle]}>
      <StatusBar style="auto" />
      <View style={styles.NavigationContainer}>
        <Pressable
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <HamburgerMenu height={25} width={25} />
        </Pressable>
      </View>
      <View style={styles.AppContainer}>
        <View style={styles.StatusContainer}>
          <Text
            style={[styles.Title, themeTextStyle]}
          >{`${greeting}, ${name}`}</Text>
          <Text style={[styles.Subtitle, themeTextStyle]}>
            Everything is OK.
          </Text>
        </View>
        <View style={styles.ButtonContainer}>
          <LinearGradient
            colors={["rgba(42,84,112,0.9)", "rgba(76,65,119,0.9)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1.0, y: 1.0 }}
            style={styles.Gradient}
          >
            <Pressable
              style={
                isArmed
                  ? [styles.Button, buttonActivatedStyle]
                  : [styles.Button2, buttonActivatedStyle]
              }
              onPress={toggleIsArmed}
            >
              <Text style={[styles.Text, themeTextStyle]}>
                {isArmed ? "armed" : "disarmed"}
              </Text>
            </Pressable>
          </LinearGradient>
        </View>
        <View style={styles.UtilityContainer}>
          <View style={styles.MotionSensorContainer}>
            <View style={styles.Titlebar}>
              <Text style={styles.UtilityText}>MOTION SENSOR</Text>
            </View>
            <Text style={styles.MotionSensorFeedText}>Triggered at [TIME]</Text>
          </View>
          <View style={styles.VideoFeedContainer}>
            <View style={styles.Titlebar}>
              <Text style={styles.UtilityText}>CAMERA</Text>
            </View>
            <View>
              <Video
                ref={video}
                style={styles.Video}
                source={{
                  // HLS livestream example
                  uri: "https://multiplatform-f.akamaihd.net/i/multi/will/bunny/big_buck_bunny_,640x360_400,640x360_700,640x360_1000,950x540_1500,.f4v.csmil/master.m3u8",
                }}
                resizeMode="contain"
                shouldPlay
              />
            </View>
          </View>
        </View>
      </View>
      {/* DEV ONLY */}
      <Pressable
        onPress={() => {
          AsyncStorage.clear();
        }}
      >
        <Text>Clear Async Storage</Text>
      </Pressable>
      {/* DEV ONLY */}
    </View>
  );
};

export default Homescreen;

const styles = StyleSheet.create({
  Homescreen: {
    flex: 1,
    width: "100%",
    padding: 40,
    justifyContent: "space-between",
  },
  NavigationContainer: {
    width: "100%",
    paddingTop: 20,
  },
  AppContainer: {
    width: "100%",
    flex: 0.95,
    justifyContent: "space-between",
    alignItems: "center",
  },
  StatusContainer: {
    width: "100%",
  },
  UtilityContainer: {
    width: "100%",
  },
  ButtonContainer: {},
  MotionSensorContainer: {
    backgroundColor: "#1E1C24",
    width: "100%",
    padding: 5,
    borderRadius: 5,
    marginBottom: 5,
  },
  Titlebar: {
    backgroundColor: "#3B3941",
    padding: 5,
    borderRadius: 5,
  },
  VideoFeedContainer: {
    backgroundColor: "#1C1C22",
    width: "100%",
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  Title: {
    fontSize: 24,
    fontWeight: "700",
  },
  Subtitle: {
    fontSize: 16,
    paddingTop: 10,
  },
  UtilityText: {
    fontSize: 18,
    color: "#9A9A9B",
  },
  MotionSensorFeedText: {
    paddingTop: 5,
    paddingLeft: 5,
    paddingBottom: 5,
    fontSize: 18,
    color: "#D8573A",
  },
  Button: {
    // active button style
    width: 200,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 9999,
  },
  Button2: {
    // inactive button style
    width: 180,
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 9999,
  },
  Text: {
    fontSize: 30,
  },
  Gradient: {
    height: 190,
    width: 190,
    justifyContent: "center",
    borderRadius: 9999,
    alignItems: "center",
  },
  buttonContainer: {
    flex: 1.0,
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderRadius: 100,
    width: "99%",
    margin: 1,
  },
  buttonText: {
    textAlign: "center",
    color: "#4C64FF",
    alignSelf: "center",
  },
  Video: {
    alignSelf: "center",
    aspectRatio: 4 / 3,
    width: "100%",
  },
  lightContainer: {
    backgroundColor: "#d0d0c0",
  },
  darkContainer: {
    backgroundColor: "#191720",
  },
  lightThemeText: {
    color: "#191720",
  },
  darkThemeText: {
    color: "#fff",
  },
  buttonInactive: {
    backgroundColor: "#191720",
  },
  buttonActive: {
    backgroundColor: "#008BC3",
  },
});
