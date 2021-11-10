import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  useColorScheme,
  FlatList,
  BackHandler,
  Animated,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import * as IntentLauncher from "expo-intent-launcher";
import Theme from "../utils/Theme";
import backAction from "../utils/BackAction";
import OnboardingItem from "../components/OnboardingItem";
import Button from "../components/Button";
import Slides from "./Slides";
import Paginator from "../components/Paginator";

const Onboarding = ({ navigation }: any) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  const colorScheme = useColorScheme();

  const viewableItemsChanged = useRef(({ viewableItems }: any) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const slidesRef = useRef(null);
  // const openLocationSettings = async () => {
  //   IntentLauncher.startActivityAsync(
  //     IntentLauncher.ACTION_LOCATION_SOURCE_SETTINGS
  //   );
  // };

  // const openBluetoothSettings = async () => {
  //   IntentLauncher.startActivityAsync(IntentLauncher.ACTION_BLUETOOTH_SETTINGS);
  // };

  const themeContainerStyle =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;

  const themeTextStyle =
    colorScheme === "light" ? styles.lightThemeText : styles.darkThemeText;

  const themeModalStyle =
    colorScheme === "light" ? styles.lightThemeModal : styles.darkThemeModal;

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
          flex: 0.9,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FlatList
          data={Slides}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
        {/* <Image source={require("../../assets/lockanim.gif")} style={{ height: "50%", aspectRatio: 1}}/> */}
      </View>
      <View
        style={[
          {
            flex: 0.1,
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            paddingLeft: 30,
            paddingRight: 30,
          },
          themeModalStyle,
        ]}
      >
        {/* <Text
          style={[
            {
              fontSize: 14,
              fontWeight: "400",
              alignContent: "center",
              textAlign: "center",
            },
            themeTextStyle,
          ]}
        >
          In order for the app to function properly, you need to enable both
          bluetooth and location permissions.
        </Text> */}
        {/* <Pressable onPress={openLocationSettings} style={styles.button}>
          <Text style={[styles.buttonText, themeTextStyle]}>Location</Text>
        </Pressable>
        <Pressable onPress={openBluetoothSettings} style={styles.button}>
          <Text style={[styles.buttonText, themeTextStyle]}>Bluetooth</Text>
        </Pressable> */}
        <Paginator data={Slides} scrollX={scrollX} />
        <Button
          ButtonText="Finish"
          onPress={() => {
            navigation.navigate("Register");
          }}
        />
      </View>
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
    height: "15%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "300",
  },
  lightContainer: {
    backgroundColor: Theme.wd2,
  },
  darkContainer: {
    backgroundColor: Theme.wd1,
  },
  lightThemeText: {
    color: Theme.wd1,
  },
  darkThemeText: {
    color: Theme.wd2,
  },
  lightThemeModal: {
    backgroundColor: Theme.wd2,
  },
  darkThemeModal: {
    backgroundColor: Theme.wd5,
  },
});
