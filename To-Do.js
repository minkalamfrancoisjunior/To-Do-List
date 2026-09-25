const taskInput = document.getElementById("taskInput")
const addBtn = document.getElementById("addBtn")
const taskList = document.getElementById("taskList")
const counter = document.getElementById("counter")
let taches = []

function saveTasks(){
    localStorage.setItem("taches", JSON.stringify(taches))
}

function loadTasks(){
    const data = localStorage.getItem("taches")
    if(data){
        taches = JSON.parse(data)
    }
    renderTasks()
}

function renderTasks(){
    taskList.innerHTML =""
    taches.forEach(function(tache, index){
        const li = document.createElement("li")
        const span = document.createElement("span")
        const deleteBtn = document.createElement("button")
        const tachesRestantes = taches.filter(function(tache){
            return !tache.termine
        })
        counter.textContent = tachesRestantes.length + " " + "taches restantes"
        span.textContent = tache.texte
        if(tache.termine){
            span.classList.add("termine")
        }
        span.addEventListener("click", function(){
            tache.termine = !tache.termine
            saveTasks()
            renderTasks()
        })
        deleteBtn.textContent = "-"
        deleteBtn.addEventListener("click", function(){
            taches.splice(index, 1)
            saveTasks()
            renderTasks()
        })
        li.appendChild(span)
        li.appendChild(deleteBtn)
        taskList.appendChild(li)

    })
}

function ajouterTache(){
        const texte = taskInput.value.trim()
    if(texte === ""){
        return;
    }
    const nouvelleTache = {
        texte : texte,
        termine : false
    }
  taches.push(nouvelleTache)
  saveTasks()
  renderTasks()
  console.log(taches)
    // Vider l'input
    taskInput.value =""

}

addBtn.addEventListener("click", function(){
   ajouterTache()
})

taskInput.addEventListener("keydown", function(){
    if(event.key === "Enter"){
        ajouterTache()
    }
})

loadTasks()
