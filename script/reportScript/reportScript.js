
function downloadEnded(tuple) {
    console.log(tuple.title); // Output: Mario
    
    document.querySelector('#reportPanel').insertAdjacentHTML('beforeend', `
    <div  class="task">
            
        <img class = "taskImg" id ="endedDeleteImg" src = "../style/img/trash-can-solid.png"   onClick="deleteEndedTask(event);">
        </img>
        <input type="text" readOnly id="endedTaskname" value="${tuple.title}" maxlength="25">


        <input type="number" value= "${tuple.pomodori}" readonly  min="1">
        <button type="button" class="taskOption" onClick= "showOption(event);" >
            <img class = "taskImg" src  = "../style/img/sliders-solid.png">
            </img>
        </button>
        <div class="hiddenOption" display = none>
          <textarea name="taskNote" id="hiddenNote" cols="40" rows="3" placeholder="updateNote" maxlength="115">${tuple.note}</textarea>
        </div>    
       
    
    </div>
`)
}

function deleteEndedTask(e) {
    
}

function stripTuple(tuple) {

}