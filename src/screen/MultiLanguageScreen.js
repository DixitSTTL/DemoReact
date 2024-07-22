import React from 'react';
import { Button, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { useTranslation } from 'react-i18next';
import { darkModeColors, lightModeColors } from '../assets/colors/colors';



function MultiLanguageScreen() {
    const { t, i18n } = useTranslation();
    const colorTheme = useColorScheme();
    const color = colorTheme === 'dark' ? darkModeColors : lightModeColors;
    const styles = StyleSheet.create({

        maincontainer: {
            flex: 1,
        },

        text: {
            marginTop: 10,
            color: color.whiteblackreverse
        },


    })


    return (
        <View style={styles.maincontainer}>

            <View style={{ padding: 20 }}>

                <View style={{ flexDirection: "row" }}>

                    <View flex={1} style={{ margin: 6 }}>
                        <Button title='English' onPress={() => i18n.changeLanguage("en")}></Button>

                    </View>

                    <View flex={1} style={{ margin: 6 }}>
                        <Button title='French' flex={1} onPress={() => i18n.changeLanguage("fr")}></Button>

                    </View>

                    <View flex={1} style={{ margin: 6 }}>
                        <Button title='Hindi' flex={1} onPress={() => i18n.changeLanguage("hi")}></Button>

                    </View>


                </View>


                <Text
                    numberOfLines={1}
                    style={styles.text}
                >{t("language")}</Text>

                <Text
                    numberOfLines={1}
                    style={styles.text}
                >{t("screens.intro.title")}</Text>

                <Text
                    numberOfLines={1}
                    style={styles.text}
                >{t("screens.intro.text.introText")}</Text>

                <Text
                    numberOfLines={1}
                    style={styles.text}
                >{t("screens.intro.text.login")}</Text>

                <Text
                    numberOfLines={1}
                    style={styles.text}
                >{t("screens.intro.text.signup")}</Text>

                <Text
                    numberOfLines={1}
                    style={styles.text}
                >{t("screens.login.title")}</Text>

                <Text
                    numberOfLines={1}
                    style={styles.text}
                >{t("screens.login.text.login")}</Text>

                <Text
                    numberOfLines={1}
                    style={styles.text}
                >{t("screens.login.text.emailAddress")}</Text>

                <Text
                    numberOfLines={1}
                    style={styles.text}
                >{t("screens.login.text.password")}</Text>


            </View>

        </View>
    );

}



export default MultiLanguageScreen;
