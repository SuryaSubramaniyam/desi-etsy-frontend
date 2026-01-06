import { Link } from "react-router-dom";
import { useAddToCart } from "../hooks/useAddToCart";

const ProductCard = ({ product }) => {
  const { mutate: addToCart, isPending } = useAddToCart();

  return (
    <div className="card bg-base-100 shadow-md">
      <Link to={`/product/${product._id}`}>
        <figure>
          <img
            src={product?.images?.[0]}
            alt={product.name}
            className="h-48 w-full object-cover"
          />
        </figure>
      </Link>

      <div className="card-body">
        <Link to={`/product/${product._id}`}>
          <h2 className="card-title">{product.name}</h2>
          <p className="text-sm text-gray-500">{product.description}</p>
        </Link>

        <div className="flex justify-between items-center mt-2">
          <p className="font-bold text-lg">₹{product.price}</p>
          <button
            className="btn btn-primary btn-sm"
            disabled={isPending}
            onClick={() => addToCart({ productId: product._id, quantity: 1 })}
          >
            {isPending ? "Adding..." : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
