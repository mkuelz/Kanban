import React from "react";
import Card from '../Card'
import './index.css'

export default function List({ title, dropTarget, setDropTarget, cards, setCards, setOpen}) {

  const onDrop = () => {
    let cardList = JSON.parse(localStorage.getItem("cards"))

    for (var i = 0; i < cardList.length; ++i) {
      if (cardList[i]['id'] == dropTarget.dropCard) {
        cardList[i]['status'] = dropTarget.dropToLoc;
      }
    }
    localStorage.setItem("cards", JSON.stringify(cardList))
    setCards(cardList)
  }

  const onDragOver = (ev) => {
    ev.preventDefault();

    let draggedTo = (ev.currentTarget.dataset.list)
    setDropTarget({ ...dropTarget, dropToLoc: draggedTo })
  }

  const cardList = cards.filter(card => card.status === title)

  return (
    <div className="laneContainer">
      <h2>{title}</h2>
      <div className="lane" data-list={title} onDrop={onDrop} onDragOver={onDragOver}>
        {
          cardList.map((card, index) =>
            <Card
              id={card.id}
              key={card.id}
              index={index}
              cards={cards}
              setCards={setCards}
              dropTarget={dropTarget}
              setDropTarget={setDropTarget}
              title={card.title}
              desc={card.desc}
              draggable
              setOpen={setOpen}
            >
            </Card>
          )
        }
      </div>
    </div>
  )
}
