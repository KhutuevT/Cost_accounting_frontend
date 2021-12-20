let whereText,
  howNumber,
  inputWhere,
  inputHow = null;

const PORT = 8000;

const routes = {
  addNewReceipt:  {method: "POST", url: `http://localhost:${PORT}/newReceipt`},
  getAllReceipts: {method: "GET", url: `http://localhost:${PORT}/allReceipts`},
  deleteReceipt:  {method: "DELETE", url: `http://localhost:${PORT}/deleteReceipt`},
  updateReceipt:  {method: "PATCH", url: `http://localhost:${PORT}/updateReceipt`},
  allUserSpending:{method: "GET", url: `http://localhost:${PORT}/allUserSpending`},
};

window.onload = () => {
  inputWhere = document.getElementById("input-where");
  inputHow = document.getElementById("input-how");
  // inputWhere.addEventListener("change", updateWhereText);
  // inputHow.addEventListener("change", updateHowText);
  //render();
};

const urlRequests = async (route = "", data = {}) => {
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
     "Access-Control-Allow-Origin": "*",
  }
  if(route.method === "GET"){
    const response = await fetch(route.url, {method: "GET"});
    const result = await response.json();
    return result.data;
  } else {
    const response = await fetch(route.url, {
      method : route.method,
      headers,
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result.data;
  }
};

//Может можно как то объеденить
// const updateWhereText = (Event) => {
//   if(whereText.trim().lenght !== 0){
//     whereText = Event.target.value;
//   } else {
//     inputHow.value = "";
//     alert("Введите верное числовое значение!");
//   }
// };

// const updateHowText = (Event) => {
//   if (+Event.target.value && + Event.target.value > 0) {
//     howNumber = Event.target.value;
//   } else {
//     inputHow.value = "";
//     alert("Введите верное числовое значение!");
//   }
// };

// const addNewReceiptFunction = (data) => {

// }

// const deleteReceiptFunction = (id) => {

// }

// const updateReceiptFunction = (id) => {

// }

const getAllReceipts = async () => {
  const allReceipts = await urlRequests(routes.getAllReceipts);
  console.log(allReceipts)
  return await allReceipts.data
};


const test = async () => {
  a = await getAllReceipts()
  console.log(a)
}
