function taskOptions() {
    var current_tasks = document.querySelectorAll(".taskOption");
    // for(var i=0; i<current_tasks.length; i++){
    //     current_tasks[i].onclick = function(){
    //         this.parentNode.hiddenOption.style.display="block";

    //     }
    // }
    for (var i=0; i<current_tasks.length; i++) {
        current_tasks[i].addEventListener("click", function() {
          //this.classList.toggle("active");
          var content = this.nextElementSibling;
          if (content.style.display === "block") {
            content.style.display = "none";
          } else {
            content.style.display = "block";
          }
        });
    }}
function addTask(){
    if(document.querySelector('#newtask input').value.length == 0){
      alert("Kindly Enter Task Name!!!!")
  }else{
      document.querySelector('#tasks').innerHTML += `
          <div class="task">
              <button class="delete">
                  <i class="far fa-trash-alt"></i>
              </button>
              <span id="taskname">
                  ${document.querySelector('#newtask input').value}
              </span>
              <span  >
              ${document.getElementById("pomoTaskNumber").value}</span>
              <button class="taskOption" onclick="taskOptions();">
              </button>
              </div>
            <br>
            <div class="hiddenOption">
                <div> Hello world!</div>
            </div>
      `;
      document.getElementById("taskFieldInput").value="";
      var current_tasks = document.querySelectorAll(".delete");
      for(var i=0; i<current_tasks.length; i++){
          current_tasks[i].onclick = function(){
              this.parentNode.remove();
          }
      }
  }
}