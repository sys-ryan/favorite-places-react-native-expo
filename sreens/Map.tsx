import React, { useCallback, useLayoutEffect, useState } from "react";
import MapView, { MapPressEvent, Marker, Region } from "react-native-maps";
import { Alert, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import IconButton from "../components/ui/IconButton";
import { RouteProp } from "@react-navigation/native";

interface MapProps {
  route: RouteProp<RootStackParamList, "Map">;
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

const Map = ({ route, navigation }: MapProps) => {
  const readOnly = route.params.readOnly;
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number | null;
    lng: number | null;
  }>({
    lat: readOnly ? route.params.lat! : null,
    lng: readOnly ? route.params.lng! : null,
  });

  const region: Region = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  function selectLocationHandler(event: MapPressEvent) {
    if (readOnly) {
      return;
    }

    const { latitude: lat, longitude: lng } = event.nativeEvent.coordinate;

    setSelectedLocation({
      lat,
      lng,
    });
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation.lng || !selectedLocation.lat) {
      Alert.alert(
        "No location selected",
        "Please select a location on the map",
        [{ text: "Okay" }],
      );
      return;
    }

    navigation.navigate("AddPlace", {
      lat: selectedLocation.lat,
      lng: selectedLocation.lng,
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) =>
        !readOnly && (
          <IconButton
            icon={"save"}
            size={24}
            color={tintColor}
            onPress={savePickedLocationHandler}
          />
        ),
    });
  }, [navigation, savePickedLocationHandler]);

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {selectedLocation.lat && selectedLocation.lng && (
        <Marker
          title={"Picked Location"}
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
          style={{}}
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
