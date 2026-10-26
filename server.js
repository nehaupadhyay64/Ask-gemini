import express from "express"
import dotenv from "dotenv"
import cors from "cors";
import {GoogleGenAI} from "@google/genai"
dotenv.config()

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(express.static("public"))
app.use(express.json());

const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});

app.post("/ask",async(req,res)=>{
    const {question} = req.body;
    console.log("User Question:",question);
   try{
     const response = await ai.models.generateContent({
        model:"gemini-3.6-flash",
        contents: `You are a helpful assistant. Answer concisely in 2-4 sentences max. Question: ${question}`,
        config: {
            maxOutputTokens: 300,
        },  
     });
 console.log("Gemini Answer:",response.text);
 res.json({answer:response.text});
   }catch(error){
    console.log("Gemini Error:",error.message);
    res.status(500).json({answer:"Something went wrong while asking Gemini...."});
   }
})

app.listen(PORT,() =>{
    console.log(`Server running on http://localhost:${PORT}`);
});