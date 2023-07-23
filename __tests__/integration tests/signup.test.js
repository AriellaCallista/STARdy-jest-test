import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";

import SignUp from "../../src/screens/signup";
import { signup } from "../../src/api/auth";
import Login from "../../src/screens/login";

describe("testing navigation on signup page", () => {
    const navigation = {navigate: () => {}};
    jest.spyOn(navigation, "navigate");

    test("navigation between login and signup page", () => {
        const page = render(<Login navigation={navigation}/>);
        const goToRegister = page.getByTestId("goToRegister");
        fireEvent.press(goToRegister);
        expect(navigation.navigate).toHaveBeenCalledWith("Sign Up");
    })
    
    test("navigation between signup and profile page", async () => {
        
        await signup(navigation, "test@gmail.com", "12345");
        expect(navigation.navigate).toHaveBeenCalledWith("Profile");
    
    })
})
