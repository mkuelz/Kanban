import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

var cardList = [{
    id: 1,
    title: "Sample Card: Edit Me!",
    color: "#ff0000",
    dueDate: "2021-12-31",
    richtext: '{"blocks":[{"key":"97lo3","text":"Task 1","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"8kglp","text":"Task 2","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"253j4","text":"Task 3","type":"ordered-list-item","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    status: "Backlog"
},];

if (localStorage.getItem("cards") == null) {
    console.log("no card data");
    localStorage.setItem("cards", JSON.stringify(cardList));
}

ReactDOM.render(
    <React.StrictMode >
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);

