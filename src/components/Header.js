import Constants from 'expo-constants';
import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import SearchTab from './SearchTab'

const Header = () => {
  return (
    <View style={styles.container}>
      <View style = {styles.brand}>
        <Image style={styles.logo} source={require("../../assets/book.png")} />
        <Text> English - Viet Dictionary </Text>
      </View>
      <SearchTab/>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Constants.statusBarHeight,
    paddingBottom: 5,
    backgroundColor: "cyan"
  },
  brand: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});

export default Header;