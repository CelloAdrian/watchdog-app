import { Alert, BackHandler } from "react-native";

const backAction = () => {
  Alert.alert(
    "Hold on!",
    "You haven't finished registering, are you sure you want to go exit?",
    [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      { text: "YES", onPress: () => BackHandler.exitApp() },
    ]
  );
  return true;
};

export default backAction;
