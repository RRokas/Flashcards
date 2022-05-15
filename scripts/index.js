import * as Core from './core.js';

const frontText = document.getElementById("front");
const backText = document.getElementById("back");

document.getElementById("save").addEventListener("click", ()=>{
    let card = new Core.Flashcard(frontText.value, backText.value);
    Core.PushFlashcardToStorage(card);
    alert("Saved!")
})