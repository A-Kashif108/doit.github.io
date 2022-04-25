     // Import the functions you need from the SDKs you need
    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
        
     // TODO: Add SDKs for Firebase products that you want to use
     // https://firebase.google.com/docs/web/setup#available-libraries
    
     // Your web app's Firebase configuration
     // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
    apiKey: "AIzaSyAq19qOn6kUuE_XaXlP1BWTgEEOCDJuQOg",
    authDomain: "do-it-efe6e.firebaseapp.com",
    projectId: "do-it-efe6e",
    storageBucket: "do-it-efe6e.appspot.com",
    messagingSenderId: "807114896453",
    appId: "1:807114896453:web:6fca2002bc29430dcb1f2c",
    measurementId: "G-FG136D2EWB"
    };
    
    import {
        getFirestore,
        collection,
        addDoc,
        updateDoc,
        query,
        where,
        setDoc,
        getDocs,
        doc,
        deleteDoc,
        getDoc,
        } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";
    
    // Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore();


let popup = document.getElementById("popup");
let btn = document.getElementById("add");
let popBtn = document.getElementById("newtask");
let canBtn = document.getElementById("cancel");
let frm = document.getElementById("frm");
let all = document.getElementById("all");
let completed = document.getElementById("completed");
let missed = document.getElementById("missed");
let deadline = document.getElementById("Deadline");
const title = frm["ttl"];
const description = frm["tsk"];

popBtn.addEventListener("click", ()=>{
  popup.classList.add("open-popup");
  title.focus();
});


  btn.addEventListener("click", async ()=>{
    const docRef = await addDoc(collection(db, "tasks"), {
      Title: title.value,
      Description: description.value,
      status:"notDone",
      Deadline: deadline.value,
    });
    frm.reset();
    popup.classList.remove("open-popup");
      });
      canBtn.addEventListener("click",()=>{
        frm.reset();
    popup.classList.remove("open-popup");
      });



const q = query(collection(db, "tasks"));
const querySnapshot = await getDocs(q);

all.innerHTML = "";
querySnapshot.forEach((doc) => {
  const task = doc.data();

  all.innerHTML += `
  <div class="allCard">
<h3 class="h5">${task.Title}</h3>
<p>${task.Description}</p>
<h4 class="h5">${task.Deadline}</h4>
<div>
  <button class="delBtn" id="delBtn" data-id="${doc.id}">
  Delete
  </button>
  <button id="missBtn" data-id="${doc.id}">
  Missed
  </button>
  <button id="doneBtn" data-id="${doc.id}">
  Done
  </button>
</div>
</div>`;

});



const comp = query(collection(db, "tasks"), where("status", "==", "Done"));
const completedSnapshot = await getDocs(comp);


completed.innerHTML = "";
completedSnapshot.forEach((doc) => {
  const task = doc.data();
  
  completed.innerHTML += `
  <div class="allCard">
<h3 class="h5">${task.Title}</h3>
<p>${task.Description}</p>
<div>
  <button class="delBtn" id="delBtn" data-id="${doc.id}">
  Delete
  </button>
</div>
</div>`;

});
const miss = query(collection(db, "tasks"), where("status", "==", "Missed"));
const missedSnapshot = await getDocs(miss);


missed.innerHTML = "";
missedSnapshot.forEach((doc) => {
  const task = doc.data();
  
  missed.innerHTML += `
  <div class="allCard">
<h3 class="h5">${task.Title}</h3>
<p>${task.Description}</p>
<div>
  <button class="delBtn" id="delBtn" data-id="${doc.id}">
  Delete
  </button>
  <button id="editBtn" data-id="${doc.id}">
  reSchedule
  </button>
</div>
</div>`;

});


const btnsDone = document.querySelectorAll("#doneBtn");
const btnsMissed = document.querySelectorAll("#missBtn");

btnsDone.forEach((btn)=>
  btn.addEventListener("click", async({target: {dataset}})=>{
    const taskRef = doc(db, 'tasks', dataset.id);
  await setDoc(taskRef, { status: "Done" }, { merge: true });
  })
);

btnsMissed.forEach((btn)=>
  btn.addEventListener("click", async({target: {dataset}})=>{
    const taskRef = doc(db, 'tasks', dataset.id);
  await setDoc(taskRef, { status: "Missed" }, { merge: true });
  })
);

const btnsDelete = document.querySelectorAll("#delBtn");

btnsDelete.forEach((butn)=>
butn.addEventListener("click", async({target: {dataset}})=>{
  const taskRef = doc(db, 'tasks', dataset.id);
  await deleteDoc(taskRef);
}));
const btnsReshed = document.querySelectorAll("#editBtn");

btnsReshed.forEach((btn)=>
btn.addEventListener("click", async({target: {dataset}})=>{
  const taskRef = doc(db, 'tasks', dataset.id);
  const dataSnap = await getDoc(taskRef);
  const data = dataSnap.data();
  popup.classList.add("open-popup");
  title.value = data.Title;
  description.value = data.Description;
  await deleteDoc(taskRef);
  
}));







