  //Variabili per le task:
  var taskOn = false;
  var taskList = [];
  //var countCurrPom =0;
  var clock;
  var countS;
  var countB;
  var countL;
  var countTimes = 0;
  var countIncS = 0;
  var countDecS = 0;
  var countIncB = 0;
  var countDecB = 0;
  var countIncL = 0;
  var countDecL = 0;
  var pos = "Pomodoro";
function resetClock() {
  clock.stop();
  pos = "Pomodoro";
  $("#stats").html(pos);
  clock.setTime(countS*60);
  $('#start').text('START');
  countTimes=0;
  document.title = "PomoChallenge";
}
$(document).ready(function(){

  countTimes = 0; 
  countS = 25;
  $("#session").html(countS);
  countB = 5;
  countL = 15;
  $("#break").html(countB);
  $("#longBreak").html(countL);
  //var pos = "Pomodoro";
  var countLama;
  var posLama;
  var count;
    $("#stats").html(pos);


  function checkCurrentTask() {

  if(taskList.length==1){
    taskList[0].donepomodori+=1;
    updateTaskTag(true,false);
    if (taskList[0].pomodori ==  taskList[0].donepomodori){
      alert("Finite tutte le task! Per riprenderne altre riattivare la modalità task!");
      taskList[0].donepomodori=0;
      index--;
      removeTaskItem();
      updateTaskTag(false,false);
      updateTaskButtons();
      var tmp=countTimes;
      //resetClock();
      document.getElementById("customCheckbox").checked=false;
      taskOn = false;
      countTimes=tmp;
      return true;
}}    if(taskList.length>0 && taskList.length!=1){
        taskList[0].donepomodori+=1;
        updateTaskTag(true,false);
        if (taskList[0].pomodori ==taskList[0].donepomodori){
          alert("Task Finita!");
          taskList[0].donepomodori=0;
          index--;
          removeTaskItem();
          updateTaskTag(false,false);
          updateTaskButtons();
          return true;
  }}  else 
    updateTaskTag(false,false);
    return false;
  
}
     clock = $(".timer").FlipClock(countS*60, {
      countdown: true,
      clockFace: 'MinuteCounter',
      autoStart: false,
      callbacks: {
        interval: function(){
          var isEnded;
          if (clock.getTime() == 0 ){
            $('#endDing')[0].play();
              if (pos == "Session"){
                if(taskOn)isEnded=checkCurrentTask();
                if(countTimes%4!=0){
                clock.setTime(countB*60);
                clock.start();
                pos = "Short Break";
                $("#stats").html(pos);
                if(taskOn && taskList.length>0)updateTaskTag(true,isEnded);
                else updateTaskTag(false,false);
              } else{
                clock.setTime(countL*60);
                clock.start();
                pos = "Long Break";
                $("#stats").html(pos);
                if(taskOn && taskList.length>0)updateTaskTag(true,isEnded);
      else updateTaskTag(false,false);
              } 
            } 
            else if (pos == "Short Break" || pos=="Long Break"){
              clock.setTime(countS*60);
              clock.start();
              pos = "Session";
              $("#stats").html(pos);
              if(taskOn && taskList.length>0)updateTaskTag(true,false);
              else updateTaskTag(false,false);
            }
            
          }     titleTimer(clock)   
        }}
      })

  
  $("#start").on("click", function(){
    if(taskOn && taskList.length>0)updateTaskTag(true,false);
    else updateTaskTag(false,false);
    if(clock.running){
      clock.stop();
      countLama = clock.getTime();
      posLama = $("#stats").html();
      $(this).text("START");
      document.title = "PomoChallenge";
    } else {
        if (count != countS || clock.getTime()==0){
          if(clock.getTime()< countS*60 || clock.getTime()>countS*60 && pos=="Session") clock.setTime(clock.getTime().time);
          else clock.setTime(countS*60);
          countTimes++;
          pos="Session";
          $("#stats").html(pos)
         // console.log(countTimes);
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
        console.log(countS);
        $("#session").html(countS);
        //console.log(clock.getTime().time);
        if(pos == "Session"){
          console.log("ci sei!");
          if(countIncS!=0) clock.setTime((clock.getTime().time)+61);
          else clock.setTime((clock.getTime().time)+60);
          countIncS++;
        }
        if(pos == "Pomodoro") clock.setTime(countS*60);
      }
    });
    
    $("#sessDec").on("click", function(){
      if ($("#session").html() > 1){
        countS = parseInt($("#session").html());
        countS-=1;
        $("#session").html(countS);
        if(pos== "Session"){
          if(countDecS!=0) clock.setTime((clock.getTime().time)-59);
          else clock.setTime((clock.getTime().time)-60);
          countDecS++;
        }
        if(pos == "Pomodoro") clock.setTime(countS*60);
      }
    });
    //BREAK
    $("#breakInc").on("click", function(){
      if ($("#break").html() > 0){
        countB = parseInt($("#break").html());
        countB+=1;
        $("#break").html(countB);
        if(pos == "Short Break"){
          if(countIncB!=0) clock.setTime((clock.getTime().time)+61);
          else clock.setTime((clock.getTime().time)+60);
          countIncB++;
        }
      }    
    });
    $("#breakDec").on("click", function(){
      if ($("#break").html() > 1){
        countB = parseInt($("#break").html());
        countB-=1;
        $("#break").html(countB);
        if(pos == "Short Break"){
          if(countDecB!=0) clock.setTime((clock.getTime().time)-59);
          else clock.setTime((clock.getTime().time)-60);
          countDecB++;
        }
      }
    });
     // LONG BREAK
    $("#longInc").on("click", function(){
      if ($("#longBreak").html() > 0){
        countL = parseInt($("#longBreak").html());
        countL+=1;
        $("#longBreak").html(countL);
        if(pos == "Long Break"){
          if(countIncL!=0) clock.setTime((clock.getTime().time)+61);
          else clock.setTime((clock.getTime().time)+60);
          countIncL++;
        }
      }    
    });
    $("#longDec").on("click", function(){
      if ($("#longBreak").html() > 1){
        countL = parseInt($("#longBreak").html());
        countL-=1;
        $("#longBreak").html(countL);
        if(pos == "Long Break"){
          if(countDecL!=0) clock.setTime((clock.getTime().time)-59);
          else clock.setTime((clock.getTime().time)-60);
          countDecL++;
        }
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
      else updateTaskTag(false,false);
    }
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
    console.log(clock.getTime().time);
    countB=5;
    countL=15;
    countS=25;
    console.log(countS);
    updateTaskTag(false,false);
    clock.stop();
    pos = "Pomodoro";
    $("#stats").html(pos);
    clock.setTime(countS*60);
    $('#start').text('START');
    document.title="PomoChallenge";
    countTimes=0;
    $("#session").html("25");
    $("#longBreak").html("15");
    $("#break").html("5");
    
    //titleTimer(clock)
    
  });

})
