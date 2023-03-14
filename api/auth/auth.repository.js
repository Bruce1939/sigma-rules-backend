import { User, Code } from "./../../database/index.js";

class AuthRepository {
    async findEmail(email) {
        try {
            const user = await User.findOne({ email });
            return user;
        } catch (error) {
            console.log(error);
            return;
        }
    }

    async findUser(userId) {
        try {
            const user = await User.findOne({ _id: userId });
            return user;
        } catch (error) {
            console.log(error);
            return;
        }
    }

    async findToken(userId, code) {
        try {
            const newtoken = await Code.findOne({
                userId,
                code,
            });
            return newtoken;
        } catch (error) {
            console.log(error);
            return;
        }
    }

    async createUser({ username, email, password }) {
        try {
            const user = new User({
                username,
                email,
                password,
            });

            const userResult = await user.save();
            return userResult;
        } catch (error) {
            console.log(error);
            return;
        }
    }

    async createVerificationCode(userId, code) {
        try {
            const verificationToken = new Code({
                userId,
                code,
            });

            const savedToken = await verificationToken.save();
            return savedToken;
        } catch (error) {
            console.log(error);
            return;
        }
    }

    async updateUserAccountStatus(userId) {
        try {
            const user = await User.updateOne(
                { _id: userId },
                { isActive: true }
            );

            return user;
        } catch (error) {
            console.log(error);
            return;
        }
    }

    async removeVerifiedToken(userId, code) {
        try {
            await Code.findOneAndRemove({
                userId,
                code,
            });
        } catch (error) {
            console.log(error);
            return;
        }
    }
}

export default AuthRepository;
