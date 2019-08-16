import React from "react";
import { Button, StyleSheet, Text, AsyncStorage, View } from "react-native";
import { Location, Permissions, MapView } from "expo";

class MapScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      tabBarLabel: "Map"
    };
  };

  state = {
    latitude: null,
    longitude: null
  };

  render() {
    if (this.state.latitude && this.state.longitude) {
      return (
        <MapView
          initialRegion={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.09,
            longitudeDelta: 0.04
          }}
          style={{ flex: 1 }}
          provider={MapView.PROVIDER_GOOGLE}
        >
          <MapView.Marker
            coordinate={{
              latitude: 48.8564449,
              longitude: 2.4002913
            }}
            title={"Le Reacteur"}
            description={"La formation des champion·ne·s !"}
          />
        </MapView>
      );
    }
    return null;
  }
  // render() {
  //   return (
  //     <View style={styles.container}>
  //       <Text>{this.state.latitude}</Text>
  //       <Text>{this.state.longitude}</Text>
  //     </View>
  //   );
  // }

  async componentDidMount() {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status === "granted") {
      let location = await Location.getCurrentPositionAsync({});

      this.setState({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default MapScreen;
