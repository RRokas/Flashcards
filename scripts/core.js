class Flashcard {
    constructor(frontContent, backContent){
        this.front = frontContent;
        this.back = backContent;
    }
}

function GetCardsFromStorage(){
    let storedCards = JSON.parse(localStorage.getItem("flashcards"));

    if (storedCards == null){
        storedCards = [];
    }

    return storedCards;
}

function SaveCardsToStorage(cardArray){
    localStorage.setItem("flashcards", JSON.stringify(cardArray));
}

function PushFlashcardToStorage(cardToPush){
    let cardsForStoring = GetCardsFromStorage();

    cardsForStoring.push(cardToPush);

    SaveCardsToStorage(cardsForStoring);
}

function RemoveCardFromStorageByIndex(indexToRemoveAt){
    let cardsForStoring = GetCardsFromStorage();
    cardsForStoring.splice(indexToRemoveAt, 1);

    SaveCardsToStorage(cardsForStoring);
}

function GetCardByIndex(indexToGet){
    let storedCards = GetCardsFromStorage();
    return storedCards[indexToGet];
}

function UpdateCardAtIndex(indexToEdit, newCardObject){
    let cardsForStoring = GetCardsFromStorage();
    cardsForStoring[indexToEdit] = newCardObject;

    SaveCardsToStorage(cardsForStoring);
}

export {Flashcard, GetCardsFromStorage, SaveCardsToStorage, PushFlashcardToStorage,
     RemoveCardFromStorageByIndex, GetCardByIndex, UpdateCardAtIndex}
     
//PushFlashcardToStorage(new Flashcard("ay", "lmao"));
//RemoveCardFromStorageByIndex(0);