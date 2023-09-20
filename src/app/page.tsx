"use client"
import style from './page.module.scss'
import React, {useState} from 'react'
import Loading from '@/components/Loading/Loading'
import { useCountries } from '@/hooks/useCountries'
import CountryContainer from '@/components/CountryContainer/CountryContainer'
import NavbarLetter from '@/components/NavbarLetter/NavbarLetter'

export default function Home() {
  const {loading, data, error} = useCountries();
  const [selectedletter, setSelectedLetter] = useState("all")

  if(loading) return <Loading />
  if(error) return <div>Something went wrong</div>

  // creating new array to hold the sorted countries.
  // and then sorting array by name
  const sortedCountries = [...data.countries.edges]

  sortedCountries.sort((a,b)=>
    a.node.name.localeCompare(b.node.name)
  )
  // group countries by initial letter
  const groupedCountries = sortedCountries.reduce((acc, item)=>{
    const letter = item.node.name.charAt(0).toUpperCase()
    if(!acc[letter]){
      acc[letter]=[]
    }
    acc[letter].push(item)
    return acc
  }, {})

  const handleLetterClick = (letter: string) =>{
    setSelectedLetter(letter)
  }

  const letters = Object.keys(groupedCountries)

  return (
    <>
      <main className={style.main}>
        <NavbarLetter 
          selectedLetter={selectedletter}
          onLetterClick={handleLetterClick}
          letters={letters}
        />
        {Object.entries(groupedCountries).map(([letter, countries]) => (
          <div
            key={letter}
            className={style.countriesMainContainer}
            style={{ display: selectedletter === letter || selectedletter === "all" ? "block" : "none" }}
          >
            <CountryContainer letter={letter} countries={countries} />
          </div>
        ))}
      </main>
    </>
  )
}
