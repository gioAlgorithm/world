import { gql, useQuery } from "@apollo/client"

const GET_COUNTRIES = gql`
query{
    countries {
      edges {
        node {
          name
          flag
        }
      }
    }
  }
`

export const useCountries =()=>{
    const {data,error,loading} = useQuery(GET_COUNTRIES)

    return {data,error,loading}
}