//chamar o Modal, logged, session
const myModal = new bootstrap.Modal("#transaction-modal");
let logged = sessionStorage.getItem("logged");
const session = sessionStorage.getItem("session");

//Entradas e Saídas
let cashIn = [];
let cashOut= [];

// Transação lançadas
let data = {
  transaction: []
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

  getCashIn();
  getCashOut();
  getTotal();

  alert("Lançamento adicionado com sucesso!");
});

// Sair
document.getElementById("button-logout").addEventListener("click", logout);

// ver todos lançamentos
document.getElementById("transaction-button").addEventListener("click", function() {
  window.location.href = "transaction.html"
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

  getCashIn();
  getCashOut();
  getTotal();
};

// Sair logout
function logout() {
  sessionStorage.removeItem("logged");
  localStorage.removeItem("session");

  window.location.href = "index.html";
};

//Salvar laçamentos entrada
function saveData(data) {
  localStorage.getItem(data.login, JSON.stringify(data));
};

function getCashIn() {
  const transaction = data.transaction;

  const cashIn = transaction.filter((item) => item.type === "1");

  if(cashIn.length) {
    let cashInHtml = ``;
    let limit = 0;

     if(cashIn.length > 5) {
    limit = 5;
    } else {
    limit = cashIn.length;
    };

    for (let index = 0; index < limit; index++) {
    cashInHtml += `
      <div class="row mb-4">
        <div class="col-12">
          <h3 class="fs-2">
          ${cashIn[index].value.toFixed(2)}
          </h3>
          <div clas="container p-0">
            <div class="row">
              <div class="col-12 col-md-8">
                <p>
                  ${cashIn[index].description}
                </p>
                <div class="col-12 col-md-3 d-flex justify-content-end">
                  ${cashIn[index].date}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `    
    };

    document.getElementById("cash-in-list").innerHTML = cashInHtml;
  };  
};

// Salvar lançamento de saída
function getCashOut() {
  const transaction = data.transaction;

  const cashIn = transaction.filter((item) => item.type === "2");

  if(cashin.length) {
    let cashInHtml = ``;
    let limit = 0;

     if(cashIn.length > 5) {
    limit = 5;
    } else {
    limit = cashIn.length;
    };

    for (let index = 0; index < limit; index++) {
    cashInHtml += `
      <div class="row mb-4">
        <div class="col-12">
          <h3 class="fs-2">
          ${cashIn[index].value.toFixed(2)}
          </h3>
          <div clas="container p-0">
            <div class="row">
              <div class="col-12 col-md-8">
                <p>
                  ${cashIn[index].description}
                </p>
                <div class="col-12 col-md-3 d-flex justify-content-end">
                  ${cashIn[index].date}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `    
    };

    document.getElementById("cash-out-list").innerHTML = cashInHtml;
  };  
};

function getTotal() {
  const transaction = data.transaction;
  let total = 0;

  transaction.forEach((item) => {
    if(intem.type === "1") {
      total += item.value;
    } else {
      total -= item.value;
    };    
  });

  document.getElementById("total").innerHTML = `R$ ${total.toFixed(2)}`;
};
