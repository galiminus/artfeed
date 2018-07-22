import React from 'react';
import { createMaterialTopTabNavigator, DrawerActions } from 'react-navigation';
import { Header, Button, Segment, Text, Body, Right, Left, Icon } from 'native-base';
import { connect } from 'react-redux';

import variables from "../native-base-theme/variables/platform";

import Raffles from './Raffles.js';
import Commissions from './Commissions.js';

const JournalsRouter = createMaterialTopTabNavigator(
  {
    Commissions,
    Raffles,
  },
  {
    initialRouteName: 'Commissions',
    swipeEnabled: false,
    animationEnabled: false,
    tabBarPosition: 'top',
    tabBarComponent: props => (
      <Header hasSegment>
        <Left>
          <Button transparent onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}>
            <Icon name="menu" />
          </Button>
        </Left>
        <Body>
          <Segment>
            <Button
              first
              active={props.navigation.state.index === 0}
              onPress={() => props.navigation.navigate('Commissions')}
            >
              <Text
                numberOfLines={1}
                style={{
                  width: '100%',
                  textAlign: 'center'
                }}
              >
                Commissions
              </Text>
            </Button>
            <Button
              last
              active={props.navigation.state.index === 1}
              onPress={() => props.navigation.navigate('Raffles')}
            >
              <Text
                numberOfLines={1}
                style={{
                  width: '100%',
                  textAlign: 'center'
                }}
              >
                Raffles
              </Text>
            </Button>
          </Segment>
        </Body>
        <Right>
          <Button transparent onPress={() => props.navigation.navigate('Subscriptions')}>
            <Icon name="add-alert" />
          </Button>
        </Right>
      </Header>
    ),
  }
);

export default JournalsRouter;
