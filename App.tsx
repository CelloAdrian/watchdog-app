import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import {
  View,
  ActivityIndicator,
  useColorScheme,
  StyleSheet,
  Dimensions,
  Text,
  Linking,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import Constants from "expo-constants";
import Register from "./src/pages/Register";
import WifiSetup from "./src/pages/WifiSetup";
import Homescreen from "./src/pages/Homescreen";
import Theme from "./src/utils/Theme";

const Loading = () => {
  return (
    <View>
      <ActivityIndicator />
    </View>
  );
};

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [finishedWifiSetup, setFinishedWifiSetup] = useState(false);
  const colorScheme = useColorScheme();

  const themeUtilityTextStyle = colorScheme === "light" ? "#191720" : "#FFF";

  const themeContainerStyle =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;

  const drawerContainerStyle =
    colorScheme === "light" ? Theme.lightContainer : Theme.darkContainer;

  function DrawerProps(props: any) {
    return (
      <>
        <DrawerContentScrollView {...props}>
          <DrawerItemList {...props} />
          <DrawerItem
            label="Help"
            onPress={() => alert("Link to help")}
            activeTintColor={themeUtilityTextStyle}
            inactiveTintColor={themeUtilityTextStyle}
          />
        </DrawerContentScrollView>
        <View
          style={{
            paddingLeft: 20,
            paddingBottom: 10,
          }}
        >
          <Text
            style={{ color: "#5E81AC" }}
            onPress={() => {
              Linking.openURL("https://github.com/lasergangers/watchdog-app");
            }}
          >
            open-source{" "}
            <AntDesign name="github" color={themeUtilityTextStyle} size={16} />
          </Text>
        </View>
        <View
          style={{
            paddingLeft: 20,
            paddingBottom: 20,
          }}
        >
          <Text style={{ color: "#5E81AC" }}>
            app version {Constants.manifest?.version}
          </Text>
        </View>
      </>
    );
  }

  function HomescreenDrawer() {
    const width = Dimensions.get("window").width;

    return (
      <Drawer.Navigator
        drawerContent={(props) => <DrawerProps {...props} />}
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            backgroundColor: drawerContainerStyle,
            width: width / 2,
          },
        }}
      >
        <Drawer.Screen name="Home" component={Homescreen} />
      </Drawer.Navigator>
    );
  }

  const checkIfFirstTime = async () => {
    try {
      const value = await AsyncStorage.getItem("username");

      if (value !== null) {
        setIsFirstTime(true);
      }
    } catch (err) {
      console.log("Error @checkIfFirstTime: ", err);
    } finally {
      setLoading(false);
    }
  };

  const checkIfFinishedSetup = async () => {
    try {
      const value = await AsyncStorage.getItem("finished_wifi_setup");

      if (value !== null) {
        setFinishedWifiSetup(true);
      }
    } catch (err) {
      console.log("Error @checkIfFinishedSetup: ", err);
    }
  };

  useEffect(() => {
    checkIfFirstTime();
    checkIfFinishedSetup();
  }, []);

  return (
    <View style={[styles.Container, themeContainerStyle]}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {loading ? (
            <Stack.Screen name="Loading" component={Loading} />
          ) : isFirstTime ? (
            <>
              <Stack.Screen name="Homescreen" component={HomescreenDrawer} />
            </>
          ) : finishedWifiSetup ? (
            <>
              <Stack.Screen name="WifiSetup" component={WifiSetup} />
              <Stack.Screen name="Homescreen" component={HomescreenDrawer} />
            </>
          ) : (
            <>
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="WifiSetup" component={WifiSetup} />
              <Stack.Screen name="Homescreen" component={HomescreenDrawer} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  lightContainer: {
    backgroundColor: "#d0d0c0",
  },
  darkContainer: {
    backgroundColor: "#191720",
  },
  lightThemeText: {
    color: Theme.lightThemeText,
  },
  darkThemeText: {
    color: Theme.darkThemeText,
  },
});
