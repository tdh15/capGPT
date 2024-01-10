// script.js

// Grab the list of existing messages from the index.html so we can add to it
const messagesDiv = document.getElementById("messages");
const input = document.getElementById("input");

// If the user hits enter, send the message to the server and clear the input box
input.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    const text = input.value.trim();
    if (text) {
      // The type of the message is "sent" because the user sent it
      // (as opposed to receiving it). This dictates the positioning
      // and styling of the message.
      addMessage(text, "sent");
      sendMessageToServer(text);
      input.value = "";
    }
  }
});

// When the user sends their message through, we add it to the messages div
// so that it comes up in the chat window
function addMessage(text, type) {
  const messageDiv = document.createElement("div");

  // Note that we pass "type" along so that we can style the message
  messageDiv.classList.add("message", type);
  messageDiv.textContent = text;
  messagesDiv.appendChild(messageDiv);

  // Animate the new message by having it fade in real quick
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

  // Scroll to the bottom of the messages div so that the latest message is shown
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

// Hit the /message endpoint on the server so that we can start working on a response
async function sendMessageToServer(text) {
  const response = await fetch("/message", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // We Jsonify the data so that it can be parsed
    body: JSON.stringify({ text, selectedIndex }),
  });

  // Then we wait for the response from the server, grab the text, and
  // add it as a message, with the "received" tag so it gets styled differently
  const data = await response.json();
  addMessage(data.text, "received");
}

// Defaults to CapGPT
let selectedIndex = 0;

// When an option is selected, set selectedIndex, clear messages, and update header
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
