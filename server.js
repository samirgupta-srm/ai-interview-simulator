const express = require("express");
const bodyParser = require("body-parser");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname));

const genAI = new GoogleGenerativeAI("AIzaSyAYo2I9HZA3wc48rClsJ9gh2AzMfPyCfLY");

app.get("/", (req, res) => {
res.sendFile(__dirname + "/index.html");
});

app.post("/questions",(req,res)=>{

const role = req.body.role;

const questions = `
1. What is ${role}?
2. Explain a key concept of ${role}.
3. What tools are used in ${role}?
4. What challenges exist in ${role}?
5. How would you improve a ${role} system?
`;

res.json({questions});

});

app.post("/evaluate", async (req,res)=>{

const qaList = req.body.qa;

let formatted = "";

qaList.forEach((item,i)=>{
formatted += `
Question ${i+1}: ${item.question}
Answer: ${item.answer}
`;
});

try{

const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const prompt = `
You are an enterprise interview evaluator.

Evaluate ONLY the answers for the questions provided below.
Do NOT invent new questions.

Interview Questions and Candidate Answers:
${formatted}

Return the evaluation EXACTLY in this format:

Question X
Correctness: X/10
Relevance: X/10
Clarity: X/10
Depth: X/10
Feedback: short explanation

Finally return:
Overall Interview Score: X/10
`;

const result = await model.generateContent(prompt);

const text = result.response.text();

res.json({evaluation:text});

}catch(err){

console.log(err);
res.json({evaluation:"Evaluation failed: " + err.message});

}

});

app.listen(3000,()=>{
console.log("Server running on port 3000");
});