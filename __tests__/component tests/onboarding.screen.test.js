import React from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import OnboardingScreen from '../../src/screens/onboardingScreen'; 
import Profile from '../../src/screens/profile';
import { fireEvent, render, spyOn} from '@testing-library/react-native'; 

// jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('Upon setting up profile', () => {

  it('should navigate to OnboardingScreen page2', () => {
      const navigation = {navigate: () => {}}
      // spyOn(navigation, 'navigate'); 
      jest.spyOn(navigation, 'navigate'); 

      const page = render(<Profile navigation={navigation}/>); 

      const onboardingButton = page.getByTestId('onboardingButton'); 

      fireEvent.press(onboardingButton); 

      expect(navigation.navigate).toHaveBeenCalledWith("OnboardingScreen"); 

  })
}) 