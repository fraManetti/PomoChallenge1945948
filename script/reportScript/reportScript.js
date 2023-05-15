var currentString = "";
var currentD = new Date();
var currentPeriodType = "";
var totalTime=0;
let myChart = null;
function hourCharts() {
  const ctx = document.getElementById('myChart');
  dailyQuery().then((data) => {
    const hoursLabels = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11',
    '12','13','14','15','16','17','18','19','20','21','22','23' ];
    myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: hoursLabels,
        datasets: [{
          label: `# minutes in a day`,
          data: [data[0][1],data[1][1],data[2][1],data[3][1],data[4][1],data[5][1],data[6][1],data[7][1],data[8][1],
                data[9][1],data[10][1],data[11][1],data[12][1],data[13][1],data[14][1],data[15][1],data[16][1],data[17][1],
                data[18][1],data[19][1],data[20][1],data[21][1],data[22][1],data[23][1]],
          borderWidth: 0.8,
          //backgroundColor: Array.from({ length: 24 }).fill(undefined).map((color, index) => index === currentHourIndex ? 'red' : 'grey')
        }]
      },
      options: {
        showLine: true,
        borderWidth: '2px',
        normalized: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }).catch((error) => {
    console.error(error);
  });
}

function monthCharts(i) {
  if (myChart) {
    myChart.destroy();
  }
  const ctx = document.getElementById('myChartCanvas').getContext("2d");
  monthQuery().then((data) => {
    const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonthIndex = i - 1;
    const currentMonth = monthLabels[currentMonthIndex];
    myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: monthLabels,
        datasets: [{
          label: `# minutes in a month`,
          data: [data[0][1],data[1][1],data[2][1],data[3][1],data[4][1],data[5][1],data[6][1],data[7][1],data[8][1],
                data[9][1],data[10][1],data[11][1]],
          borderWidth: 0.8,
          backgroundColor: Array.from({ length: 12 }).fill(undefined).map((color, index) => index === currentMonthIndex ? 'red' : 'grey')
        }]
      },
      options: {
      
        normalized: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }).catch((error) => {
    console.error(error);
  });
}

function weekCharts() {
  if (myChart) {
    myChart.destroy();
  }
  const ctx = document.getElementById('myChartCanvas').getContext("2d");
  weekQuery().then((data) => {
    const weekLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: weekLabels,
        datasets: [{
          label: `# minutes in a week`,
          data: [data[0][1],data[1][1],data[2][1],data[3][1],data[4][1],data[5][1],data[6][1]],
          borderWidth: 0.8,
          //backgroundColor: Array.from({ length: 12 }).fill(undefined).map((color, index) => index === currentMonthIndex ? 'red' : 'grey')
        }]
      },
      options: {
      
        normalized: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }).catch((error) => {
    console.error(error);
  });
}

function weekCharts2(s) {
  if (myChart) {
    myChart.destroy();
  }
  const ctx = document.getElementById('myChartCanvas').getContext("2d");
  weekQuery2(s).then((data) => {
    const weekLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: weekLabels,
        datasets: [{
          label: `# minutes in a week`,
          data: [data[0][1],data[1][1],data[2][1],data[3][1],data[4][1],data[5][1],data[6][1]],
          borderWidth: 0.8,
          //backgroundColor: Array.from({ length: 12 }).fill(undefined).map((color, index) => index === currentMonthIndex ? 'red' : 'grey')
        }]
      },
      options: {
      
        normalized: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }).catch((error) => {
    console.error(error);
  });
}

function monthQuery() {
  return new Promise((resolve, reject) => {
    const url = "getMonthTime.php";
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", url, true);
    httpRequest.setRequestHeader('Content-Type', 'application/json');
    httpRequest.onreadystatechange = function() {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        const response = JSON.parse(httpRequest.responseText);
        if ('error' in response) {
          reject(response.error);
        } else {
          resolve(response);
        }
      }
    }
    httpRequest.send();
  });
}

function weekQuery() {
  return new Promise((resolve, reject) => {
    const url = "getWeekTime.php";
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", url, true);
    httpRequest.setRequestHeader('Content-Type', 'application/json');
    httpRequest.onreadystatechange = function() {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        const response = JSON.parse(httpRequest.responseText);
        if ('error' in response) {
          reject(response.error);
        } else {
          resolve(response);
        }
      }
    }
    httpRequest.send();
  });
}

<<<<<<< HEAD
function dailyQuery() {
  return new Promise((resolve, reject) => {
    const url = "getDailyTime.php";
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", url, true);
    httpRequest.setRequestHeader('Content-Type', 'application/json');
=======
function weekQuery2(s) {
  return new Promise((resolve, reject) => {
    const url = "increaseWeekTime.php";
    const formData = new FormData();
    formData.append("parametro1", s);
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("POST", url);
>>>>>>> 40d9685fee4e35524318af599bba125e865dc016
    httpRequest.onreadystatechange = function() {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        const response = JSON.parse(httpRequest.responseText);
        if ('error' in response) {
          reject(response.error);
        } else {
<<<<<<< HEAD
          console.log(response);
=======
>>>>>>> 40d9685fee4e35524318af599bba125e865dc016
          resolve(response);
        }
      }
    }
<<<<<<< HEAD
    httpRequest.send();
=======
    httpRequest.send(formData);
>>>>>>> 40d9685fee4e35524318af599bba125e865dc016
  });
}

function parseDate(str) {
  var parts = str.split("-");
  return new Date(parts[2], parts[1] - 1, parts[0]);
  
}

function upTotalTime(totalTime) {
  document.querySelector("#currentPeriod").insertAdjacentHTML('beforeend', `
    <p1> Tempo Totale: ${totalTime}</p1>
  `);
}
function downloadEnded(tuple) {
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
totalTime+= JSON.parse(tuple.tim);
if (!document.querySelector('#currentPeriod').innerHTML.trim())
    document.querySelector('#currentPeriod').insertAdjacentHTML('beforeend', `
        <h3>
            ${tuple.dat}
        </h3>
    `)
  //currentD = parseDate(tuple.dat);
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
        if(myChart!= null) myChart.destroy();
        if(currentPeriodType == "month") {
          currentMonth = new Date().getMonth()+1;
          monthCharts(currentMonth);
        }
        else if(currentPeriodType == "week") {
          weekCharts();
        }
        else if(currentPeriodType == "day") {

        }
        
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
  currentD = new Date();
    if(myChart!= null) myChart.destroy();
    var url;
    totalTime = 0 ;
    if(s == 'daily') url = "dailyLoad.php";
    else if(s == 'weekly') url = "weeklyLoad.php";
    else if(s == 'all') url = "allLoad.php";
    if(s == 'daily') {
      url = "dailyLoad.php";
      currentPeriodType = "day";
      currentHour = new Date().getHours();
      hourCharts(currentHour);
    }
    else if(s == 'weekly') {
      url = "weeklyLoad.php";
      currentPeriodType = "week";
      weekCharts();
    }
    else if(s == 'monthly') {
      url = "monthlyLoad.php";
      currentPeriodType = "month";
      currentMonth = currentD.getMonth()+1;
      monthCharts(currentMonth);
      
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
          });
          upTotalTime(totalTime);
          
        }
      }
    };
    httpRequest.send();
    
  }

function increaseDay(s) {
  if(s == "+") {
    currentD.setDate(currentD.getDate() + 1);
  }
  else if (s == "-") {
    currentD.setDate(currentD.getDate() - 1);
  }
  var day = JSON.parse(currentD.getDate());
  var month = JSON.parse(currentD.getMonth()+1);
  var year = JSON.parse(currentD.getFullYear());
  if (day<10)
    day = "0"+day;
  if (month<10)
    month = "0"+month;
  
  currentString = day+"-"+month+"-"+year;
}

function increaseWeek(s) {
  if(s == "+") {
    currentD.setDate(currentD.getDate() + 7);
  }
  else if (s == "-") {
    currentD.setDate(currentD.getDate() - 7);
  }
  var day = JSON.parse(currentD.getDate());
  var month = JSON.parse(currentD.getMonth()+1);
  var year = JSON.parse(currentD.getFullYear());
  if (day<10)
    day = "0"+day;
  if (month<10)
    month = "0"+month;
  
  currentString = day+"-"+month+"-"+year;
}

function increaseMonth(s) {
  
  if(s == "+") {
    currentD.setMonth(currentD.getMonth() + 1);
  }
  else if (s == "-") {
    currentD.setMonth(currentD.getMonth() - 1);
  }
  var day = JSON.parse(currentD.getDate());
  var month = JSON.parse(currentD.getMonth()+1);
  var year = JSON.parse(currentD.getFullYear());
  if (day<10)
    day = "0"+day;
  if (month<10)
    month = "0"+month;
  
  currentString = day+"-"+month+"-"+year;
}




function increase() {
  //console.log(currentString);
  document.getElementById("tasksPanel").innerHTML = '';
  var typeReq = "POST";
  if(currentPeriodType == "day") {
    increaseDay("+");
    var php = "../server/dailyLoadIncrease.php";
  }
  else if(currentPeriodType == "week") {
    increaseWeek("+");
    var php = "../server/increaseWeek.php";
    weekCharts2(currentString);
  }
  else if(currentPeriodType == "month") {
    increaseMonth("+");
    var php = "../server/increaseMonth.php";
    if(myChart != null) {
      myChart.data.datasets[0].backgroundColor[currentD.getMonth()] = 'red';
      myChart.data.datasets[0].backgroundColor[currentD.getMonth()-1] = 'grey';
      myChart.update();
    }
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
    weekCharts2(currentString);
  }
  else if(currentPeriodType == "month") {
    increaseMonth("-");
    var php = "../server/increaseMonth.php";
    if(myChart != null) {
      myChart.data.datasets[0].backgroundColor[currentD.getMonth()] = 'red';
      myChart.data.datasets[0].backgroundColor[currentD.getMonth()+1] = 'grey';
      myChart.update();
    }
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
