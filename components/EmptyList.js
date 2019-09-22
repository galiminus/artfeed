import React, { Component } from 'react';
import { Icon, Container, Text } from 'native-base';
import { StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import variables from "../native-base-theme/variables/platform";

const ICON_SIZE = Dimensions.get('window').width / 4;

class EmptyList extends Component {
  render() {
    const styles = StyleSheet.create({
      emptyList: {
        flex: 1,
      },
      emptyListIcon: {
        marginTop: 16,
        fontSize: ICON_SIZE,
        color: "rgba(0, 0, 0, 0.2)",
        textAlign: 'center',
      },
      emptyListTitle: {
        fontSize: 20,
        lineHeight: 30,
        color: variables.darkForegroundColor,
        textAlign: 'center',
        fontWeight: "bold"
      },
      emptyListInfo: {
        fontSize: 12,
        lineHeight: 18,
        color: variables.darkForegroundColor,
        textAlign: 'center',
      },
    });

    return (
      <Container style={styles.emptyList}>
        <Icon style={styles.emptyListIcon} name={this.props.iconName} type="MaterialIcons" />
        <Text style={styles.emptyListTitle}>{this.props.title}</Text>
        <Text style={styles.emptyListInfo}>{this.props.info}</Text>
        {this.props.children}
      </Container>
    )
  }
}

export default EmptyList;
