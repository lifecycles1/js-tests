fetch(`https://jsonplaceholder.typicode.com/users`)
  .then((response) => response.json())
  .then((users) => initTable(users));

function initTable(users) {
  const table = document.createElement("table");
  table.className = "table";
  table.innerHTML = `<thead>
    <tr>
        <th>#</th>
        <th>Name</th>
        <th>Username</th>
        <th>Email</th>
        <th>Phone</th>
    </tr>
    <tr>
        <th></th>
        <th><input data-field="name" class="form-control"></th>
        <th><input data-field="username" class="form-control"></th>
        <th><input data-field="email" class="form-control"></th>
        <th><input data-field="phone" class="form-control"></th>
    </tr>
  </thead>`;

  const tbody = document.createElement("tbody");

  renderUsers(users);
  table.append(tbody);
  document.body.append(table);

  const inputs = table.querySelectorAll("input");
  inputs.forEach((input) => {
    input.addEventListener("blur", (e) => {
      console.log(e);
      filterTable(e.target.dataset.field, e.target.value);
    });
    input.addEventListener("keyup", (e) => {
      console.log(e);
      if (e.keyCode === 13) {
        filterTable(e.target.dataset.field, e.target.value);
      }
    });
  });

  function renderUsers(users) {
    const content = users
      .map(
        (user, index) => `<tr>
            <td>${index + 1}</td>
            <td>${user.name}</td>
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
        </tr>    
        `
      )
      .join("\n");
    tbody.innerHTML = content;
  }

  function filterTable(field, value) {
    const newUsers = users.filter((user) => {
      return user[field].toLowerCase().includes(value.toLowerCase());
    });

    renderUsers(newUsers);
  }
}
