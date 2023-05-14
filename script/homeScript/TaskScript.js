//#################################################################
//##########             VARIABILI:                  ##############
//#################################################################
var oldTitle="";
var oldPomos = 0;
var oldNote="";
var currentKey;
var opened = false;
var planning = false;
var checkedCustom = false;
var anyTaskOpen=false;
var delEnded=false;
var index=1;

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

function handleKeyPress(event, string) {
  if (event.key === "Enter") {
      event.preventDefault();
      // esegui qui le azioni quando l'utente preme il tasto "Invio"
      // ad esempio, puoi leggere il valore del campo di input e aggiungere il compito a una lista
      if(string== 'add') {
        document.getElementById("push").click();
      }
      else if(string = 'option') {
        var field = event.currentTarget;
        var optionBtn = field.nextElementSibling.nextElementSibling;
        showOption({currentTarget: optionBtn});
      }
  }
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
  var deleted=false;
  var key = button.parentNode.getAttribute("data-value");
  button.parentNode.remove();
  var deletedIndex;
  for (var i=0; i<taskList.length;i++){
    if (taskList[i].key == key){
      var task =taskList[i];
      task.index=i;
      updateServer(task,"DEL");
      taskList.splice(i,1);
      deletedIndex=i;
      index--;
    }}
  var tasks = document.querySelectorAll('.task:not(.endedTasks)');
  for(var i=0; i<tasks.length;i++){
    if (i>=deletedIndex){
      //console.log(JSON.parse(tasks[i].children[1].textContent.slice(0,tasks[i].children[1].textContent.length-1)));
        tasks[i].children[1].textContent=JSON.stringify(JSON.parse(tasks[i].children[1].textContent.slice(0,tasks[i].children[1].textContent.length-1))-1)+")"; 
      }
  }
  if(taskList.length==0 && taskOn){
    resetClock();
    document.getElementById("customCheckbox").checked=false;
    alert("Finite tutte le task! Per riprenderne altre riattivare la modalità task!");
      }
  updateTaskTag(false,false);
  updateTaskButtons();
}


//#################################################################
//##########  FUNZIONI PER GESTIRE AGGIORNAMENTI:    ##############
//#################################################################

//Funzione per eliminare la task da lista e marcarca come completata
function removeTaskItem() {
  var key = taskList[0].key;
  var task = taskList[0];
  task.index=1;
  var dat = new Date();
  var day = JSON.parse(dat.getDate());
  var month = JSON.parse(dat.getMonth()+1);
  var year = JSON.parse(dat.getFullYear());
  var hour = JSON.parse(dat.getHours());

  console.log("data",day,month,year,hour);
  if (day<10)
    day = "0"+day;
  if (month<10)
    month = "0"+month;
  if(hour<10)
    hours = "0"+hour;
  task.dat=day+"-"+month+"-"+year;
  hour+= ":00:00";
  task.ora = hour;
  console.log(typeof hour,hour);
  updateServer(task,"FYN");
  taskList.shift();
  var tasks= document.getElementsByClassName("task");
  for (var i=0; i<tasks.length;i++){
    if (tasks[i].getAttribute("data-value")==key){
      tasks[i].children[1].textContent="0)"
      tasks[i].classList.add("endedTasks");
      if(delEnded)
        deleteEndedTask();

    }
    else if (!tasks[i].classList.contains("endedTasks")){
      tasks[i].children[1].textContent=JSON.stringify(JSON.parse(tasks[i].children[1].textContent.slice(0,tasks[i].children[1].textContent.length-1))-1)+")"; 
    }
  }
}


function titleTimer(clock) {
  var timeInSeconds = clock.getTime();
  var minutes = Math.floor(timeInSeconds / 60);
  var seconds = timeInSeconds % 60;
  var timeString = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  document.title = timeString + " - "+pos;
}




//Funzione per rendere scrivibili o leggibili i campi delle task
function updateTaskBox (taskItems,  cond){ 
  if (!cond){
    taskItems[2].setAttribute("readonly","readonly");
    taskItems[3].setAttribute("readonly","readonly");

  }
  else{
    taskItems[2].removeAttribute("readonly");
    taskItems[3].removeAttribute("readonly");

  }
}

//Aggiorno la lista delle task con le modifiche :
function updateTaskMap(newTitle, newPomos,newNote) {
  var task=[];
  task.key=currentKey;
  task.title = newTitle;
  task.pomodori=newPomos;
  task.note= newNote;
  taskList.forEach(function(tuple) {
    if (tuple.key == currentKey){
        tuple.title = newTitle;
        tuple.pomodori = newPomos;
        tuple.note = newNote;
        task.donepomodori = tuple.donepomodori;  
        task.index = tuple.index;
        task.tim = countS-(clock.getTime()/60);

      }
    }
  )
  console.log(task)
  updateServer(task,"UP");
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
function updateTaskTag(isRunning,isEnded){
  var pomoCount =0; //conta il numero di pomodori nelle task aggiunte
  taskList.forEach(function(tuple){
    pomoCount+=JSON.parse(tuple.pomodori);
  });
  var textToAppend  = "Pomodori Complessivi: "+JSON.parse(pomoCount); 
  if (isRunning){  
    var nPomo=taskList[0].pomodori;
    if(!isEnded)
      textToAppend+="\n"+"Task Corrente: "+taskList[0].title+"   ("+ JSON.stringify(taskList[0].donepomodori)+"/"+nPomo+")";
    else
      textToAppend+="\n"+"Task Successiva: "+taskList[0].title+"   ("+ JSON.stringify(taskList[0].donepomodori)+"/"+nPomo+")";
    var time=0;
    //console.log(taskList[0].donepomodori);
  for ( i = pomoCount-taskList[0].donepomodori; i>0;i--){
    if(i%4 ==0)
      time+=countL;
    else
      time+=countB;
    time+=countS;
  } 
  time-=(countS-(clock.getTime()/60));
  timeToAppend ="Fine Tutta Programmazione Prevista Per: "+timeUpdate(time);

  document.getElementById("timeEstimated").innerText=timeToAppend;
  } else 
    document.getElementById("timeEstimated").innerText="";
  document.getElementById("pomoCount").innerText=textToAppend;
}

function updateTaskButtons(){
  if(taskList.length==1){
    document.getElementsByName("deleteAllTaskButton")[0].disabled=false;
    document.getElementsByName("swapTasksButton")[0].disabled = true;
    document.getElementsByName("reverseTasksButton")[0].disabled = true;
  }
  else if (taskList.length >= 2) {
    document.getElementsByName("swapTasksButton")[0].disabled = false;
    document.getElementsByName("reverseTasksButton")[0].disabled = false;
    document.getElementsByName("deleteAllTaskButton")[0].disabled=false;
  }
  else{
    document.getElementsByName("swapTasksButton")[0].disabled = true;
    document.getElementsByName("reverseTasksButton")[0].disabled = true;
  }
  if (document.getElementsByClassName("endedTasks").length>0){
    document.getElementsByName("deleteEndedTaskButton")[0].disabled = false;
    document.getElementsByName("deleteAllTaskButton")[0].disabled=false;
  }
  else{
    document.getElementsByName("deleteEndedTaskButton")[0].disabled = true;
    if (taskList.length==0)
      document.getElementsByName("deleteAllTaskButton")[0].disabled=true;
 }
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
  //console.log(e);
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
      var newTitle = taskItems[2].value;
      var newPomos = taskItems[3].value;
      var newNote = hiddenBox.children[0].value;
      if  (newTitle!= oldTitle || newPomos!=oldPomos || newNote!=oldNote )  
        updateTaskMap(newTitle,newPomos,newNote);
      updateTaskTag(taskOn && taskList.length>0 && clock.getTime()!=0,false);
  } else if(computedStyle.display === "none" && !anyTaskOpen) {
    hiddenBox.style.display = "block";
    anyTaskOpen = true;
    button.children[0].setAttribute("src", "../style/img/floppy-disk-solid.png");
    //       taskBox.classList.toggle("taskShowed");
    updateTaskBox(taskItems,taskBox.style.backgroundColor!="grey");
    oldTitle= taskItems[2].value;
    oldPomos= taskItems[3].value;
    oldNote = hiddenBox.children[0].value;
    //oldIndex = JSON.parse(taskItems[2].getAttribute("data-value");
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
    var key =hashCode(title+JSON.stringify(number)+JSON.stringify(Math.random(1000000000)));
    var note = document.getElementById("taskNote").value;
    var newTask = { key:key, title: title, pomodori: number,note: note,donepomodori: 0,tim:0 };

    // aggiungi la nuova task all'elenco delle task
    taskList.push(newTask); 
    updateTaskButtons();
    newTask.index=index;
    updateServer(newTask,"ADD");
      document.querySelector('#tasks').insertAdjacentHTML('beforeend', `
          <div  class="task" data-value="${key}">
            
              <!-- <button style='font-size:24px' class="delete"  id ="deleteBtn" >  -->
                <img class = "taskImg" id ="deleteImg" src = "../style/img/trash-can-solid.png"   onClick="deleteTask(event);">
                </img>
              <!-- </button>   -->
              <span class="indexTasks" data-value="${index}">${index})</span>
              <input type="text" readOnly id="taskname"  value="${document.getElementById("taskFieldInput").value}" onkeypress="handleKeyPress(event, 'options')" maxlength="25">
              

              <input type="number" value="" class="x" readonly  min="1">
              
              <button type="button" class="taskOption" onClick= "showOption(event);" >
                  <img class = "taskImg" src  = "../style/img/sliders-solid.png">
                  </img>
              </button>
              <div class="hiddenOption" display = none>
                <textarea name="taskNote" id="hiddenNote" cols="40" rows="3" placeholder="updateNote" maxlength="115">${document.getElementById("taskNote").value}</textarea>
              </div>
          </div>
      `)
          // recupera gli elementi `x` e li riempie con i valori precedentemente salvati
    const newXElements = document.getElementsByClassName("x");
    Array.from(newXElements).forEach((element, index) => {
      element.value = inputValues[index] || "";
    });

      index++;


    // aggiunge il valore dell'attributo `value` dell'ultimo input creato all'array
    const lastXElement = newXElements[newXElements.length - 1];
    lastXElement.value = number;
      document.getElementById("taskFieldInput").value="";
      document.getElementById("taskNote").value="";
      document.getElementById("pomoTaskNumber").value = "1";
      updateTaskTag(false,false);

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
          <div id="closePopup">&times;</div>
          <label> Scambia task n° 
          <input type="number" id="index1" required min=1></label><br>
          <label> Con task n°
          <input type="number" id="index2" required min=1></label><br>

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
      swapTasks(i1,i2);  
    });

    document.querySelector("#closePopup").addEventListener("click", function() {
    popupContainer.innerHTML = "";
    });
  }


//#################################################################
//##########  FUNZIONI PER GESTIRE I BOTTONI:        ##############
//#################################################################

  function swapTasks(i1, i2) {
    i1-=1;
    i2-=1;
    if (i1 >= 0 && i1 < taskList.length && i2 >= 0 && i2 < taskList.length) {
      var temp = taskList[i1];
      taskList[i1] = taskList[i2];
      taskList[i2] = temp;

      var tasks = document.querySelectorAll('.task:not(.endedTasks)');
      tasks[i1].setAttribute("data-value",taskList[i1].key);
      tasks[i1].children[2].value = taskList[i1].title;
      tasks[i1].children[3].value = taskList[i1].pomodori;
      tasks[i1].children[4].nextElementSibling.children[0].value=taskList[i1].note;
      tasks[i2].setAttribute("data-value",taskList[i2].key);
      tasks[i2].children[1].value = i1;
      tasks[i2].children[2].value = taskList[i2].title;
      tasks[i2].children[3].value = taskList[i2].pomodori;
      tasks[i1].children[4].nextElementSibling.children[0].value=taskList[i1].note;
      updateTaskTag(taskOn && taskList.length>0 && clock.getTime()!=0,false);
    }
    else{
      alert("Inserisci degli indici validi");
    }
  }

  function reverseTask() {
    taskList.reverse();
    var tasks = document.querySelectorAll('.task:not(.endedTasks)');
    for (var i=0; i<tasks.length;i++){
        tasks[i].setAttribute("data-value",taskList[i].key);
        tasks[i].children[2].value=taskList[i].title;
        tasks[i].children[3].value=taskList[i].pomodori;
        tasks[i].children[4].nextElementSibling.children[0].value=taskList[i].note;
  }
  updateTaskTag(taskOn && taskList.length>0 && clock.getTime()!=0,false);

  }
function deleteAllTask() {
  index=1;
  updateServer(taskList[0],"ALL_DEL");
  taskList=[];
  $('.task').remove();
  updateTaskButtons();
  updateTaskTag(taskOn && taskList.length>0 && clock.getTime()!=0,false);
}



function deleteEndedTask(){
  $('.endedTasks').remove();
  updateTaskButtons();
  updateTaskTag(taskOn && taskList.length>0 && clock.getTime()!=0,false);
}

/*se ci dovessero servire per le vignette a comparsa*/
function mostraVignetta(){
  let vignetta = document.querySelector(".vignetta");
  vignetta.style.display = "block";
}

function nascondiVignetta() {
  let vignetta = document.querySelector(".vignetta");
  vignetta.style.display = "none";
}


function updateServer(newTask,type) {
  console.log(newTask.tim);
  $.ajax({
    url: "updateTaskServer.php",
    type: "POST",
    data: { key: newTask.key, title: newTask.title, pomodori: newTask.pomodori, note: newTask.note, donepomodori: newTask.donepomodori, type:type,ind:newTask.index, dat:newTask.dat,tim:newTask.tim,ora:newTask.ora},
    success: function(result) {
        // Aggiornamento eseguito con successo
        console.log(result);
    },
    error: function(xhr, status, error) {
        // Errore nell'aggiornamento
        console.error(error);
    }
});
}