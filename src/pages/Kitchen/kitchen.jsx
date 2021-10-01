import React, { useState, useEffect } from 'react';
import './kitchen.css';
import Header from '../../components/HeaderKitchen/headersKitchen';
import OrdersArea from '../../components/OrdersArea/ordersArea';
import OrdersKitchen from '../../components/OrdersKitchen/ordersKitchen';
import OrdersProducts from '../../components/OrdersProducts/ordersProducts';
import Button from '../../components/Button/button';
import {
  requestAllOrders, btnTextStatus, changeStatusBtn,
} from '../../service/ordersServices';

function Kitchen() {
  const [orders, setOrders] = useState([]);

  const filterOrders = () => {
    requestAllOrders()
      .then((json) => {
        const allOrders = json.filter((item) => item.status === 'processing' || item.status === 'pending' || item.status === 'ready');
        return setOrders(allOrders);
      });
  };

  useEffect(() => {
    filterOrders();
  }, []);

  return (
    <>
      <Header />
      <div className="container-kitchen">
        <h1>Pedidos</h1>
        <OrdersArea>
          {orders.map((item, index) => (
            <OrdersKitchen
              key={item.id}
              table={item.table}
              client_name={item.client_name}
              status={item.status}
              createdAt={new Date(item.createdAt).toLocaleString('pt-br')}
              updatedAt={new Date(item.updatedAt).toLocaleString('pt-br')}
            >
              {item.Products.map((prod) => (
                <OrdersProducts
                  key={prod.id}
                  name={prod.name}
                  flavour={prod.flavour}
                  complement={prod.complement}
                  qtd={prod.qtd}
                />
              ))}
              <Button
                buttonClass="btn-status"
                buttonOnClick={() => changeStatusBtn(item.id, item.status)
                  .then((response) => {
                    const changedOrders = [...orders];
                    changedOrders[index].status = response.status;
                    setOrders(changedOrders);
                  })}
              >
                {btnTextStatus(item.status)}
              </Button>
            </OrdersKitchen>
          ))}
        </OrdersArea>
      </div>

    </>

  );
}

export default Kitchen;
