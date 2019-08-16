import React from "react";
import {
  Button,
  AsyncStorage,
  View,
  Text,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import axios from "axios";

import { Ionicons } from "@expo/vector-icons";

class SignInScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Bienvenue",
      header: null
    };
  };

  state = {
    email: "arno@airbnb-api.com",
    password: "password01"
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#FF595E" }}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Ionicons name="md-home" size={100} color="white" />

          <Text style={{ color: "white", fontSize: 40, fontWeight: "100" }}>
            Welcome
          </Text>
        </View>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
          <TextInput
            value={this.state.email}
            onChangeText={text => {
              this.setState({ email: text });
            }}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            placeholderTextColor="white"
            placeholder="Email"
            style={{
              color: "white",
              marginHorizontal: 40,
              borderBottomColor: "white",
              borderBottomWidth: StyleSheet.hairlineWidth,
              height: 44
            }}
          />
          <TextInput
            value={this.state.password}
            onChangeText={text => {
              this.setState({ password: text });
            }}
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor="white"
            placeholder="Password"
            style={{
              color: "white",
              marginHorizontal: 40,
              borderBottomColor: "white",
              borderBottomWidth: StyleSheet.hairlineWidth,
              height: 44
            }}
          />
          <TouchableOpacity
            onPress={this.signInAsync}
            style={{
              backgroundColor: "white",
              height: 50,
              marginHorizontal: 100,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 30,
              borderRadius: 25
            }}
          >
            <Text
              style={{
                color: "#FF595E",
                fontSize: 20
              }}
            >
              Se connecter
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }

  signInAsync = async () => {
    const response = await axios.post(
      "https://airbnb-api.now.sh/api/user/log_in",
      {
        email: this.state.email,
        password: this.state.password
      }
    );

    if (response.data.token) {
      await AsyncStorage.setItem("userToken", "abc");
      this.props.navigation.navigate("App");
    } else {
      alert("Invalid email/password");
    }
  };
}

export default SignInScreen;
