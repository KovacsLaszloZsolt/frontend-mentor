const buttonsLabel = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  0,
  "DEL",
  "+",
  "-",
  ".",
  "/",
  "x",
  "RESET",
  "=",
];

class Calculator {
  constructor(buttonsLabel, theme) {
    this.operations = ["-", "+", "x", "/"];
    this.buttonsLabel = buttonsLabel;
    this.theme = theme;
    this.inputNum = "0";
    this.firstNum = null;
    this.secondNum = null;
    this.prevDisplayValue = "";
    this.firstOperation = "";
    this.secondOperation = "";
    this.result = null;
    this.prevInput = "";
    this.numMaxLength = 12;
  }

  init() {
    this.createButtons(this.buttonsLabel);
    this.setTheme(this.theme);

    const themeSelector = document.querySelector(".slider");
    themeSelector.value = this.theme;
    themeSelector.addEventListener("change", (e) => {
      this.theme = e.target.value;
      this.setTheme(this.theme);
      // "username=John Doe; expires=Thu, 18 Dec 2013 12:00:00 UTC; path=/";

      const expireDate = new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      );

      document.cookie = "ma=today;path=/`";
      document.cookie = `selectedTheme = ${
        this.theme
      }; expires=${expireDate.toUTCString()}; path=/`;
    });
  }

  createButtons(btns) {
    const buttonsCtn = document.querySelector(".buttons-ctn");
    btns.forEach((label, i) => {
      const btn = document.createElement("div");
      btn.setAttribute("data-value", label);
      btn.innerText = `${label}`;
      btn.classList.add("btn");
      btn.style.gridArea = `btn-${i}`;
      buttonsCtn.appendChild(btn);
      btn.addEventListener("click", (e) => {
        const btnValue = e.target.dataset.value;

        const checkNumLength = (num) => {
          num = num.toString();
          const nLength = num.length;
          if (num.length > this.numMaxLength) {
            const round = (n) => {
              let fixPart = n.slice(0, this.numMaxLength - 1);
              const r = n.slice(this.numMaxLength);

              const rounded = Math.round(
                parseFloat(`0.${n.slice(this.numMaxLength - 1)}`)
              );

              if (!rounded) {
                return fixPart;
              } else {
                const roundLastNum = (numForRound) => {
                  const lastNum = parseInt(numForRound.slice(-1)) + 1;
                  const fixNum =
                    numForRound.slice(0, -1).slice(-1) === "."
                      ? numForRound.slice(0, -2)
                      : numForRound.slice(0, -1);

                  if (lastNum > 9 && fixNum.includes(".")) {
                    return roundLastNum(fixNum);
                  } else if (lastNum > 9 && !fixNum.includes(".")) {
                    return parseInt(fixNum) + 1;
                  } else {
                    return `${fixNum}${lastNum}`;
                  }
                };
                return roundLastNum(fixPart);
              }
            };

            const dotIndex = num.indexOf(".");

            if (dotIndex === this.numMaxLength) {
              return checkNumLength(Math.round(parseFloat(num)));
            }

            if (dotIndex !== -1 && dotIndex < this.numMaxLength) {
              return round(num);
            } else {
              return "Error";
            }
          }

          return num;
        };

        const fulfilOperation = (num1, num2, operation) => {
          let result;
          switch (operation) {
            case "/":
              result = num1 / num2;
              break;
            case "x":
              result = num1 * num2;
              break;
            case "+":
              result = num1 + num2;
              break;
            case "-":
              result = num1 - num2;
              break;
          }

          return checkNumLength(result);
        };

        const checkOperations = () => {
          if (
            this.firstOperation === "x" ||
            this.firstOperation === "/" ||
            this.secondOperation === "-" ||
            this.secondOperation === "+"
          ) {
            this.firstNum = fulfilOperation(
              this.firstNum,
              this.secondNum,
              this.firstOperation
            );

            if (this.firstNum === "Error") {
              this.result = this.firstNum;
              this.setResult(this.result);
              return;
            }

            this.secondNum = null;
            this.firstOperation = this.secondOperation;
            this.secondOperation = "";
            this.prevDisplayValue = `${this.firstNum}${this.firstOperation}`;
            this.setDisplay(this.inputNum, this.prevDisplayValue);
          }

          if (this.secondOperation === "x" || this.secondOperation === "/") {
            this.prevDisplayValue = `${this.firstNum}${this.firstOperation}${this.secondNum}${this.secondOperation}`;
            this.setDisplay(this.inputNum, this.prevDisplayValue);
          }
        };

        if (btnValue === "RESET") {
          this.inputNum = "0";
          this.firstNum = null;
          this.secondNum = null;
          this.prevDisplayValue = "";
          this.firstOperation = "";
          this.secondOperation = "";
          this.result = null;
          this.setDisplay(this.inputNum, this.prevDisplayValue);
        }

        if (this.result === "Error") {
          return;
        }

        if (!isNaN(parseInt(btnValue))) {
          if (this.inputNum.length >= this.numMaxLength) {
            return;
          }

          if (this.result || this.inputNum === "0") {
            this.result = null;
            this.inputNum = btnValue;
          } else {
            this.inputNum += btnValue;
          }

          this.setDisplay(this.inputNum, this.prevDisplayValue);
        }

        if (btnValue === ".") {
          if (
            !this.inputNum.includes(".") &&
            this.inputNum.length < this.numMaxLength
          ) {
            this.inputNum += btnValue;
          }
          this.setDisplay(this.inputNum, this.prevDisplayValue);
        }

        if (btnValue === "DEL") {
          this.inputNum = this.inputNum.slice(0, -1);
          if (this.inputNum === "") {
            this.inputNum = "0";
          }

          this.setDisplay(this.inputNum, this.prevDisplayValue);
        }

        if (btnValue === "=") {
          if (this.firstNum === null) {
            return;
          } else if (this.secondNum === null) {
            this.secondNum = parseFloat(this.inputNum);
            this.result = fulfilOperation(
              this.firstNum,
              this.secondNum,
              this.firstOperation
            );
          } else {
            this.secondNum = fulfilOperation(
              this.secondNum,
              parseFloat(this.inputNum),
              this.secondOperation
            );

            if (this.secondNum === "Error") {
              this.result = this.secondNum;
              this.setResult(this.result);
              return;
            }

            this.result = fulfilOperation(
              this.firstNum,
              this.secondNum,
              this.firstOperation
            );
          }

          this.setResult(this.result);
        }

        if (this.operations.includes(btnValue)) {
          if (this.operations.includes(this.prevInput)) {
            if (this.secondOperation.length) {
              this.secondOperation = btnValue;
              checkOperations();
            } else {
              this.firstOperation = btnValue;
              this.prevDisplayValue = `${this.firstNum}${this.firstOperation}`;
              this.setDisplay(this.inputNum, this.prevDisplayValue);
            }
          } else {
            if (this.secondOperation.length) {
              this.secondNum = fulfilOperation(
                this.secondNum,
                parseFloat(this.inputNum),
                this.secondOperation
              );

              if (this.secondNum === "Error") {
                this.result = this.secondNum;
                this.setResult(this.result);
                return;
              }

              this.inputNum = "0";
              this.secondOperation = "";

              if (btnValue === "/" || btnValue === "x") {
                this.secondOperation = btnValue;
                this.prevDisplayValue = `${this.firstNum}${this.firstOperation}${this.secondNum}${this.secondOperation}`;
              } else {
                this.firstNum = fulfilOperation(
                  this.firstNum,
                  this.secondNum,
                  this.firstOperation
                );

                if (this.firstNum === "Error") {
                  this.result = this.firstNum;
                  this.setResult(this.result);
                  return;
                }

                this.firstOperation = btnValue;
                this.secondNum = null;
                this.prevDisplayValue = `${this.firstNum}${this.firstOperation}`;
              }

              this.setDisplay(this.inputNum, this.prevDisplayValue);
              return;
            }

            if (this.firstNum === null) {
              this.firstNum = parseFloat(this.inputNum);
              this.inputNum = "0";
              this.firstOperation = btnValue;
              this.prevDisplayValue = `${this.firstNum}${this.firstOperation}`;
              this.setDisplay(this.inputNum, this.prevDisplayValue);
            } else if (this.secondNum === null) {
              this.secondNum = parseFloat(this.inputNum);
              this.inputNum = "0";
              this.secondOperation = btnValue;

              checkOperations();
            }
          }
        }
        this.prevInput = btnValue;
      });
    });
  }

  setResult(forDisplay) {
    this.inputNum =
      typeof forDisplay === "number" ? forDisplay.toString() : forDisplay;
    this.firstNum = null;
    this.secondNum = null;
    this.prevDisplayValue = "";
    this.firstOperation = "";
    this.secondOperation = "";

    this.setDisplay(this.inputNum, this.prevDisplayValue);
  }

  setTheme(theme) {
    const body = document.querySelector("body");
    if (theme === 1) {
      body.dataset.theme = "";
    } else {
      body.dataset.theme = theme;
    }
  }

  setDisplay(currentValue, prevValue) {
    const displayCurrentResult = document.querySelector(".result");
    const displayPrevValue = document.querySelector(".prev-result");

    const changeDot = (value) => {
      return value.replace(".", ",");
    };

    displayCurrentResult.innerText = changeDot(currentValue);
    displayPrevValue.innerText = changeDot(prevValue.toString());
  }
}
const cookies = document.cookie
  .split(";")
  .map((cookie) => cookie.split("="))
  .reduce((a, [key, value]) => ({ ...a, [key.trim()]: value }), {});

const calc = new Calculator(
  buttonsLabel,
  cookies.selectedTheme ? parseInt(cookies.selectedTheme) : 1
);

calc.init();
