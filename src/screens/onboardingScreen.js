// welcome -> Login -> dashboard 
// onboardingscreen: welcome -> register -> profile setting -> onboarding -> dashboard 

import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';

const Dots = ({selected}) => {
    let backgroundColor;

    backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

    return (
        <View 
            style={{
                width:6,
                height: 6,
                marginHorizontal: 3,
                backgroundColor
            }}
        />
    );
}

const Skip = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Skip</Text>
    </TouchableOpacity>
);

const Next = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Next</Text>
    </TouchableOpacity>
);

const Done = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Done</Text>
    </TouchableOpacity>
);

const OnboardingScreen = ({navigation}) => {
    return (
        <View testID='onboardingScreen'>
            <Onboarding
                SkipButtonComponent={Skip}
                NextButtonComponent={Next}
                DoneButtonComponent={Done}
                DotComponent={Dots}
                onSkip={() => navigation.replace("Main Tab")}
                onDone={() => navigation.navigate("Main Tab")}
                pages={[
                {
                    backgroundColor: '#eef1e1',
                    image: <Image source={require('../../assets/1.png')} style={styles.image}/>,
                    title: 'Dashboard page',
                    subtitle: '',
                },
                {
                    backgroundColor: '#eef1e1',
                    image: <Image source={require('../../assets/2.png')} style={styles.image}/>,
                    title: 'Dashboard page',
                    subtitle: '',
                },
                {
                    backgroundColor: '#eef1e1',
                    image: <Image source={require('../../assets/3.png')} style={styles.image}/>,
                    title: 'Users page',
                    subtitle: '',
                },
                {
                    backgroundColor: '#eef1e1',
                    image: <Image source={require('../../assets/4.png')} style={styles.image}/>,
                    title: 'Tasks page',
                    subtitle: '',
                },
                {
                    backgroundColor: '#eef1e1',
                    image: <Image source={require('../../assets/5.png')} style={styles.image}/>,
                    title: 'Chat page',
                    subtitle: '',
                },
                {
                    backgroundColor: '#eef1e1',
                    image: <Image source={require('../../assets/6.png')} style={styles.image}/>,
                    title: 'Timer page',
                    subtitle: '',
                },
                ]}
            />
        </View>
        
    );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
  image: {
    // flex: 1, 
    // aspectRatio: 1.5, 
    marginTop: -50, 
    height: 700, 
    width: 700, 
    marginBottom: -50, 
    resizeMode: 'contain', 
  }
});