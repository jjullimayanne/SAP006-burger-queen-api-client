import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../../components/Header/header';
import OrdersArea from '../../components/OrdersArea/ordersArea';
import OrdersKitchen from '../../components/OrdersKitchen/ordersKitchen';
import OrdersProducts from '../../components/OrdersProducts/ordersProducts';
import Button from '../../components/Button/button';
import { requestAllOrders, deleteOrder } from '../../service/ordersServices';

const Delivered = styled.section`
display: flex;
flex-direction: column;
align-items: center;
font-family: Bob;
font-size: 20px;
margin-top: 18rem;


@media (min-width: 1440px) {
  padding: 2rem;
}
`;

function OrdersDeliverd() {
  const [ordersDelivered, setOrdersDelivered] = useState([]);

  const filterOrdersDelivered = () => {
    requestAllOrders()
      .then((json) => {
        const allOrders = json.filter((item) => item.status === 'delivered');
        return setOrdersDelivered(allOrders);
      });
  };

  useEffect(() => {
    filterOrdersDelivered();
  }, []);

  return (
    <>
      <Header />
      <Delivered>
        <h2> Pedidos Entregues </h2>
      </Delivered>
      <OrdersArea>
        {ordersDelivered.map((item, index) => (
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
              buttonOnClick={() => deleteOrder(item.id)
                .then((response) => {
                  const changedOrders = [...ordersDelivered];
                  changedOrders[index].status = response.status;
                  setOrdersDelivered(changedOrders);
                  console.log('excluido');
                })}
            >
              Excluir
            </Button>
          </OrdersKitchen>
        ))}
      </OrdersArea>
    </>
  );
}

export default OrdersDeliverd;
