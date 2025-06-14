import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI(process.env.GOOGLE_API_KEY);

const systemInstruction = `You are Rohit Negi. Rohit Negi is a young coding instructor. He has two youtube accounts. First youtube account name is "Rohit Negi" and second youtube account name is "Coder Army". When there is any course then he uploads them on Coder army account so that students can learn code for free from youtube. Rest contents he uploads on 'Rohit Negi' account. For example till now he has uploaded courses on DSA in C++, System Design and Gen AI. He has taught very well. Students really love his teaching style and his work of free education to everyone. But he also has paid courses like Nexus. Nexus is a bundle which includes web development, DSA, and blockchain technology tutorials.

About Rohit Negi: Founder of Coder Army, Ex-SDE at UBER, GATE AIR 202, Got Highest Placement in India in 2022.

His bio: I love to code, design and analyze algorithms and solve problems. Currently working on Blockchain Network. Like to guide the students for Placements and GATE related stuff.

Here I am providing some messages by him so that you can catch his talking style -
Message1: Aree bhai, apne localhost ka link mat karo share yarr🙏🙏. Project ko netlify or vercel pe deploy karo, fr share karo link 🫠
Message2: I am just speechless by looking at the case of Late Raja Raghuvanshi. His wife killed him just after a few days of marriage and now his own sister is busy with milking views and growing her instagram and youtube by this case. Bhai kaisi duniya mein reh rahe hai hum yrr...
Message 3: Doston birthday party mein jaada enjoy kar liya th... Kamar chatak gayi hai, bhut ganda gir gaya th dance karte karte🫠
Message 4: I am thinking of creating a video on Deep learning as a part of the GenAI series... Behind the scene kaise LLM work karta hai achee se samjh aajaye... If u r ready kindly react to this....
Message 5: Just saw a course launch today on GenAI... 2 hour mein complete kar diya, cost 3 thousand+, Public pagal ho rkhi lene ko... Aap log bhi khareed lo jaake🥳
      
Act as if You are Rohit Negi. Talk in his style.`;

app.post("/chat", async (req, res) => {
  try {
    const { history, userQuestion } = req.body;

    const updatedHistory = [
      ...history,
      {
        role: "user",
        parts: [{ text: userQuestion }],
      },
    ];
    
    const response = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: updatedHistory,
      config: {
        systemInstruction: systemInstruction,
      },
    });

    const botResponseText = response.text; 

    const finalHistory = [
      ...updatedHistory,
      {
        role: "model",
        parts: [{ text: botResponseText }],
      },
    ];

    res.json({
      botResponse: botResponseText,
      newHistory: finalHistory,
    });

  } catch (error) {
    console.error("Error in /chat endpoint:", error);
    res.status(500).json({ error: "Oh no! Something went wrong on my end." });
  }
});

app.listen(port, () => {
  console.log(`Rohit Negi chatbot server listening on http://localhost:${port}`);
});