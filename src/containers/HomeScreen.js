import React from "react";
import {
  Button,
  ImageBackground,
  Image,
  FlatList,
  View,
  Text,
  StatusBar
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";

class HomeScreen extends React.Component {
  state = {
    rooms: []
  };
  static navigationOptions = ({ navigation }) => {
    return {
      tabBarLabel: "Accueil"
    };
  };

  renderStars(item) {
    const stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < item.ratingValue) {
        stars.push(<Ionicons key={i} name="md-star" size={32} color="gold" />);
      } else {
        stars.push(<Ionicons key={i} name="md-star" size={32} color="grey" />);
      }
    }

    return (
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {stars}
        <Text>{item.reviews} reviews</Text>
      </View>
    );
  }

  render() {
    return (
      <FlatList
        data={this.state.rooms}
        keyExtractor={item => {
          return item._id;
        }}
        renderItem={({ item }) => {
          return (
            <View>
              <ImageBackground
                source={{ uri: item.photos[0] }}
                style={{ height: 300, width: "100%" }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: "white",
                    backgroundColor: "black",
                    padding: 20,
                    position: "absolute",
                    bottom: 45,
                    left: 0
                  }}
                >
                  {item.price} €
                </Text>
              </ImageBackground>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1 }}>
                  <Text numberOfLines={1} style={{ fontSize: 22 }}>
                    {item.title}
                  </Text>
                  {this.renderStars(item)}
                </View>
                <Image
                  source={{ uri: item.user.account.photos[0] }}
                  style={{ height: 60, width: 60, borderRadius: 30 }}
                />
              </View>
            </View>
          );
        }}
      />
    );
  }

  showMoreApp = () => {
    this.props.navigation.navigate("Other");
  };

  async componentDidMount() {
    StatusBar.setBarStyle("dark-content");

    const response = await axios.get(
      "https://airbnb-api.now.sh/api/room?city=paris"
    );
    this.setState({
      rooms: response.data.rooms
    });
  }
}

export default HomeScreen;
