<?php
  include( 'db_conn.php');  
  session_start(); 
?>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <meta name="description" content="App metodo concentrazione pomodoro">
    <title>PomoChallenge</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>

    <link rel="stylesheet" href="../bootstrap/dist/css/bootstrap.css" >
    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/flipclock/0.7.8/flipclock.css'>
    <link rel="stylesheet" href="../style/homeStyle/clockStyle.css">
    <link rel="stylesheet" href="../style/homeStyle/style.css">
    <link rel="stylesheet" href="../style/homeStyle/defaultStyle.css">
    <link rel="stylesheet" href="../style/homeStyle/inputStyle.css">
    <link rel="stylesheet" href="../style/homeStyle/tasksStyle.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/css/flag-icon.min.css"  crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js'></script>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/flipclock/0.7.8/flipclock.min.js'></script>
    <script  src="../script/homeScript/clockScript.js"></script>
    <script  src="../script/homeScript/TaskScript.js"></script>
    <script  src="../script/homeScript/serverTaskScript.js"></script>
    <script src="../bootstrap/dist/js/bootstrap.bundle.min.js" ></script>
    <!-- <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous" referrerpolicy="no-referrer" ></script>  -->

    <script>
        $(function(){
          $("#mynavbar").load("../model/newNavbar.html");
        });

    </script>

</head>
<body>
<?php         
$query = "SELECT keyhash, title, pomodori, note, donepomodori FROM task WHERE task.username = $1 ORDER BY ind";
$res = pg_query_params ($db_conn, $query, array($_SESSION["username"])); ?>

    <div id="mynavbar"></div>
    <div class="container">
      <div class="box">box1</div>
        <div class="center-box">
          <div class="box">
            <div class="pomodoro">
              <div id="switchRow"> 
                      <img id = "settingsImg" src  = "../style/img/gearsolid.png" onclick="checkCustom()">
                      </img>
                  
                      <img id = "infoImg" src  = "../style/img/info-solid.png" onclick="infoPopUp()">
                      </img>
                      <div class="overlay" id="infoOverlay">
                        <div class = "popup" id="infoPop">
                          <p>
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit 
                          </p>
                          <span class = "close" id="infoClose" onclick="closeInfo()">
                            X
                          </span>
                        </div>
                      </div>
              </div> 
              <div class="row" id="statRow">
                <div id="stats"></div>
              </div>                  
                <div id="clock" class="row">
                  <div class="timer"><div class="middle"></div></div>
                </div>
                <!------------------------------------------------------------------------------->
                <div  class="row" id = "hiddenCustom">
                  <div class="col-md-6">
                    <div class="row"><p>Durata Pomodoro<p></div>
                    <div class="row counter">
                      <div class="col-md-4">
                        <button class="btn btn-default" id="sessDec">-</button>        
                      </div>
                      <div class="col-md-2">
                        <div id="session"></div>
                      </div>
                      <div class="col-md-4">
                        <button class="btn btn-default" id="sessInc">+</button>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row"><p>Short Break<p></div>
                    <div class="row counter">
                      <div class="col-md-4">
                        <button class="btn btn-default" id="breakDec">-</button>
                      </div>
                      <div class="col-md-2">
                        <div id="break"></div>
                      </div>
                      <div class="col-md-4">
                        <button class="btn btn-default" id="breakInc">+</button>        
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="row"><p>Long Break<p></div>
                    <div class="row counter">
                      <div class="col-md-4">
                        <button class="btn btn-default" id="longDec">-</button>        
                      </div>
                      <div class="col-md-2">
                        <div id="longBreak"></div>
                      </div>
                      <div class="col-md-4">
                        <button class="btn btn-default" id="longInc">+</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="buttonsArea">
                  <div class="" id="btns">
                    <button class="btn btn-default btn-lg" id="start">START</button>
                    <button class="btn btn-default btn-lg" id="skip">SKIP</button>
                    <button class="btn btn-default btn-lg" id="clear">CLEAR</button>
                  </div>
                </div>
              </div>
      </div>
        <div id = "taskUseSection">
        </div>


        <div id="taskBox">
          <div id="taskTag">
        <audio id="endDing" src="../sound/ding.mp3"></audio>
<button id="taskUse" onclick="openTaskBar();">
              Open task panel
            </button>
          </div>
          <div id = "selectTaskArea">
              <p id="pomoCount">Pomodori Complessivi: 0</p>
              <p id="timeEstimated"> </p>
              <div id="newtask">
                <div id = modalitaTaskRow>
                  <p id="modalitaTaskSwitch">
                    Attivare task? 
                    <label class="switch" data-on="ON" data-off="OFF">
                      <input type="checkbox" id = "customCheckbox" onclick="modalitaTask(); resetClock();">
                      <span class="slider round"></span>
                    </label>
                  </p>
                </div>
                  <input type="text" placeholder="Add task title" id="taskFieldInput" onkeypress="handleKeyPress(event, 'add')" maxlength="25">
                  <button id="push" onclick="addTask();">Add</button>
                  <br>
                  Quanti Pomodori?<br>
                  <input type="number" min="1"  id="pomoTaskNumber" value="1" label> <br>
                  Note: <br>
        
                  <textarea id="taskNote" placeholder="Add a note..." " cols="40" rows="3" onkeypress="handleKeyPress(event, 'add')" maxlength="115" ></textarea>
              </div>

              <div id="taskTag">
                <button name = "swapTasksButton" class = roundBtn id="defaultOrderButton" disabled onclick="openSwapPopup()">
                  Swap tasks </button>
                  <button name = "reverseTasksButton" class = roundBtn id="defaultOrderButton" disabled onclick="reverseTask();">
                    Reverse tasks </button>                           
              </div>
              <div id="taskTag">
                <button name = "deleteAllTaskButton" class = roundBtn id="defaultOrderButton" disabled onclick="deleteAllTask();">
                  Delete all tasks </button>  
                <button name = "deleteEndedTaskButton" class = roundBtn id="defaultOrderButton" disabled onclick="deleteEndedTask();">
                  Delete ended tasks </button>  
                <label>
                  Automatic delete for ended tasks
                </label>
                  <input type="checkbox" id="automaticDel" onclick="(function () {
                    delEnded=event.currentTarget.checked;
                  })()"> 
              </div>
              <div id="tasks">
              </div>
              <div id="popupContainer"></div>
              <!-- Crea un elemento div per l'overlay > se lo vogliamo fare -->
              <div id="overlay"></div>
          </div>
        
        </div>
      </div>

<?php 
            

while ($tuple = pg_fetch_array($res, null, PGSQL_ASSOC)) {
    // Converte la tupla in una stringa JSON
    $tuple_json = json_encode($tuple);

    // Passa la tupla alla funzione JavaScript fillTask
    echo '<script>fillTaskList(' . $tuple_json . ')</script>';

    // Esempio di output della tupla
    echo $tuple["title"];
    echo $tuple["pomodori"];
    echo $tuple["note"];
    echo $tuple["donepomodori"];
    echo '<br>';
}
echo '<script> fillTaskBox(); </script>'
?>
});
</body>
</html>