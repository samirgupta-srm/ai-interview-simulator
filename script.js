async function startInterview() {

const role = document.getElementById("role").value;

const response = await fetch("/questions", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({ role: role })
});

const data = await response.json();

const questions = data.questions.split("\n");

let html = "";

questions.forEach((q, i) => {
if (q.trim() !== "") {

html += `
<p>${q}</p>
<input id="answer${i}" placeholder="Your answer"><br><br>
`;

}
});

document.getElementById("questions").innerHTML = html;

}



async function submitAnswers() {

const questionElements = document.querySelectorAll("#questions p");

let qa = [];

for (let i = 0; i < questionElements.length; i++) {

let question = questionElements[i].innerText;

let input = document.getElementById("answer" + i);

if (!input) continue;

let answer = input.value;

qa.push({
question: question,
answer: answer
});

}

const response = await fetch("/evaluate", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({ qa: qa })
});

const data = await response.json();

document.getElementById("result").innerHTML =
`<h3>Interview Evaluation</h3><pre>${data.evaluation}</pre>`;

}