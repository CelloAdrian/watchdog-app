import React from "react";
import { View, Text, StyleSheet, Image, useWindowDimensions, useColorScheme } from "react-native"
import Theme from "../utils/Theme";

const OnboardingItem = ({item}:any) => {
    const { width } = useWindowDimensions();
    const colorScheme = useColorScheme();

    const themeTextStyle =
    colorScheme === "light" ? styles.lightThemeTextOnboarding : styles.darkThemeTextOnboarding;

    return (
        <View style={[styles.container, {width}]}>
            <Image source={item.image} style={[styles.image, {width}]}/>
            <View style={{flex: 0.3, alignItems: "center"}}>
                <Text style={[styles.title, themeTextStyle]}>{item.title}</Text>
                <Text style={[styles.subtitle, themeTextStyle]}>{item.description}</Text>
            </View>
        </View>
    )
}

export default OnboardingItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    image: {
        // flex: 0.7,
        height: "50%",
        aspectRatio: 1,
        justifyContent: "center",
    },
    title: {
      fontSize: 32,
      fontWeight: "700",
      marginTop: 20,
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 16,
      fontWeight: "300",
    },
    lightThemeTextOnboarding: {
      color: Theme.wd1,
    },
    darkThemeTextOnboarding: {
      color: Theme.wd2,
    }
})