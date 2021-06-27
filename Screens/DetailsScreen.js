
import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView, TouchableHighlight,
} from 'react-native';
import Swiper from 'react-native-swiper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-navigation';
import {cart, CartContext} from '../Context/context';
import ExploreScreen from "./ExploreScreen";
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";


const DetailsScreen = ({navigation}) => {
  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.rect}>
          <View style={styles.iconRow}>
            <Icon name="md-menu" style={styles.icon} onPress={() => navigation.openDrawer()}></Icon>
            <Text style={styles.cart}>Order Details</Text>
          </View>
        </View>
        <ScrollView>
          {/*Starting Swiper Slide images////////////////////////////////////////////////*/}

          <View style={styles.sliderContainer}>
            <Swiper
                autoplay
                height={150}
                activeDotColor="#009387"
                autoplayTimeout={2}>

              <View style={styles.slide}>
                <Image
                    source={require('../Screens/banner/123.jpg')}
                    resizeMode="cover"
                    style={{height: '90%',
                      width: '90%',
                      alignSelf: 'center',
                      borderRadius: 18,}}
                />
              </View>


              <View style={styles.slide}>
                <Image
                    source={require('../Screens/banner/44.jpg')}
                    resizeMode="cover"
                    style={styles.slideImage}
                />
              </View>



              <View style={styles.slide}>
                <Image
                    source={require('../Screens/banner/124.jpg')}
                    resizeMode="cover"
                    style={styles.slideImage}
                />
              </View>
            </Swiper>
          </View>

          {/*Ending Swiper Slide images////////////////////////////////////////////////*/}


          {cart.shopidfo != null ?
              <View style={styles.categoryContainer}>
                <TouchableOpacity
                    style={styles.categoryBtn}
                    onPress={() => navigation.navigate('OrderDetails')}>
                  <View style={styles.categoryIcon}>
                    <Ionicons
                        name="information-circle-outline"
                        size={60}
                        color="#ffffff"
                    />
                  </View>
                  <Text style={styles.categoryBtnText}>Order Details</Text>
                </TouchableOpacity>

                {/*Starting Make Order navigation */}
                <TouchableOpacity
                    style={styles.categoryBtn}
                    onPress={() => navigation.navigate('Category', {title: 'Category'})}>
                  <View style={styles.categoryIcon}>
                    <Ionicons name="md-add" size={65} color="#ffffff"/>
                  </View>
                  <Text style={styles.categoryBtnText}>Make Order</Text>
                </TouchableOpacity>
                {/*Ending Make Order navigation */}

              </View>:
              <View>
                <Text
                    style={{
                      color: '#FF0000',
                      marginLeft: 38,
                      fontWeight: 'bold',
                      fontSize: 20,
                      marginTop: 30
                    }}>
                  Select Shop For make An Order
                </Text>

                <TouchableHighlight
                    onPress={() => navigation.navigate('AllShops')}
                    style={{
                      height: 60,
                      width: 180,
                      borderRadius: 10,
                      backgroundColor: "#2874A6",
                      marginLeft: 110,
                      marginRight: 10,
                      marginTop: 40,

                    }}>


                  <Text
                      style={{
                        color: 'white',
                        textAlign: 'center',
                        fontWeight: 'bold',
                        fontSize: 20,
                        marginTop:15
                      }}>
                    Select a shop
                  </Text>

                </TouchableHighlight>
              </View>

          }



        </ScrollView>
        <View style={styles.productCartOverallViewB}>
          <View style={styles.productCartInlineViewB}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Home')}>
              <Ionicons name="ios-home" size={26} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <View style={styles.productCartInlineViewC}>
            <TouchableOpacity
                onPress={() => navigation.navigate('Shop')}>
              <MaterialIconsIcon name="store" size={30} color="#ffffff"></MaterialIconsIcon>
            </TouchableOpacity>
          </View>


        </View>
      </SafeAreaView>
  );
};


export default DetailsScreen;
// DetailsScreen.contextType = CartContext;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  sliderContainer: {
    height: 260,
    width: '95%',
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

  categoryContainer: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    marginTop: -40,
    marginBottom: 10,
    marginRight:30,
  },

  categoryBtn: {
    flex: 1,
    width: '30%',
    marginHorizontal: 0,
    alignSelf: 'center',
    marginLeft:25,
    marginTop:180,
  },

  categoryIcon: {
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 100,
    height: 100,
    backgroundColor: '#2980b9',
    borderRadius: 10,
  },

  categoryBtnText: {
    alignSelf: 'center',
    marginTop: 5,
    color: '#065f05',
  },
  cardsWrapper: {
    marginTop: 0,
    width: '90%',
    alignSelf: 'center',
  },

  card: {
    height: 100,
    marginVertical: 10,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },

  cardImageWrapper: {
    flex: 1,
  },

  cardImg: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
  },
  carInfo: {
    flex: 2,
    padding: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#fff',
  },

  cardTitle: {
    fontWeight: 'bold',
  },

  cardDetails: {
    fontSize: 12,
    color: '#444',
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

    marginLeft: 80,
    marginTop: 15,
    marginBottom: 10,
  },

  productCartInlineViewC: {

    width: 100,
    height: 25,
    marginLeft: 80,
    marginTop: 15,
    marginBottom: 13,

  },


  productCartOverallViewB: {
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#0872ce'
  },
});
