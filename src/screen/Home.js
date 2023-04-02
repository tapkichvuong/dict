import {View, ScrollView, StyleSheet} from 'react-native'
import Header from '../components/Header'
import Definition from '../components/Definition'
function Home(){
    return (
        <View>
            <Header/>
            <ScrollView>
                <View style={styles.scrollView}>
                    <Definition/>
                </View>
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    scrollView: {
        height: 800, backgroundColor: "white",
    },
})

export default Home