// import React, {useContext, useState} from "react";
// import {Button, Text, TouchableOpacity, View} from "react-native";
// import DateTimePickerModal from "react-native-modal-datetime-picker";
// import {Users,UserContext} from '../Context/context';
//
// const Totalitems = () => {
//     const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
//
//     const dateset= useContext(UserContext);
//
//     const showDatePicker = () => {
//         setDatePickerVisibility(true);
//     };
//
//     const hideDatePicker = () => {
//         setDatePickerVisibility(false);
//     };
//
//
//     const handleConfirm = (date) => {
//         console.log("A date has been picked: ", date);
//         const k=date;
//         hideDatePicker();
//         console.log('date1------> ' +k+ ' <--------');
//         (dateset.startdate=date);
//         console.log('context----->'+dateset.startdate);
//     };
//
//     const handleConfirm2 = (date) => {
//         console.log("A date has been picked: ", date);
//         const r=date;
//         hideDatePicker();
//         console.log('date1------> ' +r+ ' <--------');
//         (dateset.enddate=date);
//         console.log('context----->'+dateset.enddate);
//     };
//
//
//     return (
//         <View>
//             <Button title="Show Date Picker1" onPress={showDatePicker} />
//             <TouchableOpacity><Text></Text></TouchableOpacity>
//             <Button title="Show Date Picker1" onPress={showDatePicker} />
//             <DateTimePickerModal
//                 isVisible={isDatePickerVisible}
//                 mode="date"
//                 onConfirm={handleConfirm}
//                 onCancel={hideDatePicker}
//             />
//
//             <DateTimePickerModal
//                 isVisible={isDatePickerVisible}
//                 mode="date"
//                 onConfirm={handleConfirm2}
//                 onCancel={hideDatePicker}
//             />
//         </View>
//     );
// };
//
// export default Totalitems;
//











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

// import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
const initialState = {
    tableHead: [
        'Item No',
        'Product Name',
        'Quantity',
        'total',
    ],
    tableFooter:['','','',''],
    arr: [],
    TotalQuantity:0,
    TotalBillValue:0,
    dates:['',''],
    ft:['From','To'],

};


export default class Totalitems extends Component {
    constructor() {
        super();
        this.state = initialState;
    }



    componentDidMount() {
        axios.get('http://104.236.38.247:8000/api/totalitems/'+this.context.loginuserid,{
            params:{
                start_date:this.context.startdate,
                end_date:this.context.enddate,
            }


        })
            .then((res) => {
                console.log(res.data);
                let count = Object.keys(res.data).length;
                console.log(count);
                (this.state.TotalQuantity=0);
                (this.state.TotalBillValue=0);
                for (let i = 0; i < count; i++) {
                    this.setState((cur) => ({
                        arr: [...cur.arr,[i+1,res.data[i].product_Name,res.data[i].quantity,res.data[i].total]],
                        ...cur.TotalQuantity+=parseInt(res.data[i].quantity),
                        ...cur.TotalBillValue+=res.data[i].total,
                        dates:[this.context.startdate.toDateString(),this.context.enddate.toDateString()],
                    }));

                }
                this.setState((cur)=>({
                    tableFooter:[null,'Total',this.state.TotalQuantity,this.state.TotalBillValue]
                }));
                console.log(this.state.arr);
                console.log(this.state.TotalQuantity);
                console.log('Total bill value ->>>'+this.state.TotalBillValue);
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
                        <Text style={styles.cart}>Summary</Text>
                    </View>
                </View>

                <ScrollView style={styles.scrollView}>

                    <Text style={{color:'blue',
                        fontWeight:'bold',
                        fontSize:26,
                        marginLeft:90,
                        marginTop:15,
                        marginBottom:10}}>
                        Item Wise Sales
                    </Text>





         <View style={{marginBottom:15}}/>

                    <Table borderStyle={{borderBottomWidth:7,borderBottomColor:'blue'}}>
                        <Row
                            data={this.state.ft}

                            textStyle={{textAlign: 'center',fontWeight:'bold'}}
                        />
                        <Row
                            data={this.state.dates}

                            textStyle={{textAlign: 'center',fontSize:17}}
                        />
                    </Table>


          <View style={{marginBottom:35}}/>









                    <Table borderStyle={{borderColor: 'transparent'}} borderStyle={{borderWidth: 2, borderColor: '#a1bff5'}}>
                        <Row
                            data={this.state.tableHead}
                            style={styles.head}
                            textStyle={styles.text}
                        />
                    </Table>
                    <Table borderStyle={{borderColor: 'transparent'}}>

                        <Rows data={this.state.arr} style={styles.row} textStyle={styles.text}/>
                    </Table>



                    <Table borderStyle={{borderColor: 'transparent'}} borderStyle={{borderWidth: 2, borderColor: '#a1bff5'}}>
                        <Row
                            data={this.state.tableFooter}
                            style={styles.head}
                            textStyle={styles.text}
                        />
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
                            onPress={() =>
                                this.props.navigation.navigate('Report', { title: 'Explore' })
                            }>
                            <Ionicons name="ios-create" size={29} color="#ffffff" />
                        </TouchableOpacity>
                    </View>
                    {/*<View style={styles.productCartInlineViewB}>*/}
                    {/*    <TouchableOpacity*/}
                    {/*        onPress={() =>*/}
                    {/*            this.props.navigation.navigate('SelectDate')*/}
                    {/*        }>*/}
                    {/*        <Ionicons name="md-calculator" size={26} color="#ffffff" />*/}
                    {/*    </TouchableOpacity>*/}
                    {/*</View>*/}


                </View>


            </SafeAreaView>

        );
    }
}


Totalitems.contextType = UserContext;



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
    rect: {
        width: 415,
        height: 62,
        backgroundColor: '#0872ce',
        flexDirection: "row",
        marginTop: -6,
        // fontSize:7,
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

        // borderRadius: 60,
        textAlign: 'center',
        marginRight: 20,
        marginLeft: 65,
        marginTop: 15,
        marginBottom: 10,
    },
    productCartOverallViewB: {
        flexDirection: 'row',
        width: '100%',
        alignSelf: 'center',
        // marginTop: 299,
        marginBottom:0,
        backgroundColor: '#0872ce'
    }
});
