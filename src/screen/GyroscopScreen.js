import React, { useState } from 'react';
import { Button, Image, View } from 'react-native';
import { ANIMATIONSCREEN2 } from '../constant';
import Animated, { SensorType, useAnimatedSensor, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import { images } from '../assets/images';

function GyroscopScreen({ navigation }) {
        // const gyroscope = useAnimatedSensor(SensorType.GYROSCOPE);


        const gravity = useAnimatedSensor(SensorType.GRAVITY);
        const rotation = useAnimatedSensor(SensorType.ROTATION);

        const animatedStyle = useAnimatedStyle(() => {
                
                return {
                        transform: [
                                { translateX: withSpring(gravity.sensor.value.x * 50) },
                                { translateY: withSpring(gravity.sensor.value.y * -50) },
                                // { rotateZ:withSpring(rotation.sensor.value.yaw + 90) },
                                //     { rotateY:withSpring(rotation.sensor.value.qy) },
                                //     { rotateZ:withSpring(rotation.sensor.value.qz ) },
                        ],
                };
        });
        return (
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <View style={{ borderRadius: 35, height: 70, width: 70, backgroundColor: "yellow", elevation: 1, borderWidth: 3, borderColor: "black" }} />


                        <Animated.View style={[animatedStyle, { borderRadius: 30, height: 60, width: 60, elevation: 3, backgroundColor: "black", position: "absolute", justifyContent: "center" }]} >
                                <Image source={images.ic_arrow} style={{ resizeMode: "center", alignSelf: "center" }} />
                        </Animated.View>
                </View>
        );

}

export default GyroscopScreen; 