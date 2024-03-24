// javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push , onValue , remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://we-are-champions-fcd9d-default-rtdb.asia-southeast1.firebasedatabase.app/"
}


const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsesInDB = ref(database, "Endorsements")

onValue(endorsesInDB, function(snapshot){
     if (snapshot.exists()){
    let endorsesArray = Object.entries(snapshot.val())
    
    stopDublicate()

    for (let i = 0 ; i < endorsesArray.length; i++){
        let currentEndorse = endorsesArray[i]
        let currentEndorseID = currentEndorse[0]
        let currentEndorseVlaue = currentEndorse[1]
        innerfunc(currentEndorse)
    }
} else {    
   ulEl.innerHTML = "Type something in the textbox:)" 
   }
    
})


const button = document.getElementById("button")
const inputField = document.getElementById("input-field")
const ulEl = document.getElementById("ul-el")

button.addEventListener("dblclick", function(){
   
     push(endorsesInDB, inputField.value)
    removeInputVal()
})

function stopDublicate() {
     ulEl.innerHTML = ""
}

function removeInputVal(){
    inputField.value = ""
}

function innerfunc(Endorse){
    //   ulEl.innerHTML +=   `<li>${inputField.value}</li>`
    
    let EndorseID = Endorse[0]
    let EndorseValue = Endorse[1]
    
    let newEl = document.createElement("li")
    newEl.textContent = EndorseValue
    newEl.addEventListener("click", function(){
        
        let location = ref(database, `Endorsements/${EndorseID}`)
        remove(location)
    })  
     
    ulEl.append(newEl)
}
