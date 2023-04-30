//#################################################################
//##########             VARIABILI:                  ##############
//#################################################################
var index=1;
var oldTitle="";
var oldPomos = 0;
var currentKey;
var opened = false;
var planning = false;
var checkedCustom = false;
var anyTaskOpen=false;
//#################################################################
//##########             FUNZIONI AUSILIARIE:        ##############
//#################################################################
//Definisco funzione di hash, ogni hash sarà la chiave che mi identifica univocamente una task
function hashCode(string) {
  let hash = 0;
  for (let i = 0; i < string.length; i++) {
      let character = string.charCodeAt(i);
      hash = ((hash << 5) - hash) + character;
      hash = hash & hash; 
  }
  return hash;
}

function setParams(){
  var ret=new Array();
  ret[0]=JSON.parse(document.getElementById("session").textContent);
  ret[1]=JSON.parse(document.getElementById("break").textContent);
  ret[2]=JSON.parse(document.getElementById("longBreak").textContent);
  return ret;
}

//Serve per sapere se sono in modalità task o meno:
function modalitaTask() {
  if(!taskOn)
    taskOn=true;
  else 
    taskOn=false;
}

// Funzione per eliminare una task:
function deleteTask(e) {
  var button = e.currentTarget;
  button.parentNode.remove();
}


//#################################################################
//##########  FUNZIONI PER GESTIRE AGGIORNAMENTI:    ##############
//#################################################################

//Funzione per rendere scrivibili o leggibili i campi delle task
function updateTaskBox (taskItems,  cond){ 
  if (!cond){
    taskItems[1].setAttribute("readonly","readonly");
    taskItems[2].setAttribute("readonly","readonly");

  }
  else{
    taskItems[1].removeAttribute("readonly");
    taskItems[2].removeAttribute("readonly");

  }
}

//Aggiorno la lista delle task con le modifiche :
function updateTaskMap(newTitle, newPomos) {
  taskList.forEach(function(tuple) {
    if (tuple.key == currentKey){
        tuple.title = newTitle;
        tuple.pomodori = newPomos;
        console.log(tuple);
        console.log(taskList);
        console.log(currentKey);
      }
    }
  )
}

//Aggiorno orario stimato per la fine:
function timeUpdate(time){
  var date = new Date();
  var dateMillis = date.getTime();

  var timePeriod = "00:"+time+":00"; 
  var parts = timePeriod.split(/:/);
  var timePeriodMillis = (parseInt(parts[0], 10) * 60 * 60 * 1000) +
                        (parseInt(parts[1], 10) * 60 * 1000) + 
                        (parseInt(parts[2], 10) * 1000);

  var newDate = new Date();
  newDate.setTime(dateMillis + timePeriodMillis);
  var min =newDate.getMinutes();
  var hour = newDate.getHours();
  if (min<10)
    min = "0"+JSON.stringify(min);
  if (hour<10)  
    hour ="0"+ JSON.stringify(hour);
  var ret = hour+":"+min;
  //console.log(newDate.toLocaleString("it-IT",{timeStyle:"long"}));
  return ret;
}

// Aggiorno il tag con pomodori rimasti e tempo rimasto:
function updateTaskTag(){
  var tasks = document.getElementsByClassName("task");
  var len = tasks.length;
  var pomoCount =0;
  var time=0;
  //console.log(document.getElementById("longBreak").textContent);
  var params = setParams();
  var longBreak =params[2];
  var shortBreak =params[1];
  var pomoTime = params[0];
  for ( i = len-1; i>=0;i--){
    pomoCount += JSON.parse(tasks[i].children[2].value);
  }
  for ( i = pomoCount; i>0;i--){
    if(i%4 ==0)
      time+=countL;
    else
      time+=countB;
    time+=countS;
  }
  var textToAppend  = "Pomodori Complessivi: "+JSON.stringify(pomoCount);
  document.getElementById("pomoCount").innerText=textToAppend;
  textToAppend ="Fine Prevista Per: "+timeUpdate(time);
  document.getElementById("timeEstimated").innerText=textToAppend;
}

//#################################################################
//##########FUNZIONI PER GESTIRE ELEMENTI A COMPARSA: ##############
//#################################################################

// Gestire i pulsanti per customizzare il timer:
function checkCustom() {
  if(hiddenCustom.style.display === "flex") {
    checkedCustom = false;
    hiddenCustom.style.display = "none";
    
  }
  else {
    checkedCustom = true;
    hiddenCustom.style.display = "flex";
  }
}

//Appare il pannello per modificare una task:
function showOption(e) {
  var button = e.currentTarget;
  var hiddenBox = button.nextElementSibling;
  var computedStyle = window.getComputedStyle(hiddenBox);
  var taskBox = button.parentNode;
  var taskItems =taskBox.children
  if (computedStyle.display === "block") {
      hiddenBox.style.display = "none";
      anyTaskOpen = false;
      //       taskBox.classList.toggle("taskShowed");
      updateTaskBox(taskItems,false);
      button.children[0].setAttribute("src","../style/img/sliders-solid.png");
      var newTitle = taskItems[1].value;
      var newPomos = taskItems[2].value;
      if  (newTitle!= oldTitle || newPomos!=oldPomos )  
        updateTaskMap(newTitle,newPomos);
      updateTaskTag();
  } else if(computedStyle.display === "none" && !anyTaskOpen) {
    hiddenBox.style.display = "block";
    anyTaskOpen = true;
    button.children[0].setAttribute("src", "../style/img/floppy-disk-solid.png");
    //       taskBox.classList.toggle("taskShowed");
    updateTaskBox(taskItems,true);
    oldTitle= taskItems[1].value;
    oldPomos= taskItems[2].value;
    currentKey=taskBox.getAttribute("data-value");
  }
}


// Aprire la taskBar 
function openTaskBar() {
  if(selectTaskArea.style.display === "block") {
    opened = false;
    selectTaskArea.style.display = "none"
  }
  else {
    opened = true;
    selectTaskArea.style.display = "block";
  }
}

// Apre il pannello delle info:
function infoPopUp() {
  var overlay = document.getElementById("infoOverlay");
  var computedStyle = window.getComputedStyle(overlay);
  overlay.style.display = "block";
}

function closeInfo() {
  document.getElementById("infoOverlay").style.display="none";
}

// Aggiunge una nuova task:
function addTask(){
    if(document.querySelector('#taskFieldInput').value.length == 0){
      alert("Inserire un nome per la Task!")
  }else{
    const xElements = document.getElementsByClassName("x");
    const inputValues = Array.from(xElements).map(element => element.value);
    var number= JSON.parse(document.getElementById("pomoTaskNumber").value);
    var title=$('#taskFieldInput').val();
    var key =hashCode(title+JSON.stringify(number));
    var newTask = { key:key, title: title, pomodori: number,index: index };
    index+=1;
    // aggiungi la nuova task all'elenco delle task
    taskList.push(newTask);
      document.querySelector('#tasks').insertAdjacentHTML('beforeend', `
          <div  class="task" data-value="${key}">
            
              <button style='font-size:24px' class="delete" onClick="deleteTask(event);">
                <img class = "taskImg" src  = "../style/img/trash-can-solid.png">
                </img>
              </button>
              <input type="text" readOnly id="taskname" value="${document.getElementById("taskFieldInput").value}">
              <input type="number" value="" class="x" readonly  min="1">
              
              <button type="button" class="taskOption" onClick= "showOption(event);" >
                  <img class = "taskImg" src  = "../style/img/sliders-solid.png">
                  </img>
              </button>
              <div class="hiddenOption" display = none>
                <textarea name="taskNote" id="hiddenNote" cols="40" rows="3" placeholder="updateNote">${document.getElementById("taskNote").value}</textarea>
              </div>
          </div>
      `)
          // recupera gli elementi `x` e li riempie con i valori precedentemente salvati
    const newXElements = document.getElementsByClassName("x");
    Array.from(newXElements).forEach((element, index) => {
      element.value = inputValues[index] || "";
    });

  

    // aggiunge il valore dell'attributo `value` dell'ultimo input creato all'array
    const lastXElement = newXElements[newXElements.length - 1];
    lastXElement.value = number;
      document.getElementById("taskFieldInput").value="";
      document.getElementById("taskNote").value="";
      document.getElementById("pomoTaskNumber").value = "1";
      updateTaskTag();

      // var current_tasks = document.querySelectorAll(".delete");
      // for(var i=0; i<current_tasks.length; i++){
      //     current_tasks[i].onclick = function(){
      //         this.parentNode.remove();
      //     }
      }

// var coll = document.getElementsByClassName("taskOption");
// var i;
// for (i = 0; i < coll.length;i++) {
//   // Rimuovi eventuali eventi click esistenti
//   var old_element = coll[i];
//   var new_element = old_element.cloneNode(true);
//   old_element.parentNode.replaceChild(new_element, old_element);

//   // Aggiungi un nuovo evento click
//   new_element.addEventListener("click", function() {
//     var taskBox = this.parentNode;
//     var taskItems =taskBox.children
//     var hiddenBox = this.nextElementSibling;
//     if (hiddenBox.style.display === "block") {
//         taskBox.classList.toggle("taskShowed");
//         hiddenBox.style.display = "none";
//         updateTaskBox(taskItems,false);
//         var newTitle = taskItems[1].value;
//         var newPomos = taskItems[2].value;
//         if  (newTitle!= oldTitle || newPomos!=oldPomos )  
//           updateTaskMap(newTitle,newPomos );
//         updateTaskTag();
//     } else {
//       hiddenBox.style.display = "block";
//       taskBox.classList.toggle("taskShowed");
//       updateTaskBox(taskItems,true);
//       oldTitle= taskItems[1].value;
//       oldPomos= taskItems[2].value;
//       currentKey=taskBox.getAttribute("data-value");
//     }
//   });
// }
  }






// $(document).ready(function () {

//     var task = $(".task");
//     var container = $(".tasks");

//     box.draggable({
//         containment: container,
//         helper: "clone",

//         start: function () {
//             $(this).css({
//                 opacity: 0
//             });

//             $(".task").css("z-index", "0");
//         },

//         stop: function () {
//             $(this).css({
//                 opacity: 1
//             });
//         }
//     });

//     task.droppable({
//         accept: task,

//         drop: function (event, ui) {
//             var draggable = ui.draggable;
//             var droppable = $(this);
//             var dragPos = draggable.position();
//             var dropPos = droppable.position();

//             draggable.css({
//                 left: dropPos.left + "px",
//                 top: dropPos.top + "px",
//                 "z-index": 20
//             });

//             droppable.css("z-index", 10).animate({
//                 left: dragPos.left,
//                 top: dragPos.top
//             });
//         }
//     });

// });

