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