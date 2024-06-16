import { StyleSheet } from "react-native";
import { GeoLocation, Place } from "./models/place";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import AllPlaces from "./sreens/AllPlaces";
import AddPlace from "./sreens/AddPlace";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IconButton from "./components/ui/IconButton";
import { Colors } from "./constants/colors";
import Map from "./sreens/Map";
import { useCallback, useEffect, useState } from "react";
import { init } from "./util/database";
import * as SplashScreen from "expo-splash-screen";
import PlaceDetails from "./sreens/PlaceDetails";

SplashScreen.preventAutoHideAsync();

const dummy: Place[] = [
  // create random places data
  new Place(
    "Place 1",
    "https://plus.unsplash.com/premium_photo-1676139860076-bc568722ff75?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Address 1",
    new GeoLocation(1, 1),
  ),
  new Place(
    "Place 2",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=3648&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Address 2",
    new GeoLocation(2, 2),
  ),
  new Place(
    "Place 3",
    "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=3641&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Address 3",
    new GeoLocation(3, 3),
  ),
];

export type RootStackParamList = {
  AllPlaces: undefined;
  AddPlace: {
    lat?: number;
    lng?: number;
  };
  Map: {
    readOnly: boolean;
    lat?: number;
    lng?: number;
  };
  PlaceDetails: {
    placeId: string;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const initSQLite = async () => {
      try {
        await init();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    };

    initSQLite();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer onReady={onLayoutRootView}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.primary500,
            },
            headerTintColor: Colors.gray700,
            contentStyle: {
              backgroundColor: Colors.gray700,
            },
          }}
          // initialRouteName={"PlaceDetails"}
        >
          <Stack.Screen
            name={"AllPlaces"}
            component={AllPlaces}
            options={({ navigation }) => ({
              title: "All Places",
              headerRight: ({ tintColor }) => (
                <IconButton
                  size={24}
                  color={tintColor}
                  icon={"add"}
                  onPress={() => navigation.navigate("AddPlace")}
                />
              ),
            })}
          />
          <Stack.Screen
            name={"AddPlace"}
            component={AddPlace}
            options={{
              title: "Add a new Place",
            }}
          />
          <Stack.Screen name={"Map"} component={Map} />
          <Stack.Screen
            name={"PlaceDetails"}
            component={PlaceDetails}
            options={{
              title: "Loading Place...",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
