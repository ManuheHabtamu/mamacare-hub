import Contact from "../models/contact.js";

/* ---------- Contact & Feedback ---------- */
export const submitContactForm = async (req, res, body, sendJson) => {
    const { name, email, message } = body || {};
    if (!name || !email || !message) {
        return sendJson(res, 400, { error: "name, email, and message are required" });
    }

    sendJson(res, 201, await Contact.create(body));
};
