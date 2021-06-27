
import React, { Component } from 'react'
import {

    Alert,
    FlatList,
    Text,
    StyleSheet,
    View,
    TextInput,
    TouchableHighlight,
    SafeAreaView,
    ScrollView,
    AppRegistry,
    Button,
    TouchableOpacity, Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from "axios";
import { UserContext, Users } from "../Context/context";
import { cart, CartContext } from '../Context/context';

export default class login extends Component {

    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
        };
    }



    submit() {
        axios.post("http://104.236.38.247:8000/api/mobilelogin", {
            email: this.state.email,
            password: this.state.password,
        })
            // .then((res)=>console.log(res.data[0].userID))
            .then((res) => {
                if (res.data[1] == 'Login Successfully') {
                    this.props.navigation.navigate("MainTabScreen");
                    console.log('beforeid#' + Users.loginuserid);
                    Users.loginuserid = res.data[0].userID;
                    Users.lguserfname = res.data[0].first_name;
                    Users.lguserlname = res.data[0].last_name;
                    Users.lguseremail = res.data[0].email;
                    Users.lgusermname = res.data[0].middle_name;
                    Users.lguserNIC = res.data[0].NIC;
                    Users.lguserGender = res.data[0].Gender;
                    Users.lguserAddress = res.data[0].Address;
                    Users.lguserDOB = res.data[0].Date_Of_Birth;
                    Users.lguserTP = res.data[0].telephone_numbers;
                    Users.lguserBranch = res.data[0].branch_name;

                    console.log('after#' + Users.loginuserid);
                    console.log('after#' + Users.lguserfname + Users.lguserlname);


                    console.log('beforeid2#' + cart.loginuserid2);
                    cart.loginuserid2 = res.data[0].userID;
                    console.log('afterid2#' + cart.loginuserid2);
                } else {
                    alert("Wrong Login Details");
                }
            })
    }



    out() {
        this.props.navigation.navigate("ReportScreen");
        console.log('beforeid' + Users.loginuserid);
        Users.loginuserid = null;
        console.log('after' + Users.loginuserid);

    }





    updateValue(text, field) {
        if (field == "email") {
            this.setState({
                email: text,
            });
        } else if (field == "password") {
            this.setState({
                password: text,
            });
        }
    }


    render() {
        return (
            <View style={styles.container}>
                <Image source={{ uri: 'data:image/jpeg;base64,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' }}
                       style={{ width: 175, height: 175, borderRadius: 100 }}
                />
                <Text style={styles.logoText}>Welcome to FSM</Text>
                <TextInput
                    style={styles.inputBox}
                    placeholderTextColor="#003f5c"
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Email"
                    placeholder="Email"
                    placeholderTextColor='#ffffff'
                    selectionColor='#fff'
                    color='#ffffff'
                    keyboardType="email-address"
                    placeholder="Enter email"
                    onChangeText={(text) => this.updateValue(text, "email")} />


                <TextInput
                    style={styles.inputBox}
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Enter password"
                    secureTextEntry={true}
                    color='#ffffff'
                    placeholderTextColor='#ffffff'
                    onChangeText={(text) => this.updateValue(text, "password")} />


                <TouchableOpacity style={styles.loginBtn} title="Submit"
                                  onPress={() => {
                                      this.submit();
                                  }}>
                    <Text style={styles.loginText}>LOGIN</Text>
                </TouchableOpacity>



            </View>
        );
    }
}
login.contextType = UserContext, CartContext;

const styles = StyleSheet.create({
    container: {

        backgroundColor: '#1569C7',
        flexGrow:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoText: {
        marginVertical: 15,
        fontSize: 18,
        color: 'rgba(255,255,255,0.7)',
        fontStyle:'italic'
    },

    inputText: {
        fontSize:16,
        fontWeight:'500',
        color:'#ffffff',
        textAlign:'center'
    },
    forgot: {
        color: "white",
        fontSize: 11
    },
    loginBtn: {
        marginTop: 20,
        width:220,
        backgroundColor:'#3B9C9C',
        borderRadius:25,
        marginVertical:13,
        paddingVertical:10,
    },
    loginText: {
        fontSize:16,
        fontWeight:'bold',
        color:'#ffffff',
        textAlign:'center'
    },
    inputBox:{
        width:320,
        backgroundColor:'rgba(246,246,250,0.3)',
        borderRadius:25,
        paddingHorizontal:30,
        fontSize:16,
        marginTop:16 ,
        height:49,
    },
});

