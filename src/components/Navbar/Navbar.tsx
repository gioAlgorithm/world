import React from 'react'
import Link from 'next/link'
import style from "./Navbar.module.scss"
import Image from 'next/image'
// importing logos
import miniLogo from "../../../public/images/logo-small.png"
import logo from "../../../public/images/logo.png"
import Search from '../Search/Search'

export default function Navbar() {
  return (
    <div className={style.navbar}>
      <div>
        <Link href="/"><Image className={style.logo} alt='logo' width={150} height={70} src={logo} /></Link>
        <Link href="/"><Image className={style.miniLogo} alt='logo' width={40} height={70} src={miniLogo} /></Link>
      </div>
      <Search />
    </div>
  )
}
