function fillTaskList(tuple) {
    console.log(tuple.pomodori);
    var newTask = { key:tuple.keyhash, title: tuple.title, pomodori: parseInt(tuple.pomodori),note: tuple.note,donepomodori: parseInt(tuple.donepomodori) };
    taskList.push(newTask); 
}
function fillTaskBox (){
    for (var i=0 ;i<taskList.length;i++){
        index+=i;
        document.querySelector('#tasks').insertAdjacentHTML('beforeend', `
        <div  class="task" data-value="${taskList[i].key}">
          
            <!-- <button style='font-size:24px' class="delete"  id ="deleteBtn" >  -->
              <img class = "taskImg" id ="deleteImg" src = "../style/img/trash-can-solid.png"   onClick="deleteTask(event);">
              </img>
            <!-- </button>   -->
            <span class="indexTasks">${index})</span>
            <input type="text" readOnly id="taskname"  value="${taskList[i].title}" onkeypress="handleKeyPress(event, 'options')" maxlength="25">


            <input type="number" value="${taskList[i].pomodori}" class="x" readonly  min="1">
            
            <button type="button" class="taskOption" onClick= "showOption(event);" >
                <img class = "taskImg" src  = "../style/img/sliders-solid.png">
                </img>
            </button>
            <div class="hiddenOption" display = none>
              <textarea name="taskNote" id="hiddenNote" cols="40" rows="3" placeholder="updateNote" maxlength="115">${document.getElementById("taskNote").value}</textarea>
            </div>
        </div>
    `)
    }
    updateTaskButtons();
}