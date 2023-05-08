
function upTotalTime(totalTime) {
  console.log(totalTime);
  document.querySelector("#currentPeriod").insertAdjacentHTML('beforeend', `
    <p1> ${totalTime}</p1>
  `);
}
function downloadEnded(tuple) {
  var totalTime = 0;
  console.log(tuple);
    document.querySelector('#tasksPanel').insertAdjacentHTML('beforeend', `
    <div  class="task" data-value="${tuple.keyhash}">
        
        <img class = "taskImg" id ="endedDeleteImg" src = "../style/img/trash-can-solid.png"   onClick="deleteEndedTask(event);">
        </img>
        <input type="text" readonly id="endedTaskname" value="${tuple.title}" maxlength="25">
       

        <input type="number"  id="endedPomos" value= "${tuple.tim}" readonly  min="1">
       
        <img id = "endedOptionImg" src  = "../style/img/sliders-solid.png" onclick = "endedOption(event)">
        </img>
  
     
        <div id="hiddenOption">
          <textarea name="taskNote" readonly class="hiddenNote" cols="40" rows="3" placeholder="updateNote" maxlength="115">${tuple.note}</textarea>
        </div>    
       
    
    </div>
`);
}

function deleteEndedTask(e) {
  var url ="deleteTask.php";
  var button = e.currentTarget;
  console.log(button)
  var task = button.parentNode;
 task.remove();
  var keyhash = task.getAttribute("data-value");
  $.ajax({
    url: "../server/deleteTask.php",
    type: "POST",
    data: {keyhash: keyhash},
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
    var totalTime = 0 ;
    if(s == 'daily') url = "dailyLoad.php";
    else if(s == 'weekly') url = "weeklyLoad.php";
    else if(s == 'all') url = "allLoad.php";
    document.getElementById("tasksPanel").innerHTML = '';
    var httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", url, true);
    httpRequest.setRequestHeader('Content-Type', 'application/json');
    httpRequest.onreadystatechange = function() {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        var response = JSON.parse(httpRequest.responseText);
        if ('error' in response) {
          console.log(response.error);
        } else {
            response.forEach(function(tuple) {
              downloadEnded(tuple);
              totalTime+= tuple.time;
          });
          upTotalTime(totalTime);
        }
      }
    };
    httpRequest.send();
  }