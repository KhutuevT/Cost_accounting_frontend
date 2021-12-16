let whereText = null;
let howNumber = null;
let inputWhere = null;
let inputHow = null;

const PORT = 8000;

window.onload = () => {
  inputWhere = document.getElementById("input-where");
  inputHow = document.getElementById("input-how");
  inputWhere.addEventListener("change", updateWhereText);
  inputHow.addEventListener("change", updateHowText);
};

const postPachData = async (method = "", url = "", data = {}) => {
  const response = await fetch(url, {
    method : method,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(data),
  });
  return response;
};

const updateWhereText = (Event) => {
  whereText = Event.target.value;
};

const updateHowText = (Event) => {
  if (+Event.target.value) {
    howNumber = Event.target.value;
  } else {
    inputHow.value = "";
    alert("Введите числовое значение!");
  }
};

const onButtonAddClick = async () => {
  if (whereText !== null && howNumber !== null) {
    console.log(whereText, howNumber);
    postPachData("POST", `http://localhost:${PORT}/newReceipt`, {
      text: whereText,
      cost: howNumber,
    }).then((data) => {
      console.log("123123", data);
    }).catch((err) => {
      console.log(err)
    })

  } else alert("Введите данные!");
  whereText = null;
  howNumber = null;
  inputHow.value = "";
  inputWhere.value = "";
};

const render = () => {
  console.log("render");
};
