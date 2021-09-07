import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import Constants from 'expo-constants';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Theme from "../utils/Theme";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { HamburgerMenu } from "../utils/Icons";
import CustomHandle from "../components/Handle";
import SensorContainer from "../components/SensorContainer";

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

  const [backdropPressBehavior] = useState<"none" | "close" | "collapse">(
    "collapse"
  );

  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["5%", "30%"], []);

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop {...props} pressBehavior={backdropPressBehavior} />
    ),
    [backdropPressBehavior]
  );
  const renderHeaderHandle = useCallback(
    (props) => <CustomHandle {...props} children="Backdrop Example" />,
    []
  );

  const getGreetingMessage = () => {
    // Good morning (5am-11am) 5 - 11
    // Good afternoon (11am-4pm) 11 - 16
    // Good evening (4pm-8pm) 16 - 20
    // Good night (8pm-5am) 20 - 5

    const timeOfDay = new Date().getHours();

    timeOfDay >= 5 && timeOfDay < 11
      ? setGreeting("Good morning")
      : timeOfDay >= 11 && timeOfDay < 16
      ? setGreeting("Good afternoon")
      : timeOfDay >= 16 && timeOfDay < 20
      ? setGreeting("Good evening")
      : timeOfDay >= 20 || timeOfDay < 5
      ? setGreeting("Good night")
      : setGreeting("Good day")

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

  const themeButtonStyle =
    colorScheme === "light"
      ? styles.buttonInactiveLight
      : styles.buttonInactiveDark;

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
        <View>
          <LinearGradient
            colors={
              colorScheme === "light"
                ? ["rgba(97, 67, 133, 0.9)", "rgba(81, 99, 149, 0.9)"]
                : ["rgba(42, 84, 112, 0.9)", "rgba(76, 65, 119, 0.9)"]
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1.0, y: 1.0 }}
            style={styles.Gradient}
          >
            <Pressable
              style={
                isArmed
                  ? [styles.Button, themeButtonStyle, buttonActivatedStyle]
                  : [styles.Button2, themeButtonStyle, buttonActivatedStyle]
              }
              onPress={toggleIsArmed}
            >
              <Text style={[styles.Text, themeTextStyle]}>
                {isArmed ? "armed" : "disarmed"}
              </Text>
            </Pressable>
          </LinearGradient>
        </View>
        <View
          style={{
            width: "100%",
            right: 0,
            alignItems: "flex-end",
          }}
        >
          <Text style={{ fontSize: 12, color:"#434C5E" }}>{Constants.manifest?.version}</Text>
        </View>
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        handleComponent={renderHeaderHandle}
        backgroundComponent={null}
      >
        <View
          style={[
            { flex: 1, paddingLeft: 20, paddingRight: 20 },
            themeContainerStyle,
          ]}
        >
          <View style={styles.UtilityContainer}>
            <SensorContainer sensorName="MOTION SENSOR">
              <Text style={styles.SensorFeedText}>Hello</Text>
            </SensorContainer>
            <SensorContainer sensorName="GLASSBREAK SENSOR">
              <Text style={styles.SensorFeedText}>Hello</Text>
            </SensorContainer>
          </View>
        </View>
      </BottomSheet>
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
  SensorFeedText: {
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
    width: 190,
    height: 190,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 9999,
  },
  Text: {
    fontSize: 30,
  },
  Gradient: {
    height: 200,
    width: 200,
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
  buttonInactive: {},
  buttonInactiveLight: {
    backgroundColor: Theme.buttonInactiveLight,
  },
  buttonInactiveDark: {
    backgroundColor: Theme.buttonInactiveDark,
  },
  buttonActive: {
    backgroundColor: Theme.buttonActive,
  },
});
