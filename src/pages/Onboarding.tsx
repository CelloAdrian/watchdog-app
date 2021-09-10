import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useColorScheme,
  FlatList,
  BackHandler
} from "react-native";
import { StatusBar } from "expo-status-bar";
import * as IntentLauncher from "expo-intent-launcher";
import Theme from "../utils/Theme";
import backAction from "../utils/BackAction";
import OnboardingItem from "../components/OnboardingItem";
import Button from "../components/Button";
import Slides from "./Slides";

const Onboarding = ({navigation}:any) => {
  const colorScheme = useColorScheme();

  const openLocationSettings = async () => {
    IntentLauncher.startActivityAsync(
      IntentLauncher.ACTION_LOCATION_SOURCE_SETTINGS
    );
  };

  const openBluetoothSettings = async () => {
    IntentLauncher.startActivityAsync(IntentLauncher.ACTION_BLUETOOTH_SETTINGS);
  };

  const themeContainerStyle =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;

  const themeTextStyle =
    colorScheme === "light" ? styles.lightThemeText : styles.darkThemeText;

  const themeModalStyle = colorScheme === "light" ? styles.lightThemeModal : styles.darkThemeModal;

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  return (
    <View style={[styles.container, themeContainerStyle]}>
      <StatusBar style="auto" />
      <View
        style={{
          flex: 0.7,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FlatList
          data={Slides}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          horizontal
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
        />
        {/* <Image source={require("../../assets/lockanim.gif")} style={{ height: "50%", aspectRatio: 1}}/> */}
      </View>
      <View
        style={[{
          flex: 0.3,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingLeft: 20,
          paddingRight: 20,
        }, themeModalStyle]}
      >
        <Text style={[{ fontSize: 14, fontWeight: "300" }, themeTextStyle]}>
          In order for the app to function properly, you need to enable both
          bluetooth and location permissions.
        </Text>
        <Pressable onPress={openLocationSettings} style={styles.button}>
          <Text style={[styles.buttonText, themeTextStyle]}>Location</Text>
        </Pressable>
        <Pressable onPress={openBluetoothSettings} style={styles.button}>
          <Text style={[styles.buttonText, themeTextStyle]}>Bluetooth</Text>
        </Pressable>
        <Button ButtonText="Next" onPress={()=>{navigation.navigate("Register")}}/>
      </View>
      {/* <Pressable onPress={test}>
        <Text>Open stuff</Text>
      </Pressable>
      <Pressable onPress={test2}>
        <Text>Open stuff2</Text>
      </Pressable> */}
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#7E7F8A",
    width: "40%",
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "300"
  },
  lightContainer: {
    backgroundColor: Theme.lightContainer,
  },
  darkContainer: {
    backgroundColor: Theme.darkContainer,
  },
  lightThemeText: {
    color: Theme.lightThemeText,
  },
  darkThemeText: {
    color: Theme.darkThemeText,
  },
  lightThemeModal: {
      backgroundColor: Theme.textInputBackgroundLight
  },
  darkThemeModal: {
      backgroundColor: Theme.textInputBackgroundDark
  },
});
