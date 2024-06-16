import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import OutlinedButton from "../ui/OutlinedButton";
import { useImagePicker } from "../../hooks/useImagePicker";

interface ImagePickerProps {
  onTakeImage: (imageUri: string) => void;
}

const ImagePicker = ({ onTakeImage }: ImagePickerProps) => {
  const { pickedImage, takeImageHandler } = useImagePicker();

  useEffect(() => {
    if (pickedImage) {
      onTakeImage(pickedImage);
    }
  }, [pickedImage, onTakeImage]);

  let imagePreview = <Text>No image taken yet.</Text>;

  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton icon="camera" onPress={takeImageHandler}>
        Take Image
      </OutlinedButton>
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
