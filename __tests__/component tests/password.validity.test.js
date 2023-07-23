const validatePassword = (password) => {
    if (!password) return "Password cannot be empty"
    if (password.length < 6) return "Password must at least be 6 characters long"
    return "Success"
}

it('should return an error if password is empty', () => {
    expect(validatePassword("")).toBe("Password cannot be empty")
})

it('should return an error if password length < 6', () => {
    expect(validatePassword("pa")).toBe("Password must at least be 6 characters long")
})

it('should not return an error', () => {
    expect(validatePassword("password")).toBe("Success")
})