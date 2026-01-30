import { sendJson, parseBody } from "../utils/requestHelper.js";
import * as userController from "../controllers/userController.js";
import * as pregnancyController from "../controllers/pregnancyController.js";
import * as weekController from "../controllers/weekController.js";
import * as appointmentController from "../controllers/appointmentController.js";

import * as contactController from "../controllers/contactController.js";
import * as babyGrowthController from "../controllers/babyGrowthController.js";
import { requireAuth } from "../middleware/auth.js";

export const handleRoute = async (req, res) => {
    const { method, url } = req;
    const parsedUrl = new URL(url, `http://${req.headers.host}`);
    const path = parsedUrl.pathname;

    try {
        /* ROOT */
        if (path === "/" && method === "GET") {
            return sendJson(res, 200, { status: "ok", message: "API is running" });
        }

        /* USERS */
        if (path === "/users" && method === "GET") {
            return userController.getAllUsers(req, res, sendJson);
        }

        if (path === "/users" && method === "POST") {
            const body = await parseBody(req);
            return userController.registerUser(req, res, body, sendJson);
        }

        if (path === "/auth/login" && method === "POST") {
            const body = await parseBody(req);
            return userController.loginUser(req, res, body, sendJson);
        }

        /* PREGNANCY PROFILE */
        if (path === "/pregnancy" && method === "GET") {
            if (!requireAuth(req, res, sendJson)) return;
            return pregnancyController.getPregnancyData(req, res, sendJson);
        }

        /* WEEKS */
        if (path === "/weeks" && method === "GET") {
            return weekController.getWeeklyUpdates(req, res, sendJson);
        }

        /* APPOINTMENTS */
        if (path === "/appointments" && method === "GET") {
            if (!requireAuth(req, res, sendJson)) return;
            return appointmentController.getAppointments(req, res, sendJson);
        }

        if (path === "/appointments" && method === "POST") {
            if (!requireAuth(req, res, sendJson)) return;
            const body = await parseBody(req);
            return appointmentController.scheduleAppointment(req, res, body, sendJson);
        }

        if (path.startsWith("/appointments/") && method === "PUT") {
            if (!requireAuth(req, res, sendJson)) return;
            const body = await parseBody(req);
            const id = path.split("/")[2];
            return appointmentController.updateAppointment(req, res, id, body, sendJson);
        }

        if (path.startsWith("/appointments/") && method === "DELETE") {
            if (!requireAuth(req, res, sendJson)) return;
            const id = path.split("/")[2];
            return appointmentController.deleteAppointment(req, res, id, sendJson);
        }

        /* CONTACT */
        if (path === "/contact" && method === "POST") {
            const body = await parseBody(req);
            return contactController.submitContactForm(req, res, body, sendJson);
        }

        /* BABY GROWTH TRACKER */
        if (path === "/babygrowth" && method === "GET") {
            if (!requireAuth(req, res, sendJson)) return;
            return babyGrowthController.getBabyGrowthData(req, res, sendJson);
        }

        if (path === "/babygrowth" && (method === "POST" || method === "PUT")) {
            if (!requireAuth(req, res, sendJson)) return;
            const body = await parseBody(req);
            return babyGrowthController.updateBabyGrowthData(req, res, body, sendJson);
        }

        if (path === "/babygrowth/records" && method === "POST") {
            if (!requireAuth(req, res, sendJson)) return;
            const body = await parseBody(req);
            return babyGrowthController.addGrowthRecord(req, res, body, sendJson);
        }

        /* NOT FOUND */
        sendJson(res, 404, { error: "Route not found" });
    } catch (err) {
        console.error(err);
        sendJson(res, err.message === "Invalid JSON" ? 400 : 500, {
            error: err.message || "Server error"
        });
    }
};
