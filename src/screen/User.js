import { View, Text, Image, TouchableOpacity, Button, StyleSheet} from 'react-native';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import React, { useState, useEffect } from 'react';

// save the way sign in to app 1 is Facebook 2 is Google to choose way sign out
var signInKey = 0;

//Facebook Sign In
const onFacebookButtonPress = async () => {
    // Attempt login with permissions
    const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
  
    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }
  
    // Once signed in, get the users AccesToken
    const data = await AccessToken.getCurrentAccessToken();
  
    if (!data) {
      throw 'Something went wrong obtaining access token';
    }
  
    // Create a Firebase credential with the AccessToken
    const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
    
    // Sign-in the user with the credential
    const userSignIn = auth().signInWithCredential(facebookCredential);
    userSignIn.then((user)=>{
        signInKey = 1;
        console.log(user);
    }).catch((error)=>{
        console.log(error);
    })
    return userSignIn;
};
const FBsignOut = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.error(error);
    }
};

//Google Sign In 
const onGoogleButtonPress = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
  
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // Sign-in the user with the credential
    const userSignIn = auth().signInWithCredential(googleCredential);
    userSignIn.then((user)=>{
        signInKey = 2;
        console.log(user);
    }).catch((error)=>{
        console.log(error);
    })
    return userSignIn;
}

const GGsignOut = async () => {
    try {
        await GoogleSignin.revokeAccess();
        await auth().signOut();
    } catch (error) {
        console.error(error);
    }
};

function User(){
    GoogleSignin.configure({
        webClientId: '35230379239-kupn96vmcq3i4m15c9ug8at4j15nne9l.apps.googleusercontent.com',
    });

    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;
    
    if (!user) {
        return (
          <View style={styles.container}>
            <TouchableOpacity style={styles.fbBtn} onPress={onFacebookButtonPress}>
                <Text style={styles.textBtn}>Facebook Sign-In</Text>
            </TouchableOpacity>
            <GoogleSigninButton
                style= {{
                    width: 275,
                    height: 75,
                    marginTop: 50
                }}
                onPress={onGoogleButtonPress}
                color={GoogleSigninButton.Color.Dark}
                size={GoogleSigninButton.Size.Wide}
            />
          </View>
        );
    }

    return (
        <View style={styles.container}>
            <Image 
                source={{uri: user.photoURL}}
                style={{width: 200, height: 200, borderRadius: 100, marginBottom: 50}}
            />
            <Text style={styles.text}> Welcome, {user.displayName}</Text>
            <TouchableOpacity style={styles.button} onPress={(signInKey == 2) ? GGsignOut : FBsignOut}>
                <Text style={styles.textBtn}>Sign Out</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems:'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 20,
        fontWeight: '500',
    },
    textBtn: {
        fontSize: 20,
        fontWeight: '400',
        color: '#fff'
    },
    button: {
        backgroundColor: '#2196F3',
        alignItems: 'center',
        justifyContent: 'center',
        height: 60,
        width: 200,
        borderRadius: 5,
        marginTop: 50,
    },
    fbBtn: {
        backgroundColor: '#2196F3',
        alignItems: 'center',
        justifyContent: 'center',
        width: 270,
        height: 70,
        marginTop: 50,
        borderRadius: 5,
    }
})

export default User