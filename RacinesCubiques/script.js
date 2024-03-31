const questionElement = document.getElementById("question"); 

let correctAnswer = Math.floor(Math.random() * 99)+1; 
let num1 = correctAnswer * correctAnswer * correctAnswer;

questionElement.innerText = `Quelle est la racine cubique de ${num1} ?`; 

const form = document.getElementById('form'); 
const input = document.getElementById('inp'); 
let scoreElement = document.getElementById('score'); 

let score = Number(localStorage.getItem("score")); 
if(!score) { 
	score = 0; 
} 

scoreElement.textContent = `score : ${score}`; 

form.addEventListener('submit',function() { 
	let userAnswer = +input.value; 
	if(correctAnswer === userAnswer) { 
		score++; 
		updateScore(); 
	} 
	else { 
		score--; 
		updateScore(); 
	} 
}); 

function updateScore() { 
	localStorage.setItem("score",String(score)); 
} 

// Clear Local Storage 
localStorage.removeItem("score");
