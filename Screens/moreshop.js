
import React, { Component } from 'react';

import {
    Image,
    TouchableOpacity,
    Alert,
    FlatList,
    Text,
    StyleSheet,
    View,
    TextInput,
    TouchableHighlight,
    SafeAreaView,
    ScrollView,
    Button
} from 'react-native';
import {Users, UserContext, cart} from '../Context/context';
import ExploreScreen from "./ExploreScreen";
import axios from "axios";
import Icon from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";


export default class moreshop extends Component {

    constructor(props) {

        super(props);

        this.state = {
            data: [],
            shop:null,
        }

    }

    componentDidMount() {
        axios.get('http://104.236.38.247:8000/api/viewshopdetails/' + this.context.moreshopid)
            .then((res)=>{
                console.log(res.data);
                this.setState({data:res.data});
                console.log(this.state.data[0].ShopID);

            })

            // return fetch('http://104.236.38.247:8000/api/viewshopdetails/'+this.context.moreshopid)
            //     .then((response) => response.json())
            // .then((response) => {
            //     console.log(response.data);
            //     console.log(response);
            //     this.setState({
            //         data: response.data,
            //     }, () => {
            //         // In this block you can do something with new state.
            //         this.arrayholder = response.data;
            //     });
            // })
            // .catch((error) => {
            //     console.error(error);
            // });
        console.log('for order'+cart.shopidfo);
    }


    render() {
        const { navigation } = this.props;

        return (

            <View style={styles.MainContainer}>
                <View style={styles.rect}>
                    <View style={styles.iconRow}>
                        <Icon name="md-menu" style={styles.icon} onPress={() => navigation.openDrawer()}></Icon>
                        <Text style={styles.cart}>Details of Shop</Text>
                    </View>
                </View>



                <TouchableHighlight

                    onPress={() => {
                        this.props.navigation.navigate('Explore')
                        console.log('beforemoreid#' + Users.moreshopid);
                        (Users.moreshopid = null);
                        console.log('aftermoreid#' + Users.moreshopid);
                    }}
                    style={{
                        height: 40,
                        width: 120,
                        borderRadius: 10,
                        backgroundColor: "#2874A6",
                        marginLeft: 16,
                        marginRight: 250,
                        marginTop: 15,

                    }}>


                    <Text
                        style={{
                            color: 'white',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: 16,
                            marginTop: 7
                        }}>
                        Back
                    </Text>

                </TouchableHighlight>






                <View style={{flex: 1, height: 525}}>

                    <FlatList
                        data={this.state.data}
                        renderItem={({item}) =>


                            <View style={{backgroundColor: '#ADD8E6', padding: 10, margin: 10}}>
                                <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20,marginTop:2}}>Shop  {'  '}:{'   '}{item.shop_name}</Text>
                                <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20,marginTop:2}}>Owner  {''}
                                    :{'   '}{item.owner_name}</Text>
                                <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20,marginTop:2}}>Owner NIC {'  '}:{'  '}{item.owner_NIC}</Text>
                                <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20,marginTop:2}}>lat {'                 '}:{'  '}{item.lat}</Text>
                                <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20,marginTop:2}}>lng {'                '}:{'  '}{item.lng}</Text>
                                {/*<Text style={{color: '#151B54', fontWeight: 'bold', fontSize: 20}}>Picture :{'  '}{item.image}</Text>*/}
                                <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20,marginTop:2}}>Address
                                    {'     '}  :{'  '}{item.address_no}</Text>
                                <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20,marginTop:2}}>Suburb {'        '}:{'  '}{item.suburb}</Text>
                                <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20,marginTop:2}}>City {'              '}:{'  '}{item.city}</Text>
                                <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20,marginTop:2}}>District {'        '}:{'  '}{item.district}</Text>
                                <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20,marginTop:2}}>Telephone {'  '}
                                    :{' '} {item.telephone_numbers}</Text>
                                <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20,marginTop:2}}>Reg Date {'     '}
                                    : {' '}{item.registered_date}</Text>
                                <Image source={{uri: 'http://104.236.38.247:8000/uploads/shop/' + item.image}}
                                       style={{width: 365, height: 365, borderWidth:1.5,borderColor:'black',marginTop:10}}/>
                            </View>

                        }
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>


                <View style={styles.productCartOverallViewB}>
                    <View style={styles.productCartInlineViewB}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Home')}>
                            <Ionicons name="ios-home" size={26} color="#FFFFFF"/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.productCartInlineViewB}>
                        <TouchableOpacity
                            onPress={() =>
                                this.props.navigation.navigate('Explore', {title: 'Explore'})
                            }>
                            <MaterialIconsIcon name="store" size={30} color="#FFFFFF"></MaterialIconsIcon>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.productCartInlineViewB}>
                        <TouchableOpacity
                            onPress={() =>{
                                // console.log('before'+cart.shopidfo);
                                // (cart.shopidfo=item.ShopID);
                                // console.log('after'+cart.shopidfo);
                                this.props.navigation.navigate('Category');}
                            }>
                            <Ionicons name="ios-cart" size={26} color="#FFFFFF"/>
                        </TouchableOpacity>
                    </View>


                </View>
            </View>


        );
    }
}

moreshop.contextType = UserContext;


const styles = StyleSheet.create({

    MainContainer:{
        flex: 1,

    },

    row: {
        fontSize: 18,
        padding: 12
    },
    scrollView: {

    },
    textInput: {
        textAlign: 'center',
        height: 42,
        borderWidth: 1,
        borderColor: '#009688',
        borderRadius: 8,
        backgroundColor: "#FFFF"

    },
    productCartInlineViewB: {

        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        width: 100,
        height: 25,

        // borderRadius: 60,
        textAlign: 'center',
        marginRight: 20,
        marginLeft: 20,
        marginTop: 15,
        marginBottom: 10,
    },
    productCartOverallViewB: {
        flexDirection: 'row',
        width: '100%',
        alignSelf: 'center',
        marginTop: 10,
        backgroundColor: '#0872ce'
    },rect: {
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
        fontWeight:'bold',
        color: "rgba(245,245,245,1)",
        fontSize: 18,
        width:150,
        // marginRight:15,
        // marginLeft: 2,
        marginTop: 3
    },
    iconRow: {
        height: 44,
        flexDirection: "row",
        flex: 1,
        marginRight: 280,
        marginLeft: 8,
        marginTop: 13
    }

});
