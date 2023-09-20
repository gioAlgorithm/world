import React from 'react'
import style from "./CountryContainer.module.scss"
import Link from 'next/link';

interface Props{
    letter: string
    countries: any
}

export default function CountryContainer({ letter, countries }: Props) {
    return (
      <div className={style.countriesContainer}>
        <h2>{letter}</h2>
        <div className={style.innerCountries}>
          {countries.map((item: any) => {
            return (
              <Link
                href={`/Country/${encodeURIComponent(item.node.name)}`}
                className={style.card}
                key={item.node.name}
              >
                <div style={{ backgroundImage: `url(${item.node.flag})` }}></div>
                <h1>{item.node.name}</h1>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
