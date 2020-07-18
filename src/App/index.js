import React, { useState } from "react";
import "./index.css";
import Modal from '../ModalForm'
import List from '../List'
import {lanes} from '../Store.js'

const initdropTarget = {
  dropToLoc: '',
  dropToType: '',
  dropCard: ''
}

const initSetOpen = {
  status: false,
  ID: null
}

export default function App() {
  const [cards, setCards] = useState(JSON.parse(localStorage.getItem("cards")))
  const [dropTarget, setDropTarget] = useState(initdropTarget)
  const [open, setOpen] = useState(initSetOpen)

  return (
    <div className="App" >
      <div className="navbar navbar-dark bg-dark">Kanban Board
        <div className="float-button" onClick={() => setOpen({ id: null, status: true })}> Add Card </div>
      </div>
      {open.status && (
        <Modal open={open} setOpen={setOpen} cards={cards} setCards={setCards}></Modal>
      )}
      <br />
      <div style={{ 'height': '100%' }}>
        {
          lanes.map((lane) =>
            <List title={lane} dropTarget={dropTarget} setDropTarget={setDropTarget} cards={cards} setCards={setCards} setOpen={setOpen}></List>
          )
        }
      </div>
    </div>
  );
}


