function convertMinHour(minutes) {
    let hours = Math.floor(minutes / 60);
    let remainingMinutes = minutes % 60;
    return `${hours} h : ${remainingMinutes} m`;
}
function openProfilePopUp() {
    const url = "../server/getProfile.php";
    const httpRequest = new XMLHttpRequest();
    httpRequest.open("GET", url, true);
    httpRequest.setRequestHeader('Content-Type', 'application/json');
    httpRequest.onreadystatechange = function() {
      if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        const response = JSON.parse(httpRequest.responseText);
        if ('error' in response) {
          reject(response.error);
        } else {
          console.log(response);
          
        }
      }
    }
    httpRequest.send();
//     <div class="overlay" id="profileOverlay">
//     <div class = "popup" id="infoPop">
//       <p>
//         "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit 
//       </p>
//       <span class = "close" id="infoClose" onclick="closeInfo()">
//         X
//       </span>
//     </div>
//   </div>
    // var overlay = document.getElementById("infoOverlay");
    // var computedStyle = window.getComputedStyle(overlay);
    // overlay.style.display = "block";
}  
  function closeInfo() {
    document.getElementById("infoOverlay").style.display="none";
  }