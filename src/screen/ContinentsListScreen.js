import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { addContinentAction, removeContinentAction } from '../redux/Continent/continentAction';



class ContinentsListScreen extends React.Component {


    componentDidMount() {
        this.fetchContinent()

    }


    async fetchContinent() {

        await fetch("https://api.climatetrace.org/v4/definitions/continents")
            .then((resp) => resp.json())
            .then((json) => {
                this.props.addContinent(json)

            })
            .catch((error) => console.error(error))
            .finally(() => {
            });
    }


    render() {

        return (
            <View style={{ flex: 1, flexDirection: "column", paddingHorizontal: 16 }}>


                <FlatList
                    data={this.props.data}
                    keyExtractor={item => item}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={{ margin: 10, borderRadius: 10, padding: 10, backgroundColor: "black", shadowColor: "red", flexDirection: "row", elevation: 6 }}>

                            <View style={{ flex: 1 }}>
                                <Text >
                                    {item}
                                </Text>
                            </View>

                            <TouchableOpacity onPress={() => { this.props.removeContinent(item) }} >
                                <Text style={{ paddingVertical: 5, paddingHorizontal: 12, borderRadius: 10, backgroundColor: "skyblue" }}>Remove</Text>

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
        data: state.continentsStore.continents
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addContinent: (parameter) => {
            dispatch(addContinentAction(parameter))
        },
        removeContinent: (parameter) => {
            dispatch(removeContinentAction(parameter))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContinentsListScreen); 