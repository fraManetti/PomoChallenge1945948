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

//Serve per sapere se sono in modalità task o meno:
function modalitaTask() {
  if(!taskOn)
    taskOn=true;
  else 
    taskOn=false;
}

// Funzione per eliminare una task da tutto con il bottone delete:
function deleteTask(e) {
  var button = e.currentTarget;
  var key = button.parentNode.getAttribute("data-value");
  button.parentNode.remove();
  for (var i=0; i<taskList.length;i++){
    if (taskList[i].key == key)
      taskList.splice(i,1);
  }
  updateTaskTag(false);
}


//#################################################################
//##########  FUNZIONI PER GESTIRE AGGIORNAMENTI:    ##############
//#################################################################

//Funzione per eliminare la task da lista e marcarca come completata
function removeTaskItem() {
  var key = taskList[0].key;
  taskList.shift();
  var tasks= document.getElementsByClassName("task");
  for (var i=0; i<tasks.length;i++){
    if (tasks[i].getAttribute("data-value")==key){
      tasks[i].style.backgroundColor="grey";
    }}
}
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
function updateTaskTag(isRunning){
  var pomoCount =0; //conta il numero di pomodori nelle task aggiunte
  taskList.forEach(function(tuple){
    pomoCount+=JSON.parse(tuple.pomodori);
  });
  var textToAppend  = "Pomodori Complessivi: "+JSON.parse(pomoCount); 
  if (isRunning){  
    var nPomo=taskList[0].pomodori;
    textToAppend+="\n"+"Task Corrente: "+taskList[0].title+"   ("+JSON.stringify(countCurrPom)+"/"+nPomo+")";
    var time=0;

  for ( i = pomoCount; i>0;i--){
    if(i%4 ==0)
      time+=countL;
    else
      time+=countB;
    time+=countS;
  } timeToAppend ="Fine Tutta Programmazione Prevista Per: "+timeUpdate(time);
  document.getElementById("timeEstimated").innerText=timeToAppend;
  } else 
    document.getElementById("timeEstimated").innerText="";
  document.getElementById("pomoCount").innerText=textToAppend;
  

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
      var newTitle = taskItems[1].value;
      var newPomos = taskItems[2].value;
      if  (newTitle!= oldTitle || newPomos!=oldPomos )  
        updateTaskMap(newTitle,newPomos);
      updateTaskTag(taskOn && taskList.length>0 && clock.getTime()!=0);
  } else if(computedStyle.display === "none" && !anyTaskOpen) {
    hiddenBox.style.display = "block";
    anyTaskOpen = true;
    //       taskBox.classList.toggle("taskShowed");
    updateTaskBox(taskItems,taskBox.style.backgroundColor!="grey");
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
  console.log("jaso");
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
    if (taskList.length >= 2) {
      document.getElementsByName("swapTasksButton")[0].disabled = false;
    }
      document.querySelector('#tasks').insertAdjacentHTML('beforeend', `
          <div  class="task" data-value="${key}">
            
              <button style='font-size:24px' class="delete" onClick="deleteTask(event);">
                <img class = "taskImg" src  = "../style/img/trash-can-solid.png">
                </img>
              </button>
              <input type="text" readOnly id="taskname" value="${document.getElementById("taskFieldInput").value}">
              <input type="number" value="" class="x" readonly  min="1">
              
              <button type="button" class="taskOption" onClick= "showOption(event);" >
                <label>
                  <img class = "taskImg" src  = "../style/img/sliders-solid.png">
                  </img>
                </label>
              </button>
              <div class="hiddenOption">
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
      updateTaskTag(false);

      }
  }

  // gestisce click fuori dal popup
  function handleOutClick(event) {
    popupContainer = document.getElementById("popupContainer");
    if (!popupContainer.contains(event.target)) {
      popupContainer.innerHTML = "";

      //document.getElementById("overlay").style.display = "none";
      document.removeEventListener("mousedown", handleOutClick);
    }
  }
  
  function openSwapPopup() {
    popupContainer = document.getElementById("popupContainer");
  
    popupContainer.innerHTML = `
      <div class="popupSwap">
          <label> Scambia task: 
          <input type="number" id="index1" required></label><br>
          <label> Con task: 
          <input type="number" id="index2" required></label><br>

          <button id = "swapclick" >Swap</button>
      </div>
    `;
    //document.getElementById("overlay").style.display = "block";
    
    document.addEventListener("mousedown", handleOutClick);
  
    //CONTINUA QUI
    var i1;
    var i2;

    document.querySelector("#swapclick").addEventListener("click", function() {
      i1 = document.getElementById("index1").value;
      i2 = document.getElementById("index2").value;
      
  });
  }

  function swapTasks(i1, i2) {
    if (i1 >= 0 && i1 < taskList.length && i2 >= 0 && i2 < taskList.length) {
      var temp = taskList[i1];
      taskList[i1] = taskList[i2];
      taskList[i2] = temp;
    }
    else{
      alert("Inserisci degli indici validi");
    }
  }

