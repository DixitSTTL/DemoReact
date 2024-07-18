import React, { useEffect, useState, useRef } from 'react';
import { Button, PermissionsAndroid, StyleSheet, Text, View } from 'react-native';
import MapView, { Polyline, Marker, } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { colors } from '../assets/colors/colors';

const styles = StyleSheet.create({

    text: { color: colors.black,    },

    view: { backgroundColor: colors.white, padding: 3, margin: 10, position: "absolute" },
});

function MapScreen() {
    const [location, setLocation] = useState(false);
    const [response, setResponse] = useState(false);
    const mapRef = useRef(null);

    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Geolocation Permission',
                    message: 'Can we access your location?',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            console.log('granted', granted);
            if (granted === 'granted') {
                console.log('You can use Geolocation');
                return true;
            } else {
                console.log('You cannot use Geolocation');
                return false;
            }
        } catch (err) {
            return false;
        }
    };

    const getLocation = () => {
        const result = requestLocationPermission();
        result.then(res => {
            console.log('res is:', res);
            if (res) {
                Geolocation.getCurrentPosition(
                    position => {
                        console.log(position);

                        setLocation({ latitude: position?.coords?.latitude, longitude: position?.coords?.longitude });
                        setResponse(position.coords);
                    },
                    error => {
                        // See error code charts below.
                        console.log(error.code, error.message);
                        setLocation(false);
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
                );
            }
        });
        console.log(location);
    };

    const goToMyLocation = () => {
        //Animate the user to new region. Complete this animation in 3 seconds
        mapRef.current.animateToRegion(location, 3 * 1000);

    };


    useEffect(() => {

        getLocation()
    }, [])

    useEffect(() => {

        goToMyLocation()
    }, [location])

    return (
        <View>


            <MapView
                style={{ width: '100%', height: '100%' }}
                ref={mapRef}
                initialRegion={{ latitude: 21.536622499593086, longitude: 79.58083321868338, latitudeDelta: 30, longitudeDelta: 30, }}>

                {/* {markers && markers.map((marker: any, index: number) => (
                    <Marker
                        key={index}
                        coordinate={{ latitude: marker.latitude, longitude: marker.longitude, }}
                        pinColor={"purple"}
                    >

                        {marker.type == "Substation" && <IcnSubstations />}
                        {marker.type == "Feeder" && <IcnFeeder />}
                        {marker.type == "DTR" && <IcnDTR1 />}
                        {marker.type == "Pole" && <IcnPole />}
                        {marker.type == "Branch" && <IcnPowerTransformers />}
                    </Marker>
                ))} */}
                {location ? (
                    <>
                        <Marker
                            draggable
                            title='My Location'
                            coordinate={location}
                            pinColor={"red"}
                            onDragEnd={
                                (e) => setLocation(e.nativeEvent.coordinate)
                            }
                        />


                    </>

                ) : (<></>)}


            </MapView>

            <View style={styles.view}>
                <Text style={styles.text}>latitude :{response.latitude}</Text>
                <Text style={styles.text}>longitude :{response.longitude}</Text>
                <Text style={styles.text}>accuracy :{response.accuracy}</Text>
                <Text style={styles.text}>speed :{response.speed}</Text>
                <Text style={styles.text}>altitude :{response.altitude}</Text>
                <Text style={styles.text}>altitudeAccuracy :{response.altitudeAccuracy}</Text>
                <Text style={styles.text}>heading :{response.heading}</Text>

            </View>

        </View>
    );


}



export default MapScreen;
