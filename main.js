/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
const listsContainer = document.querySelector('[data-lists]')
const newListForm = document.querySelector('[data-new-list-form]')
const newListInput = document.querySelector('[data-new-list-input]')
const deleteListButton = document.querySelector('[data-delete-list-button]')
const listDisplayContainer = document.querySelector('[data-list-display-container]')
const listTitleElement = document.querySelector('[data-list-title]')
const listCountElement = document.querySelector('[data-list-count]')
const tasksContainer = document.querySelector('[data-tasks]')
const taskTemplate = document.getElementById('task-template')
const newTaskForm = document.querySelector('[data-new-task-form]')
const newTaskInput = document.querySelector('[data-new-task-input]')
const clearCompleteTasksButton = document.querySelector('[data-clear-complete-tasks-button]')

const LOCAL_STORAGE_LIST_KEY = 'task.lists'
const LOCAL_STORAGE_SELECTED_LIST_ID_KEY = 'task.selectedListId'
let lists = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LIST_KEY)) || []
let selectedListId = localStorage.getItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY)

listsContainer.addEventListener('click', e => {
  if (e.target.tagName.toLowerCase() === 'li') {
    selectedListId = e.target.dataset.listId
    saveAndRender()
  }
})

tasksContainer.addEventListener('click', e => {
  if (e.target.tagName.toLowerCase() === 'input') {
    const selectedList = lists.find(list => list.id === selectedListId)
    const selectedTask = selectedList.tasks.find(task => task.id === e.target.id)
    selectedTask.complete = e.target.checked
    save()
    renderTaskCount(selectedList)
  }
})

clearCompleteTasksButton.addEventListener('click', e => {
  const selectedList = lists.find(list => list.id === selectedListId)
  selectedList.tasks = selectedList.tasks.filter(task => !task.complete)
  saveAndRender()
})

deleteListButton.addEventListener('click', e => {
  lists = lists.filter(list => list.id !== selectedListId)
  selectedListId = null
  saveAndRender()
})

newListForm.addEventListener('submit', e => {
  e.preventDefault()
  const listName = newListInput.value
  if (listName == null || listName === '') return
  const list = createList(listName)
  newListInput.value = null
  lists.push(list)
  saveAndRender()
})

newTaskForm.addEventListener('submit', e => {
  e.preventDefault()
  const taskName = newTaskInput.value
  if (taskName == null || taskName === '') return
  const task = createTask(taskName)
  newTaskInput.value = null
  const selectedList = lists.find(list => list.id === selectedListId)
  selectedList.tasks.push(task)
  saveAndRender()
})

function createList(name) {
  return { id: Date.now().toString(), name: name, tasks: [] }
}

function createTask(name) {
  return { id: Date.now().toString(), name: name, complete: false }
}

function saveAndRender() {
  save()
  render()
}

function save() {
  localStorage.setItem(LOCAL_STORAGE_LIST_KEY, JSON.stringify(lists))
  localStorage.setItem(LOCAL_STORAGE_SELECTED_LIST_ID_KEY, selectedListId)
}

function render() {
  clearElement(listsContainer)
  renderLists()

  const selectedList = lists.find(list => list.id === selectedListId)
  if (selectedListId == null) {
    listDisplayContainer.style.display = 'none'
  } else {
    listDisplayContainer.style.display = ''
    listTitleElement.innerText = selectedList.name
    renderTaskCount(selectedList)
    clearElement(tasksContainer)
    renderTasks(selectedList)
  }
}

function renderTasks(selectedList) {
  selectedList.tasks.forEach(task => {
    const taskElement = document.importNode(taskTemplate.content, true)
    const checkbox = taskElement.querySelector('input')
    checkbox.id = task.id
    checkbox.checked = task.complete
    const label = taskElement.querySelector('label')
    label.htmlFor = task.id
    label.append(task.name)
    tasksContainer.appendChild(taskElement)
  })
}

function renderTaskCount(selectedList) {
  const incompleteTaskCount = selectedList.tasks.filter(task => !task.complete).length
  const taskString = incompleteTaskCount === 1 ? "task" : "tasks"
  listCountElement.innerText = `${incompleteTaskCount} ${taskString} remaining`
}

function renderLists() {
  lists.forEach(list => {
    const listElement = document.createElement('li')
    listElement.dataset.listId = list.id
    listElement.classList.add("list-name")
    listElement.innerText = list.name
    if (list.id === selectedListId) {
      listElement.classList.add('active-list')
    }
    listsContainer.appendChild(listElement)
  })
}

function clearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }
}

render()
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQSxXQUFXO0FBQ1g7O0FBRUE7QUFDQSxXQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0MscUJBQXFCLEVBQUUsWUFBWTtBQUNyRTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hZHZhbmNlZC10by1kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGxpc3RzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtbGlzdHNdJylcbmNvbnN0IG5ld0xpc3RGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtbmV3LWxpc3QtZm9ybV0nKVxuY29uc3QgbmV3TGlzdElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtbmV3LWxpc3QtaW5wdXRdJylcbmNvbnN0IGRlbGV0ZUxpc3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1kZWxldGUtbGlzdC1idXR0b25dJylcbmNvbnN0IGxpc3REaXNwbGF5Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtbGlzdC1kaXNwbGF5LWNvbnRhaW5lcl0nKVxuY29uc3QgbGlzdFRpdGxlRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWxpc3QtdGl0bGVdJylcbmNvbnN0IGxpc3RDb3VudEVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1saXN0LWNvdW50XScpXG5jb25zdCB0YXNrc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXRhc2tzXScpXG5jb25zdCB0YXNrVGVtcGxhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFzay10ZW1wbGF0ZScpXG5jb25zdCBuZXdUYXNrRm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLW5ldy10YXNrLWZvcm1dJylcbmNvbnN0IG5ld1Rhc2tJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLW5ldy10YXNrLWlucHV0XScpXG5jb25zdCBjbGVhckNvbXBsZXRlVGFza3NCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jbGVhci1jb21wbGV0ZS10YXNrcy1idXR0b25dJylcblxuY29uc3QgTE9DQUxfU1RPUkFHRV9MSVNUX0tFWSA9ICd0YXNrLmxpc3RzJ1xuY29uc3QgTE9DQUxfU1RPUkFHRV9TRUxFQ1RFRF9MSVNUX0lEX0tFWSA9ICd0YXNrLnNlbGVjdGVkTGlzdElkJ1xubGV0IGxpc3RzID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShMT0NBTF9TVE9SQUdFX0xJU1RfS0VZKSkgfHwgW11cbmxldCBzZWxlY3RlZExpc3RJZCA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKExPQ0FMX1NUT1JBR0VfU0VMRUNURURfTElTVF9JRF9LRVkpXG5cbmxpc3RzQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gIGlmIChlLnRhcmdldC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdsaScpIHtcbiAgICBzZWxlY3RlZExpc3RJZCA9IGUudGFyZ2V0LmRhdGFzZXQubGlzdElkXG4gICAgc2F2ZUFuZFJlbmRlcigpXG4gIH1cbn0pXG5cbnRhc2tzQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gIGlmIChlLnRhcmdldC50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdpbnB1dCcpIHtcbiAgICBjb25zdCBzZWxlY3RlZExpc3QgPSBsaXN0cy5maW5kKGxpc3QgPT4gbGlzdC5pZCA9PT0gc2VsZWN0ZWRMaXN0SWQpXG4gICAgY29uc3Qgc2VsZWN0ZWRUYXNrID0gc2VsZWN0ZWRMaXN0LnRhc2tzLmZpbmQodGFzayA9PiB0YXNrLmlkID09PSBlLnRhcmdldC5pZClcbiAgICBzZWxlY3RlZFRhc2suY29tcGxldGUgPSBlLnRhcmdldC5jaGVja2VkXG4gICAgc2F2ZSgpXG4gICAgcmVuZGVyVGFza0NvdW50KHNlbGVjdGVkTGlzdClcbiAgfVxufSlcblxuY2xlYXJDb21wbGV0ZVRhc2tzQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gIGNvbnN0IHNlbGVjdGVkTGlzdCA9IGxpc3RzLmZpbmQobGlzdCA9PiBsaXN0LmlkID09PSBzZWxlY3RlZExpc3RJZClcbiAgc2VsZWN0ZWRMaXN0LnRhc2tzID0gc2VsZWN0ZWRMaXN0LnRhc2tzLmZpbHRlcih0YXNrID0+ICF0YXNrLmNvbXBsZXRlKVxuICBzYXZlQW5kUmVuZGVyKClcbn0pXG5cbmRlbGV0ZUxpc3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgbGlzdHMgPSBsaXN0cy5maWx0ZXIobGlzdCA9PiBsaXN0LmlkICE9PSBzZWxlY3RlZExpc3RJZClcbiAgc2VsZWN0ZWRMaXN0SWQgPSBudWxsXG4gIHNhdmVBbmRSZW5kZXIoKVxufSlcblxubmV3TGlzdEZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZSA9PiB7XG4gIGUucHJldmVudERlZmF1bHQoKVxuICBjb25zdCBsaXN0TmFtZSA9IG5ld0xpc3RJbnB1dC52YWx1ZVxuICBpZiAobGlzdE5hbWUgPT0gbnVsbCB8fCBsaXN0TmFtZSA9PT0gJycpIHJldHVyblxuICBjb25zdCBsaXN0ID0gY3JlYXRlTGlzdChsaXN0TmFtZSlcbiAgbmV3TGlzdElucHV0LnZhbHVlID0gbnVsbFxuICBsaXN0cy5wdXNoKGxpc3QpXG4gIHNhdmVBbmRSZW5kZXIoKVxufSlcblxubmV3VGFza0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZSA9PiB7XG4gIGUucHJldmVudERlZmF1bHQoKVxuICBjb25zdCB0YXNrTmFtZSA9IG5ld1Rhc2tJbnB1dC52YWx1ZVxuICBpZiAodGFza05hbWUgPT0gbnVsbCB8fCB0YXNrTmFtZSA9PT0gJycpIHJldHVyblxuICBjb25zdCB0YXNrID0gY3JlYXRlVGFzayh0YXNrTmFtZSlcbiAgbmV3VGFza0lucHV0LnZhbHVlID0gbnVsbFxuICBjb25zdCBzZWxlY3RlZExpc3QgPSBsaXN0cy5maW5kKGxpc3QgPT4gbGlzdC5pZCA9PT0gc2VsZWN0ZWRMaXN0SWQpXG4gIHNlbGVjdGVkTGlzdC50YXNrcy5wdXNoKHRhc2spXG4gIHNhdmVBbmRSZW5kZXIoKVxufSlcblxuZnVuY3Rpb24gY3JlYXRlTGlzdChuYW1lKSB7XG4gIHJldHVybiB7IGlkOiBEYXRlLm5vdygpLnRvU3RyaW5nKCksIG5hbWU6IG5hbWUsIHRhc2tzOiBbXSB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVRhc2sobmFtZSkge1xuICByZXR1cm4geyBpZDogRGF0ZS5ub3coKS50b1N0cmluZygpLCBuYW1lOiBuYW1lLCBjb21wbGV0ZTogZmFsc2UgfVxufVxuXG5mdW5jdGlvbiBzYXZlQW5kUmVuZGVyKCkge1xuICBzYXZlKClcbiAgcmVuZGVyKClcbn1cblxuZnVuY3Rpb24gc2F2ZSgpIHtcbiAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oTE9DQUxfU1RPUkFHRV9MSVNUX0tFWSwgSlNPTi5zdHJpbmdpZnkobGlzdHMpKVxuICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbShMT0NBTF9TVE9SQUdFX1NFTEVDVEVEX0xJU1RfSURfS0VZLCBzZWxlY3RlZExpc3RJZClcbn1cblxuZnVuY3Rpb24gcmVuZGVyKCkge1xuICBjbGVhckVsZW1lbnQobGlzdHNDb250YWluZXIpXG4gIHJlbmRlckxpc3RzKClcblxuICBjb25zdCBzZWxlY3RlZExpc3QgPSBsaXN0cy5maW5kKGxpc3QgPT4gbGlzdC5pZCA9PT0gc2VsZWN0ZWRMaXN0SWQpXG4gIGlmIChzZWxlY3RlZExpc3RJZCA9PSBudWxsKSB7XG4gICAgbGlzdERpc3BsYXlDb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICB9IGVsc2Uge1xuICAgIGxpc3REaXNwbGF5Q29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnJ1xuICAgIGxpc3RUaXRsZUVsZW1lbnQuaW5uZXJUZXh0ID0gc2VsZWN0ZWRMaXN0Lm5hbWVcbiAgICByZW5kZXJUYXNrQ291bnQoc2VsZWN0ZWRMaXN0KVxuICAgIGNsZWFyRWxlbWVudCh0YXNrc0NvbnRhaW5lcilcbiAgICByZW5kZXJUYXNrcyhzZWxlY3RlZExpc3QpXG4gIH1cbn1cblxuZnVuY3Rpb24gcmVuZGVyVGFza3Moc2VsZWN0ZWRMaXN0KSB7XG4gIHNlbGVjdGVkTGlzdC50YXNrcy5mb3JFYWNoKHRhc2sgPT4ge1xuICAgIGNvbnN0IHRhc2tFbGVtZW50ID0gZG9jdW1lbnQuaW1wb3J0Tm9kZSh0YXNrVGVtcGxhdGUuY29udGVudCwgdHJ1ZSlcbiAgICBjb25zdCBjaGVja2JveCA9IHRhc2tFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JylcbiAgICBjaGVja2JveC5pZCA9IHRhc2suaWRcbiAgICBjaGVja2JveC5jaGVja2VkID0gdGFzay5jb21wbGV0ZVxuICAgIGNvbnN0IGxhYmVsID0gdGFza0VsZW1lbnQucXVlcnlTZWxlY3RvcignbGFiZWwnKVxuICAgIGxhYmVsLmh0bWxGb3IgPSB0YXNrLmlkXG4gICAgbGFiZWwuYXBwZW5kKHRhc2submFtZSlcbiAgICB0YXNrc0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrRWxlbWVudClcbiAgfSlcbn1cblxuZnVuY3Rpb24gcmVuZGVyVGFza0NvdW50KHNlbGVjdGVkTGlzdCkge1xuICBjb25zdCBpbmNvbXBsZXRlVGFza0NvdW50ID0gc2VsZWN0ZWRMaXN0LnRhc2tzLmZpbHRlcih0YXNrID0+ICF0YXNrLmNvbXBsZXRlKS5sZW5ndGhcbiAgY29uc3QgdGFza1N0cmluZyA9IGluY29tcGxldGVUYXNrQ291bnQgPT09IDEgPyBcInRhc2tcIiA6IFwidGFza3NcIlxuICBsaXN0Q291bnRFbGVtZW50LmlubmVyVGV4dCA9IGAke2luY29tcGxldGVUYXNrQ291bnR9ICR7dGFza1N0cmluZ30gcmVtYWluaW5nYFxufVxuXG5mdW5jdGlvbiByZW5kZXJMaXN0cygpIHtcbiAgbGlzdHMuZm9yRWFjaChsaXN0ID0+IHtcbiAgICBjb25zdCBsaXN0RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICBsaXN0RWxlbWVudC5kYXRhc2V0Lmxpc3RJZCA9IGxpc3QuaWRcbiAgICBsaXN0RWxlbWVudC5jbGFzc0xpc3QuYWRkKFwibGlzdC1uYW1lXCIpXG4gICAgbGlzdEVsZW1lbnQuaW5uZXJUZXh0ID0gbGlzdC5uYW1lXG4gICAgaWYgKGxpc3QuaWQgPT09IHNlbGVjdGVkTGlzdElkKSB7XG4gICAgICBsaXN0RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUtbGlzdCcpXG4gICAgfVxuICAgIGxpc3RzQ29udGFpbmVyLmFwcGVuZENoaWxkKGxpc3RFbGVtZW50KVxuICB9KVxufVxuXG5mdW5jdGlvbiBjbGVhckVsZW1lbnQoZWxlbWVudCkge1xuICB3aGlsZSAoZWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgZWxlbWVudC5yZW1vdmVDaGlsZChlbGVtZW50LmZpcnN0Q2hpbGQpXG4gIH1cbn1cblxucmVuZGVyKCkiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=