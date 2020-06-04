const main = document.querySelector('main');
const voicesSelect = document.getElementById('voices');
const textArea = document.getElementById('text');
const readBtn = document.getElementById('read');
const toggleBtn = document.getElementById('toggle');
const closeBtn = document.getElementById('close');

//array of objects
const data = [
    {
        image: './img/drink.jpg',
        text: "I'm Thirsty"
    },
    {
        image: './img/food.jpg',
        text: "I'm Hungry"
    },
    {
        image: './img/tired.jpg',
        text: "I'm Tired"
    },
    {
        image: './img/hurt.jpg',
        text: "I'm Hurt"
    },
    {
        image: './img/happy.jpg',
        text: "I'm Happy"
    },
    {
        image: './img/angry.jpg',
        text: "I'm Angry"
    },
    {
        image: './img/sad.jpg',
        text: "I'm Sad"
    },
    {
        image: './img/scared.jpg',
        text: "I'm Scared"
    },
    {
        image: './img/outside.jpg',
        text: 'I Want To Go Outside'
    },
    {
        image: './img/home.jpg',
        text: 'I Want To Go Home'
    },
    {
        image: './img/school.jpg',
        text: 'I Want To Go To School'
    },
    {
        image: './img/grandma.jpg',
        text: 'I Want To Go To Grandmas'
    }
];

//calling a function to create box for each element in the array 
data.forEach(createBox);

//function to create boxes 
function createBox(item) {
    const box = document.createElement('div');
    const { image, text } = item;

    box.classList.add("box");
    box.innerHTML = `<img src="${image}" alt ="${text}" />
   <p class="info">${text}</p>`;

    box.addEventListener('click' , ()=>{

        setTextMessage(text);
        speakText();

        //add active class
        box.classList.add("active");
        setTimeout(()=>box.classList.remove("active") , 800);
    });

    //appending each box to the main section 
    main.appendChild(box);
}

//array to store the voices 
let voices = [];

//function to get voices 
function getVoices() {
    voices = speechSynthesis.getVoices();
    voices.forEach(voice => {
        const option = document.createElement('option');
        option.value = voice.name;
        option.innerText = `${voice.name} ${voice.lang}`;
        voicesSelect.appendChild(option);
    });
}

//set the text
function setTextMessage(text) {
    message.text = text;
}

//speak the text 
function speakText() {
    speechSynthesis.speak(message);
}

//voice changed
speechSynthesis.addEventListener('voiceschanged' , getVoices);

const message = new SpeechSynthesisUtterance();
//called init
getVoices();

//to change the voice
function setVoice(e) {
    message.voice =voices.find(voice=> voice.name === e.target.value);
}

//the event listeners

//selecting voice
voicesSelect.addEventListener('change' , setVoice)
//toggoling the text-box
toggleBtn.addEventListener('click', () => document.getElementById('text-box').classList.toggle("show"));
//this is the close button and when its clicked it will remove it 
closeBtn.addEventListener('click', () => document.getElementById('text-box').classList.remove("show"));
//the writable text
readBtn.addEventListener('click' , ()=>{
    setTextMessage(textArea.value);
    speakText();
})
