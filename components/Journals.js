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
  Segment
} from 'native-base';
import { FlatList, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import * as WebBrowser from 'expo-web-browser';
import timeAgo from '../timeAgo';

import variables from "../native-base-theme/variables/platform";
import { loadJournals } from '../actions/journals';

class Journals extends React.Component {
  state = {
    page: 1
  }

  componentDidMount() {
    this.props.loadJournals({ page: 1, kind: this.props.kind });
  }

  renderJournal(journal, index) {
    return (
      <ListItem
        avatar
        onPress={() => {
          this.props.navigation.navigate("Journal", { journal });
        }}
        last={index === (this.props.journals[this.props.kind].length - 1)}
      >
        <Left>
          <Thumbnail source={{ uri: journal.avatar_url }} />
        </Left>
        <Body>
          <Text>
            {journal.author}
          </Text>
          <Text
            note
            numberOfLines={1}
          >
            {journal.title}
          </Text>
        </Body>
        <Right>
          <Text note>{timeAgo.format(new Date(journal.created_at))}</Text>
          {
            this.props.subscriptions.indexOf(journal.author_slug.toLowerCase()) > -1 ?
              <Icon name="notifications-active" style={{ fontSize: 18, paddingTop: 5 }} type="MaterialIcons" /> :
              null
          }
        </Right>
      </ListItem>
    );
  }

  render() {
    return (
      <Container>
        <Content
          refreshControl={
            <RefreshControl
              refreshing={this.props.journalsRefresh}
              onRefresh={() => {
                this.props.loadJournals({ page: 1, kind: this.props.kind })
              }}
            />
          }
        >
          <FlatList
            data={this.props.journals[this.props.kind]}
            initialNumToRender={12}
            keyExtractor={(journal) => `${journal.reference}`}
            renderItem={({ item, index }) => this.renderJournal(item, index)}
          />
          {
            !(this.props.journalsRefresh && this.state.page == 1) ?
              <Button
                block
                transparent
                bordered
                style={{
                  marginTop: variables.listItemPadding,
                  marginLeft: variables.listItemPadding + 5,
                  marginRight: variables.listItemPadding + 5,
                  marginBottom: variables.listItemPadding,
                  ...(this.props.journalsRefresh ? { borderColor: variables.brandPrimaryLight }: {})
                }}
                disabled={this.props.journalsRefresh}
                onPress={() => {
                  this.props.loadJournals({ page: this.state.page + 1, kind: this.props.kind  });
                  this.setState({ page: this.state.page + 1 });
                }}
              >
                <Text
                  style={{
                    ...(this.props.journalsRefresh ? { color: variables.brandPrimaryLight }: {})
                  }}
                >
                  Load more
                </Text>
              </Button> : null
            }
        </Content>
      </Container>
    );
  }
}

const ConnectedJournals = connect(
  ({ journals, journalsRefresh, subscriptions }) => ({
    journals,
    journalsRefresh,
    subscriptions
  }),
  dispatch => ({
    loadJournals: (params) => dispatch(loadJournals(params)),
  })
)(Journals);

export default ConnectedJournals;
