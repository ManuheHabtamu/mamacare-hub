import jwt from "jsonwebtoken";
import crypto from "crypto";

const CONFIG = [100000, 64, "sha512"];

export const hashPassword = (password) => {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto.pbkdf2Sync(password, salt, ...CONFIG).toString("hex");
    return `${salt}:${hash}`;
};

export const verifyPassword = (password, storedHash) => {
    const [salt, original] = (storedHash || "").split(":");
    if (!original) return false;
    const hash = crypto.pbkdf2Sync(password, salt, ...CONFIG).toString("hex");
    return crypto.timingSafeEqual(Buffer.from(original, "hex"), Buffer.from(hash, "hex"));
};

export const signToken = (payload) =>
    jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "7d" });

export const requireAuth = (req, res, sendJson) => {
    const token = (req.headers.authorization || "").replace("Bearer ", "");
    if (!token) {
        sendJson(res, 401, { error: "Unauthorized" });
        return null;
    }

    try {
        req.user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        return req.user;
    } catch {
        sendJson(res, 401, { error: "Invalid token" });
        return null;
    }
};
