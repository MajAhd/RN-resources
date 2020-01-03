import React, {Component} from 'react';
import {Platform} from 'react-native';
import {
  Container,
  H2,
  View,
  Button,
  Item,
  Text,
  Form,
  Input,
} from 'native-base';
import HeaderBack from './Template/HeaderBack';
import SendSMS from 'react-native-sms';

class SmsScreen extends Component {
  constructor(param) {
    super(param);
    this.state = {
      sms: null,
      number: null,
      message: null,
      phoneNumber: null,
      recieveMsg: null,
    };
  }
  componentDidMount() {}
  SendSms() {
    SendSMS.send(
      {
        body: this.state.message,
        recipients: [this.state.number],
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

  render() {
    return (
      <Container>
        <HeaderBack title="SMS" />
        <H2>SMS</H2>
        <Form>
          <Item fixedLabel>
            <Input
              maxLength={100}
              value={this.state.number}
              placeholder="Number"
              onChangeText={value => {
                this.setState({number: value});
              }}
            />
          </Item>
          <Item fixedLabel>
            <Input
              maxLength={100}
              value={this.state.message}
              multiline={true}
              placeholder="Message"
              onChangeText={value => {
                this.setState({message: value});
              }}
              style={{height: 100}}
            />
          </Item>

          <Button style={{marginTop: 30}} block onPress={() => this.SendSms()}>
            <Text>Send</Text>
          </Button>
        </Form>
      </Container>
    );
  }
}

export default SmsScreen;
