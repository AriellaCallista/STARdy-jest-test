import React from 'react'; 
import HomeChat from '../../src/screens/homeChat'; 
import Home from '../../src/screens/home'; 
import { fireEvent, render, spyOn} from '@testing-library/react-native'; 

it("be able to logout", () => {
    const { getByTestId } = render(
      <HomeChat />
    );
    expect(getByTestId("logoutButton")).toBeTruthy(); 
  });

  it("be able to logout", () => {
    const { getByTestId } = render(
      <Home />
    );
    expect(getByTestId("logoutButton")).toBeTruthy();
  });


