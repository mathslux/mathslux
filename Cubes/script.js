const questionElement = document.getElementById("question"); 

let num1 = Math.floor(Math.random() * 9)+1; 
let correctAnswer = num1 * num1 * num1; 

questionElement.innerText = `Quel est le cube de ${num1} ?`; 

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
