import React, {Component} from 'react';
import {ScrollView, TouchableWithoutFeedback} from 'react-native';
import {Container, Content, List, ListItem, Text} from 'native-base';
import MainHeader from './Template/MainHeader';
class HomeScreen extends Component {
  componentDidMount() {}
  render() {
    return (
      <Container>
        <MainHeader title="Resources" />
        <ScrollView style={{with: '100%'}}>
          <Content>
            <List>
              <ListItem>
                <TouchableWithoutFeedback
                  onPress={() => this.props.navigation.navigate('Contact')}>
                  <Text>Contact</Text>
                </TouchableWithoutFeedback>
              </ListItem>
              <ListItem>
                <TouchableWithoutFeedback
                  onPress={() => this.props.navigation.navigate('Location')}>
                  <Text>Location</Text>
                </TouchableWithoutFeedback>
              </ListItem>
              <ListItem>
                <TouchableWithoutFeedback
                  onPress={() => this.props.navigation.navigate('Sms')}>
                  <Text>SMS</Text>
                </TouchableWithoutFeedback>
              </ListItem>
              <ListItem>
                <Text>Cammera</Text>
              </ListItem>
              <ListItem>
                <Text>Wifi/Data</Text>
              </ListItem>
              <ListItem>
                <Text>Battery</Text>
              </ListItem>
              <ListItem>
                <Text>Screen</Text>
              </ListItem>
            </List>
          </Content>
        </ScrollView>
      </Container>
    );
  }
}

export default HomeScreen;
