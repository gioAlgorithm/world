import React from 'react'
import style from "./NavbarLetter.module.scss"

interface Props{
  selectedLetter: string;
  onLetterClick: (letter: string) => void;
  letters: string[];
}

export default function NavbarLetter({selectedLetter, onLetterClick, letters}: Props) {
  return (
    <div className={style.navbarLetter}>
      <div className={style.InnerNavbarLetter}>
        <button className={selectedLetter === "all" ? style.activeLetter : ""} onClick={()=> onLetterClick("all")}>All</button>
        {letters.map((letter) => (
            <button
              className={selectedLetter === letter ? style.activeLetter : ""}
              onClick={() => onLetterClick(letter)}
              key={letter}
            >
              {letter}
            </button>
          ))}
      </div>
    </div>
  )
}
