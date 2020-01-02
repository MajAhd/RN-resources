import React, {Component} from 'react';
import {ScrollView, PermissionsAndroid, Platform} from 'react-native';
import {Container, List, ListItem, Text, H2, Body, Button} from 'native-base';
import HeaderBack from './Template/HeaderBack';
import Contacts from 'react-native-contacts';

class ContactScreen extends Component {
  constructor(param) {
    super(param);
    this.state = {
      contacts: [],
    };
  }
  componentDidMount() {}
  async getContacts() {
    await Contacts.getAll((err, contacts) => {
      if (err) {
        throw err;
      }
      this.setState({
        contacts: contacts,
      });
    });
  }
  async requestPermission() {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
      }).then(() => {
        this.getContacts();
      });
    } else {
      this.getContacts();
    }
  }
  render() {
    return (
      <Container>
        <HeaderBack title="Contact" />
        <ScrollView style={{with: '100%'}}>
          <H2>Contact</H2>
          <Button
            onPress={() => {
              this.requestPermission();
            }}>
            <Text>Load Contacts</Text>
          </Button>
          <List>
            {this.state.contacts.map((contact, index) => (
              <ListItem avatar key={index}>
                <Body>
                  <Text>
                    {contact.givenName} {contact.familyName}
                  </Text>
                  {contact.phoneNumbers.map((phone, ph_index) => (
                    <Text key={'ph' + ph_index}>{phone.number}</Text>
                  ))}
                </Body>
              </ListItem>
            ))}
          </List>
        </ScrollView>
      </Container>
    );
  }
}

export default ContactScreen;
