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
  ScrollView,
  TouchableOpacity
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {Users,UserContext,cart,CartContext} from '../Context/context';
import ReportScreen from "./ReportScreen";
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";
export default class RouteDetails extends Component {
  state = {
    arr: [],

  };

  componentDidMount() {
    axios
        .get('http://104.236.38.247:8000/api/orderlist/'+cart.shopidfo)
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


  render() {
    const { navigation } = this.props;
    return (
        <SafeAreaView style={styles.container}>
          <View style={styles.rect}>
            <View style={styles.iconRow}>
              <Icon name="md-menu" style={styles.icon} onPress={() => navigation.openDrawer()}></Icon>
              <Text style={styles.cart}>Order List</Text>
            </View>
          </View>
          <ScrollView style={styles.scrollView}>
            <View style={{marginLeft:40}}>
              {/* <Text  style={{
                  color: 'green',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: 35,
                }}>MY ROUTES</Text> */}
              {this.state.arr.map((item, i) => {
                return (
                    <View key={i} style={styles.container1}>
                      <Text
                          style={{
                            color: '#000000',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            fontSize: 18,
                          }}>
                        Placed Date:{' '}
                        {item.placed_date}{' '}

                      </Text>
                      <Text style={{
                        color: '#000000',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize:18,
                        marginBottom:10,
                      }}> Bill Value : {' '}{item.final_bill}{' '}</Text>

                      <Button
                          key={i}
                          onPress={() => {
                            this.context.oderDescription = item.OrderID;
                            this.props.navigation.navigate('OrderDescription');
                          }}
                          title="List Of items "
                          style={styles.btn}

                      />
                    </View>
                );
              })}
            </View>

          </ScrollView>
          <View style={styles.productCartOverallViewB}>
            <View style={styles.productCartInlineViewA}>
              <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Home')}>
                {/* props.navigation.navigate('Totalitems'); */}
                <Ionicons name="ios-home" size={26} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            <View style={styles.productCartInlineViewB}>
              <TouchableOpacity    onPress={() => navigation.navigate('Explore')}>
                <MaterialIconsIcon name="store" size={30} color="#ffffff"></MaterialIconsIcon>

              </TouchableOpacity>
            </View>
             <View style={styles.productCartInlineViewC}>
               <TouchableOpacity
                   onPress={() =>
                       this.props.navigation.navigate('Category')

                   }>
                 <Ionicons name="ios-cart" size={28} color="#FFFFFF" />
               </TouchableOpacity>
             </View>


          </View>
        </SafeAreaView>

    )
  };
}
RouteDetails.contextType = UserContext;

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  container1: {
    flex: 1,
    // flexDirection: 'row',
    height:150,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#add8e6',
    marginVertical: 10,
    // borderRadius:15,
    // shadowColor: '#999',
    // shadowOffset: {width: 0, height: 1},
    // shadowOpacity: 1,
    // shadowRadius: 2,
    // elevation: 5,

  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    color:'#000000'
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
    fontSize: 18,
    marginLeft: 6,
    marginTop: 3
  },
  iconRow: {
    height: 44,
    flexDirection: "row",
    flex: 1,
    marginRight: 280,
    marginLeft: 8,
    marginTop: 13
  },
  productCartInlineViewA: {

    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 100,
    height: 25,
    textAlign: 'center',
    marginRight: 10,
    marginLeft: 20,
    marginTop: 15,
    marginBottom: 10,
  },
  productCartInlineViewB: {

    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 100,
    height: 25,
    textAlign: 'center',
    marginRight: 10,
    marginLeft: 30,
    marginTop: 15,
    marginBottom: 10,
  },
  productCartInlineViewC: {

    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 100,
    height: 25,
    textAlign: 'center',
    marginRight: 10,
    marginLeft: 15,
    marginTop: 15,
    marginBottom: 10,
  },


  productCartOverallViewB: {
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#0872ce'
  },
});
