import React from 'react';
import ContentLoader from 'react-content-loader';

import AppContext from '../../context';
import styles from './Card.module.scss';

export default function Card ({ 
  id, title, 
  imageUrl, price, onFavorite,
  onPlus, 
  favorited = false,
  loading = false,
}) {
  const {isItemAdded} = React.useContext(AppContext);
  const [isFavorite, setIsFavorite] = React.useState(favorited);
  const obj = {id, parentId: id, title, imageUrl, price};

  const onClickPlus = () => {
    onPlus(obj);
  };

  const onClickFavorite = () => {
    onFavorite(obj);
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      {
        loading ? (<ContentLoader 
        speed={2}
        width={165}
        height={250}
        viewBox="0 0 155 265"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="0" y="0" rx="10" ry="10" width="155" height="155" /> 
        <rect x="0" y="167" rx="5" ry="5" width="155" height="15" /> 
        <rect x="0" y="187" rx="5" ry="5" width="100" height="15" /> 
        <rect x="0" y="234" rx="5" ry="5" width="80" height="25" /> 
        <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
      </ContentLoader> 
      ) : (
        <>
          {onFavorite && (
            <div className={styles.favorite} onClick={onClickFavorite}>
              <img src={isFavorite ? 'img/liked.svg' : 'img/unliked.svg'} alt="unliked"/> 
            </div>
          )}
          <img width="100%" height={135} src={imageUrl} alt="sneakers"/>
          <p>{title}</p>
          <div className={styles.cardBottom}>
            <div className={styles.cardPrice}>
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>
            {onPlus && 
              (<img
                className={styles.plus} 
                onClick={onClickPlus} 
                src={isItemAdded(id) ? "img/btn-checked.svg" : "img/btn-plus.svg"} 
                alt="plus"
              />)}
          </div>
        </> 
      )}
    </div>
  )
}
