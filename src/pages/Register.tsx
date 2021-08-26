import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  BackHandler,
  useColorScheme,
  Pressable,
} from "react-native";
import { TextInput } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { LeftArrowCurve } from "../utils/Icons";
import Button from "../components/Button";
import backAction from "../utils/BackAction";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Theme from "../utils/Theme"

const Register = ({ navigation }: any) => {
  const [name, setName] = useState("");
  const colorScheme = useColorScheme();

  const saveUsername = async () => {
    try {
      await AsyncStorage.setItem("username", name);
    } catch (err) {
      alert(err);
    }
  };

  const themeTextStyle =
    colorScheme === "light" ? styles.lightThemeText : styles.darkThemeText;
  const themeContainerStyle =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  }, []);

  return (
    <View style={[styles.RegisterScreen, themeContainerStyle]}>
      <StatusBar style="auto" />
      <View style={styles.NavigationContainer}>
        <Pressable
          onPress={() => {
            backAction();
          }}
        >
          <LeftArrowCurve height={25} width={25} />
        </Pressable>
      </View>
      <View style={styles.AppContainer}>
        <View style={styles.HeadingContainer}>
          <Text style={[styles.Title, themeTextStyle]}>Register</Text>
          <Text style={[styles.Subtitle, themeTextStyle]}>
            You’re only clicks away from a secure house.
          </Text>
        </View>
        <View style={styles.InputContainer}>
          <TextInput
            label="Name"
            value={name}
            mode="flat"
            onChangeText={(name) => setName(name)}
            style={styles.TextInput}
            left={<TextInput.Icon name="account" color="#7E7F8A" />}
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
          disabled={!name}
          onPress={() => {
            saveUsername();
            navigation.navigate("WifiSetup");
          }}
        />
      </View>
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  RegisterScreen: {
    flex: 1,
    width: "100%",
    padding: 40,
    justifyContent: "space-between",
  },
  AppContainer: {
    width: "100%",
    flex: 0.95,
  },
  HeadingContainer: {
    width: "100%",
  },
  NavigationContainer: {
    width: "100%",
    paddingTop: 20,
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
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: "#1E1C24",
    borderColor: "#7E7F8A",
    color: "red",
    borderWidth: 1,
    height: 60,
    overflow: "hidden",
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
});
