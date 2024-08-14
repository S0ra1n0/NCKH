const chatInput = document.querySelector(".chat-input textarea")
const sendChatBtn = document.querySelector(".chat-input img")
const chatbox = document.querySelector(".chatbox")
const chatboxToggle = document.querySelector(".chatbot-toggle")
const chatboxCloseBtn = document.querySelector(".close-btn")

let userMessage;
let stopping = 0;
const API_KEY = "sk-None-kK6eHnqeZ9BMeIdhfZFBT3BlbkFJnw8TbPbzcDhp3WqeQNff";

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "out" ? `<p></p>` : `<img id = "ime" src = "fotor-ai-2024051911579.jpg" width = 39 height = 39><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
}

const generateResponse = (incomingChatLi) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = incomingChatLi.querySelector("p");

    const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`  // Ensure space after Bearer
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: userMessage }]
        })
    }

    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        messageElement.textContent = data.choices[0].message.content;
    }).catch((error) => {
        messageElement.classList.add('error');
        messageElement.textContent = "Oops! Something went wrong. Please try again.";
    }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
    setTimeout(() => {stopping = 0;}, 200);
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if(!userMessage) return;
    chatInput.value = "";
    if (stopping == 1) return;
    chatbox.appendChild(createChatLi(userMessage, "out"));
    chatbox.scrollTo(0, chatbox.scrollHeight);
    stopping = 1;
    setTimeout(() => {
        const incomingChatLi = createChatLi("Thinking...", "in");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
}

sendChatBtn.addEventListener("click", handleChat);
chatboxToggle.addEventListener("click", () => document.body.classList.toggle("show-chatbox"));
chatboxCloseBtn.addEventListener("click", () => document.body.classList.remove("show-chatbox"));
