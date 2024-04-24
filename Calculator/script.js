(() => {
  const calculatorState = new function() {
    this.currentNumber = '';
    this.equation = '';
    this.result = '';
    this.equalState = false;

    this.setNumber = function(n) {
      if (n === '0' && this.currentNumber === '0') return;
      if (n === '.' && this.currentNumber.includes('.')) return;
      if (this.equation.charAt(this.equation.length - 1) === '%') return;

      if (this.equalState === true) {
        this.clearAll();
      }
      this.equalState = false;
      this.currentNumber += n;
      this.liveCalculate();
    };

    this.setOperation = function(op) {
      if (this.equalState === true) {
        this.currentNumber = '';
        this.equation = this.result;
        this.result = ''
      }

      if (this.equalState === false) {
        if (['*','/','+','-'].includes(op) &&
            (this.currentNumber === '' || this.currentNumber === '.') &&
            this.equation.charAt(this.equation.length - 1) !== '%') return;
        if (op === '%' && this.currentNumber === '') return;
      }
      
      this.equalState = false;
      this.equation = this.equation + this.currentNumber + op; 
      this.currentNumber = '';
      this.liveCalculate();
    };

    this.backspace = function() {
      if (this.equalState === true) return;
      if (this.currentNumber.length === 0 && this.equation.length === 0) return;
      if (this.currentNumber.length === 0) {
        this.equation = this.equation.slice(0, this.equation.length - 1);
        const opReg = /[\%+*/-]/g;
        const matches = [...this.equation.matchAll(opReg)];
        if (matches.length === 0) {
          this.currentNumber = this.equation;
          this.equation = '';
        } else {
          const lastOpIndex = matches[matches.length - 1].index;
          this.currentNumber = this.equation.slice(lastOpIndex + 1);
          this.equation = this.equation.slice(0, lastOpIndex + 1);
        }
      } else {
        this.currentNumber = this.currentNumber.slice(0, this.currentNumber.length - 1);
      }
      this.liveCalculate(true);
    };

    this.clearAll = function() {
      this.currentNumber = '';
      this.equation = '';
      this.result = '';
      this.equalState = false;
    };

    this.liveCalculate = function(bsKey = false) {
      if (this.equation === '') {
        this.result = '';
        return;
      };

      let evalEquation = this.equation;

      if (bsKey && this.currentNumber === '') {
        if (evalEquation.charAt(evalEquation.length - 1) !== '%'){
          const opReg = /[+*/-]/g;
          const matches = [...evalEquation.matchAll(opReg)];
          if (matches.length < 1) {
            this.result = '';
          }
          else if (matches.length == 1 && evalEquation.includes('%')) {
              evalEquation = evalEquation.slice(0, evalEquation.length - 1);
          }
          else if (matches.length == 1) {
            this.result = '';
          }
          else if (matches.length > 1) {
            const lastOpIndex = matches[matches.length - 1].index;
            evalEquation = evalEquation.slice(0, lastOpIndex);
          }
        }
      }
      
      evalEquation = evalEquation.replaceAll('%', '/100');
      try {
        this.result = eval(evalEquation + this.currentNumber);
      } catch {
      }
    };

    this.equal = function() {
      this.liveCalculate();
      if (this.result === '') return;

      this.equalState = true;
    }
    
  }

  const numberBtns = document.querySelectorAll('.btn-number');
  const operationBtns = document.querySelectorAll('.btn-operation');
  const inputDiv = document.getElementById('input-display');
  const resultDiv = document.getElementById('result-display');
  const equalBtn = document.getElementById('btn-equal');
  const backspaceBtn = document.getElementById('btn-backspace');
  const clearAllBtn = document.getElementById('btn-clear-all');

  function handleNumberDown() {
    calculatorState.setNumber(this.dataset.key);
    toggleDisplayFocus();
    updateInputDisplay();
    updateResultDisplay();
  }

  function handleOperation() {
    calculatorState.setOperation(this.dataset.key);
    toggleDisplayFocus();
    updateInputDisplay();
    updateResultDisplay();
  }

  function toggleDisplayFocus() {
    if (calculatorState.equalState === true) {
      resultDiv.classList.add('focus');
      inputDiv.classList.remove('focus');
    } else {
      resultDiv.classList.remove('focus');
      inputDiv.classList.add('focus');
    }
  }

  function handleEqual() {
    calculatorState.equal();
    toggleDisplayFocus();
    updateInputDisplay();
    updateResultDisplay();
  }

  function handleBackspace() {
    calculatorState.backspace();
    updateInputDisplay();
    updateResultDisplay();
  }

  function handleClearAll() {
    calculatorState.clearAll();
    toggleDisplayFocus();
    updateInputDisplay();
    updateResultDisplay();
  }

  function updateInputDisplay() {
    inputDiv.innerText = calculatorState.equation + calculatorState.currentNumber;
  }

  function updateResultDisplay() {
    resultDiv.innerText = calculatorState.result;
  }

  numberBtns.forEach(btn => {
    btn.addEventListener('click', handleNumberDown);
  });

  operationBtns.forEach(btn => {
    btn.addEventListener('click', handleOperation);
  })

  backspaceBtn.addEventListener('click', handleBackspace);
  clearAllBtn.addEventListener('click', handleClearAll);
  equalBtn.addEventListener('click', handleEqual);

  function handleKeyDown(eventhandle, div) {
    eventhandle.call(div);
    div.classList.add('active');
  }

  window.addEventListener('keydown', (e) => {
    const btnDiv = document.querySelector(`[data-code='${e.code}'][data-shift='${e.shiftKey}']`);
    if (btnDiv === null) return;
    const btnClass = btnDiv.classList[0];
    switch (btnClass) {
      case 'btn-number':
        handleKeyDown(handleNumberDown, btnDiv);
        break;
      case 'btn-operation':
        handleKeyDown(handleOperation, btnDiv);
        break;
      case 'btn-equal':
        handleKeyDown(handleEqual, btnDiv);
        break;
      case 'btn-system':
        const btnId = btnDiv.id;
        switch (btnId) {
          case 'btn-backspace':
            handleBackspace();
            btnDiv.classList.add('active');
            break;
          case 'btn-clear-all':
            handleClearAll();
            btnDiv.classList.add('active');
            break;
        }
        break;
    }
  });

  window.addEventListener('keyup', (e) => {
    const btnDiv = document.querySelectorAll(`[data-code='${e.code}']`);
    if (btnDiv === null) return;
    btnDiv.forEach(div => div.classList.remove('active'));
  });
})();