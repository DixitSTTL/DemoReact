import React, { useEffect, useState, useRef } from 'react';
import { PermissionsAndroid, StyleSheet, Text, View, useColorScheme } from 'react-native';
import MapView, { Polyline, Marker, } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { darkModeColors, lightModeColors } from '../assets/colors/colors';


function MapScreen() {
    const [location, setLocation] = useState(false);
    const [pinLocation, setPinLocation] = useState(false);
    const [response, setResponse] = useState(false);
    const [distance, setDistance] = useState(0);
    const colorTheme = useColorScheme();
    const color = colorTheme === 'dark' ? darkModeColors : lightModeColors;
    const mapRef = useRef(null);

    const styles = StyleSheet.create({

        text: { color: color.whiteblackreverse, },
        distance_text: { color: color.whiteblackreverse, fontSize: 20 },

        view: { backgroundColor: color.whiteblack, padding: 3, margin: 10, position: "absolute" },
    });
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

    const countKilomiters = () => {

        var radlat1 = Math.PI * location.latitude / 180
        var radlat2 = Math.PI * pinLocation.latitude / 180
        var theta = location.longitude - pinLocation.longitude
        var radtheta = Math.PI * theta / 180
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        dist = Math.acos(dist)
        dist = dist * 180 / Math.PI
        dist = dist * 60 * 1.1515
        dist = dist * 1.609344
        // if (unit=="K") { dist = dist * 1.609344 }
        // if (unit=="M") { dist = dist * 0.8684 }
        setDistance(dist)
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
                        setPinLocation({ latitude: position?.coords?.latitude, longitude: position?.coords?.longitude });
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

        countKilomiters()
    }, [pinLocation])

    useEffect(() => {

        goToMyLocation()
    }, [location])

    return (
        <View>


            <MapView
                style={{ width: '100%', height: '100%' }}
                ref={mapRef}
                showsUserLocation={true}
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
                {location && pinLocation &&
                    <>

                        <Marker
                            draggable
                            title='My Location'
                            coordinate={location}
                            pinColor={"red"}
                            onDrag={
                                (e) => setPinLocation(e.nativeEvent.coordinate)
                            }
                        // onDragEnd={
                        //     (e) => setPinLocation(e.nativeEvent.coordinate)
                        // }
                        />
                        <Polyline

                            coordinates={[
                                { latitude: location.latitude, longitude: location.longitude, },
                                { latitude: pinLocation.latitude, longitude: pinLocation.longitude, },

                            ]} />
                    </>

                }




            </MapView>

            <View style={styles.view}>
                <Text style={styles.text}>latitude :{response.latitude}</Text>
                <Text style={styles.text}>longitude :{response.longitude}</Text>

                <View height={10} />
                <Text style={styles.text}>Pin latitude :{pinLocation.latitude}</Text>
                <Text style={styles.text}>Pin longitude :{pinLocation.longitude}</Text>

                <View height={10} />
                <Text style={styles.text}>accuracy :{response.accuracy}</Text>
                <Text style={styles.text}>speed :{response.speed}</Text>
                <Text style={styles.text}>altitude :{response.altitude}</Text>
                <Text style={styles.text}>altitudeAccuracy :{response.altitudeAccuracy}</Text>
                <Text style={styles.text}>heading :{response.heading}</Text>

                <Text style={styles.distance_text}>Distance :{distance.toFixed(3)}Km</Text>

            </View>

        </View >
    );


}



export default MapScreen;
