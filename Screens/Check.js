

import React, { Component } from 'react'

import { ActivityIndicator, Alert, FlatList, Text, StyleSheet, View, TextInput, TouchableOpacity, TouchableHighlight, Button, SafeAreaView, ScrollView, AppRegistry } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Users,UserContext} from '../Context/context';
import RouteDetails from "./OrderDetails";

export default class Check extends Component {
    constructor(props) {
        super(props);
        this.state = { Check_IN: 'Check_IN', Check_Out: 'CheckOut' };
    }


    InsertRecord = () => {
        fetch('http://104.236.38.247:8000/api/attendancecheckin/'+this.context.loginuserid, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },


        }




        );


    };


    InsertRecordB = () => {
        fetch('http://104.236.38.247:8000/api/attendancecheckout/'+this.context.loginuserid, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },


        }




        );


    };
    state = {
        toggle: false
    }

    _onPress() {
        const newState = !this.state.toggle;
        this.setState({ toggle: newState })
    }
    render() {
        const { toggle } = this.state;
        const textValue = toggle ? "Check-Out" : "Check-IN";
        const textALERT = toggle ? "CheckOut Successfully updated" : "CheckIN Successfully updated";
        const buttonbg = toggle ? "#1589FF" : "#008080";

        const insert = toggle ? this.InsertRecord() : this.InsertRecordB();
        return (
            <View style={styles.Container}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity

                        onPress={
                            () => { this._onPress(); insert; alert(textALERT) }
                        }
                        style={{
                            marginTop: 10,
                            height: 45,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',

                            width: 250,
                            borderRadius: 30,
                            backgroundColor: buttonbg,
                        }}>
                        <Text style={styles.fon}>{textValue}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
Check.contextType = UserContext;
const styles = StyleSheet.create({

    Container: {
        flexDirection: 'column',
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',

    },

    row: {
        fontSize: 18,
        padding: 12
    },

    textInput: {

        textAlign: 'center',
        height: 40,
        borderWidth: 1,
        borderColor: '#009688',
        borderRadius: 55,
        backgroundColor: "#FFFF",
        marginTop: 10,

    },

    fon: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#fff',
    },
});

AppRegistry.registerComponent('Check', () => Check);
