function updateTaskBox (taskItems,  cond){
  if (!cond){
    taskItems[1].setAttribute("readonly","readonly");
    taskItems[2].setAttribute("readonly","readonly");

  }
  else{
    taskItems[1].removeAttribute("readonly");
    taskItems[2].removeAttribute("readonly");

  }
}



function addTask(){
    if(document.querySelector('#newtask input').value.length == 0){
      alert("Kindly Enter Task Name!!!!")
  }else{
    const xElements = document.getElementsByClassName("x");
    const inputValues = Array.from(xElements).map(element => element.value);
    var number= JSON.parse(document.getElementById("pomoTaskNumber").value);
      document.querySelector('#tasks').innerHTML += `
          <div  class="task">
              <button style='font-size:24px' class="delete">
              <i class="fa-solid fa-trash-can"></i>
                            </button>
              <input type="text" readOnly id="taskname" value=" ${document.querySelector('#newtask input').value}">
              <input type="number" value="" class="x" readonly  min="1">
              <button type="button" class="taskOption" >
              </button>
            <div class="hiddenOption">
            <textarea name="taskNote" id="" cols="40" rows="3" placeholder="updateNote">${document.getElementById("taskNote").value}</textarea>

            </div>
            </div>
      `;
          // recupera gli elementi `x` e li riempie con i valori precedentemente salvati
    const newXElements = document.getElementsByClassName("x");
    Array.from(newXElements).forEach((element, index) => {
      element.value = inputValues[index] || "";
    });

    // aggiunge il valore dell'attributo `value` dell'ultimo input creato all'array
    const lastXElement = newXElements[newXElements.length - 1];
    lastXElement.value = number;
      // var z =document.getElementsByClassName("x")
      // var y =document.getElementsByClassName("x").length;
      // z[y-1].value=JSON.parse(document.getElementById("pomoTaskNumber").value);
      document.getElementById("taskFieldInput").value="";
      document.getElementById("taskNote").value="";
      document.getElementById("pomoTaskNumber").value = "1";
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
    var taskItems =taskBox.children
    //console.log(taskBox);
    var hiddenBox = this.nextElementSibling;
    //console.log(hiddenBox);
    if (hiddenBox.style.display === "block") {
        taskBox.classList.toggle("taskShowed");
        hiddenBox.style.display = "none";
        updateTaskBox(taskItems,false);
    } else {
      hiddenBox.style.display = "block";
      //taskBox.height("100px");
      taskBox.classList.toggle("taskShowed");
      updateTaskBox(taskItems,true);
    }
  });
}
  }
}
