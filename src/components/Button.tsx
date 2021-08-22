import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  useColorScheme,
} from "react-native";
import { RightArrow } from "../utils/Icons";

const Button = ({ ButtonText, onPress, disabled }: any) => {
  const colorScheme = useColorScheme();

  const themeButtonStyle =
    colorScheme === "light"
      ? styles.lightButtonContainer
      : styles.darkButtonContainer;

  return (
    <View style={styles.SubmitButtonContainer}>
      <Pressable
        style={[styles.SubmitButton, themeButtonStyle]}
        onPress={onPress}
        disabled={disabled}
      >
        <Text style={styles.SubmitButtonText}>{ButtonText}</Text>
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
    backgroundColor: "red",
  },
  darkButtonContainer: {
    backgroundColor: "#fff",
  },
});
