import React from 'react';
import axios from 'axios';

import { Info } from "../Card/Info";
import { useCart } from "../../hooks/useCart";

import styles from './Drawer.module.scss';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Drawer({onClose, onRemove, items = [], opened}) {
  const {cartItems, setCartItems, totalPrice} = useCart();
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false );

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await
      axios.post('https://641c1b8a1f5d999a44719729.mockapi.io/orders', {items: cartItems});

      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i=0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete('https://6419b14fc152063412c93ba7.mockapi.io/cart' + item.id);
        await delay(1000);
      };

    } catch (error) {
      alert('Ощибка создания заказа :(');
    };
    setIsLoading(false);
  };

  return (
    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>
      <div className={styles.drawer}>
        <h2>Корзина
          <img onClick={onClose}
           className="removeBigBtn" src="img/btn-remove.svg" alt="Close"/>
        </h2>
          {items.length > 0 ? (
          <div>
            <div className="items">
            {items.map((obj) => (
              <div  key={obj.id} className="cartItem">
                <div 
                  style={{backgroundImage: `url(${obj.imageUrl})`}} 
                  className="cartItemImg"></div>
                <div className="cartItem-wrapper">
                  <p>{obj.title}</p>
                  <b>{obj.price} руб.</b>
                </div>
                  <img 
                    onClick={() => onRemove(obj.id)}
                    className="removeBtn" 
                    src="img/btn-remove.svg" 
                    alt="Remove"
                  />
              </div>
            ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice} руб.</b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{Math.round((totalPrice / 100) * 5)} руб.</b>
                </li>
                <button disabled={isLoading} onClick={onClickOrder} className="greenButton">Оформить заказ
                <img src="img/arrow.svg" alt="arrow"/></button>
              </ul>
            </div> 
          </div>
        ) : (
          <Info
            title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
            description={isOrderComplete ?
              `Ваш заказ #${orderId} скоро будет передан курьерской доставке` :
              "Добавьте хотя бы одну пару кроссовок, чтоыб сделать заказ"}
            image={isOrderComplete ? "../img/complete-order.jpg" : "../img/empty-cart.jpg"}  
          />
        )}
      </div>
    </div>
  )
}
