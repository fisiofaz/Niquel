//chamar o Modal, logged, session
const myModal = new bootstrap.Modal("#transaction-modal");
let logged = sessionStorage.getItem("logged");
const session = sessionStorage.getItem("session");

// Transação lançadas
let data = {
  transaction: []
};

// Sair
document.getElementById("button-logout").addEventListener("click", logout);

// Sair logout
function logout() {
  sessionStorage.removeItem("logged");
  localStorage.removeItem("session");

  window.location.href = "index.html";
};

// Novas Transações
document.getElementById("transaction-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const value = parseFloat(document.getElementById("value-imput").value);
  const description = document.getElementById("description-input").value;
  const date = document.getElementById("date-input").value;
  const type= document.getSelection('input[name:"type-input"]:checked').value;

  data.transaction.unshift({
    value: value,
    type: type,
    description: description,
    date: date
  });

  saveData(data);
  e.target.reset();
  myModal.hide();

  getTransaction();

  alert("Lançamento adicionado com sucesso!");
});

// checagem se ta logado
checkLogged();

function checkLogged() {
  if(session) {
    sessionStorage.getItem("logged", session);
    logged = session;
  }

  if(!logged) {
    window.location.href="index.html";
  }

  const dataUser = localStorage.getItem(logged);
  if(dataUser) {
    data = JSON.parse(dataUser);
  };

  getTransaction();  
};

//Salvar laçamentos entrada
function saveData(data) {
  localStorage.getItem(data.login, JSON.stringify(data));
};

function getTransaction() {
  const transaction = data.transaction;
  let transactionHtml = ``;

  if(transaction.length) {
    transaction.forEach((item) => {
      let type = "Entrada";

      if(item.type === "2") {
        type = "Saída";
      } 

      transactionHtml += `
        <tr>
          <th scope="row">${item.date}</th>
          <td>${item.value.toFixed(2)}</td>
          <td>${type}</td>
          <td>${item.description}/td>
        </tr>
      `
    })
  };

  document.getElementById("transaction-list").innerHTML = transaction.html;

};

