import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  useColorScheme,
  BackHandler,
  Pressable,
  Text,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import backAction from "../utils/BackAction";
import { LeftArrowCurve } from "../utils/Icons";
import Button from "../components/Button";
import { TextInput } from "react-native-paper";

const WifiSetup = ({ navigation }: any) => {
  const colorScheme = useColorScheme();
  const [wifiName, setWifiName] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  const themeTextStyle =
    colorScheme === "light" ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;

  return (
    <View style={[styles.WifiSetupScreen, themeContainerStyle]}>
      <StatusBar style="auto" />
      <View style={styles.NavigationContainer}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
        >
          <LeftArrowCurve height={25} width={25} />
        </Pressable>
      </View>
      <View style={styles.AppContainer}>
        <View style={styles.HeadingContainer}>
          <Text style={[styles.Title, themeTextStyle]}>Setup your device</Text>
          <Text style={[styles.Subtitle, themeTextStyle]}>
            Please enable location and bluetooth permissions to connect to your
            device.
          </Text>
        </View>
        <View style={styles.InputContainer}>
          <TextInput
            label="Wi-Fi Name"
            value={wifiName}
            mode="flat"
            onChangeText={(wifiName) => setWifiName(wifiName)}
            style={styles.TextInput}
            theme={{
              colors: {
                primary: "white",
                placeholder: "#7E7F8A",
                text: "white",
              },
            }}
          />
          <TextInput
            label="Wi-Fi Password"
            value={wifiPassword}
            mode="flat"
            onChangeText={(wifiPassword) => setWifiPassword(wifiPassword)}
            style={styles.TextInput}
            right={
              <TextInput.Icon
                // name="eye-off-outline"
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                color="#7E7F8A"
                onPress={() => setShowPassword(!showPassword)}
                style={{ marginRight: 20 }}
              />
            }
            secureTextEntry={showPassword}
            theme={{
              colors: {
                primary: "white",
                placeholder: "#7E7F8A",
                text: "white",
              },
            }}
          />
        </View>
        <Button
          ButtonText="Let's go"
          disabled={!wifiPassword || !wifiName}
          onPress={() => {
            navigation.navigate("Homescreen");
          }}
        />
      </View>
    </View>
  );
};

export default WifiSetup;

const styles = StyleSheet.create({
  WifiSetupScreen: {
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
  },
  HeadingContainer: {
    width: "100%",
  },
  Title: {
    fontSize: 36,
    fontWeight: "700",
  },
  Subtitle: {
    fontSize: 18,
    paddingTop: 10,
  },
  InputContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },
  TextInput: {
    // For some reason, borderRadius only effects bottom one
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#1E1C24",
    borderColor: "#7E7F8A",
    color: "red",
    borderWidth: 1,
    height: 60,
    overflow: "hidden",
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
});