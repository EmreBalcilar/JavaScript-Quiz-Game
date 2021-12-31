const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []



let questions = [
    {
        question: 'Emre' ,
        choice1: 'Almanya',
        choice2: 'İngiltere',
        choice3: 'Fransa',
        choice4: 'Macaristan',
        answer: 2,
        
    },
    {
        question:
            "Hangisi periyodik tabloda bulunan bir element değildir?",
        choice1: "Su",
        choice2: "Azot",
        choice3: "Oksijen",
        choice4: "Hidrojen",
        answer: 1,
    },
    {
        question: "Hangisi bir doğal sayıdır?",
        choice1: "-1%",
        choice2: "2.5%",
        choice3: "0",
        choice4: "-19%",
        answer: 3,
    },
    {
        question: "Galatasaray hangi yıl UEFA kupasını almıştır?",
        choice1: "2000",
        choice2: "2001",
        choice3: "2005",
        choice4: "1999",
        answer: 1,
    },
    {
        question: "Beni öldürmeyen acı güçlendirir hangi ünlü düşünürün sözüdür?",
        choice1: "Marx ",
        choice2: "Nietzsche",
        choice3: "Freud",
        choice4: "Adolf Hitler",
        answer: 2,
    },
    {
        question: "Davut Yıldızı hangi dinin sembolüdür ?",
        choice1: "Hristyianlık",
        choice2: "Budizm",
        choice3: "Şamanizim",
        choice4: "Musevilik",
        answer: 4,
    },
    { 
        question: "AB standartlarına göre IBAN numarasında en fazla kaç adet rakam olabilir? ",
        choice1: "34",
        choice2: "16",
        choice3: "22",
        choice4: "27",
        answer: 1,
    },
    {  
        question: "Bir tiyatro oyununda, kişilerden birinin kendi kendine yaptığı konuşmaya ne denir?",
        choice1: "Diyalog",
        choice2: "Monolog",
        choice3: "Kinaye",
        choice4: "Sohbet",
        answer: 2,
    },
    {
        question: "Dünya'nın 7 Harikası'ndan biri olan Halikarnas Mozolesi nerededir?",
        choice1: "Pakistan",
        choice2: "Almanya",
        choice3: "Fransa",
        choice4: "Türkiye",
        answer: 4,
    },
    { 
        question: "Dünyanın en büyük gölü hangisidir?",
        choice1: "Malavi",
        choice2: "Lut",
        choice3: "Hazar",
        choice4: "Van",
        answer: 3,
    },
    {
        question: "Geminin en önde kalan baş kısmına ne ad verilir?",
        choice1: "Küpeşte",
        choice2: "sancak",
        choice3: "İskele",
        choice4: "Pruva",
        answer: 4,
    },
    { 
        question: "Asprinin ham maddesi olan ağaç hangisidir?",
        choice1: "Söğüt ",
        choice2: "Çınar",
        choice3: "Çam",
        choice4: "Meşe",
        answer: 1,
    },
    { 
        question: " ",
        choice1: " ",
        choice2: " ",
        choice3: " ",
        choice4: " ",
        answer: 1,
    },
    
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = questions.length

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = ` ${questionCounter}.Soru | Toplam Soru: ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()