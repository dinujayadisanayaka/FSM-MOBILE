import React, { Component } from 'react';

import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableHighlight,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import {cart, CartContext} from '../Context/context';
class Category extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      text: '',
      data: [],
    };

    this.arrayholder = [];
  }

  componentDidMount() {
    return fetch('http://104.236.38.247:8000/api/viewcategories/')
        .then((response) => response.json())
        .then((responseJson) => {
          // console.log(responseJson);
          this.setState(
              {
                isLoading: false,
                data: responseJson,
              },
              () => {
                // In this block you can do something with new state.
                this.arrayholder = responseJson;
              },
          );
        })
        .catch((error) => {
          console.error(error);
        });
  }

  GetFlatListItem(name) {
    Alert.alert(name);
  }

  searchData(text) {
    const newData = this.arrayholder.filter((item) => {
      const itemData = item.category_name.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      data: newData,
      text: text,
    });
  }

  itemSeparator = () => {
    return (
        <View
            style={{
              height: 0.5,
              width: '100%',
              backgroundColor: '#000',
            }}
        />
    );
  };

  render() {
    const { navigation } = this.props;
    if (this.state.isLoading) {
      return (
          <View style={{ flex: 1, paddingTop: 20 }}>
            <ActivityIndicator />
          </View>
      );
    }

    return (
        <View style={styles.MainContainer}>
          <View style={styles.container}>
            <StatusBar animated backgroundColor="rgba(4,4,13,1)" />
            <View style={styles.rect}>
              <View style={styles.iconRow}>
                <Icon name="md-menu" style={styles.icon} onPress={() => navigation.openDrawer()}></Icon>
                <Text style={styles.cart}>Category</Text>
              </View>
            </View>
          </View>
          <View style={styles.productCartOverallView}>
            <View style={styles.productCartInlineView}>
              <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Category')}>
                <Ionicons name="pricetags" size={36} color="#3b528e" />
              </TouchableOpacity>
            </View>

            <View style={styles.productCartInlineView}>
              <TouchableOpacity
                  onPress={() =>
                      this.props.navigation.navigate('product', {title: 'Product'})
                  }>
                <Ionicons name="ios-cube" size={38} color="#a9b3d4" />
              </TouchableOpacity>
            </View>

            <View style={styles.productCartInlineView}>
              <TouchableOpacity
                  onPress={() =>
                      this.props.navigation.navigate('Cart', {title: 'Cart'})
                  }>
                <Ionicons name="cart" size={38} color="#a9b3d4" />
              </TouchableOpacity>
            </View>
          </View>
          {/*Ending*/}




          <View
              style={{
                height:2,
                width: '100%',
                backgroundColor: '#2874A6',

              }}
          />






          {/*<Text style={styles.headerText}>Category List</Text>*/}
          {/*Starting Search bar */}
          <View
              style={{
                marginTop: 10,
                marginLeft: 20,
                marginRight: 20,
                marginBottom: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
              }}>
            <View
                style={{
                  flex: 1,
                  height: 50,
                  borderRadius: 10,
                  marginLeft: 0,
                  flexDirection: 'row',
                  backgroundColor: '#add8e6',
                  alignItems: 'center',
                  paddingHorizontal: 20,
                  borderWidth: 0,
                }}>
              <Ionicons name="search" size={28} color="#517fa4" />
              <TextInput
                  onChangeText={(text) => this.searchData(text)}
                  value={this.state.text}
                  underlineColorAndroid="transparent"
                  placeholder=" SEARCH CATEGORIES"
              />
            </View>
          </View>
          {/*Starting Search bar /////////////*/}

{/*<ScrollView>*/}
          <FlatList
              data={this.state.data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                  <View style={styles.card}>
                    <View style={styles.cardInfo}>
                      <TouchableOpacity
                          onPress={() => {
                            this.props.navigation.navigate('product', {
                              title: 'Product',
                            });
                            // console.log('beforecatid' + cart.categoryid);
                            cart.categoryid = item.categoryID;
                            // console.log('aftercatid' + cart.categoryid);
                          }}>
                        <Text style={styles.cardTitle}>{item.category_name}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
              )}
          />

{/*</ScrollView>*/}
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
                      this.props.navigation.navigate('Category', { title: 'Cart' })
                  }>
                <Ionicons name="pricetags" size={27} color="#ffffff" />
              </TouchableOpacity>
            </View>
            <View style={styles.productCartInlineViewB}>
              <TouchableOpacity
                  onPress={() =>
                      this.props.navigation.navigate('product', { title: 'Product' })
                  }>
                <Ionicons name="ios-cube" size={26} color="#ffffff" />
              </TouchableOpacity>
            </View>

            <View style={styles.productCartInlineViewB}>
              <TouchableOpacity
                  onPress={() =>
                      this.props.navigation.navigate('Cart', { title: 'Cart' })
                  }>
                <Ionicons name="cart" size={28} color="#ffffff" />
              </TouchableOpacity>
            </View>

          </View>
        </View>

    );
  }
}


export default Category;
Category.contextType = CartContext;
const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,

    backgroundColor: '#ffffff',
  },

  categoryBtn: {
    flex: 1,
    width: '30%',
    marginHorizontal: 0,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  },

  categoryIcon: {
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 70,
    height: 70,
    backgroundColor: '#d1e5d1',
    borderRadius: 50,
  },

  categoryBtnText: {
    alignSelf: 'center',
    marginTop: 5,
    color: '#065f05',
  },

  productCartOverallView: {
    flexDirection: 'row',
    width: '80%',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 0,
  },

  productCartOverallView2: {
    flexDirection: 'row',
    width: '80%',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 0,
  },

  productCartInlineView: {
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 100,
    height: 30,
    /* backgroundColor: '#c8d6ee',*/
    borderRadius: 60,
    textAlign: 'center',
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
  },

  productCartInlineView2: {
    borderWidth: 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 100,
    height: 30,
    backgroundColor: '#d1e5d1',
    borderRadius: 60,
    textAlign: 'center',
    marginRight: 10,
    marginTop: 10,
    marginBottom: 10,
  },

  row: {
    fontSize: 18,
    padding: 12,
  },

  textInput: {
    textAlign: 'center',
    height: 42,
    borderWidth: 1,
    borderColor: '#009688',
    borderRadius: 8,
    backgroundColor: '#FFFF',
  },

  headerText: {
    color: '#0748f5',
    marginLeft: 20,
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 5,
    marginBottom: 10,
  },

  card: {
    height: 50,
    marginVertical: 10,
    shadowColor: '#999',
    shadowOffset: {width: 10, height: 10},
    shadowOpacity: 100,
    shadowRadius: 20,
    elevation: 25,
    marginLeft: 90,
    marginRight: 90,
  },

  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: '#85a7ee',
    borderWidth: 2,
borderRadius:10,
    backgroundColor: '#add8e6',
  },
  cardTitle: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    fontSize: 18,
    color: '#3b528e',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },

  formRow: {
    marginTop: 5,
    marginBottom: 10,
    flexDirection: 'row',
  },

  addToCart: {
    height: 25,
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#009387',
    borderRadius: 10,
    marginRight: 0,
  },

  addToCartText: {
    height: 25,
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#009387',
    borderRadius: 10,
    marginRight: 10,
  },

  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    /* justifyContent: 'center',
    alignItems: 'center',*/
    opacity: 10,
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
    width: 40,
  },
  cart: {
    fontWeight: 'bold',
    color: "rgba(245,245,245,1)",
    fontSize: 19,
    marginLeft: 10,
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
    height: 35,

    // borderRadius: 60,
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

    backgroundColor: '#0872ce'
  },
});
