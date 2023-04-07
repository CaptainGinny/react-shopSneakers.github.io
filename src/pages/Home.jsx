import React from 'react'
import Card from "../components/Card";

export default function Home(
  { items,
    searchValue,
    onChangeSearchInput, 
    onAddToCart, 
    onAddToFavorite,
    isLoading, 
  }) {

    const renderItems = () => {
      const filtredItems = items.filter((item) =>
       item.title.toLowerCase().includes(searchValue.toLowerCase()),
      );

      return (isLoading ? [...Array(8)] : filtredItems).map((item) => (
          <Card
            key={item.imageUrl}
            onFavorite={(obj) => onAddToFavorite(obj)}
            onPlus={(obj) => onAddToCart(obj)}
            loading={isLoading}
            {...item}
          />
      ));
    };

  return (
    <div>
       <div className="content">
        <div className="search">
          <h1>{searchValue ? `Поиск по: "${searchValue}"` : 'Все кроссовки'}</h1>
          <div className="search-block">
            <img src="../img/search.svg" alt="Search"/>
            <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск ..."/>
          </div>
        </div>
        <div className="sneakers">
          {renderItems()}  
        </div>
      </div>
    </div>
  )
}
