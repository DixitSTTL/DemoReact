import React from 'react';
import { View, Button } from 'react-native';
import { ANIMATIONSCREEN, CAMERA, CONTINENTSLISTSCREEN, DATETIMEPICKER, FILEPICKER, GYROSCOPESCREEN, IMAGEVIDEOPICKER, MAP, MULTILANGUAGE, REDUX, REDUXLIST } from '../constant';



function DashboardScreen({ navigation }) {

    return (

        <View style={{ flex: 1, margin: 16 }}>
            <View style={{ height: 20 }} />

            <Button title='Location Screen' onPress={() => navigation.navigate(MAP)} color={"red"}/>

            <View style={{ height: 20 }} />

            <Button title='Camera' onPress={() => navigation.navigate(CAMERA)} color={"red"}/>

            <View style={{ height: 20 }} />

            <Button title='File Picker' onPress={() => navigation.navigate(FILEPICKER)} color={"red"}/>

            <View style={{ height: 20 }} />

            <Button title='Date Picker' onPress={() => navigation.navigate(DATETIMEPICKER)} color={"red"}/>
           
            <View style={{ height: 20 }} />

            <Button title='Image & Video Picker' onPress={() => navigation.navigate(IMAGEVIDEOPICKER)} color={"red"}/>

            <View style={{ height: 20 }} />

            <Button title='Multi Language' onPress={() => navigation.navigate(MULTILANGUAGE)} color={"red"}/>

            <View style={{ height: 20 }} />

            <Button title='Redux' onPress={() => navigation.navigate(REDUX)} color={"red"}/>

            <View style={{ height: 20 }} />

            <Button title='Redux List' onPress={() => navigation.navigate(REDUXLIST)} color={"red"}/>

            <View style={{ height: 20 }} />

            <Button title='Continent List' onPress={() => navigation.navigate(CONTINENTSLISTSCREEN)} color={"red"} />

            <View style={{ height: 20 }} />

            <Button title='Animations' onPress={() => navigation.navigate(ANIMATIONSCREEN)} color={"red"} />

            <View style={{ height: 20 }} />

            <Button title='Gyroscope' onPress={() => navigation.navigate(GYROSCOPESCREEN)} color={"red"} />

            {/* <View style={{ height: 20 }} />

            <Button title='Theme' onPress={() => navigation.navigate(LIGHTDARKMODE)} /> */}

        </View>

    );
}


export default DashboardScreen;
