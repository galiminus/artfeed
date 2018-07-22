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
import { sendAuthorBlacklist } from '../actions/authorBlacklist';

const required = value => value ? undefined : 'Required'

const StringField = ({ input, meta: { touched, error }, autoCapitalize, ...custom }) => (
  <Item last style={{ marginTop: 8 }}>
    <Input {...input} {...custom} autoCapitalize={autoCapitalize} />
  </Item>
);

class OptOut extends Component {
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
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Opt-out from Commfeed</Title>
          </Body>
          <Right>
            <Button
              rounded
              transparent
              disabled={!this.props.valid || !this.formatValidation(this.props.value)}
              onPress={this.props.handleSubmit}>
              <Icon name="done" />
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
                {`Please enter your Furaffinity username as it appears in the address bar of your browser. We will send you a confirmation PM with a link to opt-out from our service.`}
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

const OptOutForm = reduxForm({ form: 'OptOutForm' })(OptOut);
const selector = formValueSelector('OptOutForm');

const ConnectedOptOutForm = connect(
  (state, { navigation }) => ({ value: selector(state, "author_slug") }),
  (dispatch) => ({
    sendAuthorBlacklist: (params) => dispatch(sendAuthorBlacklist(params)),
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    onSubmit: values => {
      console.log(values);
      dispatchProps.sendAuthorBlacklist(values);
      ownProps.navigation.goBack();
    },
  })
)(OptOutForm);

export default withNavigation(ConnectedOptOutForm);
