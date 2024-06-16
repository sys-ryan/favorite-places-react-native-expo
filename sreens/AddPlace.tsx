import React from "react";
import PlaceForm from "../components/places/PlaceForm";
import { Place } from "../models/place";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import { insertPlace } from "../util/database";

interface AddPlaceProps {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}

const AddPlace = ({ navigation }: AddPlaceProps) => {
  async function createPlaceHandler(place: Place) {
    await insertPlace(place);
    navigation.navigate("AllPlaces");
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
};

export default AddPlace;
