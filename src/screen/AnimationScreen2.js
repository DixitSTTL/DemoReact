import React from 'react';
import { Button, View } from 'react-native';
import Animated, { SharedTransition, withSpring } from 'react-native-reanimated';
import { ANIMATIONSCREEN } from '../constant';


function AnimationScreen2({navigation})  {
   
  const transition = SharedTransition.custom((values) => {
    'worklet';
    return {
      height: withSpring(values.targetHeight),
      width: withSpring(values.targetWidth),
    };
  });


  return (
    <View style={{ flex: 1, marginTop: 50 }}>
      <Animated.View
        style={{ width: 100, height: 100, backgroundColor: 'green' }}
        sharedTransitionTag="sharedTag1"
        // sharedTransitionStyle={transition}

        
      />
      <View height={50}></View>
      <Animated.View
        style={{ width: 100, height: 100, backgroundColor: 'red' }}
        sharedTransitionTag="sharedTag2"
        // sharedTransitionStyle={transition}

      />
      <View height={50}></View>
      <Animated.View
        style={{ width: 100, height: 100, backgroundColor: 'yellow' }}
        sharedTransitionTag="sharedTag3"
        // sharedTransitionStyle={transition}

      />
      <Button title="Screen1" onPress={() => navigation.navigate(ANIMATIONSCREEN)} />
    </View>
  );

}

export default AnimationScreen2; 