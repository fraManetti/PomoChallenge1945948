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
    <link rel="stylesheet" href="../style/reportStyle/reportStyle.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/css/flag-icon.min.css"  crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js'></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@4.3.0/dist/chart.umd.min.js"></script>
    <script  src="../script/reportScript/reportScript.js"></script>
    <script src="../bootstrap/dist/js/bootstrap.bundle.min.js" ></script>
    <script>
        $(function(){
            $("#mynavbar").load("../model/newNavbar.html");
        });
    </script>
        
</head>
<body>

<?php 
    $cookie = $_SESSION["username"]; 
    $data_corrente = date('d-m-Y');
    //$data_corrente = '27-08-2004';
    $query = "select keyhash, title, pomodori, note, dat,tim from endedtask where endedtask.username = '{$cookie}' and endedtask.dat = '{$data_corrente}'";
    $res = pg_query($db_conn, $query);
   
    
 ;?>
    
    <div class="navbar" id="mynavbar"></div>
    <div class="container">
        <div id = "reportPanel">
            
                <div id = "selectDatePanel">
                    <button class = "tabClass active" id ="dailyButton" onclick="load('daily', event)">
                        Daily
                    </button>
                    <button class = "tabClass" id ="weeklyButton" onclick="load('weekly', event)">
                        Weekly
                    </button>
                    <button class = "tabClass" id ="monthlyButton" onclick="load('monthly', event)">
                        Monthly
                    </button>
                    <button class = "tabClass" id ="allButton" onclick="load('all', event)">
                        All
                    </button>
                </div>
                <div id ="currentPeriod"> 
                    <?php echo $data_corrente; ?> <br>
                </div>
                <div id ="totalTime"> 
                
                </div>
                <div id = "innerPanel">
                    <div class = "incrDecrBtnPanel">
                        <button class = "timePeriodBtn" id = "decreaseTimePeriod" onclick="decrease()" onmousedown="startInterval('-')" onmouseup="stopInterval()">
                            -
                        </button>
                    </div>
                    <div id = "tasksPanel">
                    </div>
                    <div class = incrDecrBtnPanel>
                        <button class = "timePeriodBtn" id = "increaseTimePeriod" onclick="increase()" onmousedown="startInterval('+')" onmouseup="stopInterval()">
                            +
                        </button>
                    </div>
                </div>

        </div>
        <div id = chartPanel>
            
            <div id = canvasPanel>
                <canvas id="myChartCanvas"></canvas>
            </div>
        </div>
    </div>
    
<?php 
    
    while ($tuple = pg_fetch_array($res, null, PGSQL_ASSOC)) {
     $tuple_json = json_encode($tuple);
    echo '<script> 
    currentPeriodType = "day";
    downloadEnded(' . $tuple_json . ');
    </script>';
    }
    echo '<script>
        hourCharts();
       upTotalTime(totalTime);
    </script>';
?>
</body>
</html>

