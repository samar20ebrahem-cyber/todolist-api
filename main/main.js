
// const loading = document.getElementById('loading')

let tasks = []

async function task() {
    const response = await fetch('./app.json')
    tasks = await response.json()
    renderTasks(tasks)
}

task()

function renderTasks(taskList) {
    const tasksList = document.getElementById('tasksList')
    tasksList.innerHTML = ''
    taskList.forEach(item => {
        const card = document.createElement('div')
        card.classList.add('task-card')
        // card.textContent = item.title
        tasksList.appendChild(card)

        // CHECKBOXS
        const inputCheck = document.createElement('input')
        inputCheck.type = 'checkbox'
        inputCheck.checked = item.completed
        inputCheck.addEventListener('change', () => {
            // if(inputCheck.checked) {
            //     item.completed = true
            // } else {
            //     item.completed = false
            // }
            item.completed = inputCheck.checked
            inputCheck.classList.add('task-checkbox')
        })
        card.appendChild(inputCheck)

        //  TITLE
        const title = document.createElement('h3')
        title.textContent = item.title
        card.appendChild(title)
        // DEL
        const deleteBtn = document.createElement('button')
        deleteBtn.textContent = 'Delete'
        deleteBtn.addEventListener('click', () => {
            tasks = tasks.filter(task => task.id !== item.id)
            renderTasks(tasks)
        })
        card.appendChild(deleteBtn)
    })
}

// ADD
const taskInput = document.getElementById('taskInput')
const addBtn = document.getElementById('addBtn')
addBtn.addEventListener('click', () => {
    const title = taskInput.value
    if (!title.trim()) return
    const newTask = {
        id: Date.now(),
        title: title,
        completed: false
    }
  
    console.log(newTask.id)
    tasks.push(newTask)
    renderTasks(tasks)
    taskInput.value = ''
    console.log('tasks after:', tasks)
})




// FILTERS
const filterBtns = document.querySelectorAll('.filter-btn')
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.dataset.filter
        let filteredTasks
        if (filter === 'completed') {

            filteredTasks = tasks.filter(item => item.completed === true)
            

        } else if (filter === 'pending') {

            filteredTasks = tasks.filter(item => item.completed === false)

        } else {

            filteredTasks = tasks

        }
        renderTasks(filteredTasks)
    })
})