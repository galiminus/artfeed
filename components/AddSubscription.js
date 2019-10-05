import React, { Component } from 'react';
import {
  Header,
  Left,
  Button,
  Icon,
  Body,
  Right,
  Title,
  Content,
  Form,
  Item,
  Input,
  Text,
} from 'native-base';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { View } from 'react-native';
import { addSubscription } from '../actions/subscriptions';
import HeaderIcon from './HeaderIcon';

const required = value => value ? undefined : 'Required'

const StringField = ({ input, meta: { touched, error }, autoCapitalize, ...custom }) => (
  <Item last style={{ marginTop: 8 }}>
    <Input {...input} {...custom} autoCapitalize={autoCapitalize} />
  </Item>
);

class AddSubscription extends Component {
  formatValidation(input) {
    const isRequired = true;
    const validation = /^[a-z0-9A-Z_\.-~-]+$/;

    if (!input || input.trim().length === 0) {
      return (!isRequired);
    }
    if (!validation) {
      return (true);
    }

    if (input.match(validation)) {
      return (true);
    }

    return (false);
  }

  render() {
    const pattern = "https://furaffinity.net/user/username";
    const regexp = /furaffinity\.net\/user\/([\w|\-|\_|\&]*)/;
    const isRequired = true;
    const autoCapitalize = 'none';

    return (
      <View
        style={{
          flex: 1
        }}
      >
        <Header>
          <Left>
            <Button rounded transparent onPress={() => this.props.navigation.goBack()}>
              <HeaderIcon name="back" type="MaterialIcons" />
            </Button>
          </Left>
          <Body>
            <Title>Add subscription</Title>
          </Body>
          <Right>
            <Button
              rounded
              transparent
              disabled={!this.props.valid || !this.formatValidation(this.props.value)}
              onPress={this.props.handleSubmit}>
              <HeaderIcon name="done" type="MaterialIcons" />
            </Button>
          </Right>
        </Header>
        <Content>
          <View style={{ flex: 1 }}>
            <Form>
              <Text
                style={{
                  fontSize: 12,
                  padding: 18,
                  textAlign: 'justify'
                }}
              >
                {`Please enter the Furaffinity username of the artist as it appears in the address bar of your browser.`}
              </Text>
              <Field
                name={"author_slug"}
                component={StringField}
                type="string"
                autoFocus
                autoCapitalize={autoCapitalize === undefined ? 'sentences' : autoCapitalize}
                onSubmitEditing={this.props.handleSubmit}
                validate={isRequired ? [ required ] : []}
              />
              {
                (pattern && regexp) ? (
                  <View
                    style={{
                      marginTop: 4,
                      marginLeft: 18,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 12,
                        color: "#aaa",
                      }}
                    >
                      {pattern.replace(pattern.match(regexp)[1], '')}
                      <Text
                        style={{
                          fontSize: 12,
                          color: (this.formatValidation(this.props.value) ? "#999" : "#B71C1C"),
                          fontWeight: "bold",
                        }}
                      >
                        {this.props.value || pattern.match(regexp)[1]}
                      </Text>
                    </Text>
                  </View>
                ) : null
              }
            </Form>
          </View>
        </Content>
      </View>
    );
  }
}

const AddSubscriptionForm = reduxForm({ form: 'AddSubscriptionForm' })(AddSubscription);
const selector = formValueSelector('AddSubscriptionForm');

const ConnectedAddSubscriptionForm = connect(
  ({ expoToken, ...state }, { navigation }) => ({ expoToken, value: selector(state, "author_slug") }),
  (dispatch) => ({
    addSubscription: (params) => dispatch(addSubscription(params)),
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    onSubmit: async (values) => {
      dispatchProps.addSubscription({ author_slug: values.author_slug, expo_token: stateProps.expoToken });
      ownProps.navigation.goBack();
    },
  })
)(AddSubscriptionForm);

export default withNavigation(ConnectedAddSubscriptionForm);
