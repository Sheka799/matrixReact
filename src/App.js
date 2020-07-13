import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    value: 0
  }

 inputPlus = () => {
   this.setState(prevState => {
     return {
       value: prevState.value + 1
     }
   })
 }
 inputMinus = () => {
   this.setState(prevState => {
     if (prevState.value === 0) {
       return prevState.value = 0
     } else {
     return {
       value: prevState.value - 1
     }
    }
   })
 }

 createMatrix = () => {
  const matrix = document.querySelector('.matrix');
  let tr = document.createElement('tr');
  let td = document.createElement('td');
  td.style.width = '50px';
  td.style.height = '50px';
  td.style.backgroundColor = 'gray';
  td.style.border = '1px solid black';
  td.style.textAlign = 'center';
  td.style.verticalAlign = 'middle';
  td.style.color = '#ffffff';
  
  const value = this.state.value;

  localStorage.setItem('matrix', value);

  function addMatrix () {
 
    if (matrix.firstChild === null) {
      if (value > 0) {
        for (let i = 0; i < value; i++) {
          let trClone = tr.cloneNode(true);
          matrix.appendChild(trClone)
        }
      }
      tr = document.querySelectorAll('tr')
      tr.forEach((item) => {
        for (let i = 0; i < value; i++) {
          let tdClone = td.cloneNode(true);
          item.appendChild(tdClone)
        }
      })
    } else {
      while (matrix.firstChild) {
        matrix.removeChild(matrix.firstChild)
      }
      let buttonPaint = document.getElementsByTagName('button');
      buttonPaint[3].disabled = false;
       if (value > 0) {
      for (let i = 0; i < value; i++) {
        let trClone = tr.cloneNode(true);
        matrix.appendChild(trClone)
      }
    }
    tr = document.querySelectorAll('tr')
    tr.forEach((item) => {
      for (let i = 0; i < value; i++) {
        let tdClone = td.cloneNode(true);
        item.appendChild(tdClone)
      }
    })
    }
    
  }
  
  addMatrix()
 }


 paintMatrix = () => {
  const value = this.state.value;
  function random() {
    let td = document.querySelectorAll('td');
    td.forEach((item) => {
          item.textContent = Math.floor(Math.random() * 2)
    })  
  }
  
  random()


  function searchOne () {
    let tdSize = document.querySelectorAll('td');
    let trSize = document.querySelectorAll('tr');
  
    tdSize.forEach((item, i) => {
      if (tdSize[i].outerText == 1) {
        tdSize[i].classList.add('one');
      } 
    })
   
    let count = 0; 
    for (let i = 0; i < value; i++) {
        for (let j = 0; j < value; j++) {
        let undefin = trSize[i].children[j - 1];
        if (trSize[i].children[j].outerText == 1) {
          count += 1;
        }  else {
          count = 0
        }
        if (count > 1) { 
            trSize[i].children[j].style.backgroundColor = 'blue';
            trSize[i].children[j].classList.add('blueСell')
            if (undefin === undefined && count > 1) {
              count = 0;
              trSize[i + 1 - 1].children[j].style.backgroundColor = 'gray';
              trSize[i + 1 - 1].children[j].classList.add('blueСell')
              count++
            } 
            else {
              trSize[i].children[j - 1].style.backgroundColor = 'blue';
              trSize[i].children[j - 1].classList.add('blueСell')
            }
          }
        }   
    }
    
    for (let i = 0; i < value; i++) {
        for (let j = 0; j < value; j++) {
        let undefin = trSize[i].children[j - 1];
        
        if (trSize[j].children[i].outerText == 1) {
          count += 1;
        }  else {
          count = 0
        }
        if (count > 1) { 
            trSize[j].children[i].style.backgroundColor = 'blue';
            if (undefin === undefined && count > 1) {
              count = 0;
              if (!trSize[j].children[i + 1 - 1].classList.contains('blueСell')) {
                trSize[j].children[i + 1 - 1].style.backgroundColor = 'gray';
              }
              count++
            } 
            else {
              trSize[j - 1].children[i].style.backgroundColor = 'blue';
            }
          }
        }   
    }
    
  }


  this.newMatrix = () => {
    searchOne();
    let buttonPaint = document.getElementsByTagName('button');
    buttonPaint[3].disabled = true;
  }

  this.newMatrix();
  
 }

 componentDidMount() { 
   if (localStorage.getItem('matrix') !== null) {
  const value = this.state.value;
  this.state.value = +localStorage.getItem('matrix', value);
  this.setState({value: +localStorage.getItem('matrix', value)})
  this.createMatrix()
  this.paintMatrix()
   }
}




  render() {
  return (
   <div>
     
      <div className="wrap">
      <h2>Размерность матрицы</h2>
      <div className = "input">
  <input className="input-text" onChange={() => console.log("Changed!")} value={this.state.value}></input>
        <div className="input-buttons">
          <button className="input-button input-plus" onClick={this.inputPlus}>^</button>
          <button className="input-button input-minus" onClick={this.inputMinus}>^</button>
        </div>
      </div>
      <button className="button button-create" onClick={this.createMatrix}>Создать</button>
      <button className="button button-paint" onClick={this.paintMatrix}>Закрасить</button>
    </div>
    <div className="wrap-matrix">
      <div className="matrix">

      </div>
    </div>
   </div>
  );
  }
}

export default App;
