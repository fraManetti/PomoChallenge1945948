//#################################################################
//##########             VARIABILI:                  ##############
//#################################################################
 var taskList = [];
 var taskOn = false;
 var clock;
 var count;
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
 var countWS = 0;
 var countWB = 0;
 var countWL = 0;
 var pos = "Pomodoro";
 var clockManaged =false;

//#################################################################
//##########             FUNZIONI AUSILIARIE:        ##############
//#################################################################

 /*Funzione per controllare se devo aggiornare il tempo stimato in corrispondenza della modifica delle durate di Session/Short Break/Long Break*/
 function checkTimeUp() {
  if(taskOn && clock.running)
    updateTaskTag(true,false);
 }

/*Nota: nel seguente codice abbiamo adottato degli accorgimenti per compensare la perdita di 1 secondo registrata all'invocazione della funzione
        getTime() della libreria FlipClock utilizzata per l'orologio.
*/

 /*Funzione per scrivere da tastiera la durata del Pomodoro personalizzata*/
 function writeSession(){
   var oldTime = countS*60;
   var sessLeng = document.getElementById("session").value;
   if(sessLeng>99 || sessLeng<1){
    alert("Inserire un valore <99 e >1 !");
    document.getElementById("session").value=25;
    return;
   }
   countS = sessLeng;
   if(countS>oldTime){
   var delta = countS*60 - oldTime;
   
   count=countS;
   
   var newTime = clock.getTime().time + delta;
   
   if(countWS!=0 && pos=="Session") {
     clock.setTime(newTime+1);
   }
   else if(countWS==0 && pos=="Session"){
     clock.setTime(newTime);
   }
   if(pos == "Pomodoro") clock.setTime(countS*60);
   }
   else{
     var delta = oldTime-countS*60;
     
     count=countS;
    
     var newTime = clock.getTime().time - delta;
     
     if(countWS!=0 && pos=="Session") clock.setTime(newTime+1);
     else if(countWS==0 && pos=="Session"){clock.setTime(newTime);}
     if(pos == "Pomodoro") clock.setTime(countS*60);
   }
   countWS++;
   clockManaged=true;
   checkTimeUp();
 }
 
  /*Funzione per scrivere da tastiera la durata della Short Break personalizzata*/
 function writeShortBreak(){
  oldBreak = countB*60; 
  var shortLeng = document.getElementById("break").value; 
  if(shortLeng>99 || shortLeng<1){
   alert("Inserire un valore <99 e >1 !");
   document.getElementById("break").value=5;
   return;
  }   
  countB = shortLeng; 
  var delta = 0;
  var newTime = 0;

  if(countB>oldBreak){
    delta = countB*60 - oldBreak;
    newTime = clock.getTime().time + delta;
  }
  else{
      delta = oldBreak-countB*60;
      newTime = clock.getTime().time - delta;
  }
    
    if(pos=="Short Break") {
      clock.setTime(newTime+1);
    }
  checkTimeUp();
}

  /*Funzione per scrivere da tastiera la durata della Long Break personalizzata*/
 function writeLongBreak(){
   oldLong = countL*60;
   var longLeng = document.getElementById("longBreak").value;
   if(longLeng>99 || longLeng<1){
    alert("Inserire un valore <99 e >1 !");
    document.getElementById("longBreak").value=15;
    return;
   }      countL = longLeng;
   if(countL>oldBreak){
     var delta = countL*60 - oldLong;
     
     var newTime = clock.getTime().time + delta;
     
     if(countWL!=0 && pos=="Long Break") clock.setTime(newTime+1);
     else if(countWL==0 && pos=="Long Break"){clock.setTime(newTime+1);}
   }
   else{
     var delta = oldLong-countL*60;
     
     var newTime = clock.getTime().time - delta;
     
     if(countWL!=0 && pos=="Long Break") clock.setTime(newTime+1);
     else if(countWL==0 && pos=="Long Break"){clock.setTime(newTime+1);}
   }
   countWL++;
   checkTimeUp();

 }

/*Funzione per resettare orologio nella configurazione standard*/
function resetClock() {
  clockManaged=true;
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
 $("#session").val(countS);
 countB = 5;
 countL = 15;
 $("#break").val(countB);
 $("#longBreak").val(countL);
 var countLama;
 var posLama;
   $("#stats").html(pos);


  /*Funzione che gestisce lo stato delle task in relazione allo stato dell'orologio*/
  function checkCurrentTask() {

  if(taskList.length==1){
    taskList[0].donepomodori+=1;
    taskList[0].tim += Math.floor(JSON.parse(countS -(clock.getTime()/60)));
    var task =taskList[0];
    task.index=1;
    updateTaskTag(true,false);
    if (taskList[0].pomodori ==  taskList[0].donepomodori){
        clock.stop();
            alert("Finite tutte le task! Per riprenderne altre riattivare la modalità task!");

      taskList[0].donepomodori=0;
      index--;
      removeTaskItem();
      updateTaskTag(false,false);
      updateTaskButtons();
      var tmp=countTimes;
	  modalitaTask();
      setButtonState();  
      countTimes=tmp;
      return true;
} else 
      updateServer(task,"UP");

}    if(taskList.length>0 && taskList.length!=1){
        taskList[0].donepomodori+=1;
        taskList[0].tim += JSON.parse(countS-(clock.getTime()/60)); 
        var task =taskList[0];
        task.index=1;
        updateServer(task,"UP");
        updateTaskTag(true,false);
        if (taskList[0].pomodori ==taskList[0].donepomodori){
          clock.stop();
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

/*Inizializzazione dei timer a seconda dello stato attuale del Pomodoro (Session, Short Break o Long Break)*/
clock = $(".timer").FlipClock(sessionStorage.getItem("clockTime")!=null?sessionStorage.getItem("clockTime"):countS*60, {
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


  /*Gestione dei click sul tasto START*/
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
       
        if (count != countS || clock.getTime()==countS*60-1){
          
          if(clock.getTime()< countS*60 || clock.getTime()>countS*60 && pos=="Session") clock.setTime(clock.getTime().time);
          else clock.setTime(countS*60);
          countTimes++;
         
          pos="Session";
          $("#stats").html(pos)
       
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
        }
    }
  });

 //Gestione degli incrementi della durata di Session cliccando sul tasto +
 $("#sessInc").on("click", function(){
  
  if ($("#session").val() > 0){
    clockManaged=true;
    countS = parseInt($("#session").val());
    countS+=1;
    count+=1;
    
    $("#session").val(countS);
    
    if(pos == "Session"){
      
      if(countIncS!=0) clock.setTime((clock.getTime().time)+61);
      else clock.setTime((clock.getTime().time)+60);
      countIncS++;
    }
    if(pos == "Pomodoro") clock.setTime(countS*60);
  }
  checkTimeUp();
});

 //Gestione dei decrementi della durata di Session cliccando sul tasto -
$("#sessDec").on("click", function(){
  if ($("#session").val() > 1){
    clockManaged=true;
    countS = parseInt($("#session").val());
    countS-=1;
    count-=1;
    $("#session").val(countS);
    if(pos== "Session"){
      if(countDecS!=0) clock.setTime((clock.getTime().time)-59);
      else clock.setTime((clock.getTime().time)-60);
      countDecS++;
    }
    if(pos == "Pomodoro") clock.setTime(countS*60);
  }
  checkTimeUp();
});

 //Gestione degli incrementi della durata di Short Break cliccando sul tasto +

$("#breakInc").on("click", function(){
  if ($("#break").val() > 0){
    countB = parseInt($("#break").val());
    countB+=1;
    $("#break").val(countB);
    if(pos == "Short Break"){
      if(countIncB!=0) clock.setTime((clock.getTime().time)+61);
      else clock.setTime((clock.getTime().time)+60);
      countIncB++;
    }
  }    
  checkTimeUp();
});

 //Gestione dei decrementi della durata di Short Break cliccando sul tasto -

$("#breakDec").on("click", function(){
  if ($("#break").val() > 1){
    countB = parseInt($("#break").val());
    countB-=1;
    $("#break").val(countB);
    if(pos == "Short Break"){
      if(countDecB!=0) clock.setTime((clock.getTime().time)-59);
      else clock.setTime((clock.getTime().time)-60);
      countDecB++;
    }
  }
  checkTimeUp();
});

  //Gestione degli incrementi della durata di Long Break cliccando sul tasto +

 $("#longInc").on("click", function(){
  if ($("#longBreak").val() > 0){
    countL = parseInt($("#longBreak").val());
    countL+=1;
    $("#longBreak").val(countL);
    if(pos == "Long Break"){
      if(countIncL!=0) clock.setTime((clock.getTime().time)+61);
      else clock.setTime((clock.getTime().time)+60);
      countIncL++;
    }
  }  
  checkTimeUp();  
});

  //Gestione dei decrementi della durata di Long Break cliccando sul tasto -

$("#longDec").on("click", function(){
  if ($("#longBreak").val() > 1){
    countL = parseInt($("#longBreak").val());
    countL-=1;
    $("#longBreak").val(countL);
    if(pos == "Long Break"){
      if(countDecL!=0) clock.setTime((clock.getTime().time)-59);
      else clock.setTime((clock.getTime().time)-60);
      countDecL++;
    }
  }
  checkTimeUp();
});

// Gestione del click sul tasto SKIP
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

// Gestione del click sul tasto CLEAR
$("#clear").on("click", function(){
countB=5;
countL=15;
countS=25;
sessionStorage.clear();
clockManaged=true;

updateTaskTag(false,false);
clock.stop();
pos = "Pomodoro";
$("#stats").html(pos);
clock.setTime(countS*60);
$('#start').text('START');
document.title="PomoChallenge";
countTimes=0;
$("#session").val("25");
$("#longBreak").val("15");
$("#break").val("5");


});
})
