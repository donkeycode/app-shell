var apiUrl = 'https://infinite-basin-52644.herokuapp.com/posts';

function cbElementClicked(el) {
  deleteTodo(el.srcElement.dataset.id);
}

function cbBoxClicked(el) {
  patchTodo(el.srcElement.dataset.id, el.srcElement.checked);
}

function writeTodosToDom(todos) {
  let html = '';
  for (let todo of todos) {
    html +=
`<li class="mdl-list__item">
<span class="mdl-list__item-primary-content">
  ${todo.data}
</span>
<span class="mdl-list__item-secondary-action">
  <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect" for="list-checkbox-${todo.id}">
    <input type="checkbox" data-id="${todo.id}" id="list-checkbox-${todo.id}" class="mdl-checkbox__input" ` + (todo.checked ? 'checked' : '') + ` />
  </label>
</span>
<span class="mdl-list__item-secondary-action delete">
  <i class="material-icons" data-id="${todo.id}">delete</i>
</span>
</li>`;
  }
  document.getElementsByClassName('demo-list-control')[0].innerHTML = html;

  let actions = document.getElementsByClassName('delete');
  for (let action of actions) {
    action.addEventListener('click', cbElementClicked);
  }
  let boxes = document.getElementsByClassName('mdl-checkbox__input');
  for (let boxe of boxes) {
    boxe.addEventListener('click', cbBoxClicked);
  }

  componentHandler.upgradeDom('MaterialCheckbox');
}

function getTodos() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', apiUrl);
  xhr.onload = function() {
    if (xhr.status === 200) {
      writeTodosToDom(JSON.parse(xhr.responseText));
    } else {
      console.error('Request failed.  Returned status of ' + xhr.status);
    }
  };
  xhr.send();
}

function postTodo(body) {
  var xhr = new XMLHttpRequest();

  xhr.open('POST', apiUrl);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if (xhr.status === 200 || xhr.status === 201) {
      getTodos();
    } else {
      console.error('Request failed.  Returned status of ' + xhr.status);
    }
  };
  xhr.send(JSON.stringify(body));
}

function deleteTodo(id) {
  var xhr = new XMLHttpRequest();

  xhr.open('DELETE', apiUrl + '/' + id);
  xhr.onload = function() {
    if (xhr.status === 200 || xhr.status === 201) {
      getTodos();
    } else {
      console.error('Request failed.  Returned status of ' + xhr.status);
    }
  };
  xhr.send();
}

function patchTodo(id, checked) {
  var xhr = new XMLHttpRequest();

  xhr.open('PATCH', apiUrl + '/' + id);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
    if (xhr.status === 200 || xhr.status === 201) {
      getTodos();
    } else {
      console.error('Request failed.  Returned status of ' + xhr.status);
    }
  };
  xhr.send(JSON.stringify({checked: checked}));
}

function cbSubmit(e) {
  e.preventDefault();
  postTodo({ data: document.getElementById('postTodo').value, checked: false });
  document.getElementById('postTodo').value = '';
}

function bindSubmit() {
  document.getElementsByTagName('form')[0].removeEventListener('submit', cbSubmit);
  document.getElementsByTagName('form')[0].addEventListener('submit', cbSubmit);
}

getTodos();
bindSubmit();
