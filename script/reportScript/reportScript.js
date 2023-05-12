var currentString = "";
var currentDate = new Date();
var currentPeriodType = "";

let myChart = null;
function monthCharts(i) {
  const ctx = document.getElementById('myChart');
  
  Promise.all([
    monthQuery('01'),
    monthQuery('02'),
    monthQuery('03'),
    monthQuery('04'),
    monthQuery('05'),
    monthQuery('06'),
    monthQuery('07'),
    monthQuery('08'),
    monthQuery('09'),
    monthQuery('10'),
    monthQuery('11'),
    monthQuery('12')
  ]).then((data) => {
    myChart = new Chart(ctx, {
      
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: '# minutes in a month',
          data: data,
          borderWidth: 0.8,
          backgroundColor: Array.from({ length: 12 }).fill(undefined).map((color, index) => index === i-1 ? 'red' : 'grey')
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    
  });

}

function weekCharts() {
  const ctx = document.getElementById('myChart');
  
  Promise.all([
    weekQuery(0),
    weekQuery(1),
    weekQuery(2),
    weekQuery(3),
    weekQuery(4),
    weekQuery(5),
    weekQuery(6),

  ]).then((data) => {
    myChart = new Chart(ctx, {
      
      type: 'bar',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: '# minutes in a week',
          data: data,
          borderWidth: 0.8,
          barThickness: 25,
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    
  });

}

function monthQuery(s) {
  return new Promise((resolve, reject) => {
    var sum = 0;
    var period = s;
    var php = "../server/getMonthTime.php";
    var typeReq = "POST";
    $.ajax({
      url: php,
      type: typeReq,
      data: {period: period},
      success: function(result) {
          // Aggiornamento eseguito con successo
          var endedTasks = JSON.parse(result);
          if(endedTasks.length != 0) {
            for(var i = 0; i<endedTasks.length; i++) {
              sum += parseInt(endedTasks[i].tim);
              //sumTime(endedTasks[i]);
            }
          }
          resolve(sum);
      },
      error: function(xhr, status, error) {
          // Errore nell'aggiornamento
          console.error(error);
          reject(error);
      }
    });
  });
}

function weekQuery(s) {
  return new Promise((resolve, reject) => {
    var sum = 0;
    var period = s;
    var php = "../server/getWeekTime.php";
    var typeReq = "POST";
    $.ajax({
      url: php,
      type: typeReq,
      data: {period: period},
      success: function(result) {
        console.log(result);
          // Aggiornamento eseguito con successo
          var endedTasks = JSON.parse(result);
          if(endedTasks.length != 0) {
            for(var i = 0; i<endedTasks.length; i++) {
              sum += parseInt(endedTasks[i].tim);
              //sumTime(endedTasks[i]);
            }
          }
          resolve(sum);
      },
      error: function(xhr, status, error) {
          // Errore nell'aggiornamento
          console.error(error);
          reject(error);
      }
    });
  });
}


function parseDate(str) {
  var parts = str.split("-");
  return new Date(parts[2], parts[1] - 1, parts[0]);
  
}
function upTotalTime(totalTime) {
  console.log(totalTime);
  document.querySelector("#currentPeriod").insertAdjacentHTML('beforeend', `
    <p1> ${totalTime}</p1>
  `);
}
function downloadEnded(tuple) {
  var totalTime = 0;
    document.querySelector('#tasksPanel').insertAdjacentHTML('beforeend', `
    <div  class="task" data-value="${tuple.keyhash}">
        
        <img class = "taskImg" id ="endedDeleteImg" src = "../style/img/trash-can-solid.png"   onClick="deleteEndedTask(event);">
        </img>
        <input type="text" readonly id="endedTaskname" value="${tuple.title}" maxlength="25">
       

        <input type="number"  id="endedPomos" value= "${tuple.tim}" readonly  min="1">
       
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
  currentDate = parseDate(tuple.dat);
}

function deleteEndedTask(e) {
  var url ="deleteTask.php";
  var button = e.currentTarget;
  var task = button.parentNode;
 task.remove();
  var keyhash = task.getAttribute("data-value");
  $.ajax({
    url: "../server/deleteTask.php",
    type: "POST",
    data: {keyhash: keyhash},
    success: function(result) {
        // Aggiornamento eseguito con successo
        
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
    if(myChart!= null) myChart.destroy();
    var url;
    var totalTime = 0 ;
    if(s == 'daily') url = "dailyLoad.php";
    else if(s == 'weekly') url = "weeklyLoad.php";
    else if(s == 'all') url = "allLoad.php";
    if(s == 'daily') {
      url = "dailyLoad.php";
      currentPeriodType = "day";
    }
    else if(s == 'weekly') {
      url = "weeklyLoad.php";
      currentPeriodType = "week";
      weekCharts();
    }
    else if(s == 'monthly') {
      url = "monthlyLoad.php";
      currentPeriodType = "month";
      currentMonth = new Date().getMonth()+1;
      console.log(parseInt(currentMonth));
      monthCharts(parseInt(currentMonth));
    }
    else if(s == 'all') {
      url = "allLoad.php";
      currentPeriodType = "none";
    }
    document.getElementById("tasksPanel").innerHTML = '';
    document.getElementById("currentPeriod").innerHTML = '';
    //document.getElementById("myChart").innerHTML = '';
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

function increaseDay(s) {
  if(s == "+") {
    currentDate.setDate(currentDate.getDate() + 1);
  }
  else if (s == "-") {
    currentDate.setDate(currentDate.getDate() - 1);
  }
  var day = JSON.parse(currentDate.getDate());
  var month = JSON.parse(currentDate.getMonth()+1);
  var year = JSON.parse(currentDate.getFullYear());
  if (day<10)
    day = "0"+day;
  if (month<10)
    month = "0"+month;
  
  currentString = day+"-"+month+"-"+year;
}

function increaseWeek(s) {
  if(s == "+") {
    currentDate.setDate(currentDate.getDate() + 7);
  }
  else if (s == "-") {
    currentDate.setDate(currentDate.getDate() - 7);
  }
  var day = JSON.parse(currentDate.getDate());
  var month = JSON.parse(currentDate.getMonth()+1);
  var year = JSON.parse(currentDate.getFullYear());
  if (day<10)
    day = "0"+day;
  if (month<10)
    month = "0"+month;
  
  currentString = day+"-"+month+"-"+year;
}

function increaseMonth(s) {
  console.log(currentDate);
  var day = JSON.parse(currentDate.getDate());
  var year = JSON.parse(currentDate.getFullYear());
  if(s == "+") {
    var month = JSON.parse(currentDate.getMonth()+2);
  }
  else if (s == "-") {
    var month = JSON.parse(currentDate.getMonth());
  }
  
  if (day<10)
    day = "0"+day;
  if (month<10)
    month = "0"+month;
  
  currentString = day+"-"+month+"-"+year;
}




function increase() {
  document.getElementById("tasksPanel").innerHTML = '';
  var typeReq = "POST";
  if(currentPeriodType == "day") {
    increaseDay("+");
    var php = "../server/dailyLoadIncrease.php";
  }
  else if(currentPeriodType == "week") {
    increaseWeek("+");
    var php = "../server/increaseWeek.php";
  }
  else if(currentPeriodType == "month") {
    increaseMonth("+");
    var php = "../server/increaseMonth.php";
    console.log(currentString);
  }
  $.ajax({
    url: php,
    type: typeReq,
    data: {currentString: currentString},
    success: function(result) {
        // Aggiornamento eseguito con successo
        var endedTasks = JSON.parse(result);
        if(endedTasks.length != 0) {
          for(var i = 0; i<endedTasks.length; i++) {
            downloadEnded(endedTasks[i]);
          }
        }
    },
    error: function(xhr, status, error) {
        // Errore nell'aggiornamento
        console.error(error);
    }
});
}

function decrease() {
  document.getElementById("tasksPanel").innerHTML = '';
  var typeReq = "POST";
  if(currentPeriodType == "day") {
    increaseDay("-");
    var php = "../server/dailyLoadIncrease.php";
  }
  else if(currentPeriodType == "week") {
    increaseWeek("-");
    var php = "../server/increaseWeek.php";
  }
  else if(currentPeriodType == "month") {
    increaseMonth("-");
    var php = "../server/increaseMonth.php";
  }
  $.ajax({
    url: php,
    type: typeReq,
    data: {currentString: currentString},
    success: function(result) {
        // Aggiornamento eseguito con successo
        var endedTasks = JSON.parse(result);

        if(endedTasks.length != 0) {
          for(var i = 0; i<endedTasks.length; i++) {
            downloadEnded(endedTasks[i]);
          }
        }
    },
    error: function(xhr, status, error) {
        // Errore nell'aggiornamento
        console.error(error);
    }
});
}
