function acceptIncomingReq(e) {
    var button = e.currentTarget;
    var amico = button.parentNode.getAttribute("data-value");
    button.parentNode.remove();
    $.ajax({
        url: "../scripts/updateAmici.php",
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
        <button class = "delAmico" onClick = delAmico(event);></button>
    </div>
`)
}
function delAmico(e) {
    var button = e.currentTarget;
    var amico = button.parentNode.getAttribute("data-value");
    button.parentNode.remove();
    $.ajax({
        url: "../scripts/updateAmici.php",
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
        url: "../scripts/updateAmici.php",
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
        url: "../scripts/updateAmici.php",
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
            <button class = "delAmico" onClick = delAmico(event);></button>
        </div>
    `)
}
function addFriend(e) {
    var friendToAdd = e.currentTarget.parentNode.children[0].getAttribute("data-value");
        $.ajax({
        url: "../scripts/updateAmici.php",
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
    document.querySelector("#outgoing").insertAdjacentHTML('beforeend', `
        <div class="request" data-value = ${friendToAdd}>
            ${friendToAdd}
            <button class ="delReq" onClick="delOutgoingReq(event);"> delete</button>
            </div>
    `)}
function sendRequest() {
    var friendToAdd = document.getElementById("search").value;
    document.getElementById("search").value="";
        $.ajax({
        url: "../scripts/updateAmici.php",
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
    document.querySelector("#outgoing").insertAdjacentHTML('beforeend', `
        <div class="request" data-value = ${friendToAdd}>
            ${friendToAdd}
            <button class ="delReq" onClick="delOutgoingReq(event);"> delete</button>
            </div>
    `)
}
function downloadIncomingRequest(amico) {
    document.querySelector("#incoming").insertAdjacentHTML('beforeend', `
        <div class="incomingReq" data-value=${amico}>
            ${amico}
            <button class = "acceptIncomingReq" onClick = acceptIncomingReq(event);>accept</button>
            <button class = "delIncomingReq" onClick = delIncomingReq(event);>delete</button>
        </div>
    `)
}
function downloadSuggAmici(tuple) {
    document.querySelector("#suggBox").insertAdjacentHTML('beforeend', `
        <div class ="suggAmico" data-value =${tuple.utentea}>    
    <span data-value=${tuple.utentea} >${tuple.utentea}</span>
    <button class ="visitaProfiloButton" >profilo</button>
    <button class="sendRequestButton" onClick="addFriend(event);">+</button>
    </div>
`)
}
function downloadOutgoingRequest(amico) {
    document.querySelector("#outgoing").insertAdjacentHTML('beforeend', `
        <div class="outgoingReq" data-value=${amico}>
            ${amico}
            <button class = "delOutgoingReq" onClick = delOutgoingReq(event);>delete</button>
        </div>
    `)}
