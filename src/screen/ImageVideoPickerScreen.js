import React, { useEffect, useRef, useState } from 'react';
import { Button, PermissionsAndroid, StyleSheet, Text, ToastAndroid, useColorScheme, View } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { IMAGEPREVIEW, VIDEOPREVIEW } from '../constant';
import { darkModeColors, lightModeColors } from '../assets/colors/colors';


function ImageVideoPickerScreen({ navigation }) {
    const colorTheme = useColorScheme();
    const color = colorTheme === 'dark' ? darkModeColors : lightModeColors;
    const [cameraPermission, setCameraPermission] = useState(false);
    const [readStoragePermission, setStoragePermission] = useState(false);
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
                setCameraPermission(true);

            } else {
                setCameraPermission(false);

            }
        } catch (err) {
        }
    };

    const requestStoragePermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,

            );
            console.log('granted', granted);
            if (granted === 'granted') {
                setStoragePermission(true);

            } else {
                setStoragePermission(false);

            }
        } catch (err) {
        }
    };


    useEffect(() => {
        requestCameraPermission();
        // requestStoragePermission();
    }, []);

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

    const captureImage = () => {
        if (cameraPermission) {
            const options = {
                mediaType: 'photo',
                includeBase64: false,
                maxHeight: 2000,
                maxWidth: 2000,
            };

            launchCamera(options, handleImageResponse);
        }
        else {
            notifyMessage("Camera permission not granted")
        }
    };

    const selectImage = () => {
        // if (readStoragePermission) {

            const options = {
                mediaType: 'photo',
                includeBase64: false,
                maxHeight: 2000,
                maxWidth: 2000,
            };

            launchImageLibrary(options, handleImageResponse);
        // }
        // else {
        //     notifyMessage("Camera permission not granted")
        // }
    };

    const recordVideo = () => {
        if (cameraPermission) {

            const options = {
                mediaType: 'video',
                includeBase64: false,
                maxHeight: 2000,
                maxWidth: 2000,
            };

            launchCamera(options, handleVideoResponse);
        }
        else {
            notifyMessage("Camera permission not granted")
        }
    };

    const selectVideo = () => {
        // if (readStoragePermission) {

            const options = {
                mediaType: 'video',
                includeBase64: false,
                maxHeight: 2000,
                maxWidth: 2000,
            };

            launchImageLibrary(options, handleVideoResponse);
        // }
        // else {
        //     notifyMessage("Camera permission not granted")
        // }
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
