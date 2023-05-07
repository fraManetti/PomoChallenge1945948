function fillTask(tuple) {
    console.log("ciao");
    var newTask = { key:tuple[0], title: tuple["title"], pomodori: tuple["pomodori"],note: tuple["note"],donepomodori: tuple["donepomodori"] };
    taskList.push(newTask); 
}