
import React, { useEffect, useState, useRef } from 'react';
import { Text, View, Button, Image, PermissionsAndroid } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Camera, useCameraDevice, useCameraDevices } from 'react-native-vision-camera';
import { images } from '../assets/images';
import Reanimated, { useAnimatedGestureHandler } from 'react-native-reanimated';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { IMAGEPREVIEW, VIDEOPREVIEW } from '../constant';

const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera)

function CameraScreen({navigation}) {
  let _navigator;

  const [cameraPermission, setCameraPermission] = useState(null);
  const [cameraType, setCameraType] = useState("back");
  const device = useCameraDevice(cameraType); // Set the initial camera device
  const camera = useRef(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isPhoto, setPhotoVideo] = useState(true);
  const [isRecoding, setRecoding] = useState(false);


  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        
      );
      console.log('granted', granted);
      if (granted === 'granted') {
        console.log('You can use Camera');
        setCameraPermission(true);

        return true;
      } else {
        console.log('You cannot use Camera');
        setCameraPermission(false);

        return false;
      }
    } catch (err) {
      return false;
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  if (cameraPermission === null) {
    return <Text>Checking camera permission...</Text>;
  } else if (!cameraPermission) {
    return <Text>Camera permission not granted</Text>;
  }

  if (!device) {
    return <Text>No camera device available</Text>;
  }


  async function takeTake() {

    if (isPhoto) {
      try {
        if (!camera.current) {
          console.error('Camera reference not available.', camera);
          return;
        }

        const photo = await camera.current.takePhoto();
        console.log(photo);

        if (photo) {

          navigation.navigate(IMAGEPREVIEW,{url:`file://${photo.path}`})
          // setCapturedPhoto(`file://${photo.path}`);
          // setShowPreview(true);
        } else {
          console.error('Photo captured is undefined or empty.');
        }
      } catch (error) {
        console.error('Error capturing photo:', error);
      }
    }
    else {

      try {
        if (!camera.current) {
          console.error('Camera reference not available.', camera);
          return;
        }

        if (!isRecoding) {
          console.log('setRecoding', true);

          setRecoding(true)
           await camera.current.startRecording({
            onRecordingFinished: (video) => {
              setRecoding(false)
              console.log('setRecoding', `file://${video.path}`);

              navigation.navigate(VIDEOPREVIEW,{url:`file://${video.path}`})
              // const path = video.path
              // CameraRoll.save(`file://${path}`, {
              //   type: 'video',
              // })
            },
            onRecordingError: (error) => setRecoding(false),
          })
        }
        else {
          console.log('setRecoding', false);
          await camera.current.stopRecording()

        }


      } catch (error) {
        console.error('Error capturing video:', error);
      }

    }

  };


  const confirmPhoto = () => {
    // User confirmed, further actions with the captured photo
    // For example, save the photo to storage, etc.
    console.log('Photo confirmed:', capturedPhoto);
    setShowPreview(false); // Hide the preview after confirmation
  };

  const retakePhoto = () => {
    // User wants to retake the photo
    setCapturedPhoto(null); // Clear the captured photo
    setShowPreview(false); // Hide the preview
  };

  const onCameraReady = (ref) => {
    // Camera component is ready, set the camera reference
    camera.current = ref;// Reference to the Camera component (e.g., obtained from ref prop)
  };


  return (
    <View style={{ flex: 1 }}>

      <ReanimatedCamera
        style={{ flex: 1 }}
        device={device}
        isActive={true}
        ref={ref => onCameraReady(ref)}
        photo={true}
        video={true}
      />



      {showPreview && capturedPhoto ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={{ uri: capturedPhoto }} // Assuming the photo is a valid URI
            style={{ width: 300, height: 300, marginBottom: 20 }}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button title="Retake" onPress={retakePhoto} />
            <Button title="Confirm" onPress={confirmPhoto} />
          </View>
        </View>
      ) : (
        <View style={{ left: 0, right: 0, flexDirection: 'row', alignItems: "center", justifyContent: 'space-evenly', position: "absolute", alignSelf: "center", bottom: 0, marginBottom: 50 }}>
          <TouchableOpacity title="Take Photo" onPress={() => {

            if (cameraType == "back") {
              setCameraType("front")

            }
            else {
              setCameraType("back")

            }
          }
          }>
            <Image source={images.camera_flip} style={{ height: 36, width: 36,resizeMode: "center"  }} />

          </TouchableOpacity>

          <TouchableOpacity title="Take Photo" onPress={takeTake}>
            <Image source={isRecoding ? images.ic_stop : images.ic_shutter} style={{ height: 60, width: 60 }} />

          </TouchableOpacity>

          <TouchableOpacity title="Take Photo" onPress={() => { setPhotoVideo(!isPhoto) }}>
            <Image source={isPhoto ? images.ic_video : images.ic_camera} style={{ height: 36, width: 36, resizeMode: "center" }} />

          </TouchableOpacity>
        </View>

      )}

    </View>
  );



}



export default CameraScreen;
