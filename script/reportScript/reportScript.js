
function downloadEnded(tuple) {
    document.querySelector('#tasksPanel').insertAdjacentHTML('beforeend', `
    <div  class="task">
        
        <img class = "taskImg" id ="endedDeleteImg" src = "../style/img/trash-can-solid.png"   onClick="deleteEndedTask(event);">
        </img>
        <input type="text" readonly id="endedTaskname" value="${tuple.title}" maxlength="25">
       

        <input type="number"  id="endedPomos" value= "${tuple.pomodori}" readonly  min="1">
       
        <button id="optionbuton" onclick = "endedOption(event)">
            <img id = "endedOptionImg" src  = "../style/img/ellipsis-vertical-solid.png" >
            </img>
        </button>
        
        <div id="hiddenOption">
          <textarea name="taskNote" readonly class="hiddenNote" cols="40" rows="3" placeholder="updateNote" maxlength="115">${tuple.note}</textarea>
        </div>    
       
    
    </div>
`)
if (!document.querySelector('#currentPeriod').innerHTML.trim())
    document.querySelector('#currentPeriod').insertAdjacentHTML('beforeend', `
        <h3>
            ${tuple.dat}
        </h3>
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


function load(s) {
    var url;
    if(s == 'daily') url = "dailyLoad.php";
    else if(s == 'weekly') url = "weeklyLoad.php";
    else if(s == 'all') url = "allLoad.php";
    document.getElementById("tasksPanel").innerHTML = '';
    document.getElementById("currentPeriod").innerHTML = '';
    var httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", url, true);
    httpRequest.setRequestHeader('Content-Type', 'application/json');
    httpRequest.onreadystatechange = function() {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        var response = JSON.parse(httpRequest.responseText);
        if ('error' in response) {
          console.log(response.error);
        } else {
            console.log(response);
            response.forEach(function(tuple) {
            downloadEnded(tuple);
          });
        }
      }
    };
    httpRequest.send();
  }