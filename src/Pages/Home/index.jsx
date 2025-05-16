import { useContext } from 'react';
import Layout from '../../Components/Layout';
import Card from '../../Components/Card';
import ProductDetail from '../../Components/ProductDetail';
import { ShoppingCartContext } from '../../Context';

function Home() {
  const context = useContext(ShoppingCartContext);

  const renderView = () => {
    if (context.filteredItems?.length > 0) {
      return context.filteredItems?.map((item) => <Card key={item.id} data={item} />);
    } else {
      return <div>We don't have anything :(</div>;
    }
  };

  return (
    <Layout>
      <div className="w-full flex flex-col mt-[70px] items-center justify-center">
        <div className="flex items-center justify-center relative w-80 mb-4">
          <h1 className="font-medium text-xl">Exclusive Products</h1>
        </div>
        <input
          type="text"
          placeholder="Search a product"
          className="rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none"
          onChange={(event) => context.setSearchByTitle(event.target.value)}
        />
        <div className="grid w-full max-w-screen-lg sm:grid-cols-1 md:grid-cols-4 place-items-center gap-x-4 gap-y-7">{renderView()}</div>
        <ProductDetail />
      </div>
    </Layout>
  );
}

export default Home;
