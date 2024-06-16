import {
  getCurrentPositionAsync,
  PermissionStatus,
  useForegroundPermissions,
} from "expo-location";
import { useCallback, useEffect, useState } from "react";
import { GeoLocation } from "../models/place";
import {
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { getAddress } from "../util/location";
import { Alert, Linking } from "react-native";

export const useLocation = () => {
  const [locationPermissionInformation, requestLocationPermission] =
    useForegroundPermissions();
  const [pickedLocation, setPickedLocation] = useState<GeoLocation | null>(
    null,
  );
  const [address, setAddress] = useState<string>("");

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, "Map">>();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = route.params && {
        lat: route.params.lat,
        lng: route.params.lng,
      };

      setPickedLocation(
        new GeoLocation(mapPickedLocation.lat!, mapPickedLocation.lng!),
      );
    }
  }, [route, isFocused]);

  useEffect(() => {
    async function handleLocation() {
      if (pickedLocation) {
        const fetchedAddress = await getAddress(
          pickedLocation.lat,
          pickedLocation.lng,
        );
        setAddress(fetchedAddress);
      }
    }

    handleLocation();
  }, [pickedLocation]);

  const openAppSettings = useCallback(async () => {
    await Linking.openSettings();
  }, []);

  const getLocationHandler = useCallback(async () => {
    console.log("Getting location");
    if (locationPermissionInformation?.status !== PermissionStatus.GRANTED) {
      const { status } = await requestLocationPermission();
      console.log(status);

      if (status !== PermissionStatus.GRANTED) {
        Alert.alert(
          "Insufficient permissions!",
          "You need to grant location permissions to use this app.",
          [
            { text: "Okay" },
            {
              text: "Open Settings",
              style: "destructive",
              onPress: openAppSettings,
            },
          ],
        );
        return;
      }
    }

    const location = await getCurrentPositionAsync({});

    const geoLocation = new GeoLocation(
      location.coords.latitude,
      location.coords.longitude,
    );

    setPickedLocation(geoLocation);
  }, [navigation, pickedLocation]);

  const pickOnMapHandler = useCallback(() => {
    navigation.navigate("Map", {
      readOnly: false,
      lat: pickedLocation?.lat,
      lng: pickedLocation?.lng,
    });
  }, [navigation, pickedLocation]);

  return {
    pickedLocation,
    address,
    getLocationHandler,
    pickOnMapHandler,
  };
};
