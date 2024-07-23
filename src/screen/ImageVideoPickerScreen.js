import React from 'react';
import { Button, PermissionsAndroid, StyleSheet, Text, ToastAndroid, useColorScheme, View } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { IMAGEPREVIEW, VIDEOPREVIEW } from '../constant';
import { darkModeColors, lightModeColors } from '../assets/colors/colors';
import { Platform } from 'react-native';

const OsVersion = Platform.Version;

function ImageVideoPickerScreen({ navigation }) {
    const colorTheme = useColorScheme();
    const color = colorTheme === 'dark' ? darkModeColors : lightModeColors;
    const styles = StyleSheet.create({

        maincontainer: {
            flex: 1,
        },

        button: {
            marginTop: 10,

        }

    })
    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,

            );
            console.log('granted', granted);
            if (granted === 'granted') {
                return true

            } else {
                notifyMessage("Camera permission not granted")
                return false

            }

        } catch (err) {
            return false
        }
    };
    const requestImagesPermission = async () => {

        if (OsVersion < 33) {
            return true
        }

        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,

            );
            console.log('granted', granted);
            if (granted === 'granted') {
                return true

            } else {
                notifyMessage("Read Images permission not granted")
                return false

            }
        } catch (err) {
            return false
        }
    };
    const requestVideoPermission = async () => {
        if (OsVersion < 33) {
            return true
        }

        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
            );
            console.log('granted', granted);
            if (granted === 'granted') {
                return true

            } else {
                notifyMessage("Read Videos permission not granted")
                return false

            }
        } catch (err) {
            return false
        }
    };



    const handleImageResponse = (response) => {
        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.error) {
            console.log('Image picker error: ', response.error);
        } else {
            let imageUri = response.uri || response.assets?.[0]?.uri;
            navigation.navigate(IMAGEPREVIEW, { url: imageUri })

        }
    };

    const handleVideoResponse = (response) => {

        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.error) {
            console.log('Image picker error: ', response.error);
        } else {
            let imageUri = response.uri || response.assets?.[0]?.uri;
            navigation.navigate(VIDEOPREVIEW, { url: imageUri })

        }


    };

    const captureImage = async () => {
        const result = await requestCameraPermission();
        if (result) {
            const options = {
                mediaType: 'photo',
                includeBase64: false,
                maxHeight: 2000,
                maxWidth: 2000,
            };

            launchCamera(options, handleImageResponse);
        };

    };

    const selectImage = async () => {
        const result = await requestImagesPermission();
        if (result) {

            const options = {
                mediaType: 'photo',
                includeBase64: false,
                maxHeight: 2000,
                maxWidth: 2000,
            };

            launchImageLibrary(options, handleImageResponse);
        };

    };

    const recordVideo = async () => {

        const result = await requestCameraPermission();
        if (result) {
            const options = {
                mediaType: 'video',
                includeBase64: false,
                maxHeight: 2000,
                maxWidth: 2000,
            };

            launchCamera(options, handleVideoResponse);
        };

    };

    const selectVideo = async () => {
        const result = await requestVideoPermission();
        if (result) {
            const options = {
                mediaType: 'video',
                includeBase64: false,
                maxHeight: 2000,
                maxWidth: 2000,
            };

            launchImageLibrary(options, handleVideoResponse);
        };

    };


    function notifyMessage(msg) {
        if (Platform.OS === 'android') {
            ToastAndroid.show(msg, ToastAndroid.SHORT)
        } else {
            AlertIOS.alert(msg);
        }
    }
    return (
        <View style={{ flex: 1, }}>
            <View style={{ padding: 20, flex: 1, flexDirection: "column" }}>
                <View height={10}></View>
                <Text style={{ fontSize: 16, fontWeight: 500, color: color.whiteblackreverse }}>Image</Text>
                <View height={10}></View>

                <Button
                    title='Capture Image'
                    onPress={() => {

                        captureImage()
                    }}
                    style={styles.button}
                ></Button>

                <View height={10}></View>

                <Button
                    title='Select Image From Gallary'
                    style={styles.button}
                    onPress={() => {

                        selectImage()
                    }}
                ></Button>

                <View height={40}></View>
                <Text style={{ fontSize: 16, fontWeight: 500, color: color.whiteblackreverse }}>Video</Text>
                <View height={10}></View>

                <Button
                    title='Record Video'
                    style={styles.button}
                    onPress={() => {

                        recordVideo()
                    }}
                ></Button>
                <View height={10}></View>



                <Button
                    title='Select Video'
                    style={styles.button}
                    onPress={() => {

                        selectVideo()
                    }}
                ></Button>
            </View>



        </View>
    );


}



export default ImageVideoPickerScreen;
