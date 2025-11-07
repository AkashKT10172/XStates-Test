import { useState, useEffect } from 'react'
import axios from "axios"
import './States.css'

function States() {
  const [count, setCount] = useState(0)
  const [countreis, setCountries] = useState([])
  const [states, setStates] = useState([])
  const [cities, setCities] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [selectedState, setSelectedState] = useState(null)
  const [selectedCity, setSelectedCity] = useState(null)

  useEffect(() => {
    fetchCountries()
  }, [])

  const fetchCountries = async () => {
    try {
      const countriesRes = await axios.get("https://location-selector.labs.crio.do/countries")
      setCountries(countriesRes.data)
    } catch (error) {
      console.error("Error fetching countries:", error)
    }
  }

  const fetchStates = async (countryName) => {
    try {
      const statesRes = await axios.get(`https://location-selector.labs.crio.do/country=${countryName}/states`)
      setStates(statesRes.data)
    } catch (error) {
      console.error("Error fetching states:", error)
    }
  }

  const fetchCities = async (countryName, stateName) => {
    try {
      const citeisRes = await axios.get(`https://location-selector.labs.crio.do/country=${countryName}/state=${stateName}/cities`)
      setCities(citeisRes.data)
      console.log(citeisRes);
    } catch (error) {
      console.error("Error fetching cities:", error)
    }
  }

  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value
    setSelectedCountry(selectedCountry)
    fetchStates(selectedCountry)
  }

  const handleStateChange = (event) => {
    const selectedState = event.target.value
    setSelectedState(selectedState)
    fetchCities(selectedCountry, selectedState)
  }

  const handleCityChange = (event) => {
    const selectedCity = event.target.value
    setSelectedCity(selectedCity)
  }

  return (
    <div>
      <h1>Select Location</h1>
      <div>
        <select id={"Country"} value={selectedCountry} onChange={handleCountryChange}>
          <option>Select Country</option>
          {
            countreis.map(eachCountry => (
              <option key={eachCountry} value={eachCountry}>
                {eachCountry}
              </option>
            ))
          }
        </select>
        <select id={"States"} value={selectedState} onChange={handleStateChange} disabled={!selectedCountry}>
          <option>Select State</option>
          {
            states.map(eachState => (
              <option key={eachState} value={eachState}>
                {eachState}
              </option>
            ))
          }
        </select>
        <select id={"Cities"} value={selectedCity} onChange={handleCityChange} disabled={!selectedState}>
          <option>Select City</option>
          {
            cities.map(eachCity => (
              <option key={eachCity} value={eachCity}>
                {eachCity}
              </option>
            ))
          }
        </select>
        {selectedCity && (
          <h2>
            You selected <span>{selectedCity}</span>,
            <span>
              {" "}
              {selectedState}, {selectedCountry}
            </span>
          </h2>
        )}
      </div>
    </div>
  )
}

export default States
