import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../Components/Layout';
import { ShoppingCartContext } from '../../Context';
import OrdersCard from '../../Components/OrdersCard';

function MyOrders() {
  const context = useContext(ShoppingCartContext);

  const renderView = () => {
    if (context.order.length > 0) {
      return context.order.map((order, index) => (
        <Link key={index} to={`/my-orders/${index}`}>
          <OrdersCard totalPrice={order.totalPrice} totalProducts={order.totalProducts} />
        </Link>
      ));
    } else {
      return <div>You don't have any order :(</div>;
    }
  };

  return (
    <Layout>
      <div className="w-full h-[calc(100vh-50px)] flex flex-col items-center justify-start">
        <div className="flex items-center justify-center mt-[70px] relative w-80 mb-4">
          <h1 className="font-medium text-xl">My Orders</h1>
        </div>
        {renderView()}
      </div>
    </Layout>
  );
}

export default MyOrders;
