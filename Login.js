import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, Image,Alert, ActivityIndicator, ScrollView } from 'react-native'
import firebase from '../firebase.js'
//import Loading from '../screens/Loading.js'
import * as Progress from 'react-native-progress';
import { StackActions, NavigationActions } from 'react-navigation'; 

class Login extends Component {
  state = {
    email:'',
    password:'',
    loader:false,
  }
  resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'Home' })],
  });
  login(email,password){
    
    if(email == '' || password == ''){
      Alert.alert('Error', 'Fields cannot be empty !')
    }
    else{

      this.setState({
        loader:true,
      })
   
    
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          this.changeStatus(email)
          global.LoginEmail = email;
          global.LoginStatus = "1";

         


          //this.props.navigation.navigate('Home', {email:this.state.email,})
          this.props.navigation.navigate('Dash')
          this.setState({
            loader:false,
          })
          //this.props.navigation.dispatch(this.resetAction)
        })
        .catch(
          (error) => {
            this.setState({
              loader:false,
            })

            Alert.alert('Error',error.message)
            
          }
        )

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // User logged in already or has just logged in.
          //console.log(user.uid);
          //Alert.alert('currentUser Id', user.uid.toString())
          global.userID = user.uid.toString()
        } else {
          // User not logged in or has just logged out.
          

        }
      });

      var str = email.toUpperCase();
      var res = str.replace(".", "DOT");

      firebase.database().ref('userDetails/'+res+'/userName').once('value', function (snapshot) {
        //console.log(snapshot.val())
        global.userName = snapshot.val()
    });

    }
    this.textInput1.clear()
    this.textInput2.clear()
    }
  static navigationOptions ={
    header:null
  }
  changeStatus(email){
    var str = email.toUpperCase();
        var res = str.replace(".", "DOT");
        const invoiceRef = firebase.database().ref('userDetails').child(res).update({'userloginStatus': '1'})
  }
   render() {
       return (
         <ImageBackground source={require('../images/background.jpg')} style={{width:'100%', height:'100%'}}>
           
           {/* {
             Alert.alert('email',this.props.navigation.state.params.email)
           } */}

           <ScrollView>
           <View style={styles.container}>
             {/* This is Login */}
              <Text style={styles.mainTxt}>
                Login To Your Account
              </Text>
              <ActivityIndicator style={{height:50, width:50, }} size="large" animating={this.state.loader} />
              {/* <Progress.Circle size={30}  animated={false}/> */}
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
                    ref={input => { this.textInput1 = input }}
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
                  onChangeText={(password) => this.setState({password:password})}
                  style={{fontSize:20}}
                    placeholder={'Enter Your Password'}
                    ref={input => { this.textInput2 = input }}
                  />
                </View>
              </View>

              <TouchableOpacity
              //  onPress={() => this.props.navigation.push("Home")}
              onPress={() => this.login(this.state.email,this.state.password)}
               >
                <View style={styles.loginBtn}>
                  <Text style={styles.loginBtnTxt}>
                    Login
                  </Text>
                </View>
              </TouchableOpacity>

              <View style={{flexDirection:'row', marginTop:40}}>
               <View style={{flex:3, }}>
               <Text style={{textAlign:'right', marginRight:5, fontSize:17, fontWeight:'bold', color:'#6f6f6f'}}>
                  Don't have an account ?
                </Text>
               </View>
               <View style={{flex:2,}}>
                 <TouchableOpacity onPress={() => this.props.navigation.push("SignUp")}>
               <Text style={{fontSize:17, fontWeight:'bold', color:'#00df70'}}>
                  Signup now
                </Text>
                </TouchableOpacity>
               </View>
              
               
             </View>

             <View style={{flexDirection:'row', marginTop:15}}>
               <View style={{flex:3, }}>
               <Text style={{textAlign:'right', marginRight:5, fontSize:17, fontWeight:'bold', color:'#6f6f6f'}}>
                  Forgotten Password ?
                </Text>
               </View>
               <View style={{flex:2,}}>
                 <TouchableOpacity onPress={() => this.props.navigation.push("ForgotPassword")}>
               <Text style={{fontSize:17, fontWeight:'bold', color:'#00df70'}}>
                  Reset now
                </Text>
                </TouchableOpacity>
               </View>
              
               
             </View>

           </View>
           </ScrollView>
            
           {/* <View style={{flex:1, borderColor:'gray', borderTopWidth:1, marginLeft:20, marginRight:20}}>
             
                
           </View> */}
         </ImageBackground>
           
        )
    }
}

export default Login

const styles = StyleSheet.create({
  container:{
    flex:1,
    //backgroundColor:'whitesmoke',
    alignItems:'center',
    justifyContent:'center',
  },
  textBox:{
    height:50,
    width:350,
    //backgroundColor:'green',
    borderColor:'#00df70',
    borderBottomWidth:1,
    borderTopWidth:1, 
    marginTop:30,
    flexDirection:'row'
  },
  loginBtn:{
    height:50,
    width:200,
    backgroundColor:'#00df70',
    marginTop:40,
    borderRadius:30,
    alignItems:'center',
    justifyContent:'center',
  },
  loginBtnTxt:{
    fontSize:20,
    fontWeight:'bold',
    color:'white'
  },
  mainTxt:{
    marginTop:150,
    fontSize:25,
    fontWeight:'bold',
    color:'#6f6f6f'
  }
})

