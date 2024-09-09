import React from 'react';
import { CAMERA, DASHBOARD, DATETIMEPICKER, FILEPICKER, IMAGEPREVIEW, IMAGEVIDEOPICKER, LIGHTDARKMODE, MAP, MULTILANGUAGE, REDUX, REDUXLIST, VIDEOPREVIEW, ANIMATIONSCREEN, ANIMATIONSCREEN2, GYROSCOPESCREEN, CONTINENTSLISTSCREEN } from '../constant';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../screen/DashboardScreen';
import MapScreen from '../screen/MapScreen';
import FilePickerScreen from '../screen/FilePickerScreen';
import CameraScreen from '../screen/CameraScreen';
import ImagePreviewScreen from '../screen/ImagePreviewScreen';
import VideoPlayerScreen from '../screen/VideoPlayerScreen';
import DatePickerScreen from '../screen/DatePickerScreen';
import MultiLanguageScreen from '../screen/MultiLanguageScreen';
import ImageVideoPickerScreen from '../screen/ImageVideoPickerScreen';
import DarkModeScreen from '../screen/DarkModeScreen';
import ReduxScreen from '../screen/ReduxScreen';
import ReduxListScreen from '../screen/ReduxListScreen';
import AnimationScreen from '../screen/AnimationScreen';
import AnimationScreen2 from '../screen/AnimationScreen2';
import GyroscopScreen from '../screen/GyroscopScreen';
import ContinentsListScreen from '../screen/ContinentsListScreen';


export default function MainNavigator() {
  const Stack = createNativeStackNavigator();

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
        name={IMAGEVIDEOPICKER}
        component={ImageVideoPickerScreen}
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

      <Stack.Screen
        options={{
          headerShown: true,
        }}
        name={DATETIMEPICKER}
        component={DatePickerScreen}
      />

      <Stack.Screen
        options={{
          headerShown: true,
        }}
        name={MULTILANGUAGE}
        component={MultiLanguageScreen}
      />

      <Stack.Screen
        options={{
          headerShown: true,
        }}
        name={LIGHTDARKMODE}
        component={DarkModeScreen}
      />

      <Stack.Screen
        options={{
          headerShown: true,
        }}
        name={REDUX}
        component={ReduxScreen}
      />

      <Stack.Screen
        options={{
          headerShown: true,
        }}
        name={REDUXLIST}
        component={ReduxListScreen}
      />

      <Stack.Screen
        options={{
          headerShown: true,
        }}
        name={CONTINENTSLISTSCREEN}
        component={ContinentsListScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          animation:"fade",
        }}
        name={ANIMATIONSCREEN}
        component={AnimationScreen}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          animation:"fade"
        }}
        name={ANIMATIONSCREEN2}
        component={AnimationScreen2}
      />
      <Stack.Screen
        options={{
          headerShown: true,
          animation:"fade"
        }}
        name={GYROSCOPESCREEN}
        component={GyroscopScreen}
      />

    </Stack.Navigator>
  );
}
