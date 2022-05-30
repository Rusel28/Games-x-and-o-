
const table = document.getElementById("table");
const wrappersCell = document.getElementsByClassName('wrapper__cell');

let startGames = document.getElementById("startGames");
let inputNumber = document.querySelector('.input');

let counterSymbol  = 0;
 
/*----------------новая игра-------------------- */

startGames.addEventListener("click", createTable);

/*--------------------создаем таблицу-----------------------------*/

function createTable(){
  let num = inputNumber.value;
  table.innerHTML = "";
  counterSymbol  = 0;

    for (let i = 1; i <= num; i++) {
      let tr = document.createElement('tr');
      for (let j = 1; j <= num; j++) {
        let td = document.createElement('td'); 
        let span = document.createElement("span")
        span.classList.add("wrapper__cell")
        td.append(span); 
        tr.append(td); 
      }
      table.append(tr); 
    }
    table.addEventListener("click", symbol);
  }
  createTable();
/*------------------создаем символы-------------------------------*/

 function symbol(event){

  let num = inputNumber.value;
  if(counterSymbol % 2 === 0){
    event.target.textContent = "o"
    counterSymbol++;
  }else{
    event.target.textContent = "x"
    counterSymbol++;
  }
  creatArrSymbol(num, wrappersCell);
}

/*------------------вывод символов в массив-------------------------------*/

function creatArrSymbol(number, obj){
  let arrayWrapper = Array.from(obj)
  let data = new Array();
  let n = number**2;
  
  for (let i = 0; i < n; i++){
    let a = arrayWrapper;
    data.push(a[i].innerHTML); 
  }

  modifiedArrSymbol(data, +number);
}

/*----------------------двумерный массив символов---------------------------*/

function modifiedArrSymbol(arr, number){
  let len =  arr.length;
  let n = +number; 
  let lineNum = len % n === 0 ? len / n : Math.floor( (len / n) + 1);
  let arrSumbol = [];

  for (let i = 0; i < lineNum; i++){
    let matrix = arr.slice(i*n, i*n+n);
    arrSumbol.push(matrix);
  }
  
  checkHorizontal(arrSumbol)
  checkDiagonal(arrSumbol, n)
  checkVertical(arrSumbol, n)
  checkingForDraw(arr, n);
}

/*-----------------проверка на совпадение по horizontal--------------------------------*/

function checkHorizontal(arr){
  
  for(let i = 0; i < arr.length; i++){
    arr[i].every(elem => elem === 'x') ? victoryX() : false;
    arr[i].every(elem => elem === 'o') ? victoryO() : false;
  }
}

/*-----------------проверка на совпадение по diagonal--------------------------------*/

function checkDiagonal(arr, num){
  let diagonal1 = [];
  let diagonal2 = [];
  let n = num - 1;

  for(let i = 0; i < arr.length; i++){
    diagonal1.push(arr[i][n-i])
    diagonal2.push(arr[i][i])
  }
  diagonal2.every(elem => elem === 'o') ? victoryO(): false;
  diagonal2.every(elem => elem === 'x') ? victoryX() : false;

  diagonal1.every(elem => elem === 'o') ? victoryO() : false;
  diagonal1.every(elem => elem === 'x') ? victoryX() : false;  
}


/*-----------------проверка на совпадение по vertical--------------------------------*/


function checkVertical(arr, num){

  let len =  arr.length;
  let n = num; 
  let verticalArr = [];
  let enumerationSumbolInArr = []
 
  for(let i = 0; i < len; i++){
    for(let j = 0; j < len; j++){
      enumerationSumbolInArr.push(arr[j][i])
    }
  }

  for (let i = 0; i < len; i++) {
    let matrix = enumerationSumbolInArr.slice(i*n, i*n+n);
    verticalArr.push(matrix); 
  }

  for(let i = 0; i < verticalArr.length; i++){
    verticalArr[i].every(elem => elem === 'x') ? victoryX() : false;
    verticalArr[i].every(elem => elem === 'o') ?  victoryO() : false;
  }
}

/*-----------------------проверка на ничью--------------- */

function checkingForDraw(arr, num){
  arr.join("").length === num**2 ? draw() : false
}


function victoryO(){
  alert('Победили "о"')
  createTable()
}

function victoryX(){
  alert('Победили "x"')
  createTable()
}
function draw(){
  alert('Ничья')
  createTable()
}


