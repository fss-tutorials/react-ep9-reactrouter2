import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await res.json();
      setProduct(data);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) return <div className="text-center mt-20 font-bold">Product not found</div>;

  return (
    <div className="min-h-screen bg-white">

      <div className="max-w-6xl mx-auto p-6 md:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left: Image Gallery Style */}
          <div className="space-y-6">
            <div className="aspect-4/5 bg-gray-50 rounded-[2.5rem] overflow-hidden shadow-inner border border-gray-100">
              <img 
                src={product.thumbnail} 
                alt={product.title} 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>
          </div>
    
          {/* Right: Product Info */}
          <div className="flex flex-col pt-4">
            <div className="mb-2">
              <span className="text-xs font-black uppercase tracking-[0.2em] text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                {product.category}
              </span>
            </div>

            <div className="mb-8">
              <h1 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tight mb-4">
                {product.title}
              </h1>
              <div className="flex items-center gap-4">
                <p className="text-3xl font-medium text-gray-900">${product.price}</p>
              </div>
            </div>

            <div className="border-t border-gray-100 py-8 mb-4">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Description</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;