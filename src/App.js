import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import axios from 'axios'
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import AppContext from './context';

import Favotites from './pages/Favorites';
import Home from './pages/Home';
import Orders from './pages/Orders';

function App() { 
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const cartResponse =
         await axios.get('https://6419b14fc152063412c93ba7.mockapi.io/cart');
        const favoritesResponse =
         await axios.get('https://641c1b8a1f5d999a44719729.mockapi.io/favorites');
        const itemsResponse =
         await axios.get('https://6419b14fc152063412c93ba7.mockapi.io/items');

        setIsLoading(false);
        setItems(itemsResponse.data);
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
      } catch (error) {
        alert('Ошибка при запросе данных ;(');
      }
    }
    fetchData()
  }, []);

  const onAddToCart = async (obj) => {
    const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
    try {
      if (findItem) {
        setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`https://6419b14fc152063412c93ba7.mockapi.io/cart/${findItem.id}`);
      } else {
        const {data} = 
        await axios.post('https://6419b14fc152063412c93ba7.mockapi.io/cart', obj);
        setCartItems((prev) => [...prev, data]);
      } 
    } catch (error) {
        alert('Ошибка при добавлении в корзину');
        console.error(error);
    }
  };

  const onRemoveItem = async (id) => {
    try {
      await axios.delete(`https://6419b14fc152063412c93ba7.mockapi.io/cart/${id}`);
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      alert('Ошибка при удалении из корзины');
      console.error(error);
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find (favObj => Number(favObj.id) === Number(obj.id) )) {
        axios.delete(`https://641c1b8a1f5d999a44719729.mockapi.io/favorites/${obj.id}`);
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
      } else {
        const {data} =
        await axios.post('https://641c1b8a1f5d999a44719729.mockapi.io/favorites', obj);
        setFavorites((prev) => [...prev, data]);
      } 
    } catch (error) {
      alert('Не удалось добавить в фавориты');
      console.error(error);
    } 
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };
  
  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  return (
    <AppContext.Provider value={{ items, cartItems, favorites,
       isItemAdded, setCartOpened, setCartItems, onAddToCart }}>
      <BrowserRouter>
        <div className="wrapper">
          <Drawer 
            items={cartItems} 
            onClose={() => setCartOpened(false)} 
            onRemove={onRemoveItem}
            opened={cartOpened}
          />
          <Header onClickCart={() => setCartOpened(true)}/>
          <Routes>
            <Route path='/' exact
              element={
              <Home
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToFavorite={onAddToFavorite}
                onAddToCart={onAddToCart}
                setSearchValue={setSearchValue} />}>
            </Route>
            <Route path='/favorites' exact
              element={<Favotites 
                items={favorites}
                onAddToFavorite={onAddToFavorite} 
                isLoading={isLoading}/>
              }>
            </Route>
            <Route path='/orders' exact
              element={<Orders/>}>
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
}
export default App;
