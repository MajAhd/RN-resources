import React, {Component} from 'react';
import {Header, Title, Button, Left, Right, Icon, Body} from 'native-base';
import {withNavigation} from 'react-navigation';

const MainHeader = props => {
  return (
    <Header>
      <Left>
        <Button transparent onPress={() => props.navigation.goBack()}>
          <Icon name="arrow-back" />
        </Button>
      </Left>
      <Body>
        <Title>{props.title}</Title>
      </Body>
      <Right />
    </Header>
  );
};

export default withNavigation(MainHeader);
