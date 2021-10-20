import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  useColorScheme,
} from "react-native";
import { RightArrow } from "../utils/Icons";
import Theme from "../utils/Theme";

const Button = ({ ButtonText, onPress, disabled }: any) => {
  const colorScheme = useColorScheme();

  const themeButtonStyle =
    colorScheme === "light"
      ? styles.lightButtonContainer
      : styles.darkButtonContainer;

  const themeButtonTextStyle =
    colorScheme === "light"
      ? styles.lightButtonThemeText
      : styles.darkButtonThemeText;

  return (
    <View style={styles.SubmitButtonContainer}>
      <Pressable
        style={[styles.SubmitButton, themeButtonStyle]}
        onPress={onPress}
        disabled={disabled}
      >
        <Text style={[styles.SubmitButtonText, themeButtonTextStyle]}>
          {ButtonText}
        </Text>
        <RightArrow height={15} width={15} />
      </Pressable>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  SubmitButtonContainer: {
    width: "100%",
  },
  SubmitButton: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 10,
    padding: 10,
  },
  SubmitButtonText: {
    fontSize: 18,
    paddingRight: 20,
  },
  lightButtonContainer: {
    backgroundColor: Theme.wd1,
  },
  darkButtonContainer: {
    backgroundColor: Theme.wd4,
  },
  lightButtonThemeText: {
    color: Theme.wd2,
  },
  darkButtonThemeText: {
    color: Theme.wd2,
  },
});
