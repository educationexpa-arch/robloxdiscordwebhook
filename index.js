{\rtf1\ansi\ansicpg1252\cocoartf2865
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const express = require("express");\
const fetch = require("node-fetch");\
const app = express();\
\
app.use(express.json());\
\
app.post("/webhook", async (req, res) => \{\
    const webhookUrl = req.headers["x-webhook-url"];\
    if (!webhookUrl || !webhookUrl.startsWith("https://discord.com/api/webhooks/")) \{\
        return res.status(400).send("Invalid webhook URL");\
    \}\
    try \{\
        const response = await fetch(webhookUrl, \{\
            method: "POST",\
            headers: \{ "Content-Type": "application/json" \},\
            body: JSON.stringify(req.body),\
        \});\
        res.status(response.status).send("OK");\
    \} catch (err) \{\
        res.status(500).send("Error: " + err.message);\
    \}\
\});\
\
app.listen(3000, () => console.log("Proxy running"));}