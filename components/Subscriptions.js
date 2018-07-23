import React from 'react';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Button,
  Icon,
  Left,
  Body,
  Right,
  Item,
  Input,
  List,
  ListItem,
  Separator,
  ActionSheet,
  Title,
  Thumbnail,
  Segment,
  Toast
} from 'native-base';
import { FlatList, RefreshControl, Linking } from 'react-native';
import { connect } from 'react-redux';
import { WebBrowser } from 'expo';
import EmptyList from './EmptyList';
import timeAgo from '../timeAgo';
import getExpoToken from '../getExpoToken';

import variables from "../native-base-theme/variables/platform";
import { removeSubscription } from '../actions/subscriptions';


class Subscriptions extends React.Component {
  state = {
  }

  async componentDidMount() {
  }

  renderSubscription(subscription, index) {
    return (
      <ListItem
        onPress={() => {
          this.props.navigation.navigate("Subscription", { subscription });
        }}
        last={index === (this.props.subscriptions.length - 1)}
        onPress={() => {
          ActionSheet.show(
            {
              options: ["See on Furaffinity", "Unsubscribe", "Cancel"],
              title: "Select action",
              cancelButtonIndex: 2,
            },
            buttonIndex => {
              if (buttonIndex === 0) {
                Linking.openURL(`https://furaffinity.net/user/${subscription}`);
              }
              if (buttonIndex === 1) {
                this.props.removeSubscription(subscription);
              }
            }
          )
        }}
      >
        <Left>
          <Text>{subscription}</Text>
        </Left>
        <Right>
          <Icon name="more-vert" />
        </Right>
      </ListItem>
    );
  }

  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>
              Subscriptions
            </Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.props.navigation.navigate('AddSubscription')}>
              <Icon name="add" />
            </Button>
          </Right>
        </Header>

        <Content
          refreshControl={
            <RefreshControl
              refreshing={this.props.subscriptionsRefresh}
              onRefresh={() => {}}
            />
          }
        >
          {
            this.props.subscriptions.length === 0 ?
            <EmptyList
              iconName="notifications-none"
              title={"No subscriptions"}
              info=""
            /> :
            <FlatList
              data={this.props.subscriptions}
              initialNumToRender={12}
              keyExtractor={(subscription) => `${subscription}`}
              renderItem={({ item, index }) => this.renderSubscription(item, index)}
            />
          }
        </Content>
      </Container>
    );
  }
}

const ConnectedSubscriptions = connect(
  ({ subscriptions, subscriptionsRefresh }) => ({
    subscriptions,
    subscriptionsRefresh
  }),
  dispatch => ({
    removeSubscription: (payload) => dispatch(removeSubscription(payload))
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...stateProps,
    ...ownProps,
    removeSubscription: async (author_slug) => {
      try {
        let expo_token = await getExpoToken();
        dispatchProps.removeSubscription({ author_slug, expo_token });
      } catch (e) {
        Toast.show({
          text: e.message,
        });
      }
    }
  })
)(Subscriptions);

export default ConnectedSubscriptions;
