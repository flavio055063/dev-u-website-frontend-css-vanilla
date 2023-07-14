const rankBorder = document.getElementById("rank-border");
const grid = document.getElementById("grid");
const token = '123';

const nickElement = document.getElementById("nickname");
const nameElement = document.getElementById("name");
const devUentryElement = document.getElementById("dev-u-entry");
const itchioElement = document.getElementById("itchio");
const discordElement = document.getElementById("discord");
const bioElement = document.getElementById("bio-content");
const areaElement = document.getElementById("area");

const url = 'http://localhost:3000/main/getData';
var isYellow = false;

var loop = setInterval(lightBorder, 2000);
//getUserData(token);

function lightBorder(){
    if(isYellow == true){
        rankBorder.style.filter = "drop-shadow(0 0 2em #efff643f)"
        console.log("amarelo light");
        isYellow = false;
    }else{
        rankBorder.style.filter = "drop-shadow(0 0 2em #efff64aa)"
        console.log("amarelo");
        isYellow = true;
    }
    
}

async function getUserData(token){
    fetch(url, {
        method: "GET",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
        "Content-Type": "application/json",
        },
    })
        .then((response) => {
        console.log("Resposta do server: ", response);
        return response.json();
        })
        .then((data) => {
        var {nick, name, devUentry, itchio, discord, bio, area} = data;

        console.log("Conteúdo da resposta: ", data);
        nickElement.textContent = nick;
        nameElement.textContent = "Nome: " + name;
        devUentryElement.textContent = "Entrada: " + devUentry;
        itchioElement.textContent = "itch.io: " + itchio;
        discordElement.textContent = "Discord: " + discord;
        bioElement.innerHTML = "&nbsp;&nbsp;&nbsp;" + bio;
        if(parseInt(area) == 1){
            areaElement.textContent = "Audiovisual";
        }else if(parseInt(area) == 2){
            areaElement.textContent = "Game Design";
        }else if(parseInt(area) == 3){
            areaElement.textContent = "Programação";
        }
        grid.style.display = "grid";
    })
        .catch((error) => {
        console.error(error);
    });
}