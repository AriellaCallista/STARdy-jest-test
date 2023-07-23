import React from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import Tasks from '../../src/screens/tasks';
import Home from '../../src/screens/home';
import Evidence from '../../src/components/tasks/evidence'; 
import { Alert } from 'react-native';
import { fireEvent, render, spyOn} from '@testing-library/react-native'; 
import { ListItem } from '../../src/components/chat/listItem';

const mockedParams = {
    route: { params: { uid: 12345, email: 'test@gmail.com', matched: null }},
}


describe('MainTab page', () => {
    test('testing presence of tasks bottom bar', async () => {
      const component = (
        <NavigationContainer>
          <Home />
        </NavigationContainer>
      );
  
      const {getAllByTestId} = render(component);
  
      const home = getAllByTestId('home');
  
      expect(home).toBeTruthy();
    });
  }); 
  
  describe('MainTab page', () => {
      test('testing rendering of tasks page', async () => {
        const component = (
          <NavigationContainer>
            <Tasks {...mockedParams} />
          </NavigationContainer>
        );
  
        const {getAllByTestId} = render(component);
  
        const tasks = getAllByTestId('tasks');
    
        expect(tasks).toBeTruthy();
      });
  }); 