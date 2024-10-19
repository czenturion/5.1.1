const tasks = JSON.parse(localStorage.getItem('tasks')) || []
let filter = 'all'

const createTask = (taskList, task) => {
  const taskItem = document.createElement('li')
  taskItem.className = 'task-item'

  const taskText = document.createElement('p')
  taskText.className = 'task-text'
  taskText.textContent = task.name
  taskItem.appendChild(taskText)

  taskText.ondblclick = () => {
    const input = document.createElement('input')
    input.type = 'text'
    input.value = task.name
    input.className = 'task-text-input-variant'

    input.onkeydown = (e) => {
      if (e.key === 'Enter') {
        const newTaskName = input.value.trim()
        if (newTaskName) {
          task.name = newTaskName
          displayTasks()
        }
      }
    }

    taskItem.replaceChild(input, taskText)
    input.focus()
  }

  const statusBar = document.createElement('div')
  statusBar.className = 'item-status-bar'

  const deleteButton = document.createElement('button')
  deleteButton.className = 'delete-button'
  deleteButton.textContent = 'Удалить'
  deleteButton.onclick = () => {
    deleteTask(task.name)
    displayTasks()
  }
  statusBar.appendChild(deleteButton)

  const completeButton = document.createElement('button')
  completeButton.className = 'complete-button'
  completeButton.textContent = 'Выполнена'
  completeButton.onclick = () => {
    completeTask(task.name)
    displayTasks()
  }
  statusBar.appendChild(completeButton)
  taskItem.appendChild(statusBar)

  console.log(task.completed)

  if (task.completed) {
    taskItem.classList.add('completed')
  }

  taskList.appendChild(taskItem)
}

const displayTasks = () => {
  const taskList = document.getElementById('task-items')
  taskList.innerHTML = ''

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') {
      return task.completed
    } else if (filter === 'pending') {
      return !task.completed
    }
    return true
  })

  filteredTasks.forEach((task) => createTask(taskList, task))

  localStorage.setItem('tasks', JSON.stringify(tasks))
}



const addTask = (event) => {
  event.preventDefault()

  console.log(event.target.elements.task.value)
  const newTask = event.target.elements.task.value.trim()

  tasks.push({ name: newTask, completed: false })
  event.target.reset()
  displayTasks()
}

const deleteTask = (name) => {
  const taskIndex = tasks.findIndex((task) => task.name === name)

  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1)
  } else {
    alert(`Задача "${name}" не найдена`)
  }
}

const completeTask = (name) => {
  const task = tasks.find((task) => task.name === name)

  if (task) {
    task.completed = true
    displayTasks()
  } else {
    alert(`Задача "${name}" не найдена`)
  }
}

const setupSortButtons = () => {
  document.querySelector('.show-all').onclick = () => {
    filter = 'all'
    console.log('++++++++')
    displayTasks()
  }

  document.querySelector('.show-completed').onclick = () => {
    filter = 'completed'
    displayTasks()
  }

  document.querySelector('.show-pending').onclick = () => {
    filter = 'pending'
    displayTasks()
  }
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.task-input-form').addEventListener('submit', addTask)
  setupSortButtons()
  displayTasks()
})