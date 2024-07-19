import React, { useCallback, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { fonts } from '../assets/fonts/fonts';
import { IMAGEPREVIEW, VIDEOPREVIEW } from '../constant';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DatePicker from 'react-native-date-picker';

const styles = StyleSheet.create({

    maincontainer: {
        flex: 1,
    },

    text: {
        fontSize: 16,
        paddingVertical: 3,
        color: "black"
    },

    button: {
        borderRadius: 10,
        backgroundColor: "skyblue",
        fontSize: 16,
        textAlign: "center",
        paddingVertical: 3
    }

})

function DatePickerScreen({ navigation }) {
    const [mDate, setDate] = useState(new Date())
    const [mTime, setTime] = useState(new Date())

    const [openDate, setDateOpen] = useState(false)
    const [openTime, setTimeOpen] = useState(false)



    return (
        <View style={styles.maincontainer}>

            <View style={{ padding: 20 }}>
                <Text
                    style={styles.text}
                    numberOfLines={1}>
                    {mDate.toDateString()}
                </Text>
                <Button title="Pick Date" onPress={() => setDateOpen(true)} />

                <View style={{ height: 30 }} />
                
                <Text
                    style={styles.text}
                    numberOfLines={1}>
                    {mTime.toTimeString()}
                </Text>
                <Button title="Pick Time" onPress={() => setTimeOpen(true)} />

                <DatePicker
                    modal
                    open={openDate}
                    mode='date'
                    date={mDate}
                    onConfirm={(date) => {
                        setDateOpen(false)
                        setDate(date)
                        console.log(date)
                    }}
                    onCancel={() => {
                        setDateOpen(false)
                    }}
                />

                <DatePicker
                    modal
                    open={openTime}
                    mode='time'
                    date={mTime}
                    onConfirm={(date) => {
                        setTimeOpen(false)
                        setTime(date)
                        console.log(date)
                    }}
                    onCancel={() => {
                        setTimeOpen(false)
                    }}
                />

            </View>

        </View>
    );


}



export default DatePickerScreen;
