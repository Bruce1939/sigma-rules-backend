import bcrypt from 'bcryptjs';

const generateHashedPassword = async (password) => {
    const rounds = 10;
    const hashedPassword = await bcrypt.hash(password, rounds);
    return hashedPassword;
};

const comparePasswords = async (userPassword, dbPassword) => {
    const match = await bcrypt.compare(userPassword, dbPassword);
    return match;
}

export { generateHashedPassword, comparePasswords };