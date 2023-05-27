function convertMinHour(minutes) {
    let hours = Math.floor(minutes / 60);
    let remainingMinutes = minutes % 60;
    return `${hours} h : ${remainingMinutes} m`;
}
function openProfilePopUp(e) {
    var box = e.currentTarget.parentNode;
    var name = box.getAttribute("data-value");
    const url = "../server/getProfile.php";
    $.ajax({
        url: url,
        type: "POST",
        data: { profile:name },
        success: function(result) {
            // Aggiornamento eseguito con successo
            var path = JSON.parse(result)[0];
            var tim = convertMinHour(JSON.parse(result)[1]);
            document.body.insertAdjacentHTML('beforeend', `
            <div class="overlay" id="profileOverlay">
            <div class="popup">
            <img class="profilePic" src=${path}></img>
                    <p>
                        Username: ${name}
                    </p>
                    <p>
                        Ore studio : ${tim}
                    </p>
                    <span class = "close" id="infoClose" onclick="closePopUp()">
                    X
                  </span>
                </div></div>
                 `
                );
             document.getElementById("profileOverlay").style.display="block";   
        },
        error: function(xhr, status, error) {
            // Errore nell'aggiornamento
            console.error(error);
        }
    });
}  
  function closePopUp() {
    document.getElementById("profileOverlay").remove();
  }
  function handleKeyPress(event, string) {
    if (event.key === "Enter") {
        event.preventDefault();
        // esegui qui le azioni quando l'utente preme il tasto "Invio"
        // ad esempio, puoi leggere il valore del campo di input e aggiungere il compito a una lista
        if(string== 'add') {
          document.getElementById("push").click();
        }
        else if(string == 'option') {
          var field = event.currentTarget;
          var optionBtn = field.nextElementSibling.nextElementSibling;
          showOption({currentTarget: optionBtn});
        }
        else if(string =='addFriend'){
            sendRequest();
        }
        else
            return;
    }
  }