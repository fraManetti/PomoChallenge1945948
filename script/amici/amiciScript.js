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

function delReq(e) {
    var button = e.currentTarget;
    var req = button.parentNode.getAttribute("data-value");
    button.parentNode.remove();
    $.ajax({
        url: "../scripts/updateAmici.php",
        type: "POST",
        data: {amico: req,type: "delReq"},
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
            <button class ="delReq" onClick="delReq(event);"> delete</button>
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
// function updateOutgoing() {
//     var httpRequest = new XMLHttpRequest();
//     httpRequest.open("GET", url, true);
//     httpRequest.setRequestHeader('Content-Type', 'application/json');
//     httpRequest.onreadystatechange = function() {
//       if (httpRequest.readyState === 4 && httpRequest.status === 200) {
//         var response = JSON.parse(httpRequest.responseText);
//         if ('error' in response) {
//           console.log(response.error);
//         } else {
//             response.forEach(function(tuple) {
//               downloadEnded(tuple);
//               totalTime+= tuple.time;
//           });
//           upTotalTime(totalTime);
//         }
//       }
//     };
//     httpRequest.send();
// }