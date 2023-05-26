<?php
  include( '../server/db_conn.php');  
  session_start(); 
?>
<!DOCTYPE html>
<html>
<head>
<script src="../HackTimer/HackTimer.js" ></script>
<script src="../HackTimer/HackTimerWorker.js" ></script>

    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <meta name="description" content="App metodo concentrazione pomodoro">
    <title>PomoChallenge</title>
    <link rel="icon" type="image/x-icon" href="../style/img/tomato.png">
    <meta name='viewport' content='width=device-width, initial-scale=1'>

    <link rel="stylesheet" href="../bootstrap/dist/css/bootstrap.css" >
    <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/flipclock/0.7.8/flipclock.css'>
    <link rel="stylesheet" href="../style/homeStyle/clockStyle.css">
    <link rel="stylesheet" href="../style/homeStyle/defaultStyle.css">
    <link rel="stylesheet" href="../style/homeStyle/homeStyle.css">
    <link rel="stylesheet" href="../style/homeStyle/inputStyle.css">
    <link rel="stylesheet" href="../style/homeStyle/tasksStyle.css">
    <link rel="stylesheet" href="../style/homeStyle/responsiveHomeStyle.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/css/flag-icon.min.css"  crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js'></script>
    <script src='https://cdnjs.cloudflare.com/ajax/libs/flipclock/0.7.8/flipclock.min.js'></script>
    <script  src="../script/homeScript/clockScript.js"></script>
    <script  src="../script/homeScript/TaskScript.js"></script>
    <script  src="../script/homeScript/serverTaskScript.js"></script>
    <script src="../bootstrap/dist/js/bootstrap.bundle.min.js" ></script>
    <!-- <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous" referrerpolicy="no-referrer" ></script>  -->


</head>
<body onload="setButtonState()">

<?php

if(isset($_SESSION['username']) ||( isset($_COOKIE['loggedUser']) && $_COOKIE['loggedUser'] !== null)){  
 echo '<script> 
 $(function(){
  $("#mynavbar").load("../model/newNavbar.html");
});
 </script>';   
$query = "SELECT keyhash, title, pomodori, note, donepomodori,tim FROM task WHERE task.username = $1 ORDER BY ind";
$res = pg_query_params ($db_conn, $query, array($_SESSION["username"])); 
            
if (isset($_COOKIE['taskList'])){
  if( !isset($_COOKIE["server_timestamp"]) ||(isset($_COOKIE["server_timestamp"]) and $_COOKIE["server_timestamp"]<$_COOKIE["cookie_timestamp"] ) ) {

  echo '<script>mergeCookie()</script>';
    $taskListString = $_COOKIE['taskList'];
  $taskList = json_decode($taskListString, true);
  $len = count($taskList);
  $username =$_SESSION["username"];
  $query2 = "update  task set ind= ind +{$len} where username='{$username}'";
  $res2 = pg_query($db_conn,$query2);
  for($i=0;$i<$len;$i++){
    $query2 = "insert into task values ('{$username}','{$taskList[$i]['key']}','{$taskList[$i]['title']}',{$taskList[$i]['pomodori']},'{$taskList[$i]['note']}',{$taskList[$i]['donepomodori']},{$taskList[$i]['index']},{$taskList[$i]['tim']})";
    $res2 = pg_query($db_conn,$query2);
  }
$timestamp = time()*1000;
setcookie("server_timestamp",$timestamp,time()+3600,"/");
}

}}  else {
echo '<script>      
  $(function(){
  $("#mynavbar").load("../model/oldNavbar.html");
});
</script>';}
?>

<div id="mynavbar"></div>
    <div class="cnt">
      <div class="box"></div>
        <div class="center-box">
          <div class="box">
            <div class="pomodoro">
              <div id="switchRow"> 
                      <img id = "settingsImg" src  = "../style/img/gearsolid.png" onclick="checkCustom()">
                      </img>
                      <!--prima c'era onclick="InfoPopUp"-->
                      <img id = "infoImg" src  = "../style/img/info-solid.png" onclick="infoPopUp()">
                      
                      </img>
                      <div class="overlay" id="infoOverlay">
                        <div class = "popup" id="infoPop">
                          <p>
                          Un Pomodoro è un timer <br> che corrisponde ad una <br> sessione di lavoro. <br> Al termine di ogni Pomodoro <br> ci sarà una Short Break. <br>Ogni quattro pomodori <br> ci sarà invece una Long Break. 
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
                  <div id = "hiddenRow">
                    <div class="col-md-6">
                      <div class="row"><p class = "pclass" >Session<p></div>
                      <div class="row counter">
                        <div class="col-md-4">
                          <button class="btn btn-default btnIncDec" id="sessDec">-</button>        
                        </div>
                        <div class="col-md-2">
                          <input type="number" class="params" id="session" value = "25" onblur="writeSession()"></input>
                        </div>
                        <div class="col-md-4">
                          <button class="btn btn-default btnIncDec" id="sessInc">+</button>
                        </div>
                      </div>
                    </div>

                    <div class="col-md-6">
                      <div class="row"><p class = "pclass">Short Break<p></div>
                      <div class="row counter">
                        <div class="col-md-4">
                          <button class="btn btn-default btnIncDec" id="breakDec">-</button>
                        </div>
                        <div class="col-md-2">
                          <input type="number" class="params" id="break" value = "5" onblur="writeShortBreak()"></input>
                        </div>
                        <div class="col-md-4">
                          <button class="btn btn-default btnIncDec" id="breakInc">+</button>        
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="row"><p class = "pclass">Long Break<p></div>
                      <div class="row counter">
                        <div class="col-md-4">
                          <button class="btn btn-default btnIncDec" id="longDec">-</button>        
                        </div>
                        <div class="col-md-2">
                          <input type="number"  class="params" id="longBreak" value = "15" onblur="writeLongBreak()" ></input>
                        </div>
                        <div class="col-md-4">
                          <button class="btn btn-default btnIncDec" id="longInc">+</button>
                        </div>
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
              <p id="pomoCount">Pomodori Rimanenti: 0</p>
              <p id="timeEstimated"> </p>
              
                <div id = modalitaTaskRow>
                  <p id="modalitaTaskSwitch">
                    Attivare task? 
                    <label class="switch" data-on="ON" data-off="OFF">
                      <input type="checkbox" id = "customCheckbox" onclick="modalitaTask(); resetClock();">
                      <span class="slider round"></span>
                    </label>
                  </p>
                </div>
              <div id="innerContainer">
                <div id="newtask">
                  <div id="inputBox">
                    <div id="innerInputBox">
                      <div id = "inputRow">
                        <input type="text" placeholder="Add task title" id="taskFieldInput" onkeypress="handleKeyPress(event, 'add')" maxlength="35">
                        <input type="number" min="1"  id="pomoTaskNumber" value="1" label> 
                      </div>
                        <textarea id="taskNote" placeholder="Add a note..." " cols="40" rows="3" onkeypress="handleKeyPress(event, 'add')" maxlength="115" ></textarea>
                        <!-- Quanti Pomodori?<br> -->
                    </div>
                  </div>
                  <button id="push" onclick="addTask();">Add</button>
                </div>
                <br>
                <div id="taskTag">
                  <button name = "swapTasksButton" class = "roundBtnHomeTop" id="defaultOrderButton" disabled onclick="openSwapPopup()">
                    Swap tasks </button>
                    <button name = "reverseTasksButton" class = "roundBtnHomeTop" id="defaultOrderButton" disabled onclick="reverseTask();">
                      Reverse tasks </button>                           
                </div>
                <div class="bottomTag" id="taskTag">
                  <button name = "deleteAllTaskButton" class = "roundBtnHomeBottom" id="ButtonLeft" disabled onclick="deleteAllTask();">
                    Delete all tasks </button>  
                  <button name = "deleteEndedTaskButton" class = "roundBtnHomeBottom" id="ButtonRight" disabled onclick="deleteEndedTask();">
                    Delete ended tasks </button>  
                  <div id = "automatic-delete">
                  <label>
                    Automatic delete for ended tasks
                  </label>
                  <input type="checkbox" id="automaticDel" onclick="(function () {
                      delEnded=event.currentTarget.checked;
                    })()"> 
                  </div>  
                </divd>
              </div>
              <div id="tasks">
              </div>
              <div id="popupContainer"></div>
              <!-- Crea un elemento div per l'overlay > se lo vogliamo fare -->
              <div id="overlay"></div>
          </div>
        
        </div>
      </div>
      <div class="box">
      </div>
    </div>


<?php
if(isset($_SESSION['username'])){    
while ($tuple = pg_fetch_array($res, null, PGSQL_ASSOC)) {
    // Converte la tupla in una stringa JSON
    $tuple_json = json_encode($tuple);

    // Passa la tupla alla funzione JavaScript fillTask
    echo '<script>fillTaskList(' . $tuple_json . ')</script>';


}


echo '<script> fillTaskBox(); </script>';
}
?>

</body>  
</html>