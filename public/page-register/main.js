var form=document.getElementById("register-form");
form.addEventListener('submit', userRegister);

// const headerPost = {
//   method: "POST",
//   mode: "cors", // no-cors, *cors, same-origin
//   cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
//   credentials: "same-origin", // include, *same-origin, omit
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify(regObj) // body data type must match "Content-Type" header
// }

async function userRegister(){
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const voucher = document.getElementById("voucher").value;
    
    const regObj = {
        name: name,
        email: email,
        password: password,
        voucher: voucher
    }

    console.log("BODY NO FRONT ANTES DO REQUEST: ")
    console.log('antes: ' + regObj)
    const url = 'http://localhost:3000/register'
    const res = await fetch(url, {
        method: "POST",
        //mode: "cors", // no-cors, *cors, same-origin
        //cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        //credentials: "same-origin", // include, *same-origin, omit
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(regObj) // body data type must match "Content-Type" header
      });

      const token = await res.json();
      console.log(token);
    }

