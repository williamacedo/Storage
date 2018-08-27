import React from 'react';
import { Image, StyleSheet, Button, Text, View} from 'react-native';
import { ImagePicker } from 'expo';
import * as firebase from 'firebase';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pct:0,
      foto:null
    }

    let config = {
       apiKey: "AIzaSyCStywi2WBlq4U6PbfDQ01zkSDWWCZGLwg",
       authDomain: "projeto-teste-4354f.firebaseapp.com",
       databaseURL: "https://projeto-teste-4354f.firebaseio.com",
       projectId: "projeto-teste-4354f",
       storageBucket: "projeto-teste-4354f.appspot.com",
       messagingSenderId: "949847838320"
     };

    firebase.initializeApp(config);

    this.pegarFoto = this.pegarFoto.bind(this);
    this.carregarAvatar = this.carregarAvatar.bind(this);

    this.carregarAvatar('images/imagem.jpg');
  }

  carregarAvatar(img) {
    firebase.storage().ref().child(img).getDownloadURL().then((url)=>{
      let state = this.state;
      state.foto = {uri:url};
      this.setState(state);
    });
  }

  pegarFoto = async () => {
    let result = await ImagePicker.launchImageLibraryAsync();

    if(!result.cancelled) {
      this.uploadImage(result.uri, "imagem2.jpg")
      .then(() => {
        alert("success");
      })
      .catch((error) =>{
        alert(error.code);
      });
    }
  }

  uploadImage = async (uri, imageName) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    let ref = firebase.storage().ref().child("images/" + imageName);
    let mine = 'image/jpeg';

    return ref.put(blob, {contentType:mine})
    .on('state_changed', (snapshot)=>{
      let pct = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100;
      let state = this.state;
      state.pct = pct;
      this.setState(state);
    },
    (error)=>{
      alert(error.code);
    },
    ()=>{
      ref.getDownloadURL().then((url)=>{
          let state = this.state;
          state.foto = {uri:url};
          this.setState(state);
      });


      alert("Imagem carregada com sucesso");
    })
  }

  render() {
    return(
      <View style={styles.container}>
        <Button title="Choose Image..." onPress={this.pegarFoto} />
        <Text>{this.state.pct}</Text>
        <View style={{width: this.state.pct+'%', height: 40, backgroundColor: '#FF0000'}}></View>
        <Image source={this.state.foto} style={styles.foto} />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingTop: 40
  },
  foto:{
      width: 300,
      height: 300
  }
});
