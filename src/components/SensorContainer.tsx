import React from "react";
import { View, Text, StyleSheet, useColorScheme } from "react-native";
import Theme from "../utils/Theme";

const SensorContainer = ({ sensorName, children }: any) => {
  const colorScheme = useColorScheme();

  const themeUtilityStyle =
    colorScheme === "light"
      ? styles.utilityContainerThemeLight
      : styles.utilityContainerThemeDark;

  const themeTitlebarStyle =
    colorScheme === "light"
      ? styles.lightThemeTitlebar
      : styles.darkThemeTitlebar;

  return (
    <View style={[styles.SensorContainer, themeUtilityStyle]}>
      <View style={[styles.Titlebar, themeTitlebarStyle]}>
        <Text style={styles.Text}>{sensorName}</Text>
      </View>
      <View>{children}</View>
    </View>
  );
};

export default SensorContainer;

const styles = StyleSheet.create({
  SensorContainer: {
    width: "100%",
    padding: 5,
    borderRadius: 5,
    marginBottom: 5,
    marginTop: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  Titlebar: {
    // backgroundColor: "#3B3941",
    padding: 5,
    borderRadius: 5,
  },
  Text: {
    fontSize: 18,
    color: "#9A9A9B",
  },
  utilityContainerThemeLight: {
    backgroundColor: Theme.utilityContainerThemeLight,
  },
  utilityContainerThemeDark: {
    backgroundColor: Theme.utilityContainerThemeDark,
  },
  lightThemeTitlebar: {
    backgroundColor: Theme.lightThemeTitlebar,
  },
  darkThemeTitlebar: {
    backgroundColor: Theme.darkThemeTitlebar,
  },
});