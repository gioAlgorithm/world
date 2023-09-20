import React from 'react'
import style from "./Loading.module.scss"

export default function Loading() {
  return (
    <div className={style.loading}>
      <h1>Loading</h1>
      <div className={style.loadingContainer}>
        <div className={style.dash} id={style.one}></div>
        <div className={style.dash} id={style.two}></div>
        <div className={style.dash} id={style.three}></div>
        <div className={style.dash} id={style.four}></div>
      </div>
    </div>
  )
}
