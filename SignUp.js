import React, { Component } from 'react'
import { View, StyleSheet, ScrollView, Text, TextInput, Image, TouchableOpacity, Alert } from 'react-native'
import firebase from '../firebase.js'


 
class App extends Component {
  state = {
    userName:'',
    email:'',
    userPhoneNo:'',
    userPassword:'',
    userPasswordAgain:'',
    userloginStatus:'0'
    //customerID:'',
  }
  signUp(email,userPassword, userPasswordAgain){

    if(userPassword == userPasswordAgain){
      firebase
      .auth()
      .createUserWithEmailAndPassword(email, userPassword)
      .then(() => this.props.navigation.navigate('OtherDetails',{email:this.state.email,}))
      .catch(error => this.setState({ errorMessage: error.message }))
    }
    else{
      Alert.alert('Sign Up Failed', 'Passsword Did Not Match')
    }

    
  }
    static navigationOptions ={
        header:null
      }
   render() {
       return (
           <View style={styles.container}>
             <ScrollView>
             <View style={styles.content}>
                  

                    <View style={styles.titleView}>
                      <Text style={styles.titleViewText}>
                          INVOICE APP
                      </Text>
                    </View>

                    <Text style={styles.signUpText}>
                        Signup for new account
                    </Text>

                    {/* <View style={styles.textBox}>
                      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                        <Image
                          source={require('../images/user.png')}
                          style={{height:22, width:20}}
                        />
                      </View>
                      <View style={{flex:5}}>
                        <TextInput
                          onChangeText={(userName) => this.setState({userName:userName})}
                          style={{fontSize:20,}}
                          placeholder={'Enter Your Name'}
                        />
                      </View>
                    </View> */}

                    <View style={styles.textBox}>
                      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                        <Image
                          source={require('../images/email.png')}
                          style={{height:19, width:26.6}}
                        />
                      </View>
                      <View style={{flex:5}}>
                        <TextInput
                          onChangeText={(email) => this.setState({email:email})}
                          style={{fontSize:20,}}
                          placeholder={'Enter Your Email'}
                        />
                      </View>
                    </View>

                    {/* <View style={styles.textBox}>
                      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                        <Image
                          source={require('../images/phone.png')}
                          style={{height:110, width:110, marginTop:5,}}
                        />
                      </View>
                      <View style={{flex:5}}>
                        <TextInput
                          onChangeText={(userPhoneNo) => this.setState({userPhoneNo: userPhoneNo})}
                          style={{fontSize:20,}}
                          placeholder={'Enter Your Phone No'}
                        />
                      </View>
                    </View> */}

                    <View style={styles.textBox}>
                      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                        <Image
                          source={require('../images/pass.png')}
                          style={{height:24.7, width:20.4}}
                        />
                      </View>
                      <View style={{flex:5}}>
                        <TextInput
                        secureTextEntry={true}
                          onChangeText={(userPassword) => this.setState({userPassword: userPassword})}
                          style={{fontSize:20,}}
                          placeholder={'Enter Your Password'}
                        />
                      </View>
                    </View>

                    <View style={styles.textBox}>
                      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                        <Image
                          source={require('../images/pass.png')}
                          style={{height:24.7, width:20.4}}
                        />
                      </View>
                      <View style={{flex:5}}>
                        <TextInput
                          secureTextEntry={true}
                          onChangeText={(userPasswordAgain) => this.setState({userPasswordAgain: userPasswordAgain})}
                          style={{fontSize:20,}}
                          placeholder={'Enter Password Again'}
                        />
                      </View>
                    </View>

                    <TouchableOpacity
                        onPress={() => this.signUp(this.state.email,this.state.userPassword, this.state.userPasswordAgain)}
                    >

                      <View style={styles.loginBtn}>
                        <Text style={styles.loginBtnTxt}>
                          Sign Up
                        </Text>
                      </View>
                    </TouchableOpacity>  

                  
               </View>
               
               
             <View style={{flexDirection:'row', marginTop:10, alignItems:'center', justifyContent:'center'}}>
               <View style={{flex:3, }}>
               <Text style={{textAlign:'right', marginRight:5, fontSize:17, fontWeight:'bold', color:'#6f6f6f'}}>
                  Already have an account ?
                </Text>
               </View>
               <View style={{flex:2,}}>
                 <TouchableOpacity onPress={() => this.props.navigation.push("Login")}>
               <Text style={{fontSize:17, fontWeight:'bold', color:'#00df70'}}>
                  Login Now
                </Text>
                </TouchableOpacity>
               </View>
              
               
             </View>
                
           
                 
                 </ScrollView>
                 
           </View>  
        )
    }
}

export default App

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fafafa',
  },
  content:{
    flex:10,
    backgroundColor:'#fafafa'
  },
  footer:{
    flex:1,
    backgroundColor:'#2ecb70'
  },
  titleView:{
    height:150,
    width:150,
    backgroundColor:'#00df70',
    borderRadius:80,
    alignSelf:'center',
    marginTop:20,
    alignItems:'center',
    justifyContent:'center',
  },
  titleViewText:{
    fontSize:20,
    fontWeight:'bold',
    color:'white',
  },
  signUpText:{
    fontSize:22,
    fontWeight:'bold',
    color:'#6f6f6f',
    marginTop:30,
    alignSelf:'center',
    marginBottom:30,
  },
  textBox:{
    height:50,
    //backgroundColor:'green',
    borderColor:'#00df70',
    borderBottomWidth:1,
    borderTopWidth:1, 
    marginTop:20,
    flexDirection:'row',
    alignSelf:'center',
    marginLeft:20,
    marginRight:20,
  },
  loginBtn:{
    height:50,
    width:170,
    backgroundColor:'#00df70',
    marginTop:40,
    borderRadius:30,
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center',
    marginBottom:50,
  },
  loginBtnTxt:{
    fontSize:20,
    fontWeight:'bold',
    color:'white'
  },

})
