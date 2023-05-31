var currentD = new Date();
var currentString = dateToString(currentD);
var currentPeriodType = "day";
var totalTime=0;
var canCharge = true;
var mon; 
var sun;
weekInterval(currentD);
var mesi = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", 
            "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"];

var myChart = null;
//canvas.width = window.innerWidth * 1;





function load(s, e) {
  var currentActiveButton = document.querySelector('.tabClass.active');
  if (currentActiveButton) {
    currentActiveButton.classList.remove('active');
  }
  e.currentTarget.classList.add('active');

  document.querySelector("#currentPeriod").innerHTML= "";
  document.querySelector("#totalTime").innerHTML= "";
  currentD = new Date();
  if(myChart!= null) myChart.destroy();
  var url;
    totalTime = 0 ;
  if(s == 'daily') {
  /*  document.querySelector("#currentPeriod").insertAdjacentHTML('beforeend', `
    <p1> ${currentString} <br></p1>
  `);*/
    document.querySelector("#currentPeriod").innerText= currentString;
    url = "../server/dailyLoad.php";
    currentPeriodType = "day";
    currentHour = new Date().getHours();
    hourCharts(currentHour);
    document.getElementById("increaseTimePeriod").disabled = false;
    document.getElementById("decreaseTimePeriod").disabled = false;

    var avgBtns = document.querySelectorAll(".avgBtnClass");
    avgBtns.forEach(function(btn) {
        btn.style.display = "none";
    });
  }
  else if(s == 'weekly') {
    document.querySelector("#currentPeriod").innerText= mon + " - " + sun;
    url = "../server/weeklyLoad.php";
    currentPeriodType = "week";
    weekCharts();
    document.getElementById("increaseTimePeriod").disabled = false;
    document.getElementById("decreaseTimePeriod").disabled = false;
    weekInterval(currentD);
    checkWeekBorder();

    var avgBtns = document.querySelectorAll(".avgBtnClass");
    avgBtns.forEach(function(btn) {
        btn.style.display = "none";
    });
  }
  else if(s == 'monthly') {
    url = "../server/monthlyLoad.php";
    currentPeriodType = "month";
    currentMonth = currentD.getMonth()+1;
    document.querySelector("#currentPeriod").innerText= mesi[currentMonth-1];
    monthCharts(currentMonth);
    document.getElementById("increaseTimePeriod").disabled = false;
    document.getElementById("decreaseTimePeriod").disabled = false;
    checkMonthsBorder();

    var avgBtns = document.querySelectorAll(".avgBtnClass");
    avgBtns.forEach(function(btn) {
        btn.style.display = "none";
    });
  }
  else if(s == 'all') {
    url = "../server/allLoad.php";
    currentPeriodType = "none";
    document.querySelector("#currentPeriod").innerText= "Total tasks";
    document.getElementById("increaseTimePeriod").disabled = true;
    document.getElementById("decreaseTimePeriod").disabled = true;
    avgDailyCharts();

    var avgBtns = document.querySelectorAll(".avgBtnClass");
    avgBtns.forEach(function(btn) {
        btn.style.display = "block";
    });
    document.getElementById("avgWeek").classList.remove('active');
    document.getElementById("avgDay").classList.add('active');
  }
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
        totalTime=0;
          response.forEach(function(tuple) {
            downloadEnded(tuple);
            totalTime+= JSON.parse(tuple.tim);
        });
        upTotalTime(totalTime);
        
      }
    }
  };
  httpRequest.send();
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
          backgroundColor: "#e7645d",
          hoverBackgroundColor: "#fc9690",
        }]
      },
      options: {
      
        normalized: true,
        scales: {
          y: {
            beginAtZero: true,
            grace: '5%'
          }
        }
      }
    });
  }).catch((error) => {
    console.error(error);
  });
}




function weekQuery() {
  return new Promise((resolve, reject) => {
    const url = "../server/getWeekTime.php";
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


function hourCharts() {
  const ctx = document.getElementById('myChartCanvas');
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
          backgroundColor  : "#e7645d",
          borderColor: "#e7645d",
          borderWidth: 2,
        }]
      },
      options: {
        responsive: true,
        showLine: true,
        borderWidth: '2px',
        normalized: true,
        scales: {
          y: {
            beginAtZero: true,
            grace: '5%'
          }
        }
      }
    });
  }).catch((error) => {
    console.error(error);
  });
}

function dailyQuery() {
  return new Promise((resolve, reject) => {
    const url = "../server/getDailyTime.php";
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

function hourCharts2(s) {
  if (myChart) {
    myChart.destroy();
  }
  const ctx = document.getElementById('myChartCanvas');
  dailyQuery2(s).then((data) => {
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
          backgroundColor  : "#e7645d",
          borderColor: "#e7645d",
          borderWidth: 2,
          //backgroundColor: Array.from({ length: 24 }).fill(undefined).map((color, index) => index === currentHourIndex ? 'red' : 'grey')
        }]
      },
      options: {
        showLine: true,
        borderWidth: '2px',
        normalized: true,
        scales: {
          y: {
            beginAtZero: true,
            grace: '5%'
          }
        }
      }
    });
  }).catch((error) => {
    console.error(error);
  });
}

function dailyQuery2(s) {
  return new Promise((resolve, reject) => {
    const url = "../server/increaseDayTime.php";
    const formData = new FormData();
    formData.append("parametro1", s);
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("POST", url);
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
    httpRequest.send(formData);
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
          backgroundColor: Array.from({ length: 12 }).fill(undefined).map((color, index) => index === currentMonthIndex ? "#e85e56" : "#494949"),
          hoverBackgroundColor: Array.from({ length: 12 }).fill(undefined).map((color, index) => index === currentMonthIndex ? "#fc9690" : "#6e6d6d"),
        }]
      },
      options: {
        plugins:{
          legend: {
           display: false
          }
         },
        normalized: true,
        scales: {
          y: {
            beginAtZero: true,
            grace: '5%'
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
          backgroundColor: "#e7645d",
          hoverBackgroundColor: "#fc9690",
        }]
      },
      options: {
      
        normalized: true,
        scales: {
          y: {
            beginAtZero: true,
            grace: '5%'
          }
        }
      }
    });
  }).catch((error) => {
    console.error(error);
  });
}

function avgDailyCharts() {
  if (myChart) {
    myChart.destroy();
  }
  const ctx = document.getElementById('myChartCanvas');
  avgDailyQuery().then((data) => {
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
          backgroundColor  : "#e7645d",
          borderColor: "#e7645d",
          borderWidth: 2,
        }]
      },
      options: {
        showLine: true,
        borderWidth: '2px',
        normalized: true,
        scales: {
          y: {
            beginAtZero: true,
            grace: '5%'
          }
        }
      }
    });
  }).catch((error) => {
    console.error(error);
  });
}

function avgWeeklyCharts() {
  if (myChart) {
    myChart.destroy();
  }
  const ctx = document.getElementById('myChartCanvas').getContext("2d");
  avgWeekQuery().then((data) => {
    const weekLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: weekLabels,
        datasets: [{
          label: `# minutes in a week`,
          data: [data[0][1],data[1][1],data[2][1],data[3][1],data[4][1],data[5][1],data[6][1]],
          borderWidth: 0.8,
          backgroundColor: "#e7645d",
          hoverBackgroundColor: "#fc9690",
        }]
      },
      options: {
      
        normalized: true,
        scales: {
          y: {
            beginAtZero: true,
            grace: '5%'
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
    const url = "../server/getMonthTime.php";
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



function weekQuery2(s) {
  return new Promise((resolve, reject) => {
    const url = "../server/increaseWeekTime.php";
    const formData = new FormData();
    formData.append("parametro1", s);
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("POST", url);
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
    httpRequest.send(formData);
  });
}

function avgCharts(){
  avgDailyCharts()
}

function avgDailyQuery() {
  return new Promise((resolve, reject) => {
    const url = "../server/avgday.php";
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

function avgWeekQuery() {
  return new Promise((resolve, reject) => {
    const url = "../server/avgWeekTime.php";
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

function parseDate(str) {
  var parts = str.split("-");
  return new Date(parts[2], parts[1] - 1, parts[0]);
  
}

function upTotalTime(totalTime) {
  var total = convertMinHour(totalTime);
  document.getElementById("totalTime").innerHTML="Tempo Totale : "+total;
}


function downloadEnded(tuple) {
    document.querySelector('#tasksPanel').insertAdjacentHTML('beforeend', `
    <div  class="task" data-value="${tuple.keyhash}">
    <!--
        <div class = "descPanel"> 
          <div class = "descript" id = "name"> 
            Task Name
          </div>
          <div class = "descript" id = "pomo"> 
            Num pomo
          </div>
        </div>
        -->
        <img class = "taskImg" id ="endedDeleteImg" src = "../style/img/trash-can-solid.png"   onClick="deleteEndedTask(event);">
        </img>
        <input type="text" readonly id="endedTaskname" value="${tuple.title}" maxlength="25">
       

        <input type="text"  id="endedPomos" value= "${tuple.tim} min" readonly  min="1">
       
        <button id="optionbuton" onclick = "endedOption(event)">
            <img id = "endedOptionImg" src  = "../style/img/ellipsis-vertical-solid.png" >
            </img>
        </button>
        
        <div id="hiddenOption">
          <textarea name="taskNote" readonly class="hiddenNote" cols="40" rows="3" maxlength="115">${tuple.note}</textarea>
        </div>    
       
    
    </div>
`)
}

function checkMonthsBorder() {
  cMonth = currentD.getMonth();
  if(cMonth == 0) { 
    document.getElementById("decreaseTimePeriod").disabled = true;
    stopInterval();
  }
  else if(cMonth == 11) {
    document.getElementById("increaseTimePeriod").disabled = true;
    stopInterval();
  }
  else {
    document.getElementById("decreaseTimePeriod").disabled = false;
    document.getElementById("increaseTimePeriod").disabled = false;

  }
}

function checkWeekBorder() {
  var monD = parseDate(mon);
  var sunD = parseDate(sun);
  if(monD.getMonth == 0 && monD.getDate == 1) {
    document.getElementById("decreaseTimePeriod").disabled = true;
    stopInterval();
  }
  else if(sunD.getMonth() == 0 && sunD.getDate() < 7) {
    monD.setDate(1);
    monD.setMonth(0);
    document.getElementById("decreaseTimePeriod").disabled = true;
    stopInterval();
  }
  else if(sunD.getMonth() == 11 && sunD.getDate() == 31) {
    document.getElementById("increaseTimePeriod").disabled = true;
    stopInterval();
  }
  else if(monD.getMonth() == 11 && monD.getDate() > 31-7) {
    sunD.setDate(31);
    sunD.setMonth(11);
    document.getElementById("increaseTimePeriod").disabled = true;
    stopInterval();
  }
  else {
    document.getElementById("decreaseTimePeriod").disabled = false;
    document.getElementById("increaseTimePeriod").disabled = false;
  }
  mon = dateToString(monD);
  sun = dateToString(sunD);
}

function checkDayBorder() {
  date = currentString;
  var parts = date.split("-");
  if(parts[0] == "01" && parts[1] == "01") {
    document.getElementById("decreaseTimePeriod").disabled = true;
    stopInterval();
  }
  else if(parts[0] == "31" && parts[1] == "12") {
    document.getElementById("increaseTimePeriod").disabled = true;
    stopInterval();
  }
  else {
    document.getElementById("decreaseTimePeriod").disabled = false;
    document.getElementById("increaseTimePeriod").disabled = false;

  }
} 

function dateToString(d) {
  var day = JSON.parse(d.getDate());
  var month = JSON.parse(d.getMonth()+1);
  var year = JSON.parse(d.getFullYear());
  if (day<10)
    day = "0"+day;
  if (month<10)
    month = "0"+month;
    s =  day+"-"+month+"-"+year;
    return s;
}


function weekInterval(d) {
  var today = d;
  var currentDayOfWeek = today.getDay();
  var daysToMonday = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;
  var monD = new Date(today.getFullYear(), today.getMonth(), today.getDate() - daysToMonday);
  var daysToSunday = currentDayOfWeek === 0 ? 0 : 7 - currentDayOfWeek;
  var sunD = new Date(today.getFullYear(), today.getMonth(), today.getDate() + daysToSunday);
  
  mon = dateToString(monD);
  sun = dateToString(sunD);
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



function chartLoad(s, e) {
  var currentActiveButton = document.querySelector('.avgBtnClass.active');
  if (currentActiveButton) {
    currentActiveButton.classList.remove('active');
  }
  e.currentTarget.classList.add('active');

  if(s == 'avgDay') {
    avgDailyCharts();
  }
  else if(s == "avgWeek") {
    avgWeeklyCharts();
  }
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
  document.getElementById("tasksPanel").innerHTML = '';
  upTotalTime(0);
  var typeReq = "POST";
  if(currentPeriodType == "day") {
    increaseDay("+");
    checkDayBorder();
    document.querySelector("#currentPeriod").innerText= currentString;
    var php = "../server/dailyLoadIncrease.php";
    if(canCharge) hourCharts2(currentString);
  }
  else if(currentPeriodType == "week") {
    increaseWeek("+");
    weekInterval(currentD);
    checkWeekBorder();
    document.querySelector("#currentPeriod").innerText= mon + " - " + sun;
    var php = "../server/increaseWeek.php";
    weekInterval(currentD);
    if(canCharge) weekCharts2(currentString);

  }
  else if(currentPeriodType == "month") {
    increaseMonth("+");
    document.querySelector("#currentPeriod").innerText= mesi[currentD.getMonth()];
    var php = "../server/increaseMonth.php";
    checkMonthsBorder(); 
    if(myChart != null) {
      myChart.data.datasets[0].backgroundColor[currentD.getMonth()] = "#e85e56";
      myChart.data.datasets[0].backgroundColor[currentD.getMonth()-1] = "#494949";
      myChart.data.datasets[0].hoverBackgroundColor[currentD.getMonth()] = "#fc9690";
      myChart.data.datasets[0].hoverBackgroundColor[currentD.getMonth()-1] = "#6e6d6d";
      myChart.update();
    }
  }
  else {
    console.log("errore period type");
  }
  if(canCharge) {
    $.ajax({
      url: php,
      type: typeReq,
      data: {currentString: currentString},
      success: function(result) {
          // Aggiornamento eseguito con successo
          var endedTasks = JSON.parse(result);
          if(endedTasks.length != 0) {           
             totalTime = 0;
          for(var i = 0; i<endedTasks.length; i++) {
              downloadEnded(endedTasks[i]);
              totalTime+=JSON.parse(endedTasks[i].tim);
          }
            upTotalTime(totalTime);          
        }
      },
      error: function(xhr, status, error) {
          // Errore nell'aggiornamento
          console.error(error);
      }
    });
  }
}

function decrease() {
  document.getElementById("tasksPanel").innerHTML = '';
  upTotalTime(0);
  var typeReq = "POST";
  if(currentPeriodType == "day") {
    increaseDay("-");
    document.querySelector("#currentPeriod").innerText= currentString;
    var php = "../server/dailyLoadIncrease.php";
    if(canCharge) hourCharts2(currentString);
    checkDayBorder();
  }
  else if(currentPeriodType == "week") {
    increaseWeek("-");
    weekInterval(currentD);
    checkWeekBorder();
    document.querySelector("#currentPeriod").innerText= mon + " - " + sun;
    var php = "../server/increaseWeek.php";
    if(canCharge) weekCharts2(currentString);
  }
  else if(currentPeriodType == "month") {
    increaseMonth("-");
    document.querySelector("#currentPeriod").innerText= mesi[currentD.getMonth()];
    var php = "../server/increaseMonth.php";
    checkMonthsBorder();
    if(myChart != null) {
      myChart.data.datasets[0].backgroundColor[currentD.getMonth()] = "#e85e56";
      myChart.data.datasets[0].backgroundColor[currentD.getMonth()+1] = "#494949";
      myChart.data.datasets[0].hoverBackgroundColor[currentD.getMonth()] = "#fc9690";
      myChart.data.datasets[0].hoverBackgroundColor[currentD.getMonth()+1] = "#6e6d6d";
      myChart.update();
    }
  }
  else {
    console.log("errore period type")
  }
  if(canCharge) {
    $.ajax({
      url: php,
      type: typeReq,
      data: {currentString: currentString},
      success: function(result) {
          // Aggiornamento eseguito con successo
          var endedTasks = JSON.parse(result);

          if(endedTasks.length != 0) {
          totalTime = 0;
            for(var i = 0; i<endedTasks.length; i++) {
              downloadEnded(endedTasks[i]);
            totalTime+=JSON.parse(endedTasks[i].tim);
            }
          upTotalTime(totalTime);
          }
      },
      error: function(xhr, status, error) {
          // Errore nell'aggiornamento
          console.error(error);
      }
    });
  }
}

function startInterval(s) {
  if(s == "-") intervalId = setInterval(decrease, 100); 
  else if(s == "+") intervalId = setInterval(increase, 100); 
  if(myChart && currentPeriodType != "month") myChart.destroy();
  canCharge = false;
}

function stopInterval() {
  clearInterval(intervalId); 
  canCharge = true;
}