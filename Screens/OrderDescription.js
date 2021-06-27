
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Button,
    SafeAreaView
} from 'react-native';
import {Table, TableWrapper, Row, Cell,Rows} from 'react-native-table-component';
import {cart, CartContext} from '../Context/context';
import {Users,UserContext} from '../Context/context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileScreen from "./ProfileScreen";
import axios from "axios";
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIconsIcon from "react-native-vector-icons/MaterialIcons";
const initialState = {
    tableHead: [
        'Item No',
        'Product Name',
        'Quantity',
    ],
    tableFooter:[0,''],
    tableData: ['','',''],
    BillValue:null,
    return_total:null,
    final_bill:null,
    placedDate:'',
    shopName:'',
    firstName:'',
    lastName:'',
    returnTableData: ['','',''],

};


export default class OrderDescription extends Component {
    constructor() {
        super();
        this.state = initialState;
    }



    componentDidMount() {
        axios.get('http://104.236.38.247:8000/api/orderdetails/'+this.context.oderDescription)
            .then((res) => {
                let count = Object.keys(res.data.data).length;
                for (let i = 0; i < count; i++) {
                    this.setState((cur) => ({
                        tableData: [...cur.tableData,[i+1,res.data.data[i].product_Name,res.data.data[i].quantity_per_product]],
                    }));

                }

                let count2 = Object.keys(res.data.return).length;
                for (let i = 0; i < count2; i++) {
                    this.setState((cur) => ({
                        returnTableData: [...cur.returnTableData,[i+1,res.data.return[i].product_Name,res.data.return[i].quantity_per_product]],
                    }));

                }





                this.setState({
                    BillValue:(res.data.description[0].bill_value),
                    placedDate:(res.data.description[0].placed_date),
                    return_total:(res.data.description[0].return_total),
                    final_bill:(res.data.description[0].final_bill),
                    shopName:(res.data.description[0].shop_name),
                    firstName:(res.data.description[0].first_name),
                    lastName:(res.data.description[0].last_name)
                });


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
                        <Text style={styles.cart}>Order Details</Text>
                    </View>
                </View>

                <ScrollView style={styles.scrollView}>

                 <View style={{
                     height:200,
                     width: '90%',
                     justifyContent: 'center',
                     // alignItems: 'center',
                     backgroundColor: '#add8e6',
                     marginVertical: 10,
                     marginLeft:18,
                     borderRadius:15,
                 }}>
                     <Text style={styles.txt}>Shop Name{'   '}:{'  '}{this.state.shopName}</Text>
                     <Text style={styles.txt}>Place by {'        '}:{'  '}{this.state.firstName} {this.state.lastName}</Text>
                    <Text style={styles.txt}>Placed date {'  '}:{'  '}{this.state.placedDate}</Text>
                     <Text style={styles.txt}>Bill value {'       '}:{'  '}{this.state.BillValue}</Text>
                     <Text style={styles.txt}>Return value{' '}:{'   '}{this.state.return_total}</Text>
                     <Text style={styles.txt}>Final bill {'        '}:{'  '}{this.state.final_bill}</Text>

                 </View>



                    <Table borderStyle={{borderColor: 'transparent'}} borderStyle={{borderWidth: 3, borderColor: '#a1bff5'}}>
                        <Row
                            data={this.state.tableHead}
                            style={styles.head}
                            textStyle={styles.texthead}
                        />
                    </Table>
                    <Table borderStyle={{borderColor: 'transparent'}}>

                        <Rows data={this.state.tableData} style={styles.row} textStyle={styles.text}/>
                    </Table>



                    <Text  style={{

                        justifyContent: 'center',
                        alignItems: 'center',
                        height:35,
                        marginVertical: 5,
                        marginTop:20,
                        fontWeight:'bold',
                        fontSize:20,
                        marginLeft:160,
                        color: 'blue',
                    }}>Returns</Text>



                    <Table borderStyle={{borderColor: 'transparent'}} borderStyle={{borderWidth: 3, borderColor: '#a1bff5'}}>
                        <Row
                            data={this.state.tableHead}
                            style={styles.head}
                            textStyle={styles.texthead}
                        />
                    </Table>
                    <Table borderStyle={{borderColor: 'transparent'}}>

                        <Rows data={this.state.returnTableData} style={styles.row} textStyle={styles.text}/>
                    </Table>













                </ScrollView>
                <View style={styles.productCartOverallViewB}>
                    <View style={styles.productCartInlineViewB}>
                        <TouchableOpacity
                            onPress={() => this.props.navigation.navigate('Home')}>
                            <Ionicons name="ios-home" size={26} color="#ffffff" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.productCartInlineViewB}>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('Explore')}>
                            <MaterialIconsIcon name="store" size={30} color="#ffffff"></MaterialIconsIcon>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.productCartInlineViewB}>
                        <TouchableOpacity
                            onPress={() =>
                                this.props.navigation.navigate('Category')

                            }>
                            <Ionicons name="ios-cart" size={28} color="#FFFFFF" />
                        </TouchableOpacity>
                    </View>


                </View>


            </SafeAreaView>

        );
    }
}


OrderDescription.contextType = UserContext;



const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    logo:{
        fontWeight:"bold",
        fontSize:50,
        color:"#fb5b5a",
        marginBottom:40,
        alignItems:"center",
        justifyContent:"center",
        textAlign:"center"
    },
    inputView:{
        width:"80%",
        backgroundColor:"#465881",
        borderRadius:25,
        height:50,
        marginBottom:20,
        justifyContent:"center",
        padding:20
    },
    inputText:{
        height:50,
        color:"white"
    },
    forgot:{
        color:"white",
        fontSize:11
    },
    loginBtn:{
        width:"50%",
        backgroundColor:"#fb5b5a",
        borderRadius:25,
        height:50,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        marginBottom:10
    },
    loginText:{
        color:"white"
    },
    head: { height: 40, backgroundColor: '#5fa3ee' },
    row: { flexDirection: 'row', backgroundColor: '#add8e6' },
    text: { textAlign: 'center', fontWeight: '100',margin:6 },
    texthead: { textAlign: 'center', fontWeight: 'bold',margin:6 },
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
        fontWeight:'bold',
        color: "rgba(245,245,245,1)",
        fontSize: 18.5,
        // marginLeft: 20,
        marginTop: 2
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
        marginRight: 20,
        marginLeft: 20,
        marginTop: 15,
        marginBottom: 10,
    },
    productCartOverallViewB: {
        flexDirection: 'row',
        width: '100%',
        alignSelf: 'center',
        // marginTop: 299,
        backgroundColor: '#0872ce'
    },
    txt:{
    color: 'black',
    textAlign: 'justify',
    fontWeight: 'bold',
    fontSize: 17,
        marginLeft:38,
        marginTop:5
}
});
