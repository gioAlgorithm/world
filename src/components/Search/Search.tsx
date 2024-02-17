"use client"
import React, { useRef, useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useCountries } from "../../hooks/useCountries";
import Link from "next/link";
import style from "./Search.module.scss"

export default function Search() {
  const [text, setText] = useState("");
  // declaring states for search
  const [query, setQuery] = useState("");
  // import graphql data
  const { data, error, loading } = useCountries();

  // drop-down menu div whenever the user types 2 or more characters in input
  const [showMenu, setShowMenu] = useState(false);

  const handleChange = (e: any) => {
    const inputValue = e.target.value;
    if (inputValue.length >= 2) {
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
    setQuery(inputValue.toLowerCase()); // Convert input to lowercase and set as query state
    setText(inputValue);
  };

  // handle focus
  const searchRef = useRef<HTMLDivElement | any>(null);

  const handleFocus = () => {
    searchRef.current.parentElement.classList.add("focus");
  };

  // handle click of the link
  const handleLink = () => {
    setShowMenu(false);
    setText("");
  };

  // detecting outside click
  const menuRef: any = useRef(null);

  useEffect(() => {
    let handler = (event: any) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  // handle graphql data
  if (error) {
    return <div>error</div>;
  }

  

  return (
    <div>
      {!loading && 
      
      <div className={style.searchContainer}>
        <div className={style.search} onFocus={handleFocus}>
          <AiOutlineSearch fill="rgb(42, 148, 152)" />
          <input
            type="text"
            value={text}
            placeholder="Enter a country name..."
            ref={searchRef}
            onChange={handleChange}
          />
        </div>
        {showMenu && (
          <div className={style.menu} ref={menuRef}>
            {data.countries.edges
              .filter((country: any) => country.node.name.toLowerCase().startsWith(query))
              .slice(0, 7)
              .map((country: any) => {
                return (
                  <Link
                    key={country.node.name}
                    href={`/Country/${encodeURIComponent(country.node.name)}`}
                    onClick={handleLink}
                    className={style.menuCard}
                  >
                    <div style={{ backgroundImage: `url(${country.node.flag})` }}></div>
                    <h1>{country.node.name}</h1>
                  </Link>
                );
              })}
              {data.countries.edges.filter((country: any) => country.node.name.toLowerCase().startsWith(query))
                  .length === 0 && (
                  <div className={style.noData}>No matching countries found.</div>
              )}
          </div>
        )}
      </div>}
    </div>
  );
}
