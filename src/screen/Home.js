import {View, ScrollView, StyleSheet} from 'react-native'
import Header from '../components/Header'

function Home(){
    return (
        <View>
            <Header/>
            <ScrollView>
                <View style={styles.scrollView}>
                    
                </View>
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    scrollView: {
        height: 1000, backgroundColor: "white",
    },
})

export default Home