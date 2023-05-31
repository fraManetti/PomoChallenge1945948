/* ############################################
SCRIPT PER GESTIRE LE TASK SCARICATE DAL SERVER
###############################################
*/

// Funzione per aggiungere una nuova task alla tasklist partendo da una tupla dei risultati della query
function fillTaskList(tuple) {
    var newTask = { key:tuple.keyhash, title: tuple.title, pomodori: parseInt(tuple.pomodori),note: tuple.note,donepomodori: parseInt(tuple.donepomodori),tim:parseInt(tuple.tim) };
    taskList.push(newTask); 
}

//Funzione per mostrare a schermo il contenuto di taskList
function fillTaskBox (){
  var nPomos=0;
    for (var i=0 ;i<taskList.length;i++){
        document.querySelector('#tasks').insertAdjacentHTML('beforeend', `
        <div  class="task" data-value="${taskList[i].key}">
          
            <!-- <button style='font-size:24px' class="delete"  id ="deleteBtn" >  -->
              <img class = "taskImg" id ="deleteImg" src = "../style/img/trash-can-solid.png"   onClick="deleteTask(event);">
              </img>
            <!-- </button>   -->
            <span class="indexTasks" data-value="${index}">${index})</span>
            <input type="text" readOnly id="taskname"  value="${taskList[i].title}" onkeypress="handleKeyPress(event, 'options')" maxlength="25">


            <input type="number" value="${taskList[i].pomodori}" class="x" readonly  min="1">
            
            <button type="button" class="taskOption" onClick= "showOption(event);" >
                <img class = "taskImg" src  = "../style/img/sliders-solid.png">
                </img>
            </button>
            <div class="hiddenOption" display = none>
              <textarea name="taskNote" id="hiddenNote" cols="40" rows="3" placeholder="updateNote" maxlength="115">${taskList[i].note}</textarea>
            </div>
        </div>
    `)
    nPomos+=(taskList[i].pomodori-taskList[i].donepomodori);
    index++;}
    updateTaskButtons();
    var textToAppend = "Pomodori Rimanenti: "+JSON.stringify(nPomos);
    document.getElementById("pomoCount").innerText=textToAppend;
}

// Funzione per leggere le task dal cookie e aggiungerle a taskList
function mergeCookie() {
    let cookieValue = document.cookie
  .split('; ')
  .find(row => row.startsWith('taskList='))
  .split('=')[1];
    JSON.parse(cookieValue).forEach(function(tuple) {
        var newTask = { key:tuple.key, title: tuple.title, pomodori: parseInt(tuple.pomodori),note: tuple.note,donepomodori: parseInt(tuple.donepomodori),tim:(tuple.tim) };
        taskList.push(newTask); 
    });
  }

