function eval() {
    // Do not use eval!!!
    return;
  }
  
  function expressionCalculator(expr) {
    let arr = [];
    let result = [];
    let memory = [];
    let numRes = [];
    let num;
    if (/\s/.test(expr)) {
      arr = expr.split(/\s+/);
    } else {
      arr = expr.split('');
    }
   ;
    let level = {
      '+': 2,
      '-': 2,
      '*': 3,
      '/': 3
    };

    
    arr.map(e => {
      if (/\d+/gi.test(e)) {
        result.push(e);
      } else if (/[\-+*/]/gi.test(e)) {
        while (level[memory[memory.length - 1]] >= level[e] &&   memory[memory.length - 1] !== '(') {
            result.push(memory.pop());
        }
        memory.push(e);
      } else if (e === '(') {
        memory.push(e);
      } else if (e === ')') {
        while (memory[memory.length - 1] !== '(') {
            result.push(memory.pop());
        }
        if (memory[memory.length - 1] === '(') {
            memory.pop();
        }
      }
    });
    while (memory.length !== 0) {
        result.push(memory.pop());
    }
  
    function needNum(num) {
      numRes.pop();

      numRes.pop();

      numRes.push(num);
    }
    
    let zeroCount = result.some(e => {
      
      if (/\d+/gi.test(e)) {
        numRes.push(e);
      }

      switch (e) {

        case '*':
            num = numRes[numRes.length - 2] * numRes[numRes.length - 1];
          needNum(num);
          break;
        case '/':

          if (numRes[numRes.length - 1] == 0) {
            return 1;
          }

          num = numRes[numRes.length - 2] / numRes[numRes.length - 1];
          needNum(num);
          break;
        case '-':
            num = numRes[numRes.length - 2] - numRes[numRes.length - 1];
          needNum(num);
          break;
        case '+':
            num =
            parseFloat(numRes[numRes.length - 2]) +
            parseFloat(numRes[numRes.length - 1]);
            needNum(num);
          break;
      }
    });
  


    if (isNaN(numRes[0])) {
      throw 'ExpressionError: Brackets must be paired';
    } else if (zeroCount ) {
      throw 'TypeError: Division by zero.';
    } else {
      return numRes[0];
    }
  }
  
  module.exports = {
    expressionCalculator
  };