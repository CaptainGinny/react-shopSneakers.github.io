import React from 'react'
import Card from '../components/Card'
import AppContext from '../context';

export default function Favotites({onAddToFavorite}) {
  const {favorites} = React.useContext(AppContext);
 
  return (
    <div className="content">
      <div className="search">
        <h1>Мои закладки</h1> 
      </div>
      <div className="sneakers">
        {favorites
        .map((item) => ( 
          <Card
            key={item.imageUrl}
            favorited={true}
            onFavorite={onAddToFavorite}
            {...item} 
          />
        ))}  
      </div>
    </div>
  )
}
