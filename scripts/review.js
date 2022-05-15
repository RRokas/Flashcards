import * as Core from './core.js';

let cards = Core.GetCardsFromStorage();
let currentIndex = 0;
let cardFlipped = false;
let editMode = false;

const frontContent = document.getElementById("frontContent");
const backContent = document.getElementById("backContent");
const cardContainer = document.getElementById("card");
const innerCard = document.querySelector(".flip-card-inner");
const toggleEditModeButton = document.getElementById("toggleEditMode");
const leftContainer = document.querySelector(".left");
const totalCardsSpan = document.getElementById("totalCards");
const removeCardButton = document.getElementById("remove");

// Edit mode elements >>
toggleEditModeButton.addEventListener("click", ToggleEditMode);

let frontEditable = document.createElement("textarea");
frontEditable.style.resize = "none";
frontEditable.setAttribute("id", "frontEditable");

let backEditable = document.createElement("textarea");
backEditable.style.resize = "none";
backEditable.setAttribute("id", "backEditable");

let nextCardButton = document.createElement("button");
nextCardButton.textContent = "Next card";
nextCardButton.setAttribute("id", "nextCardButton");
nextCardButton.addEventListener("click", ()=>{
    if(currentIndex+1 >= cards.length){
        alert("This was the last card, going back to the first one now.");
        currentIndex = 0;
    } else if (!cardFlipped){
        currentIndex++;
    }
    DisplayCardContent(cards[currentIndex]);
});

let saveCardButton = document.createElement("button");
saveCardButton.textContent = "Save card";
saveCardButton.setAttribute("id", "saveCardButton");
saveCardButton.addEventListener("click", SaveEditedCard);
// << Edit mode elements

DisplayCardContent(cards[currentIndex]);
totalCardsSpan.innerText = `Total cards: ${cards.length}`;
console.log(cards[currentIndex]);

removeCardButton.addEventListener("click", ()=>{
    Core.RemoveCardFromStorageByIndex(currentIndex);
    cards = Core.GetCardsFromStorage();
    if(cardFlipped){
        FlipCard();
    }
    DisplayCardContent(cards[currentIndex]);
    totalCardsSpan.innerText = `Total cards: ${cards.length}`;
})

cardContainer.addEventListener("click", () =>{
    if(!editMode){
        FlipCard();
        if(currentIndex+1 >= cards.length){
            alert("This was the last card, going back to the first one now.");
            currentIndex = 0;
        } else if (!cardFlipped){
            currentIndex++;
        }
        DisplayCardContent(cards[currentIndex]);
    }
});



function ToggleEditMode(){
    if(!editMode){
        alert("EDIT MODE ENABLED!" + 
            "\nDefault behaviour changed:" + 
            "\n- Double click to flip the card." + 
            "\n- Click next to load content from the next card.");
        editMode = true;
        frontContent.innerText = "";
        backContent.innerText = "";
        frontContent.append(frontEditable);
        backContent.append(backEditable);
        leftContainer.append(nextCardButton);
        leftContainer.append(saveCardButton);
        frontEditable.value = cards[currentIndex].front;
        backEditable.value = cards[currentIndex].back;
        cardContainer.addEventListener("dblclick", FlipCard);
    }else{
        frontEditable.remove();
        backEditable.remove();
        nextCardButton.remove();
        saveCardButton.remove();
        cardContainer.removeEventListener("dblclick", FlipCard);
        frontContent.innerText = cards[currentIndex].front;
        backContent.innerText = cards[currentIndex].back;
        editMode = false;
    }
}

function SaveEditedCard(){
    let currentCard = cards[currentIndex];
    currentCard.front = frontEditable.value;
    currentCard.back = backEditable.value;
    Core.SaveCardsToStorage(cards);
}

function DisplayCardContent(card){
    if(editMode){
        frontEditable.value = card.front;
        backEditable.value = card.back;
    } else{
        frontContent.innerText = card.front;
        backContent.innerText = card.back;
    }
}

function FlipCard(){
    if (!cardFlipped){
        backContent.style.visibility = "visible";
        document.querySelector(".flip-card-inner").style.transform="rotateY(180deg)";
        cardFlipped = true;
    } else{
        backContent.style.visibility = "hidden";
        innerCard.style.transform="rotateY(0deg)";
        cardFlipped = false;
    }
}