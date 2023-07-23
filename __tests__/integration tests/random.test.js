import React from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import FocusTimer from '../../src/screens/focusTimer'
import { act, fireEvent, render, spyOn} from '@testing-library/react-native'; 
import SessionUsers from '../../src/screens/sessionUsers';
import Random from '../../src/components/sessionUsers/random'
// jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
// jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('Session users page', () => {
    test('testing presence of random top bar', async () => {
        const component = (
            <NavigationContainer>
              <Random />
            </NavigationContainer>
          );
      
          const {getAllByTestId} = render(component);
      
          const random = getAllByTestId('randomList');
      
          expect(random).toBeTruthy();
    });
}); 