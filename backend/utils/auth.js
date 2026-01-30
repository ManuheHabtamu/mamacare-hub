import crypto from "crypto";
import jwt from "jsonwebtoken";

const ITERATIONS = 100000;
const KEY_LENGTH = 64;
const DIGEST = "sha512";

export const hashPassword = (password) => {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto
        .pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST)
        .toString("hex");
    return `${salt}:${hash}`;
};

export const verifyPassword = (password, storedHash) => {
    if (!storedHash) return false;
    const [salt, originalHash] = storedHash.split(":");
    if (!salt || !originalHash) return false;
    const hash = crypto
        .pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST)
        .toString("hex");
    if (originalHash.length !== hash.length) return false;
    return crypto.timingSafeEqual(
        Buffer.from(originalHash, "hex"),
        Buffer.from(hash, "hex")
    );
};

export const signToken = (payload) =>
    jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "7d" });
