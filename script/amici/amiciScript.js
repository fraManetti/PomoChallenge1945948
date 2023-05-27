function acceptIncomingReq(e) {
    var button = e.currentTarget;
    var amico = button.parentNode.getAttribute("data-value");
    button.parentNode.remove();
    $.ajax({
        url: "../server/updateAmici.php",
        type: "POST",
        data: {amico: amico,type: "acceptReq"},
        success: function(result) {
            // Aggiornamento eseguito con successo
            console.log(result);
        },
        error: function(xhr, status, error) {
            // Errore nell'aggiornamento
            console.error(error);
        }
    });
    document.querySelector("#amiciBox").insertAdjacentHTML('beforeend', `
    <div class="utente amico" data-value=${amico}>
        <div class="nomeAmico">${amico}</div>
        <button class ="largeButton largeWhiteButton visitaProfiloButton" onClick="openProfilePopUp(event)">Profilo</button>
        <button class = "largeButton largeRedButton delAmico" id="delete-friend-button" onClick = delAmico(event);>Rimuovi</button>
    </div>
`)
}
function delAmico(e) {
    var button = e.currentTarget;
    var amico = button.parentNode.getAttribute("data-value");
    button.parentNode.remove();
    $.ajax({
        url: "../server/updateAmici.php",
        type: "POST",
        data: {amico: amico,type: "delAmico"},
        success: function(result) {
            // Aggiornamento eseguito con successo
            console.log(result);
        },
        error: function(xhr, status, error) {
            // Errore nell'aggiornamento
            console.error(error);
        }
    });
}

function delOutgoingReq(e) {
    var button = e.currentTarget;
    var req = button.parentNode.getAttribute("data-value");
    button.parentNode.remove();
    $.ajax({
        url: "../server/updateAmici.php",
        type: "POST",
        data: {amico: req,type: "delOutgoingReq"},
        success: function(result) {
            // Aggiornamento eseguito con successo
            console.log(result);
        },
        error: function(xhr, status, error) {
            // Errore nell'aggiornamento
            console.error(error);
        }
    });

}
function delIncomingReq(e) {
    var button = e.currentTarget;
    var req = button.parentNode.getAttribute("data-value");
    button.parentNode.remove();
    $.ajax({
        url: "../server/updateAmici.php",
        type: "POST",
        data: {amico: req,type: "delIncomingReq"},
        success: function(result) {
            // Aggiornamento eseguito con successo
            console.log(result);
        },
        error: function(xhr, status, error) {
            // Errore nell'aggiornamento
            console.error(error);
        }
    });
}
function downloadAmici(amico) {
    document.querySelector("#amiciBox").insertAdjacentHTML('beforeend', `
        <div class="utente amico" data-value=${amico}>
            <div class="nomeAmico">${amico}</div>
            <button class="largeButton largeWhiteButton visitaProfiloButton" onClick="openProfilePopUp(event)">Profilo</button>
            <button class = "largeButton largeRedButton delAmico" id = "delete-friend-button" onClick = delAmico(event);> Rimuovi </button>
        </div>
    `)
}
//Funzione per aggiungere amico cliccando sul bottone aggiungi
function addFriend(e) {
    var friendToAdd = e.currentTarget.parentNode.getAttribute("data-value");
        $.ajax({
        url: "../server/updateAmici.php",
        type: "POST",
        data: {amico: friendToAdd,type: "reqAmico"},
        success: function(result) {
            // Aggiornamento eseguito con successo
            if(result.trim()!="")
                alert(result.trim());
            console.log(result);
        },
        error: function(xhr, status, error) {
            // Errore nell'aggiornamento
            console.error(error);
        }
    });
    document.querySelector("#outgoingR").insertAdjacentHTML('beforeend', `
        <div class="utente outgoingReq" data-value = ${friendToAdd}>
            <div class="nomeAmico">${friendToAdd}</div>
            <div></div>
            <button class ="largeButton largeRedButton delOutgoingReq" onClick="delOutgoingReq(event);"> Annulla</button>
            </div>
    `)}

//Funzione per inviare richieste di amicizia dalla barra
function sendRequest() {
    var friendToAdd = document.getElementById("search").value;
    if(friendToAdd!=''){
        $.ajax({
        url: "../server/updateAmici.php",
        type: "POST",
        data: {amico: friendToAdd,type: "reqAmico"},
        success: function(result) {
            // Aggiornamento eseguito con successo
            if(result.trim()!=""){
                alert(result.trim());
                document.getElementById("search").value="";
            }
            else{
                    document.getElementById("search").value="";
    document.querySelector("#outgoingR").insertAdjacentHTML('beforeend', `
        <div class="utente outgoingReq" data-value = ${friendToAdd}>
            <div class="nomeAmico">${friendToAdd}</div>
            <div></div>
            <button class ="largeButton largeRedButton delOutgoingReq" onClick="delOutgoingReq(event);"> Annulla</button>
            </div>
    `)
            }
        },
        error: function(xhr, status, error) {
            // Errore nell'aggiornamento
            console.error(error);
        }
    });
    

    }
}
function downloadIncomingRequest(amico) {
    document.querySelector("#incomingR").insertAdjacentHTML('beforeend', `
        <div class="utente incomingReq" data-value=${amico}>
            <div class="nomeAmico">${amico}</div>
            <button class = "roundRedButton acceptIncomingReq" onClick = acceptIncomingReq(event);>&#10004;</button>
            <button class = "roundRedButton delIncomingReq" onClick = delIncomingReq(event);>x</button>
        </div>
    `)
}
function downloadSuggAmici(tuple) {
    
    document.querySelector("#suggested").insertAdjacentHTML('beforeend', `
    <div class ="utente suggAmico" data-value =${tuple.utentea}>    
    <div class="nomeAmico">${tuple.utentea}</div>
    <button class ="largeButton largeWhiteButton visitaProfiloButton" onClick="openProfilePopUp(event)">Profilo</button>
    <button class="roundRedButton sendRequestButton" onClick="addFriend(event);">+</button>
    </div>
`)
}
function downloadOutgoingRequest(amico) {
    document.querySelector("#outgoingR").insertAdjacentHTML('beforeend', `
        <div class="utente outgoingReq" data-value=${amico}>
            <div class="nomeAmico">${amico}</div>
            <div></div>
            <button class = "largeButton largeRedButton delOutgoingReq" onClick = delOutgoingReq(event);>Annulla</button>
        </div>
    `)}