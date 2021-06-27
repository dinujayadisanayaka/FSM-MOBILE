

import React, { useState } from "react";
import {
    StyleSheet,
    View,
    TextInput,
    Button,
    RadioButtonGroup,
    RadioButton,
    SafeAreaView, ScrollView,
    Text, TouchableOpacity, Image,Picker
} from "react-native";
import {Users,UserContext} from '../Context/context';
import axios from "axios";
import ExploreScreen from "./ExploreScreen";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";
import Swiper from 'react-native-swiper';


const initialState = {
    unproductive_reason: '',
}

class unproductive extends React.Component {
    constructor() {
        super();
        this.state = initialState;
    }



    submit() {
        axios.post('http://104.236.38.247:8000/api/shopclosereason/'+this.context.unpshopid, {
            unproductive_reason: this.state.unproductive_reason,
        })
            .then((res) => {
                console.log(res.data)
                this.props.navigation.navigate('Explore')
                console.log('beforeunoid#'+Users.unpshopid);
                (Users.unpshopid=null);
                console.log('afterunoid#'+Users.unpshopid);
                this.setState(initialState);

            })
            .catch((error) => console.log(error));
    }

    updateValue(text, field) {
        if (field == "unproductive_reason") {
            this.setState({
                unproductive_reason: text,
            });
        }
    }

    render() {
        const { navigation } = this.props;

        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.rect}>
                    <View style={styles.iconRow}>
                        <Icon name="md-menu" style={styles.icon} onPress={() => navigation.openDrawer()}></Icon>
                        <Text style={styles.cart}>Unproductive</Text>
                    </View>
                </View>

                <ScrollView style={styles.scrollView}>





                    <View style={styles.sliderContainer}>
                        <Swiper
                            autoplay
                            height={150}
                            activeDotColor="#009387"
                            autoplayTimeout={3}>


                            <View style={styles.slide}>
                                <Image
                                    source={require('../Screens/banner/113.jpg')}
                                    resizeMode="cover"
                                    style={{height: '80%',
                                        width: '80%',
                                        alignSelf: 'center',
                                        borderRadius: 18,}}
                                />
                            </View>





                            <View style={styles.slide}>
                                <Image
                                    source={require('../Screens/banner/111.jpg')}
                                    resizeMode="cover"
                                    style={{height: '90%',
                                        width: '90%',
                                        alignSelf: 'center',
                                        borderRadius: 18,}}
                                />
                            </View>





                            <View style={styles.slide}>
                                <Image
                                    source={require('../Screens/banner/115.jpg')}
                                    resizeMode="cover"
                                    style={{height: '85%',
                                        width: '85%',
                                        alignSelf: 'center',
                                        borderRadius: 18,}}
                                />
                            </View>
                        </Swiper>
                    </View>




                    <View>
                        <Text
                            style={{
                                color: 'blue',
                                marginLeft :33,
                                fontWeight: 'bold',
                                fontSize: 20,
                                marginTop :10
                            }}>
                            Select unproductive reason
                        </Text>

                    </View>

                    <View style={styles.onePicker}>
                    <Picker
                        selectedValue={this.state.unproductive_reason}
                        style={{ height: 80, width:'108%' ,marginLeft:-8,marginTop:-16}}
                        onValueChange={(itemValue, itemIndex) => this.setState({ unproductive_reason: itemValue })}>
                        <Picker.Item label="Select Reason" value=""  />
                        <Picker.Item label="Shop Closed" value="Shop Closed"  />
                        <Picker.Item label="Permanently Closed" value="Permanently Closed" />
                        <Picker.Item label="Stock Available" value="Stock Available" />
                    </Picker>
                    </View>







                    {/*<View>*/}
                    {/*    <Text*/}
                    {/*        style={{*/}
                    {/*            color: 'blue',*/}
                    {/*            marginLeft :20,*/}
                    {/*            fontWeight: 'bold',*/}
                    {/*            fontSize: 20,*/}
                    {/*            marginTop :10*/}
                    {/*        }}>*/}
                    {/*        Enter unproductive reason*/}
                    {/*    </Text>*/}

                    {/*</View>*/}


                    <View style={styles.container}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Other reason"
                            value={this.state.unproductive_reason}
                            onChangeText={(text) => this.updateValue(text, "unproductive_reason")}
                        />

                        {/*<Button*/}
                        {/*    title="Submit"*/}
                        {/*    onPress={() => {*/}
                        {/*      this.submit();*/}

                        {/*    }}*/}
                        {/*/>*/}
                        <TouchableOpacity
                            onPress={() => {
                                this.submit();
                            }}
                            style={{
                                marginTop: 18,
                                alignItems: "center",
                                backgroundColor: "#0799f8",
                                padding: 10,
                                borderRadius: 15,
                                marginLeft:90,
                                width: '50%',
                            }}>
                            <Text
                                style={{
                                    color: 'white',
                                    textAlign: 'center',
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                }}>
                                Submit
                            </Text>
                        </TouchableOpacity>

                    </View>







                </ScrollView>


                {/*<View style={styles.productCartOverallViewB}>*/}

                <View style={styles.productCartOverallViewB}>
                    <View style={styles.productCartInlineViewA}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Home')}>
                            <Ionicons name="ios-home" size={26} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.productCartInlineViewB}>
                        <TouchableOpacity
                            onPress={() =>
                                this.props.navigation.navigate('Explore', { title: 'Explore' })
                            }>
                            <MaterialIconsIcon name="store" size={30} color="#FFFFFF"></MaterialIconsIcon>
                        </TouchableOpacity>
                    </View>


                    {/*</View>*/}
                </View>
            </SafeAreaView>
        );
    }
}
unproductive.contextType = UserContext;
const styles = StyleSheet.create({
    container: {
        flex: 1,


    },

    scrollView: {

        marginHorizontal: 1,
    },


    input: {
        backgroundColor: '#add8e6',
        height: 50,
        width:'85%',
        marginLeft:30,
        marginTop:20,
        paddingHorizontal: 10,
        color: '#030000',
        borderRadius: 10,
    },
    empty: {
        textAlign: 'center',
    },

    addProductBtn: {
        backgroundColor: 'blue',
        paddingVertical: 10,
    },

    addProductText: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
    },

    // container:{
    //     height:"100%",
    //     alignItems:"center",
    //     justifyContent:"center"
    // }

    formWrapper: {
        width: '80%',
        justifyContent: 'center',
    },

    formRow: {
        marginBottom: 10,
    },

    textInput: {
        backgroundColor: '#add',
        height: 40,
        paddingHorizontal: 10,
        color: '#333',
        borderRadius: 20,
    },

    welcomeText: {
        textAlign: 'center',
        marginBottom: 20,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2B547E',
    },
    regText: {
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 14,
        fontWeight: 'bold',

    },
    rect: {
        width: 415,
        height: 62,
        backgroundColor: '#0872ce',
        flexDirection: "row",
        marginTop: -6
    },
    icon: {
        color: "rgba(255,255,255,1)",
        fontSize: 30,
        height: 44,
        width: 40,
    },
    cart: {
        fontWeight: 'bold',
        color: "rgba(245,245,245,1)",
        fontSize: 19,
        marginLeft: 1,
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
        textAlign: 'center',

        marginTop: 10,
        marginBottom: 10,
    },
    productCartInlineViewA: {

        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 100,
        height: 25,
        textAlign: 'center',
        marginRight: 60,
        marginLeft:55,
        marginTop: 10,
        marginBottom: 10,
    },
    productCartOverallViewB: {
        flexDirection: 'row',
        width: '100%',
        alignSelf: 'center',
        marginTop: 10,
        height:50,
        backgroundColor: '#0872ce'
    }, sliderContainer: {
        height: 290,
        width: '100%',
        marginTop: 20,
        justifyContent: 'center',
        alignSelf: 'center',
        borderRadius: 20,
    },

    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderRadius: 18,
    },

    slideImage: {
        height: '160%',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 18,
    },
            onePicker: {
                backgroundColor: '#add8e6',
                height: 50,
                width:'85%',
                marginLeft:30,
                marginTop:20,
                paddingHorizontal: 10,
                color: '#808080',
                borderRadius: 10,
            },

});

export default unproductive;











// import React, {useContext, useEffect, useState} from 'react';
// import {View, Text, StyleSheet, Picker, TextInput, Button, TouchableOpacity} from "react-native";
// import axios from "axios";
// import {Users, UserContext, cart} from '../Context/context';
//
// const VehicleDetailsScreen = () =>{
//   const locate = useContext(UserContext);
//
//   const[unproductive,setUnproductive] = useState('');
//
//   const toSub = ()=> {
//
// console.log('yyyyyyyyyyyyyyyyyy');
//     axios.post('http://104.236.38.247:8000/api/shopclosereason/'+locate.loginuserid,{
//       unproductive_reason: unproductive,
//     })
//         .then((res)=>{
//           console.log(res.data);
//
//         })
//         .catch((err)=>{
//           console.log(err);
//
//         })
//
//   }
//
//
//
//
//   return(
//       <View>
//
//
//         <TextInput
//             label="Unproductive"
//             value={unproductive}
//             onChangeText={(val) => setUnproductive(val)}
//         />
//
//
//         <TouchableOpacity
//             style={styles.button}
//             mode="contained"
//             onPress={() => {toSub()}}
//         ><Text>Submit</Text>
//         </TouchableOpacity>
//
//
//       </View>
//
//   );
//
// }
//
// export default VehicleDetailsScreen;
//
//
// const styles =StyleSheet.create({
//   button:{
//     marginBottom:5
//   }
// });
