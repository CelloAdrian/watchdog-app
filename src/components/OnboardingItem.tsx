import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  useWindowDimensions,
  useColorScheme,
} from "react-native";
import Theme from "../utils/Theme";

const OnboardingItem = ({ item }: any) => {
  const { width } = useWindowDimensions();
  const colorScheme = useColorScheme();

  const themeTextStyle =
    colorScheme === "light"
      ? styles.lightThemeTextOnboarding
      : styles.darkThemeTextOnboarding;

  return (
    <View>
      <View style={[styles.container, { width }]}>
        <View style={{ paddingTop: 20 }}>
          <Text style={[{ fontSize: 18, fontWeight: "700" }, themeTextStyle]}>Quick Setup</Text>
        </View>
        {/* <Image source={item.image} style={[styles.image, { width }]} /> */}
        <View style={{ flex: 0.8, alignItems: "center", width: "100%" }}>
          <Image source={item.image} style={[styles.image, { width }]} />
          <Text style={[styles.title, themeTextStyle]}>{item.title}</Text>
          <Text style={[styles.subtitle, themeTextStyle]}>
            {item.description}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default OnboardingItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: 40,
    justifyContent: "space-between",
  },
  image: {
    // flex: 1,
    height: "50%",
    aspectRatio: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "300",
    textAlign: "center",
  },
  lightThemeTextOnboarding: {
    color: Theme.wd1,
  },
  darkThemeTextOnboarding: {
    color: Theme.wd2,
  },
});
