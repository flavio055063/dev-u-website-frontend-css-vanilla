const timer = ms => new Promise(res => setTimeout(res, ms));

var form = document.getElementById("register-form");
var wrapper = document.getElementById("wrapper");
form.addEventListener('submit', userRegister);

const msg = document.getElementById("msg");

async function userRegister() {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const nick = document.getElementById("nick").value;
  const email = document.getElementById("email").value;
  const entryDate = document.getElementById("dev-u-entry").value;
  const area = document.getElementById("area").value;
  const password = document.getElementById("password").value;
  const voucher = document.getElementById("voucher").value;

  const regObj = {
    name: name,
    nick: nick,
    email: email,
    password: password,
    passwordConfirmation: password,
    areaId: area,
    entryDate: entryDate,
    voucher: voucher
  }

  console.log("BODY NO FRONT ANTES DO REQUEST: ")
  console.log('antes: ' + regObj)
  const url = 'http://localhost:3000/register'
  const res = await fetch(url, {
    method: "POST",
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(regObj),
  });
  console.log("Resposta do server: " + res);
  const data = await res.json();
  console.log("JSON extraído: " + data);
  var token = data.token;

  if(token === 'Invalid'){
    msg.style.display = "flex";
  }else{
    localStorage.setItem('token', token);
    console.log("Token guardado no localStorage: " + token);
    msg.style.display = "none";
    form.style.display = "none";
    wrapper.style.backgroundColor = "rgb(141, 255, 166)";
    wrapper.innerText = "✔️Registro feito com sucesso! Redirecionando...";
    for(var i=0; i<100; i++){
      j = i/100;
      wrapper.style.opacity = j;
      console.log(j);
      await timer(20);
    }
    window.location.href="http://localhost:3000/main";
  }

  console.log(token);
}


