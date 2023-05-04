import {View, StyleSheet, Text} from 'react-native';
import SearchTab from '../components/SearchTab';
import Constants from 'expo-constants';
import { Image } from '@rneui/themed';

function Home({navigation}){
    const getID = (id) => {
        navigation.navigate('Definition', {id: id});
    }
    return (
        <View style={styles.container}>
            <View >
                <SearchTab onSubmit={getID}/>
                <View style={styles.homeView}>
                    <Image style={styles.logo} source={require("../../assets/book.png")} />
                    <Text style = {{color: '#f50', fontSize: 20, fontWeight: '800'}}> English - Viet Dictionary </Text>
                </View>
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
        marginTop: 150,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#7AD6BC",
    },
    container: {
        flex: 1,
        padding: 20,
        paddingTop: Constants.statusBarHeight + 50,
        backgroundColor: "#7AD6BC", 
        flexDirection: "column",
    },
})

export default Home