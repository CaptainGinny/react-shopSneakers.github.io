import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../hooks/useCart';

export default function Header(props) {

  const {totalPrice} = useCart();

  return (
    <header>
      <Link to="/" style={{textDecoration: 'none'}}>
        <div className="headerLeft">
          <img width={40} height={40} src="img/logo.svg" alt="logo"/>
          <div>
            <h3 className="text-logo">React Shop-Sneakers</h3>
            <p>Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className="/headerRight">
        <li onClick={props.onClickCart}>
          <img width={18} height={18} src="img/cart.svg" alt="cart"/>
            <span>{totalPrice} руб.</span>
        </li>
        <li>
        <Link to="/favorites">
          <img width={18} height={18} src="img/heart.svg" alt="favorites"/>
        </Link>
        </li>
        <li>
        <Link to="/orders">
          <img width={18} height={18} src="img/user.svg" alt="user"/>
        </Link>
        </li>
      </ul>
    </header>
  )
}
