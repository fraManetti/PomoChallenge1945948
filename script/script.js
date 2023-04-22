// function taskOptions() {
//     var current_tasks = document.querySelectorAll(".taskOption");
//     for (var i=0; i<current_tasks.length; i++) {
//       current_tasks[i].addEventListener("click", function() {
//         this.classList.toggle("active"); // aggiunto
//         var content = this.nextElementSibling;
//         if (content.style.display === "block") {
//           content.style.display = "none";
//         } else {
//           content.style.display = "block";
//         }
//       });
//     }
//   }
  
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
              </div>
            <br>
            <div class="hiddenOption">
              <p>  Hello world!</p>
            </div>
      `;
      document.getElementById("taskFieldInput").value="";
      var current_tasks = document.querySelectorAll(".delete");
      for(var i=0; i<current_tasks.length; i++){
          current_tasks[i].onclick = function(){
              this.parentNode.remove();
          }
      }
    //   var current_tasks = document.querySelectorAll(".taskOption");
    //   for(var i=0; i<current_tasks.length; i++){
    //     current_tasks[i].onclick = function(){
    //          this.nextElementSibling.remove();
            
    //     }
    // }
    var coll = document.getElementsByClassName("taskOption");
var i;
for (i = 0; i < coll.length;i++) {
  console.log(i)
console.log(coll[i])
  coll[i].addEventListener("click", function() {
    //this.classList.toggle("active");
    console.log(i)
    console.log(coll);
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
  }
}