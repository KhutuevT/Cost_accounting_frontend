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
  render();
};

const postPachData = async (method = "", url = "", data = {}) => {
  const response = await fetch(url, {
    method,
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
    postPachData("POST", `http://localhost:${PORT}/newReceipt`, {
      text: whereText,
      cost: howNumber,
    })
      .then((data) => {
        render();
      })
      .catch((err) => {
        console.error(err);
      });
  } else alert("Введите данные!");
  whereText = null;
  howNumber = null;
  inputHow.value = "";
  inputWhere.value = "";
};

const onClickEdit = async (index, receiptArr) => {
  const { _id, text, cost, date } = receiptArr[index];
  let editText = text;
  let editCost = cost;
  let editDate = date;

  const container = document.getElementById(`receipt=${_id}`);
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  const inputText = document.createElement("input");
  inputText.value = text;
  inputText.addEventListener("change", (Event) => {
    editText = Event.target.value;
  });

  const inputCost = document.createElement("input");
  inputCost.value = cost;
  inputCost.addEventListener("change", (Event) => {
    editCost = Event.target.value;
  });

  const inputDate = document.createElement("input");
  inputDate.value = date;
  inputDate.addEventListener("change", (Event) => {
    editDate = Event.target.value;
  });

  const editSendButton = document.createElement("button");
  editSendButton.innerText = "Edit";

  editSendButton.onclick = () => {
    postPachData("PATCH", `http://localhost:${PORT}/updateReceipt`, {
      id: _id,
      text: editText,
      cost: editCost,
      date: editDate,
    })
      .then((data) => {
        render();
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const cancelButton = document.createElement("button");
  cancelButton.innerText = "Cancel";

  cancelButton.onclick = () => {
    render();
  };

  container.appendChild(inputText);
  container.appendChild(inputCost);
  container.appendChild(inputDate);
  container.appendChild(editSendButton);
  container.appendChild(cancelButton);
};

const onClickDelete = async (id) => {
  const resp = await fetch(`http://localhost:8000/deleteReceipt?id=${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
  });

  render();
};

const render = async () => {
  const response = await fetch(`http://localhost:${PORT}/allReceipts`, {
    method: "GET",
  });
  const result = await response.json();
  const receiptArr = result.data;

  const contentBlock = document.getElementById("content-container");

  while (contentBlock.firstChild) {
    contentBlock.removeChild(contentBlock.firstChild);
  }

  receiptArr.map((item, index) => {
    const { _id, text, cost, date } = item;
    const container = document.createElement("div");
    container.id = `receipt=${_id}`;

    const textBlock = document.createElement("p");
    textBlock.innerText = text;

    const costBlock = document.createElement("p");
    costBlock.innerText = cost;

    const dateBlock = document.createElement("p");
    dateBlock.innerText = date;

    container.appendChild(textBlock);
    container.appendChild(costBlock);
    container.appendChild(dateBlock);

    const receiptEdit = document.createElement("img");
    receiptEdit.src =
      "https://img.icons8.com/material-outlined/24/000000/pencil--v1.png";

    receiptEdit.onclick = () => {
      onClickEdit(index, receiptArr);
    };

    container.appendChild(receiptEdit);

    const receiptDelete = document.createElement("img");
    receiptDelete.src =
      "https://img.icons8.com/material-outlined/24/000000/delete-sign.png";

    receiptDelete.onclick = () => {
      onClickDelete(_id);
    };

    container.appendChild(receiptDelete);

    contentBlock.appendChild(container);
  });
};
