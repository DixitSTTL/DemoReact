import React, { useCallback, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { fonts } from '../assets/fonts/fonts';
import { IMAGEPREVIEW, VIDEOPREVIEW } from '../constant';
import { TouchableOpacity } from 'react-native-gesture-handler';

const styles = StyleSheet.create({

    maincontainer: {
        flex: 1,
    },

    text: {
        fontSize: 16,
        paddingVertical: 3
    },

    button: {
        borderRadius: 10,
        backgroundColor: "skyblue",
        fontSize: 16,
        textAlign: "center",
        paddingVertical: 3
    }

})

function FilePickerScreen({ navigation }) {

    const [fileResponse, setFileResponse] = useState([]);

    const handleDocumentSelection = useCallback(async () => {
        try {
            const response = await DocumentPicker.pick({
                presentationStyle: 'fullScreen',
                mode: "open",
            });

            setFileResponse(response);
        } catch (err) {
            console.warn(err);
        }
    }, []);

    function viewFile(file){
        try {

            console.log(file);
        
                switch (file.type) {

                    case "image/png":
                    case "image/jpg":
                    case "image/jpeg":
                    case "image/*":

                        navigation.navigate(IMAGEPREVIEW, { url: file.uri })

                        break;

                    case "video/x-matroska":
                    case "video/mp4":

                        navigation.navigate(VIDEOPREVIEW, { url: file.uri })

                        break;

                    default:
                        break;
                }


        

        } catch (err) {
            console.warn(err);
        }
    };


    return (
        <View style={styles.maincontainer}>

            <View style={{ padding: 20 }}>

                <TouchableOpacity onPress={handleDocumentSelection}>

                    <Text
                        style={[styles.button, {paddingVertical:8  }]}
                        numberOfLines={1}
                    >Select</Text>
                </TouchableOpacity>


                <View style={{ paddingTop: 50 }}>
                    {fileResponse.map((file, index) => (
                        <>
                            <Text
                                style={styles.text}>
                                name:  {file?.name}
                            </Text>


                            <Text
                                style={styles.text}>
                                uri:  {file?.uri}
                            </Text>

                            <Text
                                style={styles.text}>
                                size:  {file?.size}
                            </Text>

                            <Text
                                style={styles.text}>
                                type:  {file?.type}
                            </Text>

                            <TouchableOpacity onPress={()=>{viewFile(file)}} style={{paddingTop:12}}>

                                <Text
                                    key={index.toString()}
                                    style={[styles.button, { width: 100 ,paddingVertical:6}]}
                                    numberOfLines={1}
                                >view</Text>
                            </TouchableOpacity>

                        </>

                    ))}
                </View>


            </View>

        </View>
    );


}



export default FilePickerScreen;
