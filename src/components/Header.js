import Constants from 'expo-constants';
import React, {useState} from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import SearchTab from './SearchTab'

const Header = () => {
  return (
    <View style={styles.container}>
      <View style = {styles.brand}>
        <Image style={styles.logo} source={require("../../assets/book.png")} />
        <Text style = {{fontSize: 15} }> English - Viet Dictionary </Text>
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
    padding: 20,
    paddingTop: Constants.statusBarHeight + 30,
    backgroundColor: "#7AD6BC"
  },
  brand: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});

export default Header;