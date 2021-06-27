import getDirections from 'react-native-google-maps-directions';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import React, { useState, useRef, Component } from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    FlatList,
    Button,
    TouchableHighlight,
    SafeAreaView,
    ScrollView, TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { Users, UserContext } from '../Context/context';
import ReportScreen from "./ReportScreen";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';
export default class RouteDetails extends Component {
    state = {
        arr: [],
        data: {
            source: {
                latitude: null,
                longitude: null,
            },
            destination: {
                latitude: null,
                longitude: null,
            },
            params: [
                {
                    key: 'travelmode',
                    value: 'driving', // may be "walking", "bicycling" or "transit" as well
                },
                {
                    key: 'dir_action',
                    value: 'navigate', // this instantly initializes navigation using the given travel mode
                },
            ],
            waypoints: [],
        },
    };

    componentDidMount() {
        axios
            .get('http://104.236.38.247:8000/api/routeview/' + this.context.loginuserid)
            .then((res) => {
                let count = Object.keys(res.data).length;
                for (let i = 0; i < count; i++) {
                    this.setState((cur) => ({
                        arr: [...cur.arr, res.data[i]],
                    }));
                }
            })
            .catch((error) => {
                console.log(error.message);
            });
    }

    handleGetDirections = (j) => {
        console.log(j);
        axios
            .get(`http://104.236.38.247:8000/api/routewaypoints/${j}`)
            .then((res) => {
                this.setState((cur) => ({
                    ...cur,
                    data: {
                        ...cur.data,
                        source: {
                            latitude: res.data.details[0].start_lat,
                            longitude: res.data.details[0].start_lng,
                        },
                        destination: {
                            latitude: res.data.details[0].end_lat,
                            longitude: res.data.details[0].end_lng,
                        },
                    },
                }));
                for (let i = 0; i < res.data.waypoints.length; i++) {
                    this.setState((cur) => ({
                        ...cur,
                        data: {
                            ...cur.data,
                            waypoints: [
                                ...cur.data.waypoints,
                                {
                                    latitude: res.data.waypoints[i].lat,
                                    longitude: res.data.waypoints[i].lng,
                                },
                            ],
                        },
                    }));
                }
                console.log(this.state.data);
                getDirections(this.state.data);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };


    render() {
        const { navigation } = this.props;
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.rect}>
                    <View style={styles.iconRow}>
                        <Icon name="md-menu" style={styles.icon} onPress={() => navigation.openDrawer()}></Icon>
                        <Text style={styles.cart}>All Routes</Text>
                    </View>
                </View>
                <ScrollView style={styles.scrollView}>

                    <View style={{ marginLeft: 20 }}>

                        {this.state.arr.map((item, i) => {
                            return (
                                <View key={i} style={styles.container1}>
                                    <View style={{
                                        marginLeft:20,
                                    }}>
                                        <Text
                                            style={{
                                                color: 'blue',
                                                textAlign: 'center',
                                                fontWeight: 'bold',
                                                fontSize: 22,
                                            }}>
                                            {item.route_name}{' '}
                                        </Text>
                                        <Text> </Text>
                                    </View>



                                    <TouchableOpacity style={{
                                        height: 40,
                                        width: 60,
                                        borderRadius: 10,
                                        backgroundColor: "#2874A6",
                                        marginLeft: 290,
                                        position:'absolute',

                                    }}
                                                      key={i}
                                                      onPress={() =>
                                                          this.setState((cur) => ({
                                                              ...cur,
                                                              data: {
                                                                  source: {
                                                                      latitude: null,
                                                                      longitude: null,
                                                                  },
                                                                  destination: {
                                                                      latitude: null,
                                                                      longitude: null,
                                                                  },
                                                                  params: [
                                                                      {
                                                                          key: 'travelmode',
                                                                          value: 'driving', // may be "walking", "bicycling" or "transit" as well
                                                                      },
                                                                      {
                                                                          key: 'dir_action',
                                                                          value: 'navigate', // this instantly initializes navigation using the given travel mode
                                                                      },
                                                                  ],
                                                                  waypoints: [],
                                                              },
                                                          })) + this.handleGetDirections(item.RouteID) + (this.context.currouteid = item.RouteID) + (this.context.curRouteName = item.route_name)
                                                      }
                                                      title="Get Directions"
                                    ><Icon name="ios-navigate" style={{
                                        height: 40,
                                        width: 60,
                                        marginLeft: 10,
                                        marginTop: 2,
                                    }}
                                           size={33}
                                           color="#FFFFFF">

                                    </Icon>

                                    </TouchableOpacity>
                                </View>
                            );
                        })}
                    </View>


                </ScrollView>
                <View style={styles.productCartOverallViewB}>
                    <View style={styles.productCartInlineViewB}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Home')}>
                            <Ionicons name="ios-home" size={30} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.productCartInlineViewB}>
                        <TouchableOpacity
                            onPress={() =>
                                this.props.navigation.navigate('Route')
                            }>

                            <MaterialCommunityIconsIcon name="directions-fork" size={30} color="#FFFFFF"></MaterialCommunityIconsIcon>
                        </TouchableOpacity>
                    </View>



                </View>
            </SafeAreaView>


        );
    }
}
RouteDetails.contextType = UserContext;
const styles = StyleSheet.create({
    container: {
        flex: 1,

        // backgroundColor: '#F5FCFF',
    },
    container1: {
        flex: 1,
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        height: 70,
        width: '95%',
        backgroundColor: '#add8e6',
        marginVertical: 10,
        // borderRadius:15,
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    rect: {
        width: 415,
        height: 62,
        backgroundColor: "#0872ce",
        flexDirection: "row",
        marginTop: -6
    },
    icon: {
        color: "rgba(255,255,255,1)",
        fontSize: 30,
        height: 44,
        width: 40
    },
    cart: {
        fontWeight: 'bold',
        color: "rgba(245,245,245,1)",
        fontSize: 20,
        marginLeft: 15,
        marginTop: 4
    },
    iconRow: {
        height: 44,
        flexDirection: "row",
        flex: 1,
        marginRight: 280,
        marginLeft: 8,
        marginTop: 13
    },
    productCartInlineViewB: {

        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 100,
        height: 25,

        // borderRadius: 60,
        textAlign: 'center',
        marginRight: 5,
        marginLeft: 65,
        marginTop: 15,
        marginBottom: 10,
    },
    productCartOverallViewB: {
        flexDirection: 'row',
        width: '100%',
        alignSelf: 'center',

        // marginBottom: 10,
        backgroundColor: '#0872ce'
    }
});
