import express from "express";
import fetch from "node-fetch";
import twilio from "twilio";

const app = express();
app.use(express.json());

/* 🔥 API KEYS */
const OPENAI_KEY = "PEGA_AQUI_TU_API_KEY";
const TWILIO_SID = "PEGA_TU_SID";
const TWILIO_TOKEN = "PEGA_TU_TOKEN";

/* 🔥 TWILIO */
const client = twilio(TWILIO_SID, TWILIO_TOKEN);

/* 🔥 CHAT IA */
app.post("/chat", async (req, res) => {

const msg = req.body.message;

const response = await fetch("https://api.openai.com/v1/chat/completions", {
method: "POST",
headers: {
"Content-Type": "application/json",
"Authorization": `Bearer ${OPENAI_KEY}`
},
body: JSON.stringify({
model: "gpt-4o-mini",
messages: [
{ role: "system", content: "Eres asesor de tecnibaby, vendes limpieza premium de coches de bebé." },
{ role: "user", content: msg }
]
})
});

const data = await response.json();

res.json({ reply: data.choices[0].message.content });

});

/* 🔥 WHATSAPP AUTO */
app.post("/whatsapp", async (req,res)=>{

await client.messages.create({
body: req.body.text,
from: "whatsapp:+14155238886",
to: "whatsapp:+573172244861"
});

res.send("ok");

});

app.listen(3000, ()=> console.log("🔥 SERVER ACTIVO"));
