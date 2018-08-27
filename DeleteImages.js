import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import firebase from './FireConn';

export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      avatar:null
    }

    firebase.storage().ref().child('images/imagem2.jpg').getDownloadURL().then((url)=>{
      this.setState({avatar:{uri:url}});
    });

    this.remover = this.remover.bind(this);
  }

  remover() {
    firebase.storage().ref('images/imagem2.jpg').delete().then(()=>{
      this.setState({avatar:null});
    }).catch((error)=>{
      alert(error.code);
    });
  }

  render() {
    return(
      <View style={styles.container}>
        <Image source={this.state.avatar} style={styles.avatar}/>
        <Button title="Remover Avatar" onPress={this.remover} />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop: 20
  },
  avatar:{
    width: 100,
    height: 100
  }
});
