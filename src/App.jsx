import { useState } from "react";
import "./App.css";

const App = () => {
  const [answer, setAnswer] = useState("0");
  const [expression, setExpression] = useState("");
  const et = expression.trim();

  const isOperator = (symbol) => {
    return /[*/+-]/.test(symbol);
  };

  const handleButtonClick = (symbol) => {
    if (symbol === "clear") {
      setAnswer("");
      setExpression("0");
    } else if (symbol === "negative") {
      if (answer === "") return;
      setAnswer(
        answer.toString().charAt(0) === "-" ? answer.slice(1) : "-" + answer
      );
    } else if (symbol === "percent") {
      if (answer === "") return;
      setAnswer((parseFloat(answer) / 100).toString());
    } else if (isOperator(symbol)) {
      setExpression(et + " " + symbol + " ");
    } else if (symbol === "=") {
      calculate();
    } else if (symbol === "0") {
      if (expression.charAt(0) !== "0") {
        setExpression(expression + symbol);
      }
    } else if (symbol === ".") {
      const lastNumber = expression.split(/[-+/*]/g).pop();
      if (lastNumber.includes(".")) return;
      setExpression(expression + symbol);
    } else {
      if (expression.charAt(0) === "0") {
        setExpression(expression.slice(1) + symbol);
      } else {
        setExpression(expression + symbol);
      }
    }
  };

  const calculate = () => {
    // if last char is an operator, do nothing
    if (isOperator(et.charAt(et.length - 1))) return;
    // clean the expression so that two operators in a row uses the last operator
    // 5 * - + 5 = 10
    const parts = et.split(" ");
    const newParts = [];

    // go through parts backwards
    for (let i = parts.length - 1; i >= 0; i--) {
      if (["*", "/", "+"].includes(parts[i]) && isOperator(parts[i - 1])) {
        newParts.unshift(parts[i]);
        let j = 0;
        let k = i - 1;
        while (isOperator(parts[k])) {
          k--;
          j++;
        }
        i -= j;
      } else {
        newParts.unshift(parts[i]);
      }
    }
    const newExpression = newParts.join(" ");
    if (isOperator(newExpression.charAt(0))) {
      setAnswer(eval(answer + newExpression));
    } else {
      setAnswer(eval(newExpression));
    }
    setExpression("");
  };
  return (
    <>
      <div className="container">
        <h1>Calculator Application</h1>
        <div id="calculator">
          <div id="display" style={{ textAlign: "right" }}>
            <div id="answer">{answer}</div>
            <div id="expression">{expression}</div>
          </div>
          <button
            id="clear"
            onClick={() => handleButtonClick("clear")}
            className="light-gray"
          >
            C
          </button>
          <button
            id="negative"
            onClick={() => handleButtonClick("negative")}
            className="light-gray"
          >
            +/-
          </button>
          <button
            id="percentage"
            onClick={() => handleButtonClick("percentage")}
            className="light-gray"
          >
            %
          </button>
          <button
            id="divide"
            onClick={() => handleButtonClick("/")}
            className="yellow"
          >
            /
          </button>
          <button
            id="seven"
            onClick={() => handleButtonClick("7")}
            className="dark-gray"
          >
            7
          </button>
          <button
            id="eight"
            onClick={() => handleButtonClick("8")}
            className="dark-gray"
          >
            8
          </button>
          <button
            id="nine"
            onClick={() => handleButtonClick("9")}
            className="dark-gray"
          >
            9
          </button>
          <button
            id="multiply"
            onClick={() => handleButtonClick("*")}
            className="yellow"
          >
            *
          </button>
          <button
            id="four"
            onClick={() => handleButtonClick("4")}
            className="dark-gray"
          >
            4
          </button>
          <button
            id="five"
            onClick={() => handleButtonClick("5")}
            className="dark-gray"
          >
            5
          </button>
          <button
            id="six"
            onClick={() => handleButtonClick("6")}
            className="dark-gray"
          >
            6
          </button>
          <button
            id="subtract"
            onClick={() => handleButtonClick("-")}
            className="yellow"
          >
            -
          </button>
          <button
            id="one"
            onClick={() => handleButtonClick("1")}
            className="dark-gray"
          >
            1
          </button>
          <button
            id="two"
            onClick={() => handleButtonClick("2")}
            className="dark-gray"
          >
            2
          </button>
          <button
            id="three"
            onClick={() => handleButtonClick("3")}
            className="dark-gray"
          >
            3
          </button>
          <button
            id="add"
            onClick={() => handleButtonClick("+")}
            className="yellow"
          >
            +
          </button>
          <button
            id="zero"
            onClick={() => handleButtonClick("0")}
            className="dark-gray"
          >
            0
          </button>
          <button
            id="decimal"
            onClick={() => handleButtonClick(".")}
            className="dark-gray"
          >
            .
          </button>
          <button
            id="equals"
            onClick={() => handleButtonClick("=")}
            className="yellow"
          >
            =
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
// function App() {
//   const [formula, setFormula] = useState("0");
//   const [display, setDisplay] = useState("0");

//   const handleNumberClick = (event) => {
//     let number = event.target.textContent;

//     if (display === "0") {
//       setFormula(number);
//       setDisplay(number);
//     } else if (
//       display === "+" ||
//       display === "-" ||
//       display === "*" ||
//       display === "/"
//     ) {
//       setFormula(formula + number);
//       setDisplay(number);
//     } else {
//       setFormula(formula + number);
//       setDisplay(display + number);
//     }
//   };

//   const handleOperatorClick = (event) => {
//     let operatorName = event.target.id;
//     let operator;

//     switch (operatorName) {
//       case "add":
//         operator = "+";
//         break;
//       case "subtract":
//         operator = "-";
//         break;
//       case "multiply":
//         operator = "*";
//         break;
//       case "divide":
//         operator = "/";
//         break;
//     }
//     setDisplay(operator);
//     setFormula(formula + " " + operator + " ");
//   };

//   const calculateFormula = () => {
//     const result = eval(formula);
//     setDisplay(result);
//     setFormula(formula + " " + "=" + " " + result.toString());
//   };

//   const handleDecimal = () => {
//     const array = formula.split(" ");
//     const lastElement = array[array.length - 1];
//     console.log(array, lastElement);

//     if (!lastElement.includes(".")) {
//       setFormula(formula + ".");
//       setDisplay(display + ".");
//     }
//   };

//   const handleClearClick = () => {
//     setFormula("0");
//     setDisplay("0");
//   };

//   return (
//     <div id="calculator">
//       <div className="formula-screen">
//         <p>{formula}</p>
//       </div>
//       <div id="display" className="output-screen">
//         <p>{display}</p>
//       </div>
//       <div id="button-container">
//         <button id="clear" className="jumbo" onClick={handleClearClick}>
//           AC
//         </button>
//         <button id="divide" className="operator" onClick={handleOperatorClick}>
//           /
//         </button>
//         <button
//           id="multiply"
//           className="operator"
//           onClick={handleOperatorClick}
//         >
//           x
//         </button>
//         <button id="seven" className="number" onClick={handleNumberClick}>
//           7
//         </button>
//         <button id="eight" className="number" onClick={handleNumberClick}>
//           8
//         </button>
//         <button id="nine" className="number" onClick={handleNumberClick}>
//           9
//         </button>
//         <button
//           id="subtract"
//           className="operator"
//           onClick={handleOperatorClick}
//         >
//           -
//         </button>
//         <button id="four" className="number" onClick={handleNumberClick}>
//           4
//         </button>
//         <button id="five" className="number" onClick={handleNumberClick}>
//           5
//         </button>
//         <button id="six" className="number" onClick={handleNumberClick}>
//           6
//         </button>
//         <button id="add" className="operator" onClick={handleOperatorClick}>
//           +
//         </button>
//         <button id="one" className="number" onClick={handleNumberClick}>
//           1
//         </button>
//         <button id="two" className="number" onClick={handleNumberClick}>
//           2
//         </button>
//         <button id="three" className="number" onClick={handleNumberClick}>
//           3
//         </button>

//         <button id="zero" className="number jumbo" onClick={handleNumberClick}>
//           0
//         </button>
//         <button id="decimal" className="number" onClick={handleDecimal}>
//           .
//         </button>
//         <button id="equals" onClick={calculateFormula}>
//           =
//         </button>
//       </div>
//     </div>
//   );
// }
