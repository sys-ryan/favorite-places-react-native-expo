import { GeoLocation, Place } from "../models/place";
import { useCallback, useState } from "react";
import { Alert } from "react-native";

interface LocationInfo {
  lat?: number;
  lng?: number;
  address?: string;
}

interface usePlaceFormProps {
  onCreatePlace: (place: Place) => void;
}

export const usePlaceForm = ({ onCreatePlace }: usePlaceFormProps) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<LocationInfo>({});

  function changeTitleHandler(enteredTitle: string) {
    setEnteredTitle(enteredTitle);
  }

  const takeImageHandler = useCallback((imageUri: string) => {
    setSelectedImage(imageUri);
  }, []);

  const pickLocationHandler = useCallback(
    (location: GeoLocation, address: string) => {
      setSelectedLocation({
        lat: location.lat,
        lng: location.lng,
        address: address,
      });
    },
    [],
  );

  const savePlaceHandler = useCallback(() => {
    console.log(enteredTitle);
    console.log(selectedImage);
    console.log(selectedLocation);
    if (!enteredTitle || !selectedImage) {
      Alert.alert(
        "Missing Information",
        "Please fill in all fields before saving the place.",
        [{ text: "OK" }],
      );
      return;
    }

    if (!selectedLocation.lat || !selectedLocation.lng) {
      Alert.alert(
        "Missing Location",
        "Please pick a location on the map before saving the place.",
        [{ text: "OK" }],
      );
      return;
    }

    if (!selectedLocation.address) {
      Alert.alert(
        "Address not found",
        "Could not find the address of the selected location. Please try again.",
        [{ text: "OK" }],
      );
      return;
    }

    onCreatePlace(
      new Place(
        enteredTitle,
        selectedImage!,
        selectedLocation.address!,
        new GeoLocation(selectedLocation.lat!, selectedLocation.lng!),
      ),
    );
  }, [enteredTitle, selectedImage, selectedLocation, onCreatePlace]);

  return {
    enteredTitle,
    selectedImage,
    selectedLocation,
    changeTitleHandler,
    takeImageHandler,
    pickLocationHandler,
    savePlaceHandler,
  };
};
