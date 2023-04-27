function setParams(){
  var ret=new Array();
  ret[0]=JSON.parse(document.getElementById("session").textContent);
  ret[1]=JSON.parse(document.getElementById("break").textContent);
  ret[2]=JSON.parse(document.getElementById("longBreak").textContent);
  return ret;
}
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


var checkedCustom = false
function checkCustom() {
  if(hiddenCustom.style.display === "block") {
    checkedCustom = false;
    hiddenCustom.style.display = "none"
  }
  else {
    checkedCustom = true;
    hiddenCustom.style.display = "block";
  }
}


var opened = false;
function openTaskBar() {
  if(selectTaskArea.style.display === "block") {
    opened = false;
    //document.getElementById("taskUsed").value = "Close Task Bar";
    selectTaskArea.style.display = "none";
  }
  else {
    opened = true;
    //document.getElementById("taskUsed").value = "Open Task Bar";
    selectTaskArea.style.display = "block";
  }
}


function modalitaTask() {
  
}

function timeUpdate(time){
  var date = new Date();
  var dateMillis = date.getTime();

  console.log(date);
  var timePeriod = "00:"+time+":00"; 
  var parts = timePeriod.split(/:/);
  var timePeriodMillis = (parseInt(parts[0], 10) * 60 * 60 * 1000) +
                        (parseInt(parts[1], 10) * 60 * 1000) + 
                        (parseInt(parts[2], 10) * 1000);

  var newDate = new Date();
  newDate.setTime(dateMillis + timePeriodMillis);
  var ret = JSON.stringify(newDate.getHours())+":"+JSON.stringify(newDate.getMinutes());
  //console.log(newDate.toLocaleString("it-IT",{timeStyle:"long"}));
  return ret;
}

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
      time+=longBreak;
    else
      time+=shortBreak;
    time+=pomoTime;
  }
  var textToAppend  = "Pomodori Complessivi: "+JSON.stringify(pomoCount);
  document.getElementById("pomoCount").innerText=textToAppend;
  textToAppend ="Fine Prevista Per: "+timeUpdate(time);
  document.getElementById("timeEstimated").innerText=textToAppend;
}

function addTask(){
    if(document.querySelector('#newtask input').value.length == 0){
      alert("Kindly Enter Task Name!!!!")
  }else{
    const xElements = document.getElementsByClassName("x");
    const inputValues = Array.from(xElements).map(element => element.value);
    var number= JSON.parse(document.getElementById("pomoTaskNumber").value);
      document.querySelector('#tasks').innerHTML += `
          <div  class="task">
              <button style='font-size:24px' class="delete">
              <i class="fa-solid fa-trash-can"></i>
                            </button>
              <input type="text" readOnly id="taskname" value=" ${document.querySelector('#newtask input').value}">
              <input type="number" value="" class="x" readonly  min="1">
              <button type="button" class="taskOption" >
              </button>
            <div class="hiddenOption">
            <textarea name="taskNote" id="" cols="40" rows="3" placeholder="updateNote">${document.getElementById("taskNote").value}</textarea>

            </div>
            </div>
      `;
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

      var current_tasks = document.querySelectorAll(".delete");
      for(var i=0; i<current_tasks.length; i++){
          current_tasks[i].onclick = function(){
              this.parentNode.remove();
          }
      }

    var coll = document.getElementsByClassName("taskOption");
var i;
for (i = 0; i < coll.length;i++) {
  coll[i].addEventListener("click", function() {
    var taskBox = this.parentNode;
    var taskItems =taskBox.children
    var hiddenBox = this.nextElementSibling;
    if (hiddenBox.style.display === "block") {
        taskBox.classList.toggle("taskShowed");
        hiddenBox.style.display = "none";
        updateTaskBox(taskItems,false);
    } else {
      hiddenBox.style.display = "block";
      taskBox.classList.toggle("taskShowed");
      updateTaskBox(taskItems,true);
    }
  });
}
  }
}
