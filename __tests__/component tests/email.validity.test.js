const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    if (!email) return "Email cannot be empty"
    if (!re.test(email)) return "Invalid email"
    return "Success"
};


it('should return an error if email is invalid', () => {
    expect(validateEmail("test@gmail")).toBe("Invalid email");

})

it('should return an error if email is empty', () => {
    expect(validateEmail("")).toBe("Email cannot be empty");
})

it('should not return an error if email is valid', () => {
    expect(validateEmail("test@gmail.com")).toBe("Success");
})