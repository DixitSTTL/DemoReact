import React from 'react';
import { CAMERA, DASHBOARD, FILEPICKER, IMAGEPREVIEW, MAP, PREVIEW, VIDEOPREVIEW } from '../constant';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from '../screen/DashboardScreen';
import MapScreen from '../screen/MapScreen';
import FilePickerScreen from '../screen/FilePickerScreen';
import CameraScreen from '../screen/CameraScreen';
import ImagePreviewScreen from '../screen/ImagePreviewScreen';
import VideoPlayerScreen from '../screen/VideoPlayerScreen';


export default function MainNavigator() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName={DASHBOARD}>
      <Stack.Screen
        options={{
          headerShown: true,
        }}
        name={DASHBOARD}
        component={DashboardScreen}
      />

      <Stack.Screen
        options={{
          headerShown: true,
        }}
        name={MAP}
        component={MapScreen}
      />

      <Stack.Screen
        options={{
          headerShown: true,
        }}
        name={FILEPICKER}
        component={FilePickerScreen}
      />

      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={CAMERA}
        component={CameraScreen}
      />

      <Stack.Screen
        options={{
          headerShown: true,
        }}
        name={IMAGEPREVIEW}
        component={ImagePreviewScreen}
      />

      <Stack.Screen
        options={{
          headerShown: true,
        }}
        name={VIDEOPREVIEW}
        component={VideoPlayerScreen}
      />

    </Stack.Navigator>
  );
}