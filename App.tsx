import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, ActivityIndicator, useColorScheme, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Register from "./src/pages/Register";
import WifiSetup from "./src/pages/WifiSetup";
import Homescreen from "./src/pages/Homescreen";

const Loading = () => {
  return (
    <View>
      <ActivityIndicator />
    </View>
  );
};

const Stack = createNativeStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isFirstTime, setIsFirstTime] = useState(false);
  const colorScheme = useColorScheme();

  const themeContainerStyle = colorScheme === "light" ? styles.lightContainer : styles.darkContainer;

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

  useEffect(() => {
    checkIfFirstTime();
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
              <Stack.Screen name="Homescreen" component={Homescreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen name="WifiSetup" component={WifiSetup} />
              <Stack.Screen name="Homescreen" component={Homescreen} />
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
})