import React from 'react'
import AppContext from '../../context'

export const Info = ({ title, image, description }) => {

  const {setCartOpened} = React.useContext(AppContext);

  return (
    <>
      <div className="cartEmpty">
        <img className="cartImg" width={120} src={image} alt="Cart"/>
        <h2>{title}</h2>
        <p>{description}</p>
        <button onClick={ () => setCartOpened(false)} className="greenButtonCart">
          <img src="/img/arrow.svg" alt="Arrow"/>Вернуться назад
        </button>
      </div> 
    </>
  )
}
