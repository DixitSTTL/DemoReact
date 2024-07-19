
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Text, View, Button, Image, PermissionsAndroid, GestureResponderEvent, StyleSheet } from 'react-native';
import { PinchGestureHandler, TapGestureHandler, TouchableOpacity } from 'react-native-gesture-handler';
import { Camera, CameraProps, useCameraDevice } from 'react-native-vision-camera';
import { images } from '../assets/images';
import Reanimated, { Extrapolate, interpolate, useAnimatedGestureHandler, useAnimatedProps, useSharedValue } from 'react-native-reanimated';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { IMAGEPREVIEW, VIDEOPREVIEW } from '../constant';
import type { PinchGestureHandlerGestureEvent } from 'react-native-gesture-handler'
import { MAX_ZOOM_FACTOR } from '../constant/Constatnts';

const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera)

function CameraScreen({ navigation }: any) {



  const [cameraPermission, setCameraPermission] = useState(false);
  const [cameraType, setCameraType] = useState("back");
  const device = useCameraDevice(cameraType); // Set the initial camera device
  const camera = useRef<Camera>(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isPhoto, setPhotoVideo] = useState(true);
  const [isRecoding, setRecoding] = useState(false);
  const zoom = useSharedValue(1)

  const minZoom = device?.minZoom ?? 1
  const maxZoom = Math.min(device?.maxZoom ?? 1, MAX_ZOOM_FACTOR)

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,

      );
      console.log('granted', granted);
      if (granted === 'granted') {
        setCameraPermission(true);

      } else {
        setCameraPermission(false);

      }
    } catch (err) {
    }
  };
  useEffect(() => {
    requestLocationPermission();
  }, []);


  // if (cameraPermission === null) {
  //   return <Text>Checking camera permission...</Text>;
  // } else if (!cameraPermission) {
  //   return <Text>Camera permission not granted</Text>;
  // }

  // if (!device) {
  //   return <Text>No camera device available</Text>;
  // }


  async function takeTake() {

    if (isPhoto) {
      try {
        if (!camera.current) {
          console.log('Camera reference not available.', camera);
          return;
        }

        const photo = await camera.current.takePhoto();
        console.log(photo);

        if (photo) {

          navigation.navigate(IMAGEPREVIEW, { url: `file://${photo.path}` })
          // setCapturedPhoto(`file://${photo.path}`);
          // setShowPreview(true);
        } else {
          console.log('Photo captured is undefined or empty.');
        }
      } catch (error) {
        console.log('Error capturing photo:', error);
      }
    }
    else {

      try {
        if (!camera.current) {
          console.log('Camera reference not available.', camera);
          return;
        }

        if (!isRecoding) {
          console.log('setRecoding', true);

          setRecoding(true)
          await camera.current.startRecording({
            onRecordingFinished: (video) => {
              setRecoding(false)
              console.log('setRecoding', `file://${video.path}`);

              navigation.navigate(VIDEOPREVIEW, { url: `file://${video.path}` })
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
        console.log('Error capturing video:', error);
      }

    }

  };

  const cameraAnimatedProps = useAnimatedProps<CameraProps>(() => {
    const z = Math.max(Math.min(zoom.value, maxZoom), minZoom)
    return {
      zoom: z,
    }
  }, [maxZoom, minZoom, zoom])

  const confirmPhoto = () => {
    // User confirmed, further actions with the captured photo
    // For example, save the photo to storage, etc.
    console.log('Photo confirmed:', capturedPhoto);
    setShowPreview(false); // Hide the preview after confirmation
  };



  const onCameraReady = (ref) => {
    // Camera component is ready, set the camera reference
    camera.current = ref;// Reference to the Camera component (e.g., obtained from ref prop)
  };
  //#region Pinch to Zoom Gesture
  // The gesture handler maps the linear pinch gesture (0 - 1) to an exponential curve since a camera's zoom
  // function does not appear linear to the user. (aka zoom 0.1 -> 0.2 does not look equal in difference as 0.8 -> 0.9)
  const onPinchGesture = useAnimatedGestureHandler<PinchGestureHandlerGestureEvent, { startZoom?: number }>({
    onStart: (_, context) => {
      context.startZoom = zoom.value
    },
    onActive: (event, context) => {
      // we're trying to map the scale gesture to a linear zoom here
      const startZoom = context.startZoom ?? 0
      const scale = interpolate(event.scale, [1 - 1 / 3, 1, 3], [-1, 0, 1], Extrapolate.CLAMP)
      zoom.value = interpolate(scale, [-1, 0, 1], [minZoom, startZoom, maxZoom], Extrapolate.CLAMP)
    },
  })

  const onFocusTap = useCallback(
    ({ nativeEvent: event }: GestureResponderEvent) => {
      if (!device?.supportsFocus) return
      camera.current?.focus({
        x: event.locationX,
        y: event.locationY,
      })
    },
    [device?.supportsFocus],
  )

  const onFlipCameraPressed = useCallback(() => {
  
    setCameraType((p) => (p === 'back' ? 'front' : 'back'))

  }, [])


  const onDoubleTap = useCallback(() => {
    onFlipCameraPressed()
    
  }, [onFlipCameraPressed])
  //#endregion


  return (
    <View style={{ flex: 1 }}>
      <PinchGestureHandler onGestureEvent={onPinchGesture} enabled={true}>
        <Reanimated.View onTouchEnd={onFocusTap} style={StyleSheet.absoluteFill}>
          <TapGestureHandler onEnded={onDoubleTap} numberOfTaps={2}>

            <View style={{ flex: 1 }} >
              <ReanimatedCamera
                style={{ flex: 1 }}
                device={device}
                isActive={true}
                ref={ref => onCameraReady(ref)}
                animatedProps={cameraAnimatedProps}
                photo={true}
                video={true}
              />




              <View style={{ left: 0, right: 0, flexDirection: 'row', alignItems: "center", justifyContent: 'space-evenly', position: "absolute", alignSelf: "center", bottom: 0, marginBottom: 50 }}>
                <TouchableOpacity  onPress={() => {

                  if (cameraType == "back") {
                    setCameraType("front")

                  }
                  else {
                    setCameraType("back")

                  }
                }
                }>
                  <Image source={images.camera_flip} style={{ height: 36, width: 36, resizeMode: "center" }} />

                </TouchableOpacity>

                <TouchableOpacity  onPress={takeTake}>
                  <Image source={isRecoding ? images.ic_stop : images.ic_shutter} style={{ height: 60, width: 60 }} />

                </TouchableOpacity>

                <TouchableOpacity onPress={() => { setPhotoVideo(!isPhoto) }}>
                  <Image source={isPhoto ? images.ic_video : images.ic_camera} style={{ height: 36, width: 36, resizeMode: "center" }} />

                </TouchableOpacity>
              </View>
            </View>

          </TapGestureHandler>
        </Reanimated.View>
      </PinchGestureHandler>


    </View>
  );



}



export default CameraScreen;
