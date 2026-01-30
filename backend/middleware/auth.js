import jwt from "jsonwebtoken";

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

