const rankBorder = document.getElementById("rank-border");
var isYellow = false;

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

var loop = setInterval(lightBorder, 2000);