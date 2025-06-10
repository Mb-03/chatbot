const chatInput = document.querySelector("#chat-input");
const chatBox = document.querySelector("#chat-container");
const messageContainer = document.querySelector("#message-container");

chatInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    const chatMessage = document.createElement("p");
    chatMessage.textContent = chatInput.value;
    if (chatInput.value === "") {
      return;
    }
    messageContainer.appendChild(chatMessage);
    fetch(`https://dog.ceo/api/breed/${chatInput.value}/images/random`)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        let dogObj = data;
        const dogImg = document.createElement("img");
        dogImg.width = 300;
        dogImg.src = dogObj.message;
        messageContainer.appendChild(dogImg);
      });

    chatInput.value = "";
  }
});

const listBtn = document.querySelector("#list-btn");
const breedList = document.createElement("ul");
const listContainer = document.querySelector("#list-container");

listBtn.addEventListener("click", function () {
  listBtn.disabled = true;

  fetch("https://dog.ceo/api/breeds/list/all")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const breedsArray = Object.keys(data.message);
      breedsArray.forEach((breed) => {
        breedList.innerHTML += `<li>${breed}</li>`;
        listContainer.appendChild(breedList);
      });
    });
});
