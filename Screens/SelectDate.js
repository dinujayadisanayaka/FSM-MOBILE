import React, {useContext, useEffect, useState} from "react";
import {Button, Text, TextInput, TouchableOpacity, View,StyleSheet} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {Users,UserContext} from '../Context/context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const SelectDate = (props) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);

    const navigation = useNavigation();
    const dateset= useContext(UserContext);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const showDatePicker2 = () => {
        setDatePickerVisibility2(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const hideDatePicker2 = () => {
        setDatePickerVisibility2(false);
    };


    const handleConfirm = (date) => {
        console.log("A date has been picked: ", date);
        hideDatePicker();
        (dateset.startdate=date);
        console.log('context----->'+dateset.startdate);
    };

    const handleConfirm2 = (date) => {
        console.log("A date has been picked: ", date);
        hideDatePicker();
        (dateset.enddate=date);
        console.log('context----->'+dateset.enddate);
    };

    const view = () => {
        props.navigation.navigate('Totalsales');
    };
    const view2 = () => {
        props.navigation.navigate('Totalitems');
    };

    const view3 = () => {
        props.navigation.navigate('BillsFromShops');
    };

    useEffect(()=>{
        console.log(dateset.reportState);
    },[])


    return (
        <View>



            <View style={styles.rect}>
                <View style={styles.iconRow}>
                    <Icon name="md-menu" style={styles.icon} onPress={() => navigation.openDrawer()}></Icon>
                    <Text style={styles.cart}>Select Date</Text>
                </View>
            </View>



            {/*<Button title="select Start Date" onPress={showDatePicker} />*/}
            <TouchableOpacity
                style={styles.selectBtnA}
                onPress={showDatePicker}>
                <View style={{flexDirection:"row"}}>
                    <Text
                        style={styles.viewText}>
                        Select Start Date
                    </Text>
                <Icon name="calendar" style={styles.icon}></Icon>
                </View>
            </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />

            {/*<Button title="Select End Date" onPress={showDatePicker2} />*/}
            <TouchableOpacity
                style={styles.selectBtnB}
                onPress={showDatePicker2}>
                <View style={{flexDirection:"row"}}>
                    <Text
                        style={styles.viewText}>
                        Select End Date
                    </Text>
                    <Icon name="calendar" style={styles.icon}></Icon>
                </View>
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isDatePickerVisible2}
                mode="date"
                onConfirm={handleConfirm2}
                onCancel={hideDatePicker2}
            />



            {dateset.reportState==1?
                <TouchableOpacity style={styles.viewBtn} onPress={view}>
                    <Text style={styles.viewText}> View</Text>
                </TouchableOpacity>:null}

            {dateset.reportState==2?
                <TouchableOpacity style={styles.viewBtn} onPress={view2}>
                    <Text style={styles.viewText}> View</Text>
                </TouchableOpacity>:null}

            {dateset.reportState==3?
                <TouchableOpacity style={styles.viewBtn} onPress={view3}>
                    <Text style={styles.viewText}> View</Text>
                </TouchableOpacity>:null}




                {/*<Button title="View 1" onPress={view} />:null}*/}

            {/*<TouchableOpacity><Text></Text></TouchableOpacity>*/}
            {/*{dateset.reportState==2?<Button title="View 2" onPress={view2} />:null}*/}


            {/*<TouchableOpacity><Text></Text></TouchableOpacity>*/}
            {/*{dateset.reportState==3?<Button title="View 3" onPress={view3} />:null}*/}







            <View style={styles.productCartOverallViewB}>
                <View style={styles.productCartInlineViewB}>
                    <TouchableOpacity
                        onPress={() => props.navigation.navigate('Home')}>
                        {/* props.navigation.navigate('Totalitems'); */}
                        <Ionicons name="ios-home" size={26} color="#ffffff" />
                    </TouchableOpacity>
                </View>
                <View style={styles.productCartInlineViewB}>
                    <TouchableOpacity
                        onPress={() =>
                            props.navigation.navigate('Report', { title: 'Explore' })
                        }>
                        <Ionicons name="ios-create" size={29} color="#ffffff" />
                    </TouchableOpacity>
                </View>




            </View>
        </View>
    );
};

export default SelectDate;


const styles = StyleSheet.create({
    MainContainer: {

        flex: 1,

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
        marginTop:5
    },
    cart: {
        fontWeight:'bold',
        color: "rgba(245,245,245,1)",
        fontSize: 20,
        marginLeft: 0,
        marginTop: 0
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
        height: 29,
        textAlign: 'center',
        marginRight: 20,
        marginLeft: 60,
        marginTop: 10,
        marginBottom: 10,
    },
    productCartOverallViewB: {
        flexDirection: 'row',
        width: '100%',
        alignSelf: 'center',
        marginTop: 120,

        backgroundColor: '#0872ce'
    },
    viewBtn:{
        width:"60%",
        backgroundColor:"#0251ef",
        borderRadius:20,
        height:70,
        alignItems:"center",
        justifyContent:"center",
        marginTop:200,
        marginBottom:10,
        marginLeft:80
    },
    viewText:{
        color:"white",
        fontWeight: "bold",
        fontSize:20,
        marginLeft:10,
        marginRight:10,
        marginTop:5
    },
    selectBtnA:{
        width:"70%",
        backgroundColor:"#029cef",
        height:70,
        alignItems:"center",
        justifyContent:"center",
        marginTop:70,
        marginBottom:10,
        marginLeft:60
    },
    selectBtnB:{
        width:"70%",
        backgroundColor:"#029cef",
        height:70,
        alignItems:"center",
        justifyContent:"center",
        marginTop:70,
        marginBottom:10,
        marginLeft:60
    },
    selectText:{
        color:"white",
        fontWeight: "bold",
        fontSize:20,
    }
});
