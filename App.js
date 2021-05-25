import React from 'react'
import "./App.css"
import { useState, useEffect } from "react"
import axios from "axios"
function App() {
  const [state, setState] = useState({
    name: "",
    surname: "",
    countryId: null,
    phoneNumber: null,
    organization: null,
    email: "",
    password: "",
    organizationName: "",
    passwordagain: ""
  })
  const [error, setError] = useState("")
  const { password, passwordagain } = state
  const [countrySelected, setCountrySelected] = useState(null)


  const inputHandler = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value
    })
  }
  const handleSelectChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value
    })
    setCountrySelected(value);
    
  }

  const [countries, setCountry] = useState()
  useEffect(
    () => {
      axios.get("http://40.127.175.214:8001/api/countries") //Method GET
        .then(respons => { setCountry(respons.data) })
        .catch(error => (error))
    },
    []
  )
  var prefix = countries?.find(p => p.id == countrySelected)


  function addd(e) {
    e.preventDefault();
    if (password?.length < 6) {
      setError("Sifre en az 6 reqem olmalidir")
    }
    if (password?.length != passwordagain?.length) {
      setError("Yeniden parolu duzgun daxil edin!")
    }
    let phone=prefix?.phonePrefix + state.phoneNumber
    setState({ phoneNumber:phone});

    let data = {
      ...state
    };

    delete data.passwordagain
    console.log(data)
    fetch(
      "http://40.127.175.214:8001/api/auth/register", //Method POST
      {
        method: "POST",
        body: JSON.stringify(

          data

        ),
        headers: {
          "content-type": "application/json; charset=UTF-8"
        }
      }
    )
      .then(a => a.json()).then(a => console.log(a))
  }


  const [show, setShow] = useState(false)
  const add=(e)=> {
    setShow(!show);
    setState({      
      ...state,
      [e.target.name]: e.target.checked
    })
    
  }
  return (
    <div className="App">
      <form>
        <div>
          <label>Ad*</label>
          <input
            required
            onChange={inputHandler}
            name="name"
            type="firstname"
            placeholder="adinizi daxil edin.."
          />
        </div>

        <div>
          <label>Soyad*</label>
          <input
            required
            onChange={inputHandler}
            name="surname"
            type="lastname"
            placeholder="soyadinizi daxil edin.."
          />
        </div>

        <div>
          <select name="countryId"
            onChange={(e) => handleSelectChange(e)} placeholder="Ölkə"
          >
            <option> Secin </option>
            {
              countries?.map(
                (i) => { return <option key={i.id} value={i.id}>{i.name}</option> }
              )
            }
          </select>
        </div>

        <div>
          <label>Nomre*</label>
          <span>
            {prefix?.phonePrefix}
          </span>
          <input name="phoneNumber" onChange={inputHandler} type="text" />
        </div>

        <div>
          <input name='organization' onChange={add} type="checkbox"  />
          <label>Sahibkar</label>
          <div>
            {
              show ? <p>Teskilatin adi*<input name="organizationName" onChange={inputHandler}/></p> : null
            }
          </div>
        </div>

        <div>
          <label>Elektron Poct*</label>
          <input
            required
            onChange={inputHandler}
            name="email"
            type="email"
            placeholder="emaili daxil edin.."
          />
        </div>

        <div>
          <label>Sifre*</label>
          <input
            onChange={inputHandler}
            name="password"
            type="password"
            placeholder="parol daxil edin.."
          />
        </div>

        <div>
          <label>Tekrar Sifre*</label>
          <input
            name="passwordagain"
            onChange={inputHandler}
            type="password"
            placeholder="tekrar parol daxil edin.."
          />
        </div>

        <button onClick={addd} type="submit">Submit</button>
        {
          error ? <p>{error}</p> : null
        }
      </form>
    </div>
  )
}

export default App