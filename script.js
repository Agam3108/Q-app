const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Who is the PM of India?',
    answers: [
      { text: 'Narendra Modi', correct: true },
      { text: 'Rahul Gandhi', correct: false },
      { text: 'Rajnath Singh',correct: false},
      { text: 'Draupadi Murmu',correct: false}
    ]
  },
  {
    question: 'Who is known as missile man of India?',
    answers: [
      { text: 'Satish Dhawan', correct: false },
      { text: 'Homi.J.Bhabha', correct: false },
      { text: 'Vikram Sarabhai', correct: false },
      { text: 'APJ Abdul Kalam', correct: true }
    ]
  },
  {
    question: 'When is national youth day?',
    answers: [
      { text: '12 January', correct: true },
      { text: '21 August', correct: false },
      { text: '5 May', correct: false },
      { text: '8 October', correct: false }
    ]
  },
  {
    question: 'What is 12^2%6?',
    answers: [
      { text: '4', correct: false },
      { text: '0', correct: true },
      { text: '2', correct: false},
      { text: '6', correct: false}
    ]
  }
]