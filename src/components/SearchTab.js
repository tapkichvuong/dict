import React, { useState } from 'react';
import { SearchBar } from '@rneui/base';
import { View, StyleSheet } from 'react-native';

const SearchTab = () => {
  const [value, setValue] = useState("");

  return (
    <View style={styles.view}>
      <SearchBar
        platform="default"
        containerStyle={{ borderRadius: 15 }}
        inputContainerStyle={{}}
        inputStyle={{}}
        leftIconContainerStyle={{}}
        rightIconContainerStyle={{}}
        lightTheme
        loadingProps={{}}
        onChangeText={newVal => setValue(newVal)}
        onClearText={() => console.log(onClearText())}
        placeholder="Type query here..."
        placeholderTextColor="#888"
        cancelButtonTitle="Cancel"
        cancelButtonProps={{}}
        onCancel={() => console.log(onCancel())}
        value={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    weight: 600,
    margin: 5,
    borderRadius: 15,
  },
});

export default SearchTab;
