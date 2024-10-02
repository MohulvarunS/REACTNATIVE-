import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';

const CameraComponent = () => {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await RNCamera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />; // Await permission determination
  }
  if (hasPermission === false) {
    return <Text>No camera permission granted.</Text>;
  }

  // Camera component rendering logic goes here
  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back} // Change to RNCamera.Constants.Type.front for front camera
        flashMode={RNCamera.Constants.FlashMode.off} // Adjust flash mode as needed
        androidCameraPermissionOptions={{
          title: 'Camera Permission',
          message: 'We need access to your camera to use this feature.',
          buttonPositive: 'Grant Permission',
          buttonNegative: 'Cancel',
        }}
      />
      <Button title="Take Picture" onPress={() => { /* Handle take picture logic */ }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default CameraComponent;
