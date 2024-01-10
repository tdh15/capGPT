const messagesDiv = document.getElementById("messages");
const input = document.getElementById("input");

input.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    const text = input.value.trim();
    if (text) {
      addMessage(text, "sent");
      sendMessageToServer(text);
      input.value = "";
    }
  }
});

function addMessage(text, type) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", type);
  messageDiv.textContent = text;
  messagesDiv.appendChild(messageDiv);
  messageDiv.animate(
    [
      { transform: "translateY(-20px)", opacity: 0 },
      { transform: "translateY(0)", opacity: 1 },
    ],
    {
      duration: 500,
      fill: "forwards",
    }
  );
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

async function sendMessageToServer(text) {
  const response = await fetch("/message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text, selectedIndex }),
  });
  const data = await response.json();
  addMessage(data.text, "received");
}

let selectedIndex = 0;

function selectOption(selectedDiv) {
  const options = document.querySelectorAll(".option");
  const header = document.querySelector(".header"); // Select the header element
  const emojiSpan = header.querySelector("span"); // Select the span element within the header
  options.forEach((div, index) => {
    div.classList.remove("selected");
    if (div === selectedDiv) {
      selectedIndex = index;
      messagesDiv.innerHTML = ""; // Clear messages
      const emojiName = selectedDiv.getAttribute("data-emoji-name"); // Get the emoji name
      emojiSpan.textContent = emojiName; // Set the header text to the emoji name
    }
  });
  selectedDiv.classList.add("selected");
}
