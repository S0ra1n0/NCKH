const chatInput = document.querySelector(".chat-input textarea")
const sendChatBtn = document.querySelector(".chat-input img")
const chatbox = document.querySelector(".chatbox")

let userMessage;

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "out" ? `<p>${message}</p>` : `<img id = "ime" src = "fotor-ai-2024051911579.jpg" width = 39 height = 39><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
}

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if(!userMessage) return;

    chatbox.appendChild(createChatLi(userMessage, "out"));

    setTimeout(() => {
        chatbox.appendChild(createChatLi("Thinking...", "in"));
    }, 600);
}

sendChatBtn.addEventListener("click", handleChat);
