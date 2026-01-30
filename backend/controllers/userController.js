import User from "../models/user.js";
import { hashPassword, verifyPassword, signToken } from "../middleware/auth.js";

/* ---------- User Controllers ---------- */
//Return list of all users
export const getAllUsers = async (req, res, sendJson) => {
    const users = await User.find().select("-passwordHash");
    sendJson(res, 200, users);
};

export const registerUser = async (req, res, body, sendJson) => {
    const { password, ...rest } = body || {};

    if (!password || !rest.email) {
        return sendJson(res, 400, { error: "Email and password are required" });
    }

    const user = await User.create({
        ...rest,
        passwordHash: hashPassword(password)
    });

    const userSafe = user.toObject();
    delete userSafe.passwordHash;
    sendJson(res, 201, userSafe);
};

export const loginUser = async (req, res, body, sendJson) => {
    const { email, password } = body || {};

    if (!email || !password) {
        return sendJson(res, 400, { error: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user || !verifyPassword(password, user.passwordHash)) {
        return sendJson(res, 401, { error: "Invalid credentials" });
    }

    const token = signToken({ userId: user._id, email: user.email });
    const userSafe = user.toObject();
    delete userSafe.passwordHash;

    sendJson(res, 200, { token, user: userSafe });
};
