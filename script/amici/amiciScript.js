function acceptIncomingReq(e) {
    var button = e.currentTarget;
    var amico = button.parentNode.getAttribute("data-value");
    button.parentNode.remove();
    $.ajax({
        url: "updateAmici.php",
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
    <div class="amico" data-value=${amico}>
        ${amico}
        <button class ="visitaProfiloButton">Profilo</button>
        <button class = "delAmico" id="delete-friend-button" onClick = delAmico(event);>Rimuovi</button>
    </div>
`)
}
function delAmico(e) {
    var button = e.currentTarget;
    var amico = button.parentNode.getAttribute("data-value");
    button.parentNode.remove();
    $.ajax({
        url: "updateAmici.php",
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
        url: "updateAmici.php",
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
        url: "updateAmici.php",
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
        <div class="amico" data-value=${amico}>
            ${amico}
            <button class="visitaProfiloButton">Profilo</button>
            <button class = "delAmico" id = "delete-friend-button" onClick = delAmico(event);> Rimuovi </button>
        </div>
    `)
}
function addFriend(e) {
    var friendToAdd = e.currentTarget.parentNode.children[0].getAttribute("data-value");
        $.ajax({
        url: "updateAmici.php",
        type: "POST",
        data: {amico: friendToAdd,type: "reqAmico"},
        success: function(result) {
            // Aggiornamento eseguito con successo
            console.log(result);
        },
        error: function(xhr, status, error) {
            // Errore nell'aggiornamento
            console.error(error);
        }
    });
    document.querySelector("#outgoingR").insertAdjacentHTML('beforeend', `
        <div class="outgoingReq" data-value = ${friendToAdd}>
            ${friendToAdd}
            <button class ="delOutgoingReq" onClick="delOutgoingReq(event);"> Annulla</button>
            </div>
    `)}
function sendRequest() {
    var friendToAdd = document.getElementById("search").value;
    if(friendToAdd!=''){
    console.log(friendToAdd+"stringa");
        $.ajax({
        url: "updateAmici.php",
        type: "POST",
        data: {amico: friendToAdd,type: "reqAmico"},
        success: function(result) {
            // Aggiornamento eseguito con successo
            console.log(result);
        },
        error: function(xhr, status, error) {
            // Errore nell'aggiornamento
            console.error(error);
        }
    });
    
    document.getElementById("search").value="";
    document.querySelector("#outgoingR").insertAdjacentHTML('beforeend', `
        <div class="outgoingReq" data-value = ${friendToAdd}>
            ${friendToAdd}
            <button class ="delOutgoingReq" onClick="delOutgoingReq(event);"> Annulla</button>
            </div>
    `)
    }
}
function downloadIncomingRequest(amico) {
    document.querySelector("#incomingR").insertAdjacentHTML('beforeend', `
        <div class="incomingReq" data-value=${amico}>
            ${amico}
            <button class = "acceptIncomingReq" onClick = acceptIncomingReq(event);>&#10004;</button>
            <button class = "delIncomingReq" onClick = delIncomingReq(event);>x</button>
        </div>
    `)
}
function downloadSuggAmici(tuple) {
    
    document.querySelector("#suggested").insertAdjacentHTML('beforeend', `
        <div class ="suggAmico" data-value =${tuple.utentea}>    
    <span data-value=${tuple.utentea} >${tuple.utentea}</span>
    <button class ="visitaProfiloButton" >Profilo</button>
    <button class="sendRequestButton" onClick="addFriend(event);">+</button>
    </div>
`)
}
function downloadOutgoingRequest(amico) {
    document.querySelector("#outgoingR").insertAdjacentHTML('beforeend', `
        <div class="outgoingReq" data-value=${amico}>
            ${amico}
            <button class = "delOutgoingReq" onClick = delOutgoingReq(event);>Annulla</button>
        </div>
    `)}