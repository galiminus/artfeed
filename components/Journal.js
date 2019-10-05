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
import { FlatList, RefreshControl, StyleSheet, Platform, View, Linking } from 'react-native';
import { connect } from 'react-redux';
import * as WebBrowser from 'expo-web-browser';
import { addSubscription, removeSubscription } from '../actions/subscriptions';
import Autolink from 'react-native-autolink';
import { setExpoToken } from '../actions/expoToken';
import HeaderIcon from './HeaderIcon';

import timeAgo from '../timeAgo';

import variables from "../native-base-theme/variables/platform";

const styles = StyleSheet.create({
  headerTitle: {
    flex: 1,
    display: 'flex',
    flexDirection: "row",
  },
  headerBody: {
    flex: 2,
  },
  headerAvatar: {
    marginTop: Platform.OS === "ios" ? 7 : 12,
    flex: 1,
    flexGrow: 0,
  },
  headerName: {
    lineHeight: variables.toolbarHeight,
    marginTop: Platform.OS === "ios" ? -12 : 0,
    marginLeft: 12,
    flex: 1,
  },
  card: {
    flex: 0,
    margin: 0,
    borderWidth: 0,
    borderColor: "transparent",
    elevation: 0,
    shadowColor: null,
    shadowOffset: null,
    shadowRadius: null,
    shadowOpacity: null,
    marginHorizontal: 0,
    marginVertical: 0,
  },
});

class Journal extends React.Component {
  handleAddSubscription() {
    this.props.addSubscription();
  }

  handleRemoveSubscription() {
    this.props.removeSubscription();
  }

  render() {
    const { journal } = this.props.navigation.state.params;
    const links = [
      {
        label: 'See on Furaffinity',
        link: `https://furaffinity.net/journal/${journal.reference}`,
      },
      {
        label: "Profile",
        link: `https://furaffinity.net/user/${journal.author_slug}`
      },
      {
        label: "Gallery",
        link: `https://furaffinity.net/gallery/${journal.author_slug}`
      },
      {
        label: "Scraps",
        link: `https://furaffinity.net/scraps/${journal.author_slug}`
      },
      {
        label: "Favorites",
        link: `https://furaffinity.net/favorites/${journal.author_slug}`
      },
      {
        label: "Journals",
        link: `https://furaffinity.net/journals/${journal.author_slug}`
      },
    ];

    return (
      <Container>
        <Header>
          <Left>
            <Button
              rounded
              transparent
              onPress={() => this.props.navigation.goBack()}
            >
              <HeaderIcon style={{ color: Platform.OS === 'ios' ? '#007aff' : "white" }} name="close"  type="MaterialIcons" />
            </Button>
          </Left>
          <Body>
            <Title>
              {journal.author}
            </Title>
          </Body>
          <Right>
            {
              this.props.subscriptions.indexOf(journal.author_slug) > -1 ?
                <Button
                  rounded
                  transparent
                  onPress={() => this.handleRemoveSubscription()}
                >
                  <Icon style={{ color: Platform.OS === 'ios' ? '#007aff' : "white" }} name="notifications" type="MaterialIcons" />
                </Button> :
                <Button
                  rounded
                  transparent
                  onPress={() => this.handleAddSubscription()}
                >
                  <Icon style={{ color:  Platform.OS === 'ios' ? '#007aff' : "white" }} name="notifications-none" type="MaterialIcons" />
                </Button>
            }
          </Right>
        </Header>
        <Content>
          <Card style={styles.card} transparent>
            <CardItem bordered>
              <Left>
                <Thumbnail source={{ uri: journal.avatar_url }} small />
                <Body>
                  <Text>
                    {journal.title}
                  </Text>
                  <Text note>{timeAgo.format(new Date(journal.created_at))}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem bordered>
              <Body>
                <Autolink
                  style={{
                    color: "#666",
                    fontWeight: '300'
                  }}
                  linkStyle={{
                    color: variables.brandPrimary,
                    fontWeight: 'bold',
                  }}
                  text={journal.body}
                />
              </Body>
            </CardItem>
            {
              links.map(({ label, link }, index) => (
                <CardItem
                  key={label}
                  footer
                  bordered
                  button
                  style={{
                    borderBottomWidth: null,
                    ...(index === 0 ? { borderTopWidth: null } : {})
                  }}
                  onPress={() => Linking.openURL(link)}
                >
                  <Text>{label}</Text>
                </CardItem>
              ))
            }
          </Card>
        </Content>
      </Container>
    );
  }
}

export default connect(
  ({ subscriptions, expoToken }) => ({ subscriptions, expoToken }),
  (dispatch) => ({
    addSubscription: (params) => dispatch(addSubscription(params)),
    removeSubscription: (params) => dispatch(removeSubscription(params)),
    setExpoToken: (params) => dispatch(setExpoToken(params))
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    addSubscription: () => {
      dispatchProps.addSubscription({ author_slug: ownProps.navigation.state.params.journal.author_slug });
    },
    removeSubscription: () => {
      dispatchProps.removeSubscription({ author_slug: ownProps.navigation.state.params.journal.author_slug });
    },
  })
)(Journal);
