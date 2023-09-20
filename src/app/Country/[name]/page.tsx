"use client"
import React from 'react'
import { useCountry } from '@/hooks/useCountry'
import Image from 'next/image'
import Loading from '@/components/Loading/Loading'
import style from "./Country.module.scss"
import {metadata} from "./metaData"
import { useEffect } from 'react'

interface Props{
  params:{
    name:string
  }
}

export default function Country({params}: Props) {
  // creating decoded uri to access the exact name 
  const decodedName = params.name ? decodeURIComponent(params.name as string) : '';

  const {data, error, loading} = useCountry(decodedName)
  // metadata 
  useEffect(() => {
    // Set the page title dynamically based on the country name
    if (data && data.countries.edges[0] && data.countries.edges[0].node.name) {
      metadata.title = `${data.countries.edges[0].node.name}`;
      if (metadata.title) {
        document.title = String(metadata.title);
      }
    }
  }, [data]);

  if (loading) return <Loading />

  if (error) {
    return <div>something went wrong</div>
  }

  return (
    <div className={style.country}>
      <div className={style.countryName}>
        <Image alt="flag" src={data.countries.edges[0].node.flag} width={256} height={160} />
        <h1>{data.countries.edges[0].node.name}</h1>
      </div>

      <div className={style.countryInfo}>

        <div className={style.countryFirst}>
          <span>Native Name:</span>
          <h1>{data.countries.edges[0].node.nativeName ? data.countries.edges[0].node.nativeName : "empty"}</h1>
        </div>

        <div className={style.countryFourth}>
          <span>Alternative Spellings:</span>
          <div>{data.countries.edges[0].node.altSpellings.map((spelling: string, index: number) =>{
            return(<p key={index}>{spelling ? spelling : "empty"}{index < data.countries.edges[0].node.altSpellings.length - 1 && ","}</p>)
          })}</div>
        </div>

        <div className={style.countryFirst}>
          <span>Region:</span>
          <h1>{data.countries.edges[0].node.region ? data.countries.edges[0].node.region : "empty"}</h1>
        </div>

        <div className={style.countrySecond}>
          <span>Subregion:</span>
          <h1>{data.countries.edges[0].node.subregion ? data.countries.edges[0].node.subregion : "empty"}</h1>
        </div>

        <div className={style.countryFirst}>
          <span>Capital:</span>
          <h1>{data.countries.edges[0].node.capital ? data.countries.edges[0].node.capital : "empty"}</h1>
        </div>

        <div className={style.countrySecond}>
          <span>Population:</span>
          <h1>{data.countries.edges[0].node.population ? data.countries.edges[0].node.population.toLocaleString() : 'empty'}</h1>
        </div>

        <div className={style.countryFirst}>
          <span>Area:</span>
          <h1>{data.countries.edges[0].node.area ? data.countries.edges[0].node.area.toLocaleString() + ' km²' : 'empty'}</h1>
        </div>

        <div className={style.countryFourth}>
          <span>Time Zones:</span>
          <div>{data.countries.edges[0].node.timezones.map((time: number,index: number)=>{
            return(<p key={index}>{time ? time : "empty"}{index < data.countries.edges[0].node.timezones.length - 1 && ","}</p>)
          })}</div>
        </div>

        <div className={style.countryFirst}>
          <span>Borders:</span>
          <h1>{data.countries.edges[0].node.borders.map((border: any, index: number)=>{
            return(<p key={index}>{border || "empty"}{index < data.countries.edges[0].node.borders.length - 1 && ","}</p>)
          })}</h1>
        </div>

        <div className={style.countryFourth}>
          <span>Latitude & Longitude:</span>
          <div>{data.countries.edges[0].node.latLng.map((latLng: string, index: number)=>{
            return(<p key={index}>{latLng.toLocaleString() || "empty"}{index < data.countries.edges[0].node.latLng.length - 1 && ","}</p>)
          })}</div>
        </div>

        <div className={style.countryFirst}>
          <span>Languages:</span>
          <h1>{data.countries.edges[0].node.languages.edges.map((language: any, index: number)=>{
            return(<p key={index}>{language.node.name || "empty"}{index < data.countries.edges[0].node.languages.edges.length - 1 && ","}</p>)
          })}</h1>
        </div>

        <div className={style.countryFourth}>
          <span>Regional Blocs:</span>
          <div>{data.countries.edges[0].node.regionalBlocs.edges.map((regionalBlocs: any, index: number)=>{
            return(<p key={index}>{regionalBlocs.node.name || "empty"}{index < data.countries.edges[0].node.regionalBlocs.edges.length - 1 && ","}</p>)
          })}</div>
        </div>

        <div className={style.countryFirst}>
          <span>Currencies:</span>
          <h1>{data.countries.edges[0].node.currencies.edges.map((currencies: any, index: number)=>{
            return(<p key={index}>{currencies.node.name || "empty"}{index < data.countries.edges[0].node.currencies.edges.length - 1 && ","}</p>)
          })}</h1>
        </div>

        <div className={style.countrySecond}>
          <span>Top-level Domain:</span>
          <h1>{data.countries.edges[0].node.topLevelDomain.map((domain: string,index: number)=>{
            return(<p key={index}>{domain || "empty"}{index < data.countries.edges[0].node.topLevelDomain.length - 1 && ","}</p>)
          })}</h1>
        </div>

        <div className={style.countryFirst}>
          <span>Calling Codes:</span>
          <h1>{data.countries.edges[0].node.callingCodes.map((callingCodes: string,index: number)=>{
            return(<p key={index}>+{callingCodes || "empty"}{index < data.countries.edges[0].node.callingCodes.length - 1 && ","}</p>)
          })}</h1>
        </div>
      </div>
    </div>
  )
}
