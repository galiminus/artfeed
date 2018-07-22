import React from 'react';
import { connect } from 'react-redux';
import {
  Drawer,
  List,
  ListItem,
  Text,
  Right,
  Body,
  Left,
  View,
  Icon,
  Thumbnail
} from 'native-base';
import { WebBrowser } from 'expo';
import { StyleSheet, PixelRatio } from 'react-native';
import { DrawerActions } from 'react-navigation';
import variables from "../native-base-theme/variables/platform";

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  },
  account: {
    paddingTop: variables.listItemPadding + variables.toolbarHeight - 50,
    paddingBottom: variables.listItemPadding + 6,
    backgroundColor: variables.drawerBrandBg,
    marginTop: -1,
  },
  accountText: {
    color: "#fff",
    fontWeight: "200",
    fontSize: 20
  },
  accountBody: {
    borderWidth: 0,
    borderColor: "transparent",
  },
  item: {
    height: 48,
    borderBottomWidth: 0,
    borderColor: "transparent",
  },
  borderList: {
     borderBottomWidth: variables.borderWidth,
     borderColor: variables.listBorderColor,
  },
  itemSeparator: {
    height: 1,
    borderBottomWidth: variables.borderWidth,
    borderColor: variables.listBorderColor
  },
  itemText: {
    color: "rgba(0, 0, 0, 0.9)",
    fontSize: 14,
  },
  icon: {
    color: "rgba(0, 0, 0, 0.9)",
    width: variables.iconFontSize + 4
  }
});

class AppDrawer extends React.Component {
  render() {
    return (
      <View
        style={styles.container}
      >
        <View style={{ flex: 0 }}>
          <List>
            <ListItem last avatar style={styles.account}>
              <Left>
                <Thumbnail circle source={require("../assets/icon.png")} />
              </Left>
              <Body style={styles.accountBody}>
                <Text style={styles.accountText}>Commfeed</Text>
              </Body>
            </ListItem>
            <ListItem
              icon
              style={styles.item}
              onPress={() => {
                this.props.navigation.navigate("PrivacyPolicy");
                this.props.navigation.dispatch(DrawerActions.toggleDrawer());
              }}
            >
              <Left>
                <Icon style={styles.icon} name="assistant-photo" />
              </Left>
              <Body>
                <Text style={styles.itemText}>Privacy Policy</Text>
              </Body>
              <Right />
            </ListItem>
            <ListItem
              icon
              last
              style={styles.item}
              onPress={() => {
                this.props.navigation.navigate("OptOut");
                this.props.navigation.dispatch(DrawerActions.toggleDrawer());
              }}
            >
              <Left>
                <Icon style={styles.icon} name="remove-circle" />
              </Left>
              <Body>
                <Text style={styles.itemText}>Opt-out from Commfeed</Text>
              </Body>
              <Right />
            </ListItem>
          </List>
        </View>
        <List style={{ flex: 0 }}>
        </List>
      </View>
    );
  }
}

export default AppDrawer;
