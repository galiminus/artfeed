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
import { WebBrowser } from 'expo';
import { addSubscription, removeSubscription } from '../actions/subscriptions';
import Autolink from 'react-native-autolink';
import getExpoToken from '../getExpoToken';

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
              <Icon style={{ color: "white" }} name="close" />
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
                  onPress={() => this.props.removeSubscription()}
                >
                  <Icon style={{ color: "white" }} name="notifications" />
                </Button> :
                <Button
                  rounded
                  transparent
                  onPress={() => this.props.addSubscription()}
                >
                  <Icon style={{ color: "white" }} name="notifications-none" />
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
  ({ subscriptions }) => ({ subscriptions }),
  (dispatch) => ({
    addSubscription: (params) => dispatch(addSubscription(params)),
    removeSubscription: (params) => dispatch(removeSubscription(params)),
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    addSubscription: async () => {
      try {
        let expo_token = await getExpoToken();
        dispatchProps.addSubscription({ author_slug: ownProps.navigation.state.params.journal.author_slug, expo_token });
      } catch (e) {
        Toast.show({
          text: e.message,
        });
      }
    },
    removeSubscription: async () => {
      try {
        let expo_token = await getExpoToken();
        dispatchProps.removeSubscription({ author_slug: ownProps.navigation.state.params.journal.author_slug, expo_token });
      } catch (e) {
        Toast.show({
          text: e.message,
        });
      }
    },
  })
)(Journal);
