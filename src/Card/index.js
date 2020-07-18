
import React, { useState } from "react";
import "./index.css";
import { CSSTransition } from 'react-transition-group';
import { convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
export default function Card({ id, index, dropTarget, cards, setCards, setDropTarget, title, setOpen }) {

  const [showCardDetails, setShowCardDetails] = useState(false);

  const onDragStart = (ev) => {
    setDropTarget({ dropTarget: null, dropCard: ev.target.dataset.id })
  }

  const toggleDetails = () => {
    setShowCardDetails(!showCardDetails)
  }

  const openModalwData = () => {
    setOpen({ id: id, status: true });
  }

  const createMarkup = (d) => {
    return { __html: d };
  }

  var cardData = cards.filter(item => item.id === Number(id))
  let cardDetails;

  if (showCardDetails !== false) {
    const rawContentState = stateToHTML(convertFromRaw(JSON.parse(cardData[0].richtext)));
    cardDetails = (
      <div className="card-detail">
        <hr></hr>
        <div style={{ 'float':'right','padding-right': '10px'}}>
          <svg  width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-calendar2-check" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
            <path fill-rule="evenodd" d="M14 2H2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1zM2 1a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2z" />
            <path fill-rule="evenodd" d="M3.5 0a.5.5 0 0 1 .5.5V1a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 .5-.5zm9 0a.5.5 0 0 1 .5.5V1a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 .5-.5z" />
            <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z" />
          </svg>
          <span style={{'padding-left': '5px'}}>{cardData[0].dueDate}</span>
        </div>
        <br></br>
        <div style={{'padding': '5px'}} dangerouslySetInnerHTML={createMarkup(rawContentState)} />
      </div>
    );
  }

  return (
    <div
      data-id={id}
      key={id}
      data-position={index}
      draggable
      className={showCardDetails !== false ? "card card--is-open" : "card"}
      onClick={toggleDetails}
      onDragStart={onDragStart}
    >
      <div className="card-side" style={{ 'backgroundColor': cardData[0].color }} />
      {title}
      <div className="card-edit" key={id} onClick={openModalwData} >
        <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M11.293 1.293a1 1 0 0 1 1.414 0l2 2a1 1 0 0 1 0 1.414l-9 9a1 1 0 0 1-.39.242l-3 1a1 1 0 0 1-1.266-1.265l1-3a1 1 0 0 1 .242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z" />
          <path fillRule="evenodd" d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 0 0 .5.5H4v.5a.5.5 0 0 0 .5.5H5v.5a.5.5 0 0 0 .5.5H6v-1.5a.5.5 0 0 0-.5-.5H5v-.5a.5.5 0 0 0-.5-.5H3z" />
        </svg>
      </div>
      <CSSTransition
        in={showCardDetails}
        timeout={333}
        classNames="toggle"
        unmountOnExit
      >
        <div>{cardDetails}</div>
      </CSSTransition>
    </div>
  )
}
