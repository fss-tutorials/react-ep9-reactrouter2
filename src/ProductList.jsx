import { useState, useEffect } from "react";
import { NavLink, useSearchParams } from "react-router";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch("https://dummyjson.com/products?limit=60");
      const data = await res.json();
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-white pb-20 font-sans">
      {/* Search Section */}
      <header className="pt-16 pb-12 px-6">
        <div className="max-w-3xl mx-auto text-center">

          <div className="relative group max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400 group-focus-within:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-14 pr-6 py-4 bg-gray-100 border-none rounded-2xl focus:bg-white focus:ring-4 focus:ring-gray-200 transition-all duration-300 outline-none text-gray-700 text-lg shadow-sm"
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6">

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {products.map((p) => (
              <div key={p.id} className="group">
                <div className="relative aspect-3/4 overflow-hidden rounded-3xl bg-gray-100 mb-4">
                  <img
                    src={p.thumbnail}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
                </div>

                <div className="space-y-1 px-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors truncate pr-2">
                      {p.title}
                    </h3>
                    <span className="font-medium text-gray-900">${p.price}</span>
                  </div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold text-[10px]">
                    {p.category}
                  </p>
                  
                  <NavLink
                    to={`/products/${p.id}`}
                    className="inline-block pt-2 text-sm font-bold text-indigo-600 hover:underline"
                  >
                    View Details →
                  </NavLink>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
             <p className="text-gray-400 text-lg italic">No products match</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProductList;