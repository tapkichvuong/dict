import React, { useState } from 'react';
import { SearchBar } from '@rneui/base';
import { View } from 'react-native';

const SearchTab = () => {
  const [value, setValue] = useState("");

  return (
    <View>
      <SearchBar
        platform="default"
        containerStyle={{ borderRadius: 15 }}
        inputContainerStyle={{}}
        inputStyle={{color: '#000'}}
        leftIconContainerStyle={{}}
        rightIconContainerStyle={{}}
        lightTheme
        loadingProps={{}}
        onChangeText={newVal => setValue(newVal)}
        onClearText={() => console.log(onClearText())}
        placeholder="Search here..."
        placeholderTextColor="#888"
        cancelButtonTitle="Cancel"
        cancelButtonProps={{}}
        onCancel={() => console.log(onCancel())}
        value={value}
      />
    </View>
  );
};

export default SearchTab;
