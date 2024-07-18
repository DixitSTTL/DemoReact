import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import Video, { VideoRef } from 'react-native-video';
import { images } from '../assets/images';


function VideoPlayerScreen({ route }) {

    const { url } = route.params


    useEffect(() => {

        console.log("vsvs" + { url })

    }, [])


    return (
        <View style={{ flex: 1, justifyContent: "center" }}>
            <Video
            // "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                source={{uri:url}} // Assuming the photo is a valid URI
                style={{ width: "100%", height: "100%", alignContent: "center", alignSelf: "center" }}
                onError={error=>{} }
                repeat={true}
                
            // Callback when remote video is buffering                                      
            />

        </View>
    );


}



export default VideoPlayerScreen;
