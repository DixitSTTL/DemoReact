import React from 'react';
import { View, Button } from 'react-native';
import { CAMERA, FILEPICKER, MAP } from '../constant';



function DashboardScreen({navigation}) {

    return (

        <View style={{ flex: 1, margin: 16 }}>
            <View style={{ height: 20 }} />

            <Button title='Location Screen' onPress={() => navigation.navigate(MAP)} />

            {/* <View style={{ height: 20 }} />

            <Button title='File Picker' onPress={() => navigation.navigate(FILEPICKER)} /> */}

            <View style={{ height: 20 }} />

            <Button title='Camera' onPress={() => navigation.navigate(CAMERA)} />

        </View>

    );
}


export default DashboardScreen;