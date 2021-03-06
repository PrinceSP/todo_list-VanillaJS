const ul = document.querySelector('ul')
const forms = document.querySelector('form')
const btnAdd =  document.querySelector('.adds')
const inputs = document.querySelector('.inputs')
const menus = document.querySelectorAll('.filters')
const btnStart = document.querySelector('button[name="start"]')

btnStart.addEventListener('click',startTodos)
forms.addEventListener('submit',add)
document.addEventListener('DOMContentLoaded',getItemsLocal)
document.querySelector('.container').style.display = 'none'

function startTodos(){
  document.querySelector('.container').style.display = 'flex'
  document.querySelector('.container').style.marginTop = '50px'
  this.style.display = 'none'
}

function add(e){
  e.preventDefault()
  if (inputs.value == '') {
    alert('input box must not be empty!')
    return false;
  }

  addLocalItems(inputs.value)
  saveItems(inputs.value)

  inputs.value = ''
}

function complete(e,text){
  if (e.checked==true) {
    text.style.textDecoration = 'line-through'
    text.parentNode.style.background = '#eee'
    text.parentNode.classList.add('completed')
    text.parentNode.classList.remove('uncompleted')
  } else{
    text.style.textDecoration = 'none'
    text.parentNode.style.background = 'none'
    text.parentNode.classList.remove('completed')
    text.parentNode.classList.add('uncompleted')
  }

}

function saveItems(item){
  let items;

  if (localStorage.getItem('todos')===null) {
    items = []
  }else{
    items = JSON.parse(localStorage.getItem('todos'))
  }
  items.push(item)
  localStorage.setItem('todos',JSON.stringify(items))
}

function getItemsLocal(){
  inputs.value = ''

  let items;

  // if (localStorage.getItem('todos')===null) {
    // items = []
  // }else{
    items = JSON.parse(localStorage.getItem('todos'))
  // }

  items.forEach(item=>{
    addLocalItems(item)
  })
}

function addLocalItems(items){
  const lists = document.createElement('li')
  const box = document.createElement('input')
  const newInputs = document.createElement('input')
  const [del,edit] = [document.createElement('button'),document.createElement('button')]
  const i = [document.createElement('i'),document.createElement('i')]

  box.type = "checkbox"
  del.type = "button"
  edit.type = "button"
  newInputs.type = "text"
  newInputs.disabled = true;


  box.className = 'done'
  newInputs.classList.add('newInputs')
  edit.className = 'editButton'
  i[0].className = "fa fa-trash"
  i[1].className = "fa fa-edit"
  lists.classList.add('uncompleted')

  newInputs.value = items

  del.appendChild(i[0])
  edit.appendChild(i[1])
  lists.appendChild(box)
  lists.appendChild(newInputs)
  lists.appendChild(del)
  lists.appendChild(edit)

  ul.appendChild(lists)

  box.addEventListener('change',function(){
    complete(this,lists.childNodes[1])
  })

  edit.addEventListener('click',()=>{
    editTODOS(newInputs)
  })

  del.addEventListener('click',deleteItems)
}

function deleteItems(){
  const lists = document.querySelectorAll('li')
  lists.forEach(item=>{
    if (item.classList.contains('completed')) {
      confirmDeletion(item)
    }
  })
}

function confirmDeletion(item){
  let conf = confirm('are u sure want to delete these items?')
  if (conf===true) {
    item.remove();
    deleteFromLocal(item)
  }
}

function deleteFromLocal(item){
  let items;

  if (localStorage.getItem('todos')===null) {
    items = []
  }else{
    items = JSON.parse(localStorage.getItem('todos'))
  }
  const indexes = items.findIndex(i=>i===item.childNodes[1].value)
  const delecion = items[indexes]
  if (delecion===item.childNodes[1].value) {
    items.splice(indexes,1)
    localStorage.setItem('todos',JSON.stringify(items))
  }
}

function editTODOS(todos){
  todos.disabled = !todos.disabled
  for (var i = 0; i < ul.children.length; i++) {
    if (ul.children[i].children[1].value === todos.value) {
      updateItems(todos,i)
    }
  }
  todos.parentNode.classList.toggle('toggles')
}

function updateItems(item,idx){
  let items = JSON.parse(localStorage.getItem('todos'))
  const indexes = items.findIndex(i=>i===item.value)

  if (items[indexes]!==item.value){
    items.splice(idx,1,item.value)
    localStorage.setItem('todos',JSON.stringify(items))
  }
}

(function filters(){
  menus.forEach(item=>{
    item.addEventListener('click',function(){
      for (var i = 0; i < ul.children.length; i++) {
        switch (item.textContent) {
          case 'all':
            ul.children[i].style.display = 'flex'
            break;
          case 'completed':
            if (ul.children[i].classList.contains('completed')) {
              ul.children[i].style.display = 'flex'
            }else{
              ul.children[i].style.display = 'none'
            }
            break;
          case 'uncompleted':
            if (ul.children[i].classList.contains('uncompleted')) {
              ul.children[i].style.display = 'flex'
            }else{
              ul.children[i].style.display = 'none'
            }
            break;
        }
      }
    })
  })
})()
