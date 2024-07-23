import React, { useEffect } from 'react';
import { Image, Switch, Text, View } from 'react-native';
import useThemeContext from '../assets/colors/useThemeContext';


function DarkModeScreen() {
    const { colors, isSystemTheme, systemTheme, colorTheme, setColorTheme } =
        useThemeContext();


    return (
        <View style={{ flex: 1 }}>

            <View style={{ padding: 20 }}>
                <View>
                    <Text>Automatic (follow device setting)</Text>
                    <Switch
                        trackColor={{
                            false: colors.whiteblackreverse,
                            true: colors.whiteblackreverse,
                        }}
                        ios_backgroundColor={colors.whiteblackreverse}
                        thumbColor={colors.whiteblackreverse}
                        onValueChange={(on) => setColorTheme(on ? null : systemTheme)}
                        value={isSystemTheme}
                    />
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text>Dark Mode</Text>

                    <Switch
                        trackColor={{
                            false: colors.whiteblackreverse,
                            true: colors.whiteblackreverse,
                        }}
                        disabled={isSystemTheme}
                        ios_backgroundColor={colors.whiteblackreverse}
                        thumbColor={colors.color_primary}
                        onValueChange={(on) => setColorTheme(on ? 'dark' : 'light')}
                        value={colorTheme === 'dark'}
                    />
                </View>

            </View>


        </View>
    );


}



export default DarkModeScreen;
