import {View, StyleSheet, Text} from 'react-native';
import SearchTab from '../components/SearchTab';
import Constants from 'expo-constants';
import { Image } from '@rneui/themed';
// get height of phone screen
import {Dimensions} from 'react-native';
const windowHeight = Dimensions.get('window').height;

function Home({navigation}){
    const getID = (id) => {
        navigation.navigate('Definition', {id: id});
    }
    return (
        <View style={styles.container}>
            <SearchTab onSubmit={getID}/>
            <View style={styles.homeView}>
                <Image style={styles.logo} source={require("../../assets/book.png")} />
                <Text style = {{color: '#f50', fontSize: 20, fontWeight: '800'}}> English - Viet Dictionary </Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    logo: {
        width: 200,
        height: 200,
        resizeMode: "contain",
      },
    homeView:{
        height: windowHeight-200,
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        padding: 20,
        paddingTop: Constants.statusBarHeight + 50,
        backgroundColor: "#7AD6BC",
        height: windowHeight-30,     
    },
})

export default Home