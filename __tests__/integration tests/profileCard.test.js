import React from "react";
import { render, fireEvent, act } from "@testing-library/react-native";
import ProfileCard from "../../src/components/dashboard/profileCard";
import { NavigationContainer } from "@react-navigation/native";

const navigation = {navigate: () => {}};
jest.spyOn(navigation, "navigate");

it("should display user name", () => {
    const page = render(
        <NavigationContainer>
             <ProfileCard navigation={navigation} />
        </NavigationContainer>
   );
    const name = page.getByTestId("name");
    expect(name).toBeTruthy();

})

it("should display user gender", () => {
    const page = render(
        <NavigationContainer>
             <ProfileCard navigation={navigation} />
        </NavigationContainer>
   );
    const gender = page.getByTestId("gender");
    expect(gender).toBeTruthy();

})

it("should display user major", () => {
    const page = render(
        <NavigationContainer>
             <ProfileCard navigation={navigation} />
        </NavigationContainer>
   );
    const major = page.getByTestId("major");
    expect(major).toBeTruthy();

})

it("should display user year", () => {
    const page = render(
        <NavigationContainer>
             <ProfileCard navigation={navigation} />
        </NavigationContainer>
   );
    const year = page.getByTestId("year");
    expect(year).toBeTruthy();

})

it("should display user profile image", () => {
    const page = render(
        <NavigationContainer>
             <ProfileCard navigation={navigation} />
        </NavigationContainer>
   );
    const profileImage = page.getByTestId("profileImage");
    expect(profileImage).toBeTruthy();

})

