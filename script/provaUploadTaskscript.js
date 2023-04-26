$(document).ready(function(){

  var countTimes = 0; 
  var countS = 25;
  $("#session").html(countS);
  var countB = 5;
  var countL = 15;
  $("#break").html(countB);
  $("#longBreak").html(countL);
  var pos = "Pomodoro";
  var countLama;
  var posLama;
  var count;
    $("#stats").html(pos);
    var clock = $(".timer").FlipClock(0, {
      countdown: true,
      clockFace: 'MinuteCounter',
      autoStart: false,
      callbacks: {
        interval: function(){
          if (clock.getTime() == 0 )
              if (pos == "Session"){
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
  //Variabili per le task:
  var taskOn = true;
  var taskList = [];
  
  $("#start").on("click", function(){
    if(clock.running){
      clock.stop();
      countLama = clock.getTime();
      posLama = $("#stats").html();
      $(this).text("START");
    } else {
      if (taskOn) {
        // esegui le task
        goTasks();
      } else {
        if (count != countS || clock.getTime()==0){
          clock.setTime(countS*60);
          countTimes++;
          pos="Session";
          $("#stats").html(pos)
          console.log(countTimes);
        } else {
          pos = posLama;
          $("#stats").html(pos);
        }
        count = countS;    
        clock.start();    
        $(this).text("PAUSE");
      }
    }
  });
  
  // implementa le funzioni stop e skip in modo simile
  
  function goTasks() {
    // scorri tutte le task
    for (var i = 0; i < taskList.length; i++) {
      var task = taskList[i];
      // esegui il numero di pomodori previsti per la task corrente
      for (var j = 0; j < task.pomodori; j++) {
        // esegui un pomodoro
        clock.setTime(countS*60);
        clock.start();
        pos="Session";
        $("#stats").html(pos)
        // attendi che il timer raggiunga lo zero
        while (clock.getTime() > 0) {}
        // esegui una pausa breve o lunga a seconda del numero di pomodori completati
        if ((j + 1) % 4 == 0) {
          clock.setTime(countL*60);
          clock.start();
          pos = "Long Break";
          $("#stats").html(pos);
        } else {
          clock.setTime(countB*60);
          clock.start();
          pos = "Short Break";
          $("#stats").html(pos);
        }
        // attendi che il timer raggiunga lo zero
        while (clock.getTime() > 0) {}
      }
    }
  }
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
      if (pos == "Session"){
        if(countTimes%4!=0){
        clock.setTime(countB*60);
        clock.start();
        pos = "Short Break";
        $("#stats").html(pos);}
        else{
          clock.setTime(countL*60);
          clock.start();
          pos = "Long Break";
          $("#stats").html(pos);          
        }
      } else if (pos == "Short Break" || pos=="Long Break"){
        countTimes++;
        clock.setTime(countS*60);
        clock.start();
        pos = "Session";
        $("#stats").html(pos);
      }
  });
  $("#clear").on("click", function(){
    clock.stop();
    pos = "Pomodoro";
    $("#stats").html(pos);
    clock.setTime(0);
    $('#start').text('START');
    countTimes=0;
    $("#session").html("25");
    $("#longBreak").html("15");
    $("#break").html("5");
  });
  $("#selectTaskArea").on("click","#push", function() {
    // ottieni il titolo della task dall'input dell'utente
    var title = JSON.stringify($("#taskFieldInput").value());
    console.log(title);
    // ottieni il numero di pomodori previsti per la task dall'input dell'utente
    var pomodori = parseInt($("#pomoTaskNumber").val());
    // crea una nuova task con i valori inseriti dall'utente
    var newTask = { title: title, pomodori: pomodori };
    // aggiungi la nuova task all'elenco delle task
    taskList.push(newTask);
    console.log(taskList[0].title);
  });
})