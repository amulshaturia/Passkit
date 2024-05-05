import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Main.css'

const Main = (props) => {
  const { loggedIn, email } = props
  const navigate = useNavigate()

  const onButtonClick = () => {
    navigate("/Login"); 
  }

  return (
    <div className="mainContainer">
      <div className={'titleContainer'}>
        <div>Welcome!</div>
      </div>
      <div> <h5>Memorizing password ends here</h5> </div>
      <div className={'buttonContainer'}>
        <input
          className={'inputButton'}
          type="button"
          onClick={onButtonClick}
          value={loggedIn ? 'Log out' : 'Log in'}
        />
        <div><i>By : Amul Shaturia</i></div>
      </div>
    </div>
  )
}

export default Main