const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname));   // ADD THIS LINE

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

app.listen(3000,()=>{
console.log("Server running on port 3000");
});