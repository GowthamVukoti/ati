import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { CartContext } from '../Cart/CartContext'; // Import CartContext
import ProductCarousel from './Carousel/ProductCarousel';
import MobileSlider from './MobileSlider/MobileSlider';
import ProductDetails from './ProductDetails/ProductDetails';
import ButtonGroup from './ButtonGroup/ButtonGroup';
import Accordion from './Accordion/Accordion';

// Sample product data
const products = [
  { id: 1, name: 'FIRE T-SHIRT', description: 'Description for FIRE T-SHIRT', images: ['/Static/ProductImgs/FIRE.jpg'], price: 1999 },
  { id: 2, name: 'FLORAL T-SHIRT', description: 'Description for FLORAL T-SHIRT', images: ['/Static/ProductImgs/FLORAL.jpg'], price: 1999 },
  { id: 3, name: 'LITM T-SHIRT', description: 'Description for LITM T-SHIRT', images: ['/Static/ProductImgs/LIVE.jpg'], price: 1999 },
  { id: 4, name: 'PIGEON T-SHIRT', description: 'Description for PIGEON T-SHIRT', images: ['/Static/ProductImgs/PIGEON.jpg'], price: 1999 },
];

const sizes = ['XS', 'S', 'M', 'L', 'XL'];

const ProductPage = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const { addToCart } = useContext(CartContext); // Use CartContext
  const product = products.find((p) => p.id === parseInt(id)); // Find the product by ID

  if (!product) return <div>Product not found</div>;

  const handleAddToCart = (size) => {
    addToCart(product, size);
  };

  const handleBuyNow = () => {
    // Implement buy now functionality
  };

  return (
    <div className="product-page">
      <ProductCarousel images={product.images} />
      <MobileSlider images={product.images} />
      <ProductDetails product={product} />
      <ButtonGroup 
        sizes={sizes} 
        onBuyNow={handleBuyNow} 
        onAddToCart={(size) => handleAddToCart(size)} // Ensure size is passed correctly
      />
      <Accordion product={product} />
    </div>
  );
};

export default ProductPage;