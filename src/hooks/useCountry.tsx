"use client"
import { gql, useQuery } from "@apollo/client";

const GET_COUNTRY = gql`
query getCountry($name: String!){
    countries(name: $name) {
    edges {
      node {
        name
        topLevelDomain
        callingCodes
        capital
        altSpellings
        region
        subregion
        population
        latLng
        area
        timezones
        borders
        nativeName
        currencies{
          edges{
            node{
              name
              
            }
          }
        }
        languages{
          edges{
            node{
              name
              nativeName
              
            }
          }
        }
        flag
        regionalBlocs{
          edges{
            node{
              name
              
            }
          }
        }
      }
      }
    }
}
`

export const useCountry = (name: string)=>{
    const {data, loading, error} = useQuery(GET_COUNTRY, {
        variables:{name}
    })
    return{
        data, error, loading
    }
}