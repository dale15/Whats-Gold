
import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert, StatusBar, StyleSheet} from 'react-native';
import Button from './Button';
import axios from 'axios';

const onButtonPress = () => {
  Alert.alert('Button has been pressed!');
};

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      navigation: props.navigateKey,
      email: '',
      password: '',
    };
  }

  handlePress(event) {
    this.state.navigation.navigate("HomeActivity", { email: this.state.email, password: this.state.password, navigation: this.state.navigation });
    // if(this.state.email != '1234' && this.state.password != '1234') {
    //   alert("user not found");
    // } else {
    //   // axios.get()
    //   // .then(function (response) {
    //   //   console.log(response);
    //   // })
    //   // .catch(function (error) {
    //   //   console.log(error);
    //   // });
    //
    //   this.state.navigation.navigate("HomeActivity", { email: this.state.email, password: this.state.password });
    // }
  }

  render () {
    const {container, input, buttonContainer, lineRuleStyle, buttonText} = styles;
    const FBSDK = require('react-native-fbsdk');
    const { LoginButton, } = FBSDK;

    return (
      <View style = {container}>
      <StatusBar barStyle="light-content"/>
      <TextInput style = {input}
      underlineColorAndroid="transparent"
      autoCapitalize="none"
      onSubmitEditing={() => this.passwordInput.focus()}
      onChangeText = { (email) => this.setState({email})}
      value = {this.state.email}
      autoCorrect={false}
      keyboardType='email-address'
      returnKeyType="next"
      placeholder='Email'
      placeholderTextColor='rgba(225,225,225,0.7)'/>

      <TextInput style = {input}
      returnKeyType="go"
      ref={(input)=> this.passwordInput = input}
      onChangeText = { (password) => this.setState({password})}
      value = {this.state.password}
      placeholder='Password'
      placeholderTextColor='rgba(225,225,225,0.7)'
      secureTextEntry/>

      <TouchableOpacity
              style = {styles.buttonContainer}
              onPress = {this.handlePress.bind(this)} >
                <Text style={styles.buttonText}> Login </Text>
      </TouchableOpacity>

      <Text  style={{textAlign: 'left', color: '#fff', marginTop: 5}}>FORGOT PASSWORD</Text>

      <View style = {lineRuleStyle}>
      <View style={{borderBottomColor: '#fff', borderBottomWidth: 3, width: 140, marginBottom: 8}} />
      <Text style={{color: '#fff', fontSize: 20}}> OR </Text>
      <View style={{borderBottomColor: '#fff', borderBottomWidth: 3, width: 140, marginBottom: 8}} />
      </View>

      <View style = {{justifyContent: 'center', alignItems: 'center'}}>
      <LoginButton
      publishPermissions = {["publish_actions"]}
      onLoginFinished = {
        (error, result) => {
          if (error) {
            alert("Login failed with error: " + result.error);
          } else if (result.isCancelled) {
            alert("Login was cancelled");
          } else {
            alert("Login was successful with permissions: " + result.grantedPermissions)
          }
        }
      }
      onLogoutFinished = { () => alert("User logged out") } />

      </View>
      <Text style = {{color: '#fff', marginTop: 10}}> NEED AN ACCOUNT?
        <Text style={{color: '#000'}} onPress={ () => this.state.navigation.navigate("SignupForm", {screen: "SignupForm"}) }> SIGN UP </Text>
      </Text>
      </View>
    );
  }
}

export default LoginForm

const styles = StyleSheet.create ({
  container: {
    padding: 20
  },
  input:{
    height: 40,
    backgroundColor: '#BC8335',
    marginBottom: 10,
    padding: 10
  },
  loginButton:{
    backgroundColor:  '#2980b6',
    color: '#fff'
  },
  lineRuleStyle: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  },
  buttonContainer: {
      backgroundColor: '#fff',
      paddingVertical: 15,
      marginBottom: 10
  },
  buttonText: {
      color: '#BC8335',
      textAlign: 'center',
      fontWeight: '700'
  }
});
