const validateSignup = (usernameInput, emailInput, password) => {
    const username = usernameInput.trim();
    const email = emailInput.trim();
    const validationErrors = [];

    const validatedInput = {
        username,
        password,
        email,
    };
    const usernamePattern = "/^(?=.{5,20}$)[a-zA-Z0-9._]+$/";
    if (usernamePattern.match(username))
        validationErrors.push(
            "Invalid Username. Username must be between 5 to 20 characters long and can only contain alphanumeric characters along with _ and ."
        );

    const emailPattern = "/^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$/";
    if (email.length === 0) validationErrors.push("Email cannot be empty");
    else if (emailPattern.match(email)) validationErrors.push("Invalid Email.");

    const passwordPattern =
        "/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$/";
    if (passwordPattern.match(password))
        validationErrors.push(
            "Invalid Password. Password must contain atleast 8 characters at least one number and both lower and uppercase letters and special characters"
        );

    return { validationErrors, validatedInput };
};

export default validateSignup;
