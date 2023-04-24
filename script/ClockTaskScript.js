let isTimerRunning = false;
let timeRemaining = 1500;
let timerInterval = null;
let currentTaskIndex = 0;
let remainingPomodoros = 0;
let tasks = [];
let pomodoroCount = 0;
let breakTime = 300;
let onBreak = false;

document.getElementById("push").addEventListener("click", function() {
    let todoText = document.getElementById("todoInput").value;
    let pomodoroCount = document.getElementById("pomodoroInput").value;
    let todoItem = document.createElement("li");
    todoItem.textContent = todoText + " (" + pomodoroCount + " pomodori)";
    document.getElementById("todoList").appendChild(todoItem);
    tasks.push({text: todoText, pomodoros: pomodoroCount});
    updateTotalRemainingPomodoros();
});

function updateTotalRemainingPomodoros() {
    let totalRemainingPomodoros = tasks.reduce((acc, task) => acc + parseInt(task.pomodoros), 0);
    document.getElementById("totalRemainingPomodoros").textContent = totalRemainingPomodoros;
}

function decreaseTotalRemainingPomodoros() {
    let totalRemainingPomodorosElement = document.getElementById("totalRemainingPomodoros");
    totalRemainingPomodorosElement.textContent = parseInt(totalRemainingPomodorosElement.textContent) - 1;
}

document.getElementById("startStopButton").addEventListener("click", function() {
    if (isTimerRunning) {
        clearInterval(timerInterval);
        isTimerRunning = false;
        document.getElementById("startStopButton").textContent = "Avvia";
    } else {
        if (remainingPomodoros === 0) {
            if (currentTaskIndex >= tasks.length) {
                alert("Tutte le task sono state completate!");
                return;
            }
            remainingPomodoros = tasks[currentTaskIndex].pomodoros;
            document.getElementById("remainingPomodoros").textContent = remainingPomodoros;
        }
        timerInterval = setInterval(function() {
            timeRemaining--;
            let minutes = Math.floor(timeRemaining / 60);
            let seconds = timeRemaining % 60;
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            document.getElementById("timeRemaining").textContent = minutes + ":" + seconds;

            if (timeRemaining === 0) {
                clearInterval(timerInterval);
                isTimerRunning = false;
                document.getElementById("startStopButton").textContent = "Avvia";
                if (!onBreak) {
                    alert("Tempo scaduto!");
                    decreaseTotalRemainingPomodoros();
                    pomodoroCount++;
                    if (pomodoroCount % 4 === 0) {
                        breakTime = 900;
                    } else {
                        breakTime = 300;
                    }
                    timeRemaining = breakTime;
                    onBreak = true;
                } else {
                    timeRemaining = 1500;
                    onBreak = false;
                }
                remainingPomodoros--;
                document.getElementById("remainingPomodoros").textContent=remainingPomodoros; 
                if (remainingPomodoros === 0) {
                    currentTaskIndex++;
                }
            }
        }, 1000);
        isTimerRunning=true; 
        document.getElementById("startStopButton").textContent="Interrompi"; 
    }
});

document.getElementById("skipButton").addEventListener("click", function() {
    clearInterval(timerInterval);
    isTimerRunning=false; 
    document.getElementById("startStopButton").textContent="Avvia"; 
    if (!onBreak) {
        decreaseTotalRemainingPomodoros();
        pomodoroCount++;
        if (pomodoroCount % 4 === 0) {
            breakTime=900; 
        } else {
            breakTime=300; 
        }
        timeRemaining=breakTime; 
        onBreak=true; 
        remainingPomodoros--;
        document.getElementById("remainingPomodoros").textContent=remainingPomodoros; 
        if (remainingPomodoros === 0) {
            currentTaskIndex++;
        }
    } else {
        timeRemaining=1500; 
        onBreak=false; 
    }
    let minutes=Math.floor(timeRemaining/60); 
    let seconds=timeRemaining%60; 
    if (seconds<10) {
        seconds="0"+seconds
    }
    document.getElementById("timeRemaining").textContent=minutes+":"+seconds; 
});