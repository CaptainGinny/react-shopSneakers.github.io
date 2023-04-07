import React from 'react'
import axios from 'axios';

import Card from '../components/Card';

export default function Orders() {
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const {data} =
        await axios.get('https://641c1b8a1f5d999a44719729.mockapi.io/orders');
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
      } catch (error){
        alert('Ошибка при запросе заказов');
      } 
    })();
  }, []);

  return (
    <div className="content">
      <div className="search">
        <h1>Мои заказы</h1>
      </div>
      <div className="sneakers">
        {(isLoading ? [...Array(8)] : orders)
        .map((item, index) => ( 
          <Card key={index} loading={isLoading} {...item}/>
        ))}
      </div>
    </div>
  );
}
