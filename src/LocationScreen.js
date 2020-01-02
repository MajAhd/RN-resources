import React, {Component} from 'react';
import {Platform} from 'react-native';
import {Container, H2, View, Text} from 'native-base';
import HeaderBack from './Template/HeaderBack';
import GetLocation from 'react-native-get-location';

class LocationScreen extends Component {
  constructor(param) {
    super(param);
    this.state = {
      location: null,
    };
  }
  componentDidMount() {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        this.setState({
          location: location,
        });
      })
      .catch(error => {
        const {code, message} = error;
        console.warn(code, message);
      });
  }

  render() {
    return (
      <Container>
        <HeaderBack title="Location" />
        <H2>Location</H2>
        {this.state.location != null ? (
          <View>
            <Text>latitude : {this.state.location.latitude}</Text>
            <Text>longitude : {this.state.location.longitude}</Text>
            <Text>Speed : {this.state.location.speed}</Text>
            <Text>Altitude : {this.state.location.altitude}</Text>
            <Text>Accuracy : {this.state.location.accuracy}</Text>
            <Text>time : {this.state.location.time}</Text>
            {Platform.OS === 'ios' ? (
              <View>
                <Text>
                  verticalAccuracy : {this.state.location.verticalAccuracy}
                </Text>
                <Text>course : {this.state.location.course}</Text>
              </View>
            ) : (
              <View>
                <Text>bearing : {this.state.location.bearing}</Text>
                <Text>provider : {this.state.location.provider}</Text>
              </View>
            )}
          </View>
        ) : (
          <Text>Loading Location</Text>
        )}
      </Container>
    );
  }
}

export default LocationScreen;
