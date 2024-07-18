import React, { useEffect } from 'react';
import { Image, View } from 'react-native';


function ImagePreviewScreen({route}) {

const{url} = route.params

useEffect(()=>{

console.log("vsvs"+{url})

},[])

    return (
        <View style={{flex:1, justifyContent:"center"}}>
            <Image
                source={{ uri: url }} // Assuming the photo is a valid URI
                style={{ width: "100%", height: "100%",alignContent:"center",resizeMode:"center", alignSelf:"center"}}
            />

        </View>
    );


}



export default ImagePreviewScreen;
