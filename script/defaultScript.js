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