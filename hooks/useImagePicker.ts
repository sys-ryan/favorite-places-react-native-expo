import { useCallback, useState } from "react";
import {
  launchCameraAsync,
  PermissionStatus,
  useCameraPermissions,
} from "expo-image-picker";
import { Alert, Linking } from "react-native";

export const useImagePicker = () => {
  const [pickedImage, setPickedImage] = useState<string | null>(null);
  const [cameraPermissionInformation, requestCameraPermission] =
    useCameraPermissions();

  const openAppSettings = useCallback(async () => {
    await Linking.openSettings();
  }, []);

  const takeImageHandler = useCallback(async () => {
    console.log(cameraPermissionInformation);
    if (cameraPermissionInformation?.status !== PermissionStatus.GRANTED) {
      const { status } = await requestCameraPermission();
      if (status !== PermissionStatus.GRANTED) {
        Alert.alert(
          "Insufficient permissions!",
          "You need to grant camera permissions to use this app.",
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

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    if (!image.canceled) {
      setPickedImage(image.assets![0].uri);
    }
  }, [cameraPermissionInformation, requestCameraPermission, openAppSettings]);

  return {
    pickedImage,
    takeImageHandler,
  };
};
