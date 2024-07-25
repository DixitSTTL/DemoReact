import React from 'react';
import { Button, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { decrementCounterAction, incrementCounterAction } from '../redux/Counter/counterAction';


class ReduxScreen extends React.Component {
   
    render() {

        return (<View style={{ flex: 1, flexDirection: "column", justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ marginVertical: 50 }}>
                <Text style={{ fontSize: 25, fontWeight: 'bold' }}> Counter Value = {this.props.counter} </Text>
            </View>
            <View style={{ marginVertical: 5 }}>
                <Button title="Increment +1" style={{ marginVertical: 50 }} onPress={() => { this.props.increaseCounter(1) }} />
            </View>
            <View style={{ marginVertical: 5 }}>
                <Button title="Increment +5" style={{ marginVertical: 50 }} onPress={() => { this.props.increaseCounter(5) }} />
            </View>
            <View style={{ marginVertical: 50 }}>
                <Button title="Decrement -1" onPress={() => { this.props.decreaseCounter(1) }} />
            </View>
        </View>
        )
    };

}

const mapStateToProps = (state) => {
    return {
        counter: state.counter.counter
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        increaseCounter: (parameter) => {
            dispatch(incrementCounterAction(parameter))
        },
        decreaseCounter: (parameter) => {
            dispatch(decrementCounterAction(parameter))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxScreen); 