

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
      }
    )  
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
    $("#start").on("click", function(){
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
          console.log(countTimes);
        } else {
          pos = posLama;
          $("#stats").html(pos);
        }
        count = countS;    
        clock.start();    
        $(this).text("PAUSE");
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
  });
  