
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import {Users,UserContext} from '../Context/context';
import ExploreScreen from "./ExploreScreen";
import axios from "axios";
export default class ReportScreen extends React.Component {
  constructor() {
    super();

  }


  render(){
    return (
      <View style={styles.container}>
        {/*<Text style={styles.logo}>Reports</Text>*/}

        <TouchableOpacity
            style={styles.reportBtn}
            onPress={() =>
            {(this.context.reportState=1);
                this.props.navigation.navigate('SelectDate')}
            }>
          <Text style={styles.reportText}>Total Sales</Text>
        </TouchableOpacity>




        <TouchableOpacity
            style={styles.reportBtn}
            onPress={() =>{
                (this.context.reportState=2);
                console.log('report dtate->>>'+this.context.reportState)
                this.props.navigation.navigate('SelectDate');}
            }>
          <Text style={styles.reportText}>Item Wise Sales</Text>
        </TouchableOpacity>




        <TouchableOpacity style={styles.reportBtn}>
          <Text style={styles.reportText}
                onPress={() =>
                {(this.context.reportState=3);
                    this.props.navigation.navigate('SelectDate')}
                }>Shop Wise Sales</Text>
        </TouchableOpacity>


          <TouchableOpacity style={styles.reportBtn}>
              <Text style={styles.reportText}
                    onPress={() =>
                    {(this.context.reportState=3);
                        this.props.navigation.navigate('VehicleStock')}
                    }>Current Stock</Text>
          </TouchableOpacity>


      </View>
    );
  }
}
ReportScreen.contextType = UserContext;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    fontWeight:"bold",
    fontSize:50,
    color:"#fb5b5a",
    marginBottom:40
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
  reportBtn:{
    width:"80%",
    backgroundColor:"#1a769a",
    borderRadius:10,
    height:80,
    alignItems:"center",
    justifyContent:"center",
    marginTop:5,
    marginBottom:10
  },
  reportText:{
    color:"white",
    fontWeight: "bold",
    fontSize:24,
  }
});
