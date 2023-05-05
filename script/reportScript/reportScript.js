
function downloadEnded(tuple) {
    console.log(tuple.title); // Output: Mario
    
    document.querySelector('#tasksPanel').insertAdjacentHTML('beforeend', `
    <div  class="task">
        
        <img class = "taskImg" id ="endedDeleteImg" src = "../style/img/trash-can-solid.png"   onClick="deleteEndedTask(event);">
        </img>
        <input type="text" readonly id="endedTaskname" value="${tuple.title}" maxlength="25">
       

        <input type="number"  id="endedPomos" value= "${tuple.pomodori}" readonly  min="1">
       
        <img id = "endedOptionImg" src  = "../style/img/sliders-solid.png" onclick = "endedOption(event)">
        </img>
  
     
        <div id="hiddenOption">
          <textarea name="taskNote" readonly class="hiddenNote" cols="40" rows="3" placeholder="updateNote" maxlength="115">${tuple.note}</textarea>
        </div>    
       
    
    </div>
`)
}

function deleteEndedTask(e) {
    
}

function endedOption(e) {
    var button = e.currentTarget;
    var hiddenBox = button.nextElementSibling;
    var computedStyle = window.getComputedStyle(hiddenBox);
    if (computedStyle.display === "block") {
        hiddenBox.style.display = "none";
    }
    else {
        hiddenBox.style.display = "block";
    }
}


function loadDaily() {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                var newData = JSON.parse(httpRequest.responseText);
                downloadEnded(newData);
            } else {
                console.error('Errore durante la richiesta dei dati');
            }
        }
    };
    httpRequest.open('GET', 'dailyLoad.php');
    httpRequest.send();
}