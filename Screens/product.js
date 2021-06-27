import React, {Component} from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {cart, CartContext} from '../Context/context';
import Icon from 'react-native-vector-icons/Ionicons';


export default class product extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      text: '',
      data: [],
      returnData: [],
    };

    this.arrayholder = [];
  }

  /*Starting componentDidMount*/
  componentDidMount() {
    return fetch(
        'http://104.236.38.247:8000/api/viewcategoryproducts/' +
        this.context.categoryid +
        '/user/' +
        this.context.loginuserid2,
    )
        .then((response) => response.json())
        .then((responseJson) => {
          // console.log(responseJson);
          this.setState(
              {
                isLoading: false,
                data: responseJson,
                returnData: responseJson,
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
  /*Ending componentDidMount*/

  /*Starting searchData*/
  searchData(text) {
    const newData = this.arrayholder.filter((item) => {
      const itemData = item.product_Name.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      data: newData,
      text: text,
    });
  }
  /*Ending searchData*/

  /*Starting qtyChangeFunction*/
  /*  qtyChangeFunction = (index2, qty, weight) => {
    const newArray = this.state.data.map((element, index) => {
      if (index == index2) {
        return {...element, qty};
      }
      return element;
    });

    this.setState((cur) => ({
      ...cur,
      data: newArray,
    }));
  };*/
  /*Ending qtyChangeFunction*/

  /*Starting qtyChangeFunction*/

  qtyChangeFunction = (index2, qty, quantity_per_product) => {
    if (qty <= quantity_per_product) {
      const newArray = this.state.data.map((element, index) => {
        if (index == index2) {
          return {...element, qty};
        }
        return element;
      });

      this.setState((cur) => ({
        ...cur,
        data: newArray,
      }));
    } else {
      Alert.alert('Alert ', 'The quantity you entered is not in stock', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
    /*Alert.alert('Alert ', 'The quantity you entered is not in stock', [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);*/
  };

  /*Ending qtyChangeFunction*/

  /*addButtonOnClickHandler*/
  addButtonOnClickHandler(productName, qty, salesPrice, productId) {
    if (qty && !isNaN(qty)) {
      cart.products.push({
        productName,
        productQuantity: qty,
        salesPrice,
        productId,
      });

      cart.totalAmaount = this.context.products
          .map((product) => product.productQuantity * product.salesPrice)
          .reduce((a, b) => a + b, 0);
      Alert.alert('Alert ', 'Product has successfully added to the cart.', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } else {
      Alert.alert('Alert ', 'Please enter numeric number', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  }
  /*addButtonOnClickHandler*/

  /*Starting qtyChangeFunction*/
  returnQtyChangeFunction = (index, returnQty) => {
    const newArray = this.state.data.map((element, returnDataIndex) => {
      if (index == returnDataIndex) {
        return {...element, returnQty};
      }
      return element;
    });

    this.setState((cur) => ({
      ...cur,
      data: newArray,
    }));
  };
  /*Ending qtyChangeFunction*/

  /*addButtonOnClickHandler2*/
  returnButtonOnClickHandler(productName, returnQty, salesPrice, productId) {
    if (returnQty && !isNaN(returnQty)) {
      cart.returnProducts.push({
        productName,
        returnQuantity: returnQty,
        salesPrice,
        productId,
      });

      cart.returnTotalAmount = this.context.returnProducts
          .map((returns) => returns.returnQuantity * returns.salesPrice)
          .reduce((aa, bb) => aa + bb, 0);
      Alert.alert(
          'Alert ',
          'Return product has successfully added to the return cart.',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      );
    } else {
      Alert.alert('Alert ', 'Please enter numeric number', [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  }

  /*addButtonOnClickHandler2*/

  render() {
    if (this.state.isLoading) {
      return (
          <View style={{flex: 1, paddingTop: 20}}>
            <ActivityIndicator />
          </View>
      );
    }

    return (
        <SafeAreaView style={styles.MainContainer}>
          <View style={styles.rect}>
            <View style={styles.iconRow}>
              <Icon
                  name="md-menu"
                  style={styles.icon}
                  onPress={() => navigation.openDrawer()}
              />
              <Text style={styles.cart}>Products</Text>
            </View>
          </View>
          <View style={styles.productCartOverallView}>
            <View style={styles.productCartInlineView}>
              <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Category')}>
                <Ionicons name="pricetags" size={36} color="#a9b3d4" />
              </TouchableOpacity>
            </View>

            <View style={styles.productCartInlineView}>
              <TouchableOpacity
                  onPress={() =>
                      this.props.navigation.navigate('product', {title: 'Product'})
                  }>
                <Ionicons name="ios-cube" size={38} color="#3b528e" />
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

          <View
              style={{
                height: 2,
                width: '100%',
                backgroundColor: '#2874A6',
                marginBottom: 10,
                marginTop: -7,
              }}
          />

          {/*Starting Search bar */}
          <View
              style={{
                marginTop: 0,
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
                  placeholder="SEARCH PRODUCT"
              />
            </View>
          </View>
          {/*Starting Search bar */}
          {/*<ScrollView>*/}
          <FlatList
              data={this.state.data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item, index}) => (
                  <View style={styles.card}>
                    <View style={styles.cardInfo}>
                      <Text style={styles.cardTitle1}>{item.product_Name}</Text>

                      <Text style={styles.cardTitle}>
                        Sales Price : RS {item.sales_price}
                      </Text>

                      <Text style={styles.cardTitle}>
                        Labeled Price : RS {item.labled_price}
                      </Text>

                      <Text style={styles.cardTitle}>Weight : {item.weight}</Text>

                      <Text style={styles.cardTitle}>
                        Available Qty :{item.quantity_per_product}
                      </Text>
                      {/*<Text style={styles.cardTitle}>Available Qty : {10}</Text>*/}
                      <Text style={styles.cardTitle}>
                        Now Available Qty : {item.quantity_per_product - item.qty}
                      </Text>

                      <View style={styles.formRow}>
                        <View>
                          <TextInput
                              style={styles.textInput}
                              keyboardType="numeric"
                              placeholder="Enter Qty"
                              /*placeholderTextColor="#333"*/
                              value={item.qty ? item.qty : 0}
                              onChangeText={(text) =>
                                  this.qtyChangeFunction(
                                      index,
                                      text,
                                      item.quantity_per_product,
                                  )
                              }
                          />

                          <View style={styles.buttonContainer}>
                            <Button
                                onPress={() =>
                                    this.addButtonOnClickHandler(
                                        item.product_Name,
                                        item.qty,
                                        item.sales_price,
                                        item.productID,
                                    )
                                }
                                title="ORDER"
                            />
                          </View>
                        </View>

                        <View>
                          <TextInput
                              style={styles.textInput}
                              keyboardType="numeric"
                              placeholder="Enter Qty"
                              /*placeholderTextColor="#333"*/
                              value={item.returnQty ? item.returnQty : 0}
                              onChangeText={(returnQty) =>
                                  this.returnQtyChangeFunction(index, returnQty)
                              }
                          />

                          <View style={styles.buttonContainer}>
                            <Button
                                onPress={() =>
                                    this.returnButtonOnClickHandler(
                                        item.product_Name,
                                        item.returnQty,
                                        item.sales_price,
                                        item.productID,
                                    )
                                }
                                title="RETURN"
                            />
                          </View>
                        </View>
                      </View>
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
                      this.props.navigation.navigate('Category', {title: 'Cart'})
                  }>
                <Ionicons name="pricetags" size={28} color="#ffffff" />
              </TouchableOpacity>
            </View>
            <View style={styles.productCartInlineViewB}>
              <TouchableOpacity
                  onPress={() =>
                      this.props.navigation.navigate('product', {title: 'Product'})
                  }>
                <Ionicons name="ios-cube" size={26} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            <View style={styles.productCartInlineViewB}>
              <TouchableOpacity
                  onPress={() =>
                      this.props.navigation.navigate('Cart', {title: 'Cart'})
                  }>
                <Ionicons name="cart" size={26} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
    );
  }
}

product.contextType = CartContext;

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,

    backgroundColor: '#ffffff',
  },

  productCartOverallView: {
    flexDirection: 'row',
    width: '80%',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
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

  row: {
    fontSize: 18,
    padding: 12,
  },

  textInput: {
    textAlign: 'center',
    height: 42,
    borderWidth: 1,
    borderColor: '#85a7ee',
    borderRadius: 8,
    marginRight: 20,
    marginLeft: 20,
    fontStyle: 'italic',
  },

  headerText: {
    color: '#009688',
    marginLeft: 20,
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 10,
  },

  card: {
    height: 280,
    marginVertical: 17,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5,
    marginLeft: 40,
    marginRight: 40,
    marginTop: 20,
  },

  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: '#85a7ee',
    borderWidth: 2,
    borderBottomRightRadius: 28,
    borderBottomLeftRadius: 28,
    borderTopRightRadius: 28,
    borderTopLeftRadius: 28,
    backgroundColor: '#fff',
  },
  cardTitle: {
    /*fontWeight: 'bold',*/
    marginLeft: 20,
    marginRight: 40,
    marginBottom: 0,
    marginTop: 12,
    fontStyle: 'italic',
  },

  cardTitle1: {
    fontWeight: 'bold',
    marginLeft: 80,
    marginRight: 40,
    marginBottom: 0,
    marginTop: 6,
    fontSize: 15,
  },

  formRow: {
    marginTop: 10,
    marginBottom: 0,
    flexDirection: 'row',
    marginLeft: 35,
  },

  addToCart: {
    height: 25,
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#009387',
    borderRadius: 10,
    marginLeft: '70%',
  },

  addToCartText: {
    height: 25,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#009387',
    borderRadius: 10,
    marginRight: 10,
  },

  buttonContainer: {
    marginTop: 10,
    marginBottom: 0,
    marginLeft: 25,
    marginRight: 25,
  },
  multiButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rect: {
    width: 415,
    height: 65,
    backgroundColor: '#0872ce',
    flexDirection: 'row',
    marginTop: -6,
  },
  icon: {
    color: 'rgba(255,255,255,1)',
    fontSize: 30,
    height: 44,
    width: 40,
    marginTop: 5,
  },
  cart: {
    fontWeight: 'bold',
    color: 'rgba(245,245,245,1)',
    fontSize: 20,
    marginLeft: 10,
    marginTop: 6,
  },
  iconRow: {
    height: 44,
    flexDirection: 'row',
    flex: 1,
    marginRight: 280,
    marginLeft: 8,
    marginTop: 13,
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

    backgroundColor: '#0872ce',
  },
});
