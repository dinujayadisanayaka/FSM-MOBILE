import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
    SafeAreaView,
} from 'react-native';
import {Table, TableWrapper, Row, Cell} from 'react-native-table-component';
import {cart, CartContext} from '../Context/context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from "react-native-vector-icons/Ionicons";


const initialState = {
  tableHead: [
    'No',
    'Item Name',
    'Qty',
    'Sales Price',
    'Increase',
    'Decrease',
    'Remove',
  ],
  returnTableHead: [
    'No',
    'Item Name',
    'Qty',
    'Sales Price',
    'Increase',
    'Decrease',
    'Remove',
  ],
  tableData: [],
  returnTableData: [],
  totalAmount: 0,
  discount: 0,
  grandTotal: 0,
  returnTotal: 0,
  billValue: 0,
  userId: '',
  shopId: '',
  widthArr: [40, 90, 50, 50, 60, 65, 68]
};
export default class Cart extends Component {
  state = initialState;

  /*Starting Cart remove,increase,decrease functions*/
  /* Starting removeProductFromCart*/
  removeProductFromCart(index) {
    cart.totalAmaount =
        parseFloat(cart.totalAmaount) -
        parseFloat(
            cart.products[index].salesPrice * cart.products[index].productQuantity,
        );

    cart.products.splice(index, 1);

    this.setState((cur) => ({
      ...cur,
      tableData: this.context.products,
      totalAmount: this.context.totalAmaount,
      discount: 0,
      grandTotal:
          parseFloat(this.context.totalAmaount) -
          parseFloat((this.context.totalAmaount * this.state.discount) / 100),

      /*return*/
      billValue:
          parseFloat(this.context.totalAmaount) -
          parseFloat((this.context.totalAmaount * this.state.discount) / 100) -
          this.context.returnTotalAmount,
    }));
  }
  /*  Starting removeProductFromCart*/

  /*  Starting increase quantity working*/
  increaseProductFromCart(index2) {
    const newArray = this.state.tableData.map((element, index) => {
      if (index == index2) {
        return {
          ...element,
          productQuantity: parseInt(element.productQuantity) + 1,
        };
      }
      return element;
    });

    const totalAmount = newArray
        .map((product) => product.productQuantity * product.salesPrice)
        .reduce((a, b) => a + b, 0);

    this.setState((cur) => ({
      ...cur,
      tableData: newArray,
      totalAmount,
      grandTotal:
          parseFloat(totalAmount) -
          parseFloat((totalAmount * this.state.discount) / 100),
      billValue:
          parseFloat(totalAmount) -
          parseFloat((totalAmount * this.state.discount) / 100) -
          this.context.returnTotalAmount,
    }));

    cart.totalAmaount = totalAmount;
    cart.products = newArray;
  }
  /*Ending increase quantity working*/

  /*Starting decrease quantity working*/
  decreaseProductFromCart(index2) {
    const newArray = this.state.tableData.map((elemet, index) => {
      if (index == index2) {
        return {
          ...elemet,
          productQuantity:
              parseInt(elemet.productQuantity) - 1 < 1
                  ? 1
                  : parseInt(elemet.productQuantity) - 1,
        };
      }
      return elemet;
    });

    const totalAmount = newArray
        .map((product) => product.productQuantity * product.salesPrice)
        .reduce((a, b) => a + b, 0);

    console.log(totalAmount);

    this.setState((cur) => ({
      ...cur,
      tableData: newArray,
      totalAmount: totalAmount,
      grandTotal:
          parseFloat(totalAmount) -
          parseFloat((totalAmount * this.state.discount) / 100),
      billValue:
          parseFloat(totalAmount) -
          parseFloat((totalAmount * this.state.discount) / 100) -
          this.context.returnTotalAmount,
    }));

    cart.totalAmaount = totalAmount;
    cart.products = newArray;
  }
  /*Ending decrease quantity working*/
  /*Ending Cart remove,increase,decrease functions*/

  /*Starting return remove, increase,decrease functions*/
  /*Starting removeProductFromReturn*/
  removeProductFromReturn(index) {
    cart.returnTotalAmount =
        parseFloat(cart.returnTotalAmount) -
        parseFloat(
            cart.returnProducts[index].salesPrice *
            cart.returnProducts[index].returnQuantity,
        );
    cart.returnProducts.splice(index, 1);

    this.setState((cur) => ({
      ...cur,
      returnTableData: this.context.returnProducts,
      returnTotal: this.context.returnTotalAmount,
      billValue:
          parseFloat(this.state.totalAmount) -
          parseFloat((this.state.totalAmount * this.state.discount) / 100) -
          this.context.returnTotalAmount,
    }));
  }

  /*  Starting increase quantity working*/
  increaseProductFromReturn(ReturnIndex) {
    const newArray = this.state.returnTableData.map((element, index) => {
      if (index == ReturnIndex) {
        return {
          ...element,
          returnQuantity: parseInt(element.returnQuantity) + 1,
        };
      }
      return element;
    });

    const returnTotal = newArray
        .map((returns) => returns.returnQuantity * returns.salesPrice)
        .reduce((a, b) => a + b, 0);

    this.setState((cur) => ({
      ...cur,
      returnTableData: newArray,
      returnTotal,

      billValue:
          parseFloat(this.context.totalAmaount) -
          parseFloat((this.context.totalAmaount * this.state.discount) / 100) -
          returnTotal,
    }));

    cart.returnTotalAmount = returnTotal;
    cart.returnProducts = newArray;
  }
  /*Ending increase quantity working*/

  /*Starting decrease quantity working*/
  decreaseProductFromReturn(returnIndex) {
    const newArray = this.state.returnTableData.map((elemet, index) => {
      if (index == returnIndex) {
        return {
          ...elemet,
          returnQuantity:
              parseInt(elemet.returnQuantity) - 1 < 1
                  ? 1
                  : parseInt(elemet.returnQuantity) - 1,
        };
      }
      return elemet;
    });

    const returnTotal = newArray
        .map((returns) => returns.returnQuantity * returns.salesPrice)
        .reduce((a, b) => a + b, 0);

    /* console.log(totalAmount);
     */
    this.setState((cur) => ({
      ...cur,
      returnTableData: newArray,
      returnTotal,
      billValue:
          parseFloat(this.context.totalAmaount) -
          parseFloat((this.context.totalAmaount * this.state.discount) / 100) -
          returnTotal,
    }));

    cart.returnTotalAmount = returnTotal;
    cart.returnProducts = newArray;
  }
  /*Ending decrease quantity working*/
  /*Starting removeProductFromReturn*/
  /*Ending remove, increase,decrease functions*/

  /*starting componentDidMount*/
  componentDidMount() {
    this.setState((cur) => ({
      ...cur,
      tableData: this.context.products,
      totalAmount: this.context.totalAmaount,
      grandTotal: this.context.totalAmaount,
      /*return*/
      returnTableData: this.context.returnProducts,
      returnTotal: this.context.returnTotalAmount,
      billValue: this.context.totalAmaount - this.context.returnTotalAmount,
    }));
    console.log(this.context.loginuserid2);
  }
  /*Ending  componentDidMount*/

  discountOnChangeHandler = (discount) => {
    this.setState((cur) => ({
      ...cur,
      discount,
      grandTotal:
          parseFloat(this.state.totalAmount) -
          parseFloat((this.state.totalAmount * discount) / 100),
      billValue:
          parseFloat(this.state.totalAmount) -
          parseFloat((this.state.totalAmount * discount) / 100) -
          this.context.returnTotalAmount,
    }));
  };

  refreshCart = () => {
    cart.products = [];
    cart.totalAmaount = 0;
    cart.shopidfo = null;
    this.setState(initialState);
  };

  /*Starting submit*/
  submitButtonHandler = () => {
    fetch('http://104.236.38.247:8000/api/orderWithReturns/'+this.context.loginuserid2, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grandTotal: this.state.grandTotal,
        discount: this.state.discount,
        returnTotal: this.state.returnTotal,
        billValue: this.state.billValue,
        userId: this.context.loginuserid2,
        shopId: this.context.shopidfo,
        productDetails: [...this.state.tableData],
        returnProductDetails: [...this.state.returnTableData],
      }),
    });

    Alert.alert('Alert ', 'Are you sure?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => console.log('OK Pressed'),
      },
    ]);
    console.log('grandTotal : ' + this.state.grandTotal);
    console.log('discount : ' + this.state.discount);
    console.log(...this.state.tableData);
    /*return*/
    console.log('returnTotal : ' + this.state.returnTotal);
    console.log('billValue : ' + this.state.billValue);

    console.log(...this.state.returnTableData);
    // console.log('userId' + this.state.userId);
    // console.log('shopId' + this.state.shopId);

    this.refreshCart();
    cart.shopidfo = null;
    cart.categoryid = null;
    console.log('cartshopid' + cart.shopidfo);
    this.props.navigation.navigate('Explore');
  };
  /*Ending submit*/

  render() {
    const state = this.state;

    const increase = (index) => (
        <TouchableOpacity onPress={() => this.increaseProductFromCart(index)}>
          <View>
            <Ionicons name="add-circle-outline" size={30} color="#4565a0" />
          </View>
        </TouchableOpacity>
    );

    const decrease = (index) => (
        <TouchableOpacity onPress={() => this.decreaseProductFromCart(index)}>
          <View>
            <Ionicons name="remove-circle-outline" size={30} color="#4565a0" />
          </View>
        </TouchableOpacity>
    );

    const remove = (data, index) => (
        <TouchableOpacity onPress={() => this.removeProductFromCart(index)}>
          <View>
            <Ionicons name="close-circle-outline" size={30} color="#4565a0" />
          </View>
        </TouchableOpacity>
    );

    const removeReturn = (data, index) => (
        <TouchableOpacity onPress={() => this.removeProductFromReturn(index)}>
          <View>
            <Ionicons name="close-circle-outline" size={30} color="#4565a0" />
          </View>
        </TouchableOpacity>
    );

    const increaseReturn = (index) => (
        <TouchableOpacity onPress={() => this.increaseProductFromReturn(index)}>
          <View>
            <Ionicons name="add-circle-outline" size={30} color="#4565a0" />
          </View>
        </TouchableOpacity>
    );

    const decreaseReturn = (index) => (
        <TouchableOpacity onPress={() => this.decreaseProductFromReturn(index)}>
          <View>
            <Ionicons name="remove-circle-outline" size={30} color="#4565a0" />
          </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>

          <View style={styles.rect}>
            <View style={styles.iconRow}>
              <Icon name="md-menu" style={styles.icon} onPress={() => navigation.openDrawer()}></Icon>
              <Text style={styles.cart}>Cart</Text>
            </View>
          </View>


        {/*<ScrollView >*/}
          {/*Starting main header with navigation*/}
          <View style={styles.productCartOverallView}>
            <View style={styles.productCartInlineView}>
              <TouchableOpacity
                  onPress={() =>
                      this.props.navigation.navigate('Category', {title: 'Category'})
                  }>
                <Ionicons name="pricetags" size={36} color="#a9b3d4" />
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
                <Ionicons name="cart" size={38} color="#3b528e" />
              </TouchableOpacity>
            </View>
          </View>
          {/*Ending main header with navigation*/}


          <View
              style={{
                height:2,
                width: '100%',
                backgroundColor: '#2874A6',
                marginBottom:15,
                marginTop:-7,

              }}
          />
          <ScrollView >

          {/*Stating cart table*/}
          <Table borderStyle={{borderColor: 'transparent'}} >
            <Row
                data={state.tableHead}
                style={styles.head}
                textStyle={styles.text}
                widthArr={state.widthArr}
            />
            {this.state.tableData.map((rowData, index) => (
                <TableWrapper style={styles.row} >
                  <Cell data={index + 1} textStyle={styles.text} />
                  {Object.values(rowData)
                      .filter((element, index) => index != 3)
                      .map((cellData, cellIndex) => (
                          <Cell data={cellData} textStyle={styles.text} />
                      ))}
                  <Cell data={increase(index)} />
                  <Cell data={decrease(index)} />
                  <Cell data={remove(1, index)} />
                </TableWrapper>
            ))}
          </Table>
          {/*Ending cart table*/}

          {/*Starting Discount calculating*/}
          <View style={styles.card}>
            <View style={styles.cardInfo}>
              <Text style={styles.inlineTextContainer2}>
                Sub Cart Total {'  '} : RS.{' '}
                {this.state.totalAmount}
              </Text>
<View style={{flexDirection:"row",marginBottom:5}}>
              <Text style={styles.inlineTextContainer3}>Enter Discount{' '} :</Text>
              <TextInput
                  style={{marginLeft:26,marginTop:-3}}
                  placeholder="Discount"
                  keyboardType="numeric"
                  placeholderTextColor="#333"
                  value={this.state.discount.toString()}
                  onChangeText={(text) => this.discountOnChangeHandler(text)}
              />
</View>
              <Text style={styles.inlineTextContainer4}>
                Order Total {'      '} : RS.{' '}
                {this.state.grandTotal}
              </Text>
            </View>
          </View>
          {/*Ending Discount calculating*/}

          {/*Stating return table*/}
          <Text style={styles.inlineTextContainer7}>Returns</Text>

          <Table borderStyle={{borderColor: 'transparent'}}>
            <Row
                data={state.returnTableHead}
                style={styles.head}
                textStyle={styles.text}
                widthArr={state.widthArr}
            />
            {this.state.returnTableData.map((rowData, index) => (
                <TableWrapper style={styles.row}>
                  <Cell data={index + 1} textStyle={styles.text} />
                  {Object.values(rowData)
                      .filter((element, index) => index != 3)
                      .map((cellData, cellIndex) => (
                          <Cell data={cellData} textStyle={styles.text} />
                      ))}

                  <Cell data={increaseReturn(index)} />
                  <Cell data={decreaseReturn(index)} />
                  <Cell textStyle={styles.text} data={removeReturn(1, index)} />
                </TableWrapper>
            ))}
          </Table>
          {/*Ending return table */}

          {/*starting Return Total &  Bill Value calculating */}
          <View style={styles.card2}>
            <View style={styles.cardInfo2}>
              <Text style={styles.cardTitle2}>
                Return Total  {' '}:{'  '} Rs. {this.state.returnTotal}
              </Text>

              <Text style={styles.inlineTextContainer5}>
                Final Bill Value {'  '}:{'  '} Rs. {this.state.billValue}
              </Text>
            </View>
          </View>
          {/*Ending Return Total &  Bill Value calculating*/}

          {/*   starting submit button */}
          <View>
            <TouchableOpacity
                onPress={() => this.submitButtonHandler()}
                style={styles.orderNowBtn}>
              <Text style={styles.orderNowText}>Order Now</Text>
            </TouchableOpacity>

            {/*<TouchableOpacity*/}
            {/*    onPress={() => this.refreshCart()}*/}
            {/*    style={styles.orderNowBtn}>*/}
            {/*  <Text style={styles.orderNowText}>Clear</Text>*/}
            {/*</TouchableOpacity>*/}


          </View>

          {/*  ending submit button */}
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
                      this.props.navigation.navigate('Category', { title: 'Cart' })
                  }>
                <Ionicons name="pricetags" size={28} color="#ffffff" />
              </TouchableOpacity>
            </View>
            <View style={styles.productCartInlineViewB}>
              <TouchableOpacity
                  onPress={() =>
                      this.props.navigation.navigate('product', { title: 'Product' })
                  }>
                <Ionicons name="ios-cube" size={28} color="#ffffff" />
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







        </SafeAreaView>
    );
  }
}

Cart.contextType = CartContext;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // margin: 5,
    backgroundColor: '#ffffff',
  },

  head: {
    height: 40,
    backgroundColor: '#5fa3ee',
  },

  text: {
    margin: 5,
    fontSize: 11,
    /*fontWeight: 'bold',*/
  },

  row: {
    flexDirection: 'row',
    backgroundColor: '#add8e6',

  },

  btn: {
    width: 58,
    height: 18,
    backgroundColor: '#78B7BB',
    borderRadius: 2,
  },

  btnText: {
    textAlign: 'center',
    color: '#fff',
  },

  productCartOverallView: {
    flexDirection: 'row',
    width: '80%',
    alignSelf: 'center',
    marginTop: 0,
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
  buttonContainer: {
    margin: 20,
  },
  multiButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  addToCart: {
    height: 25,
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#009387',
    borderRadius: 10,
    marginRight: 0,
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

  formWrapper: {
    width: '80%',
    marginTop: 30,
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

  textContainer: {
    height: 220,
    marginVertical: 17,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5,
    marginLeft: 20,
    marginRight: 40,
    marginTop: 20,
  },

  inlineTextContainer: {
    color: '#333',
    fontSize: 13,
    marginTop: 0,
    marginBottom: 5,
    marginLeft: 45,
    fontStyle: 'italic',
  },

  inlineTextContainer2: {
    color: '#333',
    fontSize: 13,
    marginTop: 1,
    marginBottom: 10,
    marginLeft: 5,
    fontStyle: 'italic',
  },

  inlineTextContainer3: {
    color: '#333',
    fontSize: 13,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 5,
    // fontStyle: 'italic',
  },

  inlineTextContainer4: {
    color: '#333',
    fontSize: 13,
    marginTop: 0,
    marginBottom: 10,
    marginLeft: 5,
    fontWeight: 'bold',
  },

  inlineTextContainer5: {
    fontSize: 15,
    marginTop: 0,
    marginBottom: 10,
    fontWeight: 'bold',
    marginLeft: 5,
    color: '#3b528e',
  },

  inlineTextContainer6: {
    fontSize: 15,
    marginTop: 0,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#3b528e',
  },

  inlineTextContainer7: {
    fontSize: 22,
    marginTop: 35,
    marginBottom: 5,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'blue',
    textDecorationLine: 'underline',
  },

  orderNowBtn: {
    height: 52,
    width: 130,
    justifyContent: 'center',
    alignItems: 'center',
    /*    alignSelf: 'center',*/
    backgroundColor: '#2874A6',
    borderRadius: 10,
    marginLeft: 140,

    fontSize: 15,
  },

  orderNowText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 19,
  },

  card: {
    height: 110,
    marginVertical: 17,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5,
    marginLeft: 10,
    marginRight: 125,
    marginTop: 20,
    width:'95%'
  },

  cardInfo: {
    flex: 2,
    padding: 10,
    borderColor: '#85a7ee',
    // borderWidth: 2,
    backgroundColor: '#e1e6f6',
  },

  cardTitle: {
    /*fontWeight: 'bold',*/
    marginLeft: 30,
    marginRight: 40,
    marginBottom: 0,
    marginTop: 12,
    fontStyle: 'italic',
  },

  card2: {
    height: 80,
    marginVertical: 17,
    flexDirection: 'row',
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5,
    marginLeft: 10,
    marginRight: 130,
    marginTop: 20,
    width:'95%'
  },

  cardInfo2: {
    flex: 2,
    padding: 10,
    borderColor: '#85a7ee',
    // borderWidth: 2,
    // borderBottomWidth:2,
    // borderTopWidth:2,
    backgroundColor: '#e1e6f6',
  },

  cardTitle2: {
    /*fontWeight: 'bold',*/
    marginLeft: 5,
    marginRight: 40,
    marginBottom: 7,
    marginTop: 5,
    // fontStyle: 'italic',
  },





  rect: {
    width: 415,
    height: 55,
    backgroundColor: "#0872ce",
    flexDirection: "row",
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
    fontSize: 20,
    marginLeft: 10,
    marginTop: 1
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
