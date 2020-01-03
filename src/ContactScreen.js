import React, {Component} from 'react';
import {
  ScrollView,
  PermissionsAndroid,
  Platform,
  Linking,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  Container,
  List,
  ListItem,
  Text,
  H2,
  Body,
  Icon,
  View,
  Content,
  Item,
  Input,
  Fab,
} from 'native-base';
import HeaderBack from './Template/HeaderBack';
import Contacts from 'react-native-contacts';
import SendSMS from 'react-native-sms';

class ContactScreen extends Component {
  constructor(param) {
    super(param);
    this.state = {
      contacts: [],
      isLoading: true,
    };
  }
  componentDidMount() {
    this.requestPermission();
  }
  async getContacts() {
    await Contacts.getAll((err, contacts) => {
      if (err) {
        throw err;
      }
      this.setState({
        contacts: contacts,
        isLoading: false,
      });
    });
  }
  SendSms(number, message) {
    SendSMS.send(
      {
        body: message,
        recipients: [number],
        successTypes: ['sent', 'queued'],
        allowAndroidSendWithoutReadPermission: true,
      },
      (completed, cancelled, error) => {
        console.log(
          'SMS Callback: completed: ' +
            completed +
            ' cancelled: ' +
            cancelled +
            'error: ' +
            error,
        );
      },
    );
  }
  async requestPermission() {
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
      }).then(() => {
        this.setState({
          isLoading: true,
        });
        this.getContacts();
      });
    } else {
      this.getContacts();
    }
  }

  makeCall = number => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }

    Linking.openURL(phoneNumber);
  };

  render() {
    return (
      <Container>
        <HeaderBack title="Contact" />
        <ScrollView style={{with: '100%'}}>
          <Content>
            <Item regular>
              <Input placeholder="Search Contact" />
            </Item>
          </Content>

          {this.state.isLoading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <List>
              {this.state.contacts.map((contact, index) => (
                <ListItem key={index}>
                  <Body>
                    <H2 style={{paddingBottom: 10}}>
                      {contact.givenName} {contact.familyName}
                    </H2>
                    {contact.phoneNumbers.map((phone, ph_index) => (
                      <View
                        key={'ph' + ph_index}
                        style={{flexDirection: 'row'}}>
                        <View style={{padding: 10, flex: 2}}>
                          <Text style={{fontSize: 18}}>{phone.number}</Text>
                        </View>
                        <View
                          style={{
                            padding: 10,
                            alignSelf: 'flex-end',
                            flexDirection: 'row',
                          }}>
                          <TouchableOpacity
                            style={{
                              paddingRight: 30,
                            }}
                            onPress={() => {
                              this.makeCall(phone.number);
                            }}>
                            <Icon
                              name="md-call"
                              style={{fontSize: 30, color: '#07734D'}}
                            />
                          </TouchableOpacity>

                          <TouchableOpacity
                            onPress={() => {
                              this.SendSms(
                                phone.number,
                                'Hello ' + contact.givenName,
                              );
                            }}>
                            <Icon
                              name="ios-chatboxes"
                              style={{fontSize: 30, color: '#07734D'}}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    ))}
                  </Body>
                </ListItem>
              ))}
            </List>
          )}
        </ScrollView>

        <Fab
          direction="up"
          containerStyle={{}}
          style={{backgroundColor: '#F90808'}}
          position="bottomRight"
          onPress={() => alert('Add Contact')}>
          <Icon name="add" style={{fontSize: 28, fontWeight: 'bold'}} />
        </Fab>
      </Container>
    );
  }
}

export default ContactScreen;
