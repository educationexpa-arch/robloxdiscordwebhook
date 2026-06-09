const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.use(express.json());

app.post("/webhook", async (req, res) => {
    const webhookUrl = req.headers["x-webhook-url"];
    if (!webhookUrl || !webhookUrl.startsWith("https://discord.com/api/webhooks/")) {
        return res.status(400).send("Invalid webhook URL");
    }
    try {
        const response = await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req.body),
        });
        res.status(response.status).send("OK");
    } catch (err) {
        res.status(500).send("Error: " + err.message);
    }
});

app.listen(3000, () => console.log("Proxy running"));
