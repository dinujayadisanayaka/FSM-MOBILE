import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Button,
    SafeAreaView,
} from 'react-native';
import {Table, TableWrapper, Row, Cell} from 'react-native-table-component';
import {cart, CartContext} from '../Context/context';
 import {Users,UserContext} from '../Context/context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileScreen from "./ProfileScreen";
import axios from "axios";
import Icon from 'react-native-vector-icons/Ionicons';


const initialState = {
    numOfBills:null,
    totalValue:null,
    tableHead:['',''],
    tableData:['',''],
    Target:" ",
    Remaining:null,
    tostr:null,
    Remain:[''],
    dates:['',''],
    ft:['From','To'],

};


export default class Totalsales extends Component {
    // constructor() {
    //     super();
    //     this.state = initialState;
    // }
    state = initialState;


    test (){
        console.log(this.state.Target);
        this.state.Target=(parseFloat(this.state.Target))-this.state.totalValue;
        this.state.Remaining=parseFloat(this.state.Target).toFixed(2)
        // this.setState((cur)=>({
        //     Remain:[this.state.Remaining.toString()],
        // }));

        this.state.tostr=this.state.Remaining.toString();
        this.setState({Remain:[this.state.tostr.toString()],});
        console.log(this.state.Remaining);
    }

    componentDidMount() {
        console.log('user-->'+this.context.loginuserid);
        console.log('SD-->'+this.context.startdate);
        console.log('ED-->'+this.context.enddate);

        axios.get('http://104.236.38.247:8000/api/getallorders/'+this.context.loginuserid,{
            params:{
                start_date:this.context.startdate,
                end_date:this.context.enddate
            }


            })
            .then((res) => {
                console.log(res.data);
                (this.state.totalValue=(parseFloat(res.data[0].totalValue).toFixed(2)));
                (this.state.numOfBills=res.data[0].numOfBills);
                console.log(this.state.numOfBills);
                console.log(this.state.totalValue);

                this.setState((cur)=>({
                    tableHead:['Total No of Bills  :',res.data[0].numOfBills],
                    tableData:['Total sales Amount :',(parseFloat(res.data[0].totalValue).toFixed(2))],
                    dates:[this.context.startdate.toDateString(),this.context.enddate.toDateString()],
                }));


            })
            .catch((error) => {
                console.log(error.message);
            });
    }

submit (){
    this.setState(initialState);
    this.props.navigation.navigate('SelectDate');
}



    render() {
        const { navigation } = this.props;
        return (


            <SafeAreaView style={styles.container}>
                <View style={styles.container}>
                    <View style={styles.rect}>
                        <View style={styles.iconRow}>
                            <Icon name="md-menu" style={styles.icon} onPress={() => navigation.openDrawer()}></Icon>
                            <Text style={styles.cart}>Summary</Text>
                        </View>
                    </View>

            <ScrollView style={styles.scrollview}>


                <Text style={{color:'blue',
                    fontWeight:'bold',
                    fontSize:26,
                    marginLeft:130,
                    marginTop:15,
                    marginBottom:15}}>
                    Total Sales
                </Text>


 <View style={{marginBottom:15}}/>

                <Table borderStyle={{borderBottomWidth:7,borderBottomColor:'blue'}}>
                <Row
                    data={this.state.ft}
                    style={styles.head}
                    textStyle={{textAlign: 'center',fontWeight:'bold'}}
                />
                <Row
                    data={this.state.dates}
                    style={styles.head}
                    textStyle={{textAlign: 'center',fontSize:17}}
                />
            </Table>


<View style={{marginBottom:35}}/>



             <Table borderStyle={{borderColor: 'transparent'}} borderStyle={{borderWidth: 5, borderColor: '#c8e1ff'}}>
                 <Row
                      data={this.state.tableHead}
                         style={styles.head}
                        textStyle={styles.text}
                             />
                 <Row
                     data={this.state.tableData}
                     style={styles.head}
                     textStyle={styles.text}
                 />
            </Table>



                {/*<View style={{*/}
                {/*    flexDirection:"row"*/}
                {/*}}>*/}
            <TextInput
                style={styles.input}
                placeholder=" Enter Monthly Target "
                placeholderTextColor={'#253334'}
                keyboardType={'numeric'}
                value={this.state.Target}
                onChangeText={(text) => this.setState({Target:text})}

            />
            <TouchableOpacity style={styles.loginBtn} title="Submit"
                              onPress={() => {
                                  this.test();
                              }}>
                <Text style={styles.loginText}>Calculate Remaining</Text>
            </TouchableOpacity>
       {/*</View>*/}


            <Table borderStyle={{borderColor: 'transparent'}}>
                <Row
                    data={this.state.Remain}
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

                </View>
            </SafeAreaView>


        );
    }
}


Totalsales.contextType = UserContext;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 500
    },


    input: {
        height: 50,
        marginTop:50,
        marginLeft:40,
        borderColor:'#000000',
        borderWidth:1,
        width:'80%',
        backgroundColor: '#add8e6',
        paddingHorizontal: 10,
        color: '#1f1010',
        borderRadius: 15,
    },
    logo: {
        fontWeight: "bold",
        fontSize: 50,
        color: "#fb5b5a",
        marginBottom: 40,
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center"
    },
    inputView: {
        width: "80%",
        backgroundColor: "#465881",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    inputText: {
        height: 50,
        color: "white"
    },
    forgot: {
        color: "white",
        fontSize: 11
    },
    loginBtn: {
        width: "40%",
        backgroundColor: "#2874A6",
        borderRadius: 45,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
        marginTop:20,
        marginLeft:120,
        marginBottom: 10
    },
    loginText: {
        color: "white"
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
        marginLeft: 60,
        marginTop: 15,
        marginBottom: 10,
    },
    productCartOverallViewB: {
        flexDirection: 'row',
        width: '100%',
        alignSelf: 'center',
        // marginTop: 333,
        backgroundColor: '#0872ce'
    },
    text: {
        fontWeight:'bold',
        fontSize:17,
        textAlign: 'center'
    }
});
