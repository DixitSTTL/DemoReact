import React from 'react';
import { View, Button } from 'react-native';
import { CAMERA, DATETIMEPICKER, FILEPICKER, IMAGEVIDEOPICKER, LIGHTDARKMODE, MAP, MULTILANGUAGE, REDUX, REDUXLIST } from '../constant';



function DashboardScreen({ navigation }) {

    return (

        <View style={{ flex: 1, margin: 16 }}>
            <View style={{ height: 20 }} />

            <Button title='Location Screen' onPress={() => navigation.navigate(MAP)} />

            <View style={{ height: 20 }} />

            <Button title='Camera' onPress={() => navigation.navigate(CAMERA)} />

            <View style={{ height: 20 }} />

            <Button title='File Picker' onPress={() => navigation.navigate(FILEPICKER)} />

            <View style={{ height: 20 }} />

            <Button title='Date Picker' onPress={() => navigation.navigate(DATETIMEPICKER)} />
           
            <View style={{ height: 20 }} />

            <Button title='Image & Video Picker' onPress={() => navigation.navigate(IMAGEVIDEOPICKER)} />

            <View style={{ height: 20 }} />

            <Button title='Multi Language' onPress={() => navigation.navigate(MULTILANGUAGE)} />

            <View style={{ height: 20 }} />

            <Button title='Redux' onPress={() => navigation.navigate(REDUX)} />

            <View style={{ height: 20 }} />

            <Button title='Redux List' onPress={() => navigation.navigate(REDUXLIST)} />

            {/* <View style={{ height: 20 }} />

            <Button title='Theme' onPress={() => navigation.navigate(LIGHTDARKMODE)} /> */}

        </View>

    );
}


export default DashboardScreen;
