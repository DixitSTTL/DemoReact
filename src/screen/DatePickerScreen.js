import React, { useState } from 'react';
import { Button, StyleSheet, Text, useColorScheme, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { darkModeColors, lightModeColors } from '../assets/colors/colors';


function DatePickerScreen() {
    const colorTheme = useColorScheme();
    const color = colorTheme === 'dark' ? darkModeColors : lightModeColors;
    const [mDate, setDate] = useState(new Date())
    const [mTime, setTime] = useState(new Date())
    const [openDate, setDateOpen] = useState(false)
    const [openTime, setTimeOpen] = useState(false)

    const styles = StyleSheet.create({

        maincontainer: {
            flex: 1,
        },
    
        text: {
            fontSize: 16,
            paddingVertical: 3,
            color: color.whiteblackreverse
        },

        button: {
            borderRadius: 10,
            backgroundColor: "skyblue",
            fontSize: 16,
            textAlign: "center",
            paddingVertical: 3
        }
    
    })


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
