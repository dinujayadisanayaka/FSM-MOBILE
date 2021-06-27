

import React, { Component } from 'react';

import { ActivityIndicator, Alert, FlatList, Text, StyleSheet, View, TextInput, TouchableOpacity, TouchableHighlight, Button, SafeAreaView, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';
import {Users,UserContext} from '../Context/context';
import {cart, CartContext} from '../Context/context';
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";



export default class AllShops extends Component {


    constructor(props) {

        super(props);

        this.state = {
            isLoading: true,
            text: '',
            data: []
        }

        this.arrayholder = [];
    }

    componentDidMount() {

        return fetch('http://104.236.38.247:8000/api/viewshops/'+this.context.loginuserid)
            .then((response) => response.json())
            .then((responseJson) => {
                console.log('routeid-->'+this.context.currouteid+'RouteName->>'+this.context.curRouteName);
                // console.log(responseJson);
                this.setState({
                    isLoading: false,
                    data: responseJson,
                }, () => {
                    // In this block you can do something with new state.
                    this.arrayholder = responseJson;
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    GetFlatListItem(name) {
        Alert.alert(name);
    }

    searchData(text) {
        const newData = this.arrayholder.filter(item => {
            const itemData = item.shop_name.toUpperCase();
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1


        });

        this.setState({
            data: newData,
            text: text
        })
    }

    itemSeparator = () => {
        return (
            <View
                style={{
                    height: .5,
                    width: "100%",
                    backgroundColor: "#000",
                }}
            />
        );
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <ActivityIndicator />
                </View>
            );
        }
        const { navigation } = this.props;

        return (

            <View style={styles.MainContainer}>


                <View style={styles.rect}>
                    <View style={styles.iconRow}>
                        <Icon name="md-menu" style={styles.icon} onPress={() => navigation.openDrawer()}></Icon>
                        <Text style={styles.cart}>Shop</Text>
                    </View>
                </View>


                <View style={{ flexDirection: "row" }}>
                    {/*add shop*/}
                    <TouchableHighlight
                        onPress={() => this.props.navigation.navigate('ReturnDetails')}
                        style={{
                            height: 40,
                            width: 160,
                            borderRadius: 10,
                            backgroundColor: "#2874A6",
                            marginLeft: 220,
                            marginRight: 10,
                            marginTop: 15,

                        }}>


                        <Text
                            style={{
                                color: 'white',
                                textAlign: 'center',
                                fontWeight: 'bold',
                                fontSize: 16,
                                marginTop: 10
                            }}>
                            Add New Shop
                        </Text>

                    </TouchableHighlight>
                </View>
                {/*end first row*/}



                <Text
                    style={{
                        color: 'blue',
                        marginLeft: 20,
                        fontWeight: 'bold',
                        fontSize: 20,
                        marginTop: 10
                    }}>
                    List of All Shops
                </Text>
                <View>

                    <TextInput
                        style={styles.textInput}
                        onChangeText={(text) => this.searchData(text)}
                        value={this.state.text}
                        underlineColorAndroid='transparent'
                        placeholder="Search Here..." />
                </View>

                <FlatList
                    data={this.state.data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>

                        <View style={{ backgroundColor: '#ADD8E6', padding: 10, margin: 10 }}>
                            <Text style={{ color: '#151B54', fontWeight: 'bold' }}>Shop Name{'  '}: {'  '}{item.shop_name}</Text>
                            <Text style={{ color: '#151B54', fontWeight: 'bold' }}>Owner{'            '}:{'  '} {item.owner_name}</Text>
                            <Text style={{ color: '#151B54', fontWeight: 'bold' }}>City{'                '}:{'  '} {item.city}</Text>

                            <View style={{ flexDirection: "row" }}>
                                <TouchableHighlight
                                    onPress={() =>
                                    {this.props.navigation.navigate('unproductive');
                                        (Users.unpshopid=item.ShopID);
                                        console.log(Users.unpshopid);}
                                    }
                                    style={{
                                        height: 35,
                                        width: 100,
                                        borderRadius: 10,
                                        backgroundColor: "#1a769a",
                                        marginTop: 17,
                                        marginLeft:15,
                                    }}>
                                    <Text
                                        style={{
                                            color: 'white',
                                            textAlign: 'center',
                                            fontWeight: 'bold',
                                            fontSize: 13,
                                            marginTop: 7
                                        }}>
                                        Unproductive
                                    </Text>
                                </TouchableHighlight>

                                <TouchableOpacity style={{width: 15,}}></TouchableOpacity>




                                <TouchableHighlight
                                    onPress={() => {
                                        console.log('before'+Users.moreshopid);
                                        (Users.moreshopid=item.ShopID);
                                        (cart.shopidfo=item.ShopID);
                                        console.log('after'+Users.moreshopid);
                                        {this.props.navigation.navigate('moreshop')};

                                    }}
                                    style={{
                                        height: 35,
                                        width: 100,
                                        borderRadius: 10,
                                        backgroundColor: "#1a769a",
                                        marginTop: 17,
                                    }}>


                                    <Text
                                        style={{
                                            color: 'white',
                                            textAlign: 'center',
                                            fontWeight: 'bold',
                                            fontSize: 13,
                                            marginTop: 7
                                        }}>
                                        Shop details
                                    </Text>

                                </TouchableHighlight>

                                <TouchableOpacity style={{width: 15,}}></TouchableOpacity>


                                <TouchableHighlight
                                    onPress={() => {
                                        console.log('before'+cart.shopidfo);
                                        (cart.shopidfo=item.ShopID);
                                        console.log('after'+cart.shopidfo);
                                        {this.props.navigation.navigate('DetailsScreen')};
                                    }}
                                    style={{
                                        height: 35,
                                        width: 100,
                                        borderRadius: 10,
                                        backgroundColor: "#1a769a",
                                        marginTop: 17,
                                    }}>


                                    <Text
                                        style={{
                                            color: 'white',
                                            textAlign: 'center',
                                            fontWeight: 'bold',
                                            fontSize: 13,
                                            marginTop: 7
                                        }}>
                                        Order
                                    </Text>

                                </TouchableHighlight>
                            </View>



                        </View>

                    }

                />



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
                                this.props.navigation.navigate('Explore')
                            }>

                            <MaterialIconsIcon name="store" size={30} color="#FFFFFF"></MaterialIconsIcon>
                        </TouchableOpacity>
                    </View>



                </View>



            </View>
        );
    }
}
AllShops.contextType = UserContext;


const styles = StyleSheet.create({

    MainContainer: {
        justifyContent: 'center',
        flex: 1,


    },

    row: {
        fontSize: 18,
        padding: 12
    },

    textInput: {

        textAlign: 'center',
        height: 40,
        borderWidth: 1,
        borderLeftWidth:5,
        borderRightWidth:5,
        width:360,
        marginLeft:20,
        marginRight:10,
        borderColor: '#2874A6',
        borderRadius: 15,
        backgroundColor: "#FFFF",
        marginTop: 10,

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
        textAlign: 'center',
        marginLeft: 75,
        marginTop: 15,
        marginBottom: 10,
    },
    productCartOverallViewB: {
        flexDirection: 'row',
        width: '100%',
        alignSelf: 'center',

        marginBottom: 0,
        backgroundColor: '#0872ce'
    }
});
