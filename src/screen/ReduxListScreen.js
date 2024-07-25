import React from 'react';
import { Button, FlatList, Text, TextInput, TouchableOpacity, useColorScheme, View } from 'react-native';
import { connect } from 'react-redux';
import { addToDoAction, removeToDoAction } from '../redux/ToDo/todoAction';



class ReduxListScreen extends React.Component {

    constructor(props: any) {
        super(props);
        this.state = {
            text: "",

        };
    }

    render() {

        const isDarkMode = this.props.theme === 'dark';
        console.log("isDarkMode "+isDarkMode);

        return (
            <View style={{ flex: 1, flexDirection: "column",paddingHorizontal:16 }}>


                <TextInput
                    placeholder="Add a new todo"
                    value={this.state.text}
                    onChangeText={(text) => this.setState({ text })}
                />

                <Button title="Add Todo" onPress={() => {
                    if (this.state.text.trim() !== "") {
                        this.props.addToDo(this.state.text);
                        this.setState({ text: "" });
                    }
                }} />

                <FlatList
                    data={this.props.todos.todos}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={{ margin: 10, borderRadius: 10,padding:10, backgroundColor:"black",shadowColor:"red", flexDirection: "row",elevation:6 }}>

                            <View style={{ flex: 1 }}>
                                <Text >
                                    {item.text}
                                </Text>
                            </View>

                            <TouchableOpacity onPress={() => { this.props.removeToDo(item.id) }} >
                                <Text style={{ paddingVertical:5,paddingHorizontal:12, borderRadius: 10,backgroundColor:"skyblue" }}>Remove</Text>

                            </TouchableOpacity>

                        </View>
                    )}
                />
            </View>
        )
    };

}


const mapStateToProps = (state) => {
    return {
        todos: state.todos
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addToDo: (parameter) => {
            dispatch(addToDoAction(parameter))
        },
        removeToDo: (parameter) => {
            dispatch(removeToDoAction(parameter))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReduxListScreen); 