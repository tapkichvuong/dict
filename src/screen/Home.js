import {View, StyleSheet, Text} from 'react-native';
import SearchTab from '../components/SearchTab';
import Constants from 'expo-constants'
import { Image } from '@rneui/themed';

function Home({navigation}){
    const getID = (id) => {
        console.log(id)
    }
    return (
        <View>
            <View style={styles.container}>
            <View style = {styles.brand}>
                <Image style={styles.logo} source={require("../../assets/book.png")} />
                <Text style = {{fontSize: 16, fontWeight: '500'}}> English - Viet Dictionary </Text>
            </View>
            <SearchTab onSubmit={getID}/>
        </View>
            
        </View>
    )
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
})

export default Home