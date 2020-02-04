import React, {Component} from 'react'
import {View, Text, StyleSheet, TextInput } from 'react-native'

class Card extends Component{
  render(){
    return(
      <View style={{height:50, margin:5, backgroundColor:'white', flexDirection:'row'}}>
         <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Text>
              {this.props.name}
            </Text>
         </View>
         <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
           <Text>
            {this.props.age}
           </Text>
         </View>
      </View>
    );
  }
}

export default class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      persons:[
        {id:'1', name:'arsal', age:'20'},
        {id:'2', name:'javed', age:'25'},
        {id:'3', name:'khan', age:'30'},
        {id: '4', name:'farhan', age:'35'}
      ]
    }
  }
  render(){
    return(
      <View style={styles.container}>
          
            {/* {this.state.persons.map(o => <Text key={o.id}>{o.name}</Text>)} */}

            {this.state.persons.map(o => <Card name={o.name} age={o.age}/>)}
          
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'skyblue',
    flex:1,
  },
})
=======================================
import React, {Component} from 'react'
import {View, Text, StyleSheet, TextInput,TouchableOpacity } from 'react-native'

class Card extends Component{
  render(){
    return(
      <View style={{height:50, margin:5, backgroundColor:'white', flexDirection:'row'}}>
         <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Text>
              {this.props.name}
            </Text>
         </View>
         <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
           <Text>
            {this.props.age}
           </Text>
         </View>
      </View>
    );
  }
}

export default class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      persons:[
        {id:'1', name:'arsal', age:'20'},
        {id:'2', name:'javed', age:'25'},
        {id:'3', name:'khan', age:'30'},
        {id: '4', name:'farhan', age:'35'}
      ],
      id:'5',
      name:'',
      age:'12',
    }
  }
  render(){
    return(
      <View style={styles.container}>
            <TextInput
              placeholder='Name'
              onChangeText={
                (name) => {
                  this.setState({
                    name:name,
                  })
                }
              }

            />

            <TouchableOpacity
            onPress={
              () => {
                var obj = {id:'1',name:this.state.name,age:'14'}
               this.setState({
                 persons:[
                   ...this.state.persons,
                   obj
                  ] 
               })
              }
            }
             style={{height:50, width:50, backgroundColor:'blue'}}>

            </TouchableOpacity>

            {this.state.persons.map(o => <Card name={o.name} age={o.age}/>)}
          
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:'skyblue',
    flex:1,
  },
})
