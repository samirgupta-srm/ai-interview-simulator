async function startInterview(){

const role = document.getElementById("role").value;

const response = await fetch("/questions",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({role})
});

const data = await response.json();

const q = data.questions.split("\n");

let html = "";

q.forEach((question,i)=>{
if(question.trim() !== ""){
html += `<p>${question}</p>
<input id="answer${i}" placeholder="Your answer"><br><br>`;
}
});

document.getElementById("questions").innerHTML = html;

}

function submitAnswers(){

let answers = [];

for(let i=0;i<10;i++){
let input = document.getElementById("answer"+i);
if(input){
answers.push(input.value);
}
}

let answered = answers.filter(a => a.trim() !== "").length;

let score = Math.round((answered / answers.length) * 10);

document.getElementById("result").innerHTML =
`<h3>Your Interview Score: ${score}/10</h3>
<p>Score based on how many questions you answered.</p>`;

}