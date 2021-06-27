import getDirections from 'react-native-google-maps-directions';
import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import React, {useState, useRef, Component} from 'react';
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
import {Users,UserContext} from '../Context/context';
import ReportScreen from "./ReportScreen";
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/Ionicons";


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
        .get('http://104.236.38.247:8000/api/todayrouteview/'+this.context.loginuserid)
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
    return (
        <ScrollView style={styles.scrollView}>
          <View style={styles.container}>

            <TouchableHighlight
                onPress={() => this.props.navigation.navigate('AllRouteDetails')}
                style={{
                  height: 40,
                  width: 160,
                  borderRadius: 10,
                  backgroundColor: "#2874A6",
                  marginLeft: 20,
                  marginRight: 250,
                  marginTop: 17,

                }}>

              <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: 17,
                    marginTop: 7
                  }}>
                All Routes
              </Text>

            </TouchableHighlight>


              <View
                  style={{
                      color: 'black',
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height:5,
                      width: '100%',
                      backgroundColor: '#2874A6',
                      marginVertical: 5,
                      marginTop:20
                  }}
              />



            <Text  style={{
                  color: 'blue',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 25,
                fontStyle:'italic'
                }}>Today Routes</Text>

              <View
                  style={{
                      color: 'black',
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height:5,
                      width: '100%',
                      backgroundColor: '#2874A6',
                      marginVertical: 5,
                      marginTop:10
                  }}
              />



            {this.state.arr.map((item, i) => {
              return (
                  <View key={i} style={styles.container1}>
                    <Text
                        style={{
                          color: 'blue',
                          textAlign: 'center',
                          fontWeight: 'bold',
                          fontSize: 22,
                          marginTop:15,
                            marginLeft:10,
                        }}>
                      {item.route_name}{' '}
                    </Text>
                    <Text> </Text>


                    <TouchableOpacity style={{
                        height: 40,
                        width: 60,
                        borderRadius: 10,
                        backgroundColor: "#2874A6",
                        marginLeft: 290,
                        marginTop:15,
                        position:'absolute'

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
                            })) + this.handleGetDirections(item.RouteID)+(this.context.currouteid=item.RouteID)+(this.context.curRouteName=item.route_name)
                        }
                        title="Get Directions"
                    ><Icon name="ios-navigate"  style={{
                        height: 40,
                        width: 60,
                        marginLeft:10,
                        marginTop:2,
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


    );
  }
}
RouteDetails.contextType = UserContext;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#F5FCFF',
  },
  container1: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    height:70,
    width: '90%',
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
});
