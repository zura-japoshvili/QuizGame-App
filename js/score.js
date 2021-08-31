let getScoreStorage = JSON.parse(localStorage.getItem("myArray"));
let top10 = document.querySelector(".top10");

let storageIndex;

addEventListener('load', function(){
    console.log(getScoreStorage[0]);
    setTOP();
});

function setTOP(){
    if(getScoreStorage.length > 10){
        storageIndex = 10;
    }else{
        storageIndex = getScoreStorage.length;
    }
    console.log(storageIndex);
    for(let i = 0;i<storageIndex;i++){
       let p = document.createElement("p");
       top10.appendChild(p);
       p.textContent = (`${i+1}. ${getScoreStorage[i]}`);
    }
}