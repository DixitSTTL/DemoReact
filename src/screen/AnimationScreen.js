import React from 'react';
import { Button, View } from 'react-native';
import Animated, { SharedTransition, withSpring } from 'react-native-reanimated';
import { ANIMATIONSCREEN2 } from '../constant';


function AnimationScreen({ navigation }) {

        const transition = SharedTransition.custom((values) => {
                'worklet';
                return {
                        height: withSpring(values.targetHeight),
                        width: withSpring(values.targetWidth),
                };
        });
        return (
                <View style={{ flex: 1 }}>
                        <Animated.View
                                style={{ width: 150, height: 150, backgroundColor: 'green' }}
                                sharedTransitionTag="sharedTag1"
                        // sharedTransitionStyle={transition}

                        />
                        <View height={50}></View>
                        <Animated.View
                                style={{ width: 150, height: 150, backgroundColor: 'red' }}
                                sharedTransitionTag="sharedTag2"
                        // sharedTransitionStyle={transition}

                        />
                        <View height={50}></View>
                        <Animated.View
                                style={{ width: 150, height: 150, backgroundColor: 'yellow' }}
                                sharedTransitionTag="sharedTag3"
                        // sharedTransitionStyle={transition}

                        />
                        <Button title="Screen2" onPress={() => navigation.navigate(ANIMATIONSCREEN2)} />
                </View>
        );

}

export default AnimationScreen; 