 
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
              <button type="button" class="taskOption" >
              </button>
            <div class="hiddenOption">
              <p>  Hello world!</p>
            </div>
            </div>
      `;
      document.getElementById("taskFieldInput").value="";
      var current_tasks = document.querySelectorAll(".delete");
      for(var i=0; i<current_tasks.length; i++){
          current_tasks[i].onclick = function(){
              this.parentNode.remove();
          }
      }

    var coll = document.getElementsByClassName("taskOption");
var i;
for (i = 0; i < coll.length;i++) {
  coll[i].addEventListener("click", function() {
    var taskBox = this.parentNode;
    //console.log(taskBox);
    var hiddenBox = this.nextElementSibling;
    //console.log(hiddenBox);
    if (hiddenBox.style.display === "block") {
        taskBox.classList.toggle("taskShowed");
        hiddenBox.style.display = "none";
    } else {
      hiddenBox.style.display = "block";
      //taskBox.height("100px");
      taskBox.classList.toggle("taskShowed");
    }
  });
}
  }
}