  //Variabili per le task:
  var taskOn = false;
  var taskList = [];
  var countCurrPom =0;
  var clock;
  var countS;
  var countB;
  var countL;
function resetClock() {
  clock.stop();
  pos = "Pomodoro";
  $("#stats").html(pos);
  clock.setTime(0);
  $('#start').text('START');
  countTimes=0;
}
$(document).ready(function(){

  var countTimes = 0; 
  countS = 25;
  $("#session").html(countS);
  countB = 5;
  countL = 15;
  $("#break").html(countB);
  $("#longBreak").html(countL);
  var pos = "Pomodoro";
  var countLama;
  var posLama;
  var count;
    $("#stats").html(pos);


  function checkCurrentTask() {
    countCurrPom++;
    if(taskList.length>0){
      updateTaskTag(true,false);
      if (taskList[0].pomodori == countCurrPom){
      alert("Task Finita!");
        countCurrPom=0;
        index--;
        removeTaskItem();
        updateTaskTag(false,false);
        updateTaskButtons();
        return true;
  }}

  else 
    updateTaskTag(false,false);
    return false;
  
}
     clock = $(".timer").FlipClock(0, {
      countdown: true,
      clockFace: 'MinuteCounter',
      autoStart: false,
      callbacks: {
        interval: function(){
          if (clock.getTime() == 0 )
              if (pos == "Session"){
                if(taskOn)checkCurrentTask();
                if(countTimes%4!=0){
                clock.setTime(countB*60);
                clock.start();
                pos = "Short Break";
                $("#stats").html(pos);
              } else{
                clock.setTime(countL*60);
                clock.start();
                pos = "Long Break";
                $("#stats").html(pos);
              } 
            } 
            else if (pos == "Short Break" || pos=="Long Break"){
              clock.setTime(countS*60);
              clock.start();
              pos = "Session";
              $("#stats").html(pos);
            }
          }        
        }
      })

  
  $("#start").on("click", function(){
    if(taskOn && taskList.length>0)updateTaskTag(true,false);
    else updateTaskTag(false,false);
    if(clock.running){
      clock.stop();
      countLama = clock.getTime();
      posLama = $("#stats").html();
      $(this).text("START");
    } else {
        if (count != countS || clock.getTime()==0){
          clock.setTime(countS*60);
          countTimes++;
          pos="Session";
          $("#stats").html(pos)
         // console.log(countTimes);
        } else {
          pos = posLama;
          $("#stats").html(pos);
        }
        if(!(taskOn && taskList.length == 0)){
          count = countS;    
          clock.start();    
          $(this).text("PAUSE");
        }
        else{
          alert("Non hai ancora inserito task!");
          //clock.stop();
        }
    }
  });
  
     //SESSION
     $("#sessInc").on("click", function(){
      if ($("#session").html() > 0){
        countS = parseInt($("#session").html());
        countS+=1;
        $("#session").html(countS);
        //clock.setTime(countS*60);
      }
    });
    
    $("#sessDec").on("click", function(){
      if ($("#session").html() > 1){
        countS = parseInt($("#session").html());
        countS-=1;
        $("#session").html(countS);
        //clock.setTime(countS*60);
      }
    });
    //BREAK
    $("#breakInc").on("click", function(){
      if ($("#break").html() > 0){
        countB = parseInt($("#break").html());
        countB+=1;
        $("#break").html(countB);
      }    
    });
    $("#breakDec").on("click", function(){
      if ($("#break").html() > 1){
        countB = parseInt($("#break").html());
        countB-=1;
        $("#break").html(countB);
      }
    });
     // LONG BREAK
    $("#longInc").on("click", function(){
      if ($("#longBreak").html() > 0){
        countL = parseInt($("#longBreak").html());
        countL+=1;
        $("#longBreak").html(countL);
      }    
    });
    $("#longDec").on("click", function(){
      if ($("#longBreak").html() > 1){
        countL = parseInt($("#longBreak").html());
        countL-=1;
        $("#longBreak").html(countL);
      }
    });
  
    $("#skip").on("click", function(){
      var isEnded;
      if (pos == "Session"){
        if(taskOn)isEnded=checkCurrentTask();
        if(countTimes%4!=0){
        clock.setTime(countB*60);
        clock.start();
        pos = "Short Break";
        $("#stats").html(pos);      
      if(taskOn && taskList.length>0)updateTaskTag(true,isEnded);
      else updateTaskTag(false,false);}
        else{
          clock.setTime(countL*60);
          clock.start();
          pos = "Long Break";
          $("#stats").html(pos);   
          if(taskOn && taskList.length>0)updateTaskTag(true,isEnded);
          else updateTaskTag(false,false);       
        }
      } else if (pos == "Short Break" || pos=="Long Break"){
        countTimes++;
        clock.setTime(countS*60);
        clock.start();
        pos = "Session";
        $("#stats").html(pos);
        if(taskOn && taskList.length>0)updateTaskTag(true,false);
        else updateTaskTag(false,false);
      }
  });
  $("#clear").on("click", function(){
    updateTaskTag(false,false);
    clock.stop();
    pos = "Pomodoro";
    $("#stats").html(pos);
    clock.setTime(0);
    $('#start').text('START');
    countTimes=0;
    $("#session").html("25");
    $("#longBreak").html("15");
    $("#break").html("5");
    countB=5;
    countL=15;
    countS=25;
  });

})
