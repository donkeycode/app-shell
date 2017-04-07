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
  fetch(apiUrl, {
    method: 'GET'
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(response) {
    writeTodosToDom(response);
  });
}

function postTodo(body) {
  fetch(apiUrl, {
    method: 'POST',
    body: body
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(response) {
    getTodos();
  });
}

function deleteTodo(id) {
  fetch(apiUrl + '/' + id, {
    method: 'DELETE',
    body: {checked: checked}
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(response) {
    getTodos();
  });
}

function patchTodo(id, checked) {
  fetch(apiUrl + '/' + id, {
    method: 'PATCH',
    body: {checked: checked}
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(response) {
    getTodos();
  });
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
