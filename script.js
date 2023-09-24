//Nav bar..
var navLinks = document.getElementById("navLinks");
function showMenu() {
  navLinks.style.left = "0px";
}
function hideMenu() {
  navLinks.style.left = "-300px";
}

// date and time...
let date = document.getElementById("date");
const options = {
  weekday: "long",
  //   year: "numeric",
  month: "long",
  day: "numeric",
};
let currentTime = new Date();
document.getElementById("date").innerHTML = date;
date.innerHTML = currentTime.toLocaleDateString(undefined, options);

// for todo list...
function getAndUpdate() {
  // console.log("Updating List...");
  task = document.getElementById("task").value;
  if (task.length > 1) {
    if (localStorage.getItem("itemsJson") == null) {
      itemJsonArray = [];
      itemJsonArray.push([task]);
      localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
    } else {
      itemJsonArrayStr = localStorage.getItem("itemsJson");
      itemJsonArray = JSON.parse(itemJsonArrayStr);
      itemJsonArray.push([task]);
      localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
    }
    update();
    document.getElementById("task").value = "";
  } else {
    alert("Please enter minimum 2 characters...");
  }
}
function update() {
  if (localStorage.getItem("itemsJson") == null) {
    itemJsonArray = [];
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  } else {
    itemJsonArrayStr = localStorage.getItem("itemsJson");
    itemJsonArray = JSON.parse(itemJsonArrayStr);
  }
  // populate the list...
  let listBody = document.getElementById("listBody");
  let str = "";
  itemJsonArray.forEach((element, index) => {
    str += `
        <div class="task">
            <div class="done-icon" onclick="workDone(${index})">
                <div class="fa fa-check"></div>
            </div>
            <div class="content">${element}</div>
            <div class="like-icon"><i class="fa fa-star" onclick="like(${index})"></i></div>
            <div class="delete-icon">
                <div class="fa fa-trash" onclick="dlt(${index})"></div>
            </div>
        </div>
        `;
  });
  listBody.innerHTML = str;
}

//
function clrFill() {
  task.clear();
}

// add button...
add = document.getElementById("add");
add.addEventListener("click", getAndUpdate);
// Add a keypress event listener
var task = document.getElementById("task");
task.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key
  if (event.key === "Enter") {
    // Do something
    // console.log("You pressed enter!");
    getAndUpdate();
  }
});
update();

//delete an task...
function dlt(item) {
  console.log("Delete", item);
  itemJsonArrayStr = localStorage.getItem("itemsJson");
  itemJsonArray = JSON.parse(itemJsonArrayStr);
  // Delete itemIndex element from the array
  itemJsonArray.splice(item, 1);
  localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  update();
}

// clear whole list...
function clr() {
  if (confirm("Do you really want to clear..?")) {
    console.log("clear...");
    localStorage.clear();
    update();
  }
}

// make as done..
function workDone(itemIndex) {
  console.log("Done", itemIndex);
  let elemClass1 = document.getElementsByClassName("content"); //select by class
  let elemClass2 = document.getElementsByClassName("done-icon"); //select by class
  if (elemClass2[itemIndex].style.color === "white") {
    elemClass1[itemIndex].style.textDecoration = "none";
    elemClass1[itemIndex].style.color = "white";
    elemClass2[itemIndex].style.color = "transparent";
  } else {
    console.log(elemClass1);
    elemClass1[itemIndex].style.textDecoration = "line-through";
    elemClass1[itemIndex].style.color = "red";
    elemClass2[itemIndex].style.color = "white";
  }
}

// like an task...
function like(itemIndex) {
  console.log("Done", itemIndex);
  let elemClass = document.getElementsByClassName("like-icon"); //select by class
  if (elemClass[itemIndex].style.color === "pink") {
    elemClass[itemIndex].style.color = "white";
  } else {
    elemClass[itemIndex].style.color = "pink";
  }
}
