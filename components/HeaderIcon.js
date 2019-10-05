import React, { Component } from 'react';
import variables from "../native-base-theme/variables/platform";
import { MaterialIcons } from '@expo/vector-icons';
import { Platform, Text, View, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const styles = StyleSheet.create({
  actionIcon: {
    position: 'absolute',
    left: -6,
  },
  iosContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  text: {
    color: variables.toolbarBtnTextColor,
    fontFamily: variables.btnFontFamily,
    fontSize: variables.btnTextSize * 1.1,
    marginLeft: 9,
  },
});

const BackIcon = () => (
  <Svg style={styles.actionIcon} xmlns="http://www.w3.org/2000/svg" width="20" height="30" viewBox="6 0 20 24" preserveAspectRatio={'none'}>
    <Path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill={variables.toolbarBtnTextColor} />
    <Path d="M0 0h24v24H0z" fill={'none'} />
  </Svg>
)


const IOS_BUTTONS = {
  'back': { text: "Back", icon: <BackIcon />, weight: 'normal' },
  'done': { text: "Done", weight: 'bold' },
  'close': { text: "Back", icon: <BackIcon />, weight: 'normal' },
  'more': { text: 'More', weight: 'normal' },
  'send': { text: 'Send', weight: 'bold' },
  'add': { text: 'Add', weight: 'bold' },
}

const ANDROID_BUTTONS = {
  'back': { icon: "arrow-back" },
  'done': { icon: "done" },
  'close': { icon: "close" },
  'more': { icon: 'more-vert' },
  'send': { icon: 'send' },
  'add': { icon: 'add' },
}

export default (props) => {
  if (Platform.OS === 'ios') {
    return (
      IOS_BUTTONS[props.name] ?
        <View
          style={styles.iosContainer}
        >
          {
            IOS_BUTTONS[props.name].icon ? IOS_BUTTONS[props.name].icon : null
          }
          <Text
            numberOfLines={1}
            style={[ styles.text, { fontWeight: IOS_BUTTONS[props.name].weight }]}>
            {IOS_BUTTONS[props.name].text}
          </Text>
        </View> :
        null
    );
  } else {
    return (
      ANDROID_BUTTONS[props.name] ?
        <MaterialIcons
          color={props.color ? props.color : (props.disabled ? variables.btnDisabledBg : variables.toolbarBtnColor)}
          size={variables.iconHeaderSize}
          name={ANDROID_BUTTONS[props.name].icon}
        /> :
        null
    );
  }
}
