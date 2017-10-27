import React from 'react';
import {View, Button, Text} from 'react-native';
import * as firebase from 'firebase';
import MainTabNavigator from '../navigation/MainTabNavigator';
import {StackNavigator} from 'react-navigation';
import {FormLabel, FormInput} from 'react-native-elements';

export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = { email: '', password: '', error: '', loading: false };
    }
    componentWillMount(){
        firebase.initializeApp({
            apiKey: "AIzaSyAdCs_08SFguGovxXkUNy9babvKMVZSF2c",
            authDomain: "good-sam-2de85.firebaseapp.com",
            databaseURL: "https://good-sam-2de85.firebaseio.com",
            projectId: "good-sam-2de85",
            storageBucket: "good-sam-2de85.appspot.com",
            messagingSenderId: "12952193671"
        });
    }

    onLoginPress(){
        this.setState({error: '', loading: true});

        const{email, password} = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            this.setState({error: '', loading: false});
            this.props.navigation.navigate('Main');
        })
        .catch(()=>{
            this.setState({error: 'Authentication Failed', loading: false});
        })
    }

    onSignUpPress(){
        this.setState({error: '', loading: true});

        const{email, password} = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(()=>{
            this.state({ error: '', loading: false });
            this.props.navigation.navigate('Login');
        })
        .catch(()=>{
            this.state({error: 'Email already in use', loading: false});
        })
    }

    renderButtonOrLoading(){
        if(this.state.loading){
            return
                <Text>Loading</Text>
        }
        return (
            <View>
                <Button onPress={this.onLoginPress.bind(this)}
                title = 'Login' />

                <Button onPress={this.onSignUpPress.bind(this)}
                title = 'Sign Up' />

            </View>
        )
    }
    render(){
        return(
            <View>
                <FormLabel>Email</FormLabel>
                <FormInput
                value = {this.state.email}
                autoCapitalize = 'none'
                onChangeText={email => this.setState({email})}
                placeholder = 'user@domain.com'
                />
                <FormLabel>Password</FormLabel>
                <FormInput
                value = {this.state.password}
                secureTextEntry
                placeholder = 'password'
                onChangeText={password => this.setState({password})}/>
                <Text>{this.state.error}</Text>
                {this.renderButtonOrLoading()}
            </View>
        )
    }
}
