import React, { Component } from 'react';

import { StackNavigator } from 'react-navigation';
import {
  StyleSheet,
  View,
  TextInput,
  Button,
  RadioButtonGroup,
  RadioButton,
  TouchableOpacity,
  SafeAreaView, ScrollView,
  Text, TouchableHighlight,
} from "react-native";
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  TouchableRipple,
  Switch
} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from "axios";
import { Users, UserContext } from '../Context/context';
import RouteDetails from "./RouteDetails";
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIconsIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";
class ProfileScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
    };
  }


  render() {
    const { navigation } = this.props;
    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.rect}>
            <View style={styles.iconRow}>
              <Icon name="md-menu" style={styles.icon} onPress={() => navigation.openDrawer()}></Icon>
              <Text style={styles.cart}>Profile</Text>
            </View>
          </View>
          <ScrollView style={styles.scrollView}>
            <Avatar.Image  style={{
              marginLeft: 56,
              marginRight: 200,
              marginTop: 30,

            }}

                source={require('./icons/salesman.jpg')}

                size={250}
            />
            <View style={styles.cont}>

              <Text style={styles.txt}>Name :{'        '} {this.context.lguserfname} {this.context.lgusermname} {this.context.lguserlname}</Text>
              <Text style={styles.txt}>Email :{'        '} {this.context.lguseremail}</Text>
              <Text style={styles.txt}>NIC :{'           '} {this.context.lguserNIC}</Text>
              <Text style={styles.txt}>Address :{'   '} {this.context.lguserAddress}</Text>
              <Text style={styles.txt}>Gender :{'     '} {this.context.lguserGender}</Text>
              <Text style={styles.txt}>D.O.B :{'        '} {this.context.lguserDOB}</Text>
              <Text style={styles.txt}>T.P. :{'            '} {this.context.lguserTP}</Text>
              <Text style={styles.txt}>Branch :{'      '} {this.context.lguserBranch}</Text>

            </View>
          </ScrollView>
          <View style={styles.productCartOverallViewB}>
            <View style={styles.productCartInlineViewB}>
              <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Home')}>
                <Ionicons name="ios-home" size={30} color="#ffffff" />
              </TouchableOpacity>
            </View>
            <View style={styles.productCartInlineViewB}>
              <TouchableOpacity
                  onPress={() =>
                      this.props.navigation.navigate('Route')
                  }>
                <MaterialCommunityIconsIcon name="directions-fork" size={33} color="#FFFFFF"></MaterialCommunityIconsIcon>
              </TouchableOpacity>
            </View>
            <View style={styles.productCartInlineViewB}>
              <TouchableOpacity
                  onPress={() =>
                      this.props.navigation.navigate('Explore')
                  }>
                <MaterialIconsIcon name="store" size={32} color="#FFFFFF"></MaterialIconsIcon>
              </TouchableOpacity>
            </View>

            <View style={styles.productCartInlineViewB}>
              <TouchableOpacity
                  onPress={() =>
                      this.props.navigation.navigate('Report')
                  }>
                <Ionicons name="ios-create" size={30} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

          </View>
        </SafeAreaView>
    );
  }
}
ProfileScreen.contextType = UserContext;
const styles = StyleSheet.create({
  input: {
    borderWidth: 2,
    borderColor: "skyblue",
    margin: 20,
    marginTop: 20,
  },
  container: {
    flex: 1,
  },
  scrollView: {

    marginHorizontal: 20,
  },
  text: {
    fontSize: 42,
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
  // productCartInlineViewB: {
  //
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   alignSelf: 'center',
  //   width: 100,
  //   height: 25,
  //
  //   // borderRadius: 60,
  //   textAlign: 'center',
  //   marginRight: 10,
  //   marginLeft:155,
  //   marginTop: 10,
  //   marginBottom: 10,
  // },
  // productCartOverallViewB: {
  //   flexDirection: 'row',
  //   width: '100%',
  //   alignSelf: 'center',
  //   marginTop: 10,
  //
  //   backgroundColor: '#0872ce'
  // },
  cont: {
    flex: 1,
    height: 350,
    width: '100%',
    textAlign: 'justify',
    backgroundColor: '#add8e6',
    marginVertical: 18,
    borderRadius: 15,
    marginLeft:0
  },
  txt: {
   marginTop:20,
    marginLeft:7,
    fontSize:14
  },
  productCartInlineViewB: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 100,
    height: 35,
    textAlign: 'center',
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  productCartOverallViewB: {
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: '#0872ce',
    height:50


  },
  });

export default ProfileScreen;
