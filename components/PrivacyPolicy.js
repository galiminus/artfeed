import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Content,
  Text,
  Separator,
  View,
  ActionSheet,
  List,
  ListItem,
  Icon,
  Left,
  Right,
  Switch,
  Header,
  Title,
  Container,
  Button,
  Body,
} from 'native-base';

const PrivacyPolicy = (props) => (
  <Container>
    <Header>
      <Left>
        <Button transparent onPress={() => props.navigation.goBack()}>
          <Icon name="close" />
        </Button>
      </Left>
      <Body>
        <Title>Privacy policy</Title>
      </Body>
      <Right />
    </Header>
    <Content padder>
      <ListItem last>
        <Text>{`We only collect informations for the purpose of providing our service. Those informations includes:`}</Text>
      </ListItem>
      <ListItem>
        <Text>{`– A unique device and session identifier.`}</Text>
      </ListItem>
      <ListItem>
        <Text>{`We do not share or sell your informations to third parties.`}</Text>
      </ListItem>
      <ListItem>
        <Text>{`You can opt-out from this service at any time.`}</Text>
      </ListItem>
    </Content>
  </Container>
);

export default PrivacyPolicy;
