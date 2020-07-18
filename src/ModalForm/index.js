import React, { useEffect, useState, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import EditorContainer from '../Editor'
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import "./index.css";
import { lanes } from '../Store.js'

export default function Modal({ open, setOpen, cards, setCards }) {
  const modalRef = useRef();
  const [editorState, setEditorState] = useState(() => {
    var initState = open.id != null ? EditorState.createWithContent(convertFromRaw(JSON.parse((cards.filter(card => card.id === open.id)[0].richtext)))) : EditorState.createEmpty()
    return initState;
  });

  var maxID = (cards.length === 0 ? 0 : Math.max.apply(Math, cards.map(function (d) { return Number(d.id); })))
  const contentState = editorState.getCurrentContent();

  const [form, setForm] = useState(() => {
    let initState = (open.id != null ? cards.filter(card => card.id === open.id)[0] : '');
    return initState;
  });
  
  const newItem = {
    id: open.id != null ?  open.id : (1 + (maxID != null ? maxID : 0)),
    status: form.status != null ? form.status : 'To-Do',
    dueDate: form.dueDate != null ? form.dueDate : null,
    color: form.color  != null ? form.color : "#FF0000",
    title: form.title  != null ? form.title : "",
    richtext: JSON.stringify(convertToRaw(contentState))  != null ? JSON.stringify(convertToRaw(contentState)) :  EditorState.createEmpty()
  };


  const deleteCard = () => {
    let cardList = cards.filter(item => item.id !== Number(open.id))
    localStorage.setItem("cards", JSON.stringify(cardList));
    setCards(cardList)
    setOpen({ ...open, status: false })
  }


  const handleClick = (ev) => {
    if (modalRef.current.contains(ev.target)) {
      return;
    }
    // outside click
    setOpen({ ...open, status: false });
  };

  const handleChange = (ev) => {

    let key = (ev.target.id)
    let value = (ev.target.value)
    setForm({ ...form, [key]: value })
  };

  const submitCard = (ev) => {
    ev.preventDefault(ev);
    
    var cardList;
    if (open.id == null) {
      cardList = [...cards, newItem]
    }
    else {
      cardList = cards
      let index = cardList.map(function (e) { return e.id; }).indexOf(open.id);
      cardList.splice(index, 1, newItem)
    }
    //Update State and Local Storage with the new card
    setCards(cardList)
    localStorage.setItem("cards", JSON.stringify(cardList));

    setOpen({ ...open, status: false }); //Close the Modal Form
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  });

  return (
    <div className="modal-cover">
      <CSSTransition
        in={open.status}
        timeout={200}
        appear={true}
        classNames="fadein"
        unmountOnExit
      >
        <div className="modal-area" ref={modalRef}>
          <button className="modal-close" onClick={() => setOpen({ ...open, status: false })}>
            <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-x-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
              <path fillRule="evenodd" d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z" />
              <path fillRule="evenodd" d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z" />
            </svg>
          </button>
          <div className="modal-body">
            <h1> {open.id != null ? 'Edit Card' : 'Create New Card'}</h1>
            <form onSubmit={submitCard}>
              <div className="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">Title</span>
                </div>
                <input className="form-control" id="title" value={form.title} onChange={handleChange} required />
              </div>
              <div className="row">
                <div className="col-8">
                  <div className="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1">Due Date</span>
                    </div>
                    <input className="form-control" type="date" id="dueDate" min="2000-01-01" max="2099-12-31" value={form.dueDate} onChange={handleChange} required />
                  </div>
                </div>
                <div className="col-4">
                  <div className="input-group mb-3">
                    <div class="input-group-prepend">
                      <span class="input-group-text" id="basic-addon1">Color</span>
                    </div>
                    <input className="form-control" id="color" type="color" value={form.color} onChange={handleChange} />
                  </div>
                </div>
              </div>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <label class="input-group-text" for="inputGroupSelect01">Status</label>
                </div>
                <select class="custom-select" id="status" onChange={handleChange}>
                  <option selected value={form.status}>{form.status}</option>
                  {
                    lanes.map(lane =>
                      form.status != lane ? <option value={lane}>{lane}</option> : null
                    )
                  }
                </select>
              </div>
              <br></br>
              <EditorContainer id="richtext" setEditorState={setEditorState} editorState={editorState} />
              <br></br>
              <div style={{ 'display': 'flex', 'white-space': 'nowrap' }}>
                <button className="form-control btn btn-primary" type="submit">{open.id == null ? 'Submit' : 'Save Card'}</button>
                {open.id != null && (
                  <button className="btn btn-danger btn-secondary" onClick={deleteCard}>Delete Card</button>
                )}
              </div>
            </form>
            <span style={{ 'float': 'right', 'padding': '5px', 'font-size': '.7rem' }}>#{open.id == null ? (1 + (maxID != null ? maxID : 0)) : open.id}</span>
          </div>
        </div>
      </CSSTransition>
    </div>
  )
};

