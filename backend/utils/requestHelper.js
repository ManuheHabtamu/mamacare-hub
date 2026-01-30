export const sendJson = (res, status, data) =>
    res.writeHead(status, { "Content-Type": "application/json" }).end(JSON.stringify(data));

export const parseBody = (req) =>
    new Promise((resolve, reject) => {
        let chunks = [];
        req.on("data", (c) => chunks.push(c)).on("end", () => {
            const body = Buffer.concat(chunks).toString();
            try {
                resolve(body ? JSON.parse(body) : {});
            } catch {
                reject(new Error("Invalid JSON"));
            }
        });
    });
