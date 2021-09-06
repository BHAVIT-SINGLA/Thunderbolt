import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import MessageBox from '../components/MessageBox';
import '../css/CartScreen.css';

export default function CartScreen(props) {
  const productId = props.match.params.id;
  const qty = props.location.search
    ? Number(props.location.search.split('=')[1])
    : 1;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    props.history.push('/signin?redirect=shipping');
  };
  return (
    
    <div classNameName="row top">
      <div classNameName="col-2">
        <center><h1 className="tit-cart">Shopping Cart</h1></center>
        {cartItems.length === 0 ? (
          <MessageBox>
            Cart is empty. <Link to="/">Go Shopping</Link>
          </MessageBox>
        ) : (
          <ul>
            <div className="row container-ps">
            {cartItems.map((item) => (
              <li className=" card-cart " key={item.product}>
                  <div className="col-1">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="img-ps medium"
                    ></img>
                  </div>
                  <div>
                  <div className="col-1 center">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>
                  <div>Qty &nbsp; 
                    <select
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                  Price(per Item) : ₹{item.price}
                  &nbsp;&nbsp;&nbsp;&nbsp;
                    <button
                      type="button"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Delete
                    </button>
                  </div>
                  </div>
                
              </li>
            ))}
            </div>
          </ul>
        )}
      </div>
      <div classNameName="col-1">
        <div classNameName="card card-body">
          <ul>
              <center>
            <li>
              <h2 className="subtot-cart">
                Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : ₹
                {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
              </h2>
            </li>
            <li><button
                type="button"
                onClick={checkoutHandler}
                // classNameName="primary block"
                className="btn-cart"
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </button>
              
            </li></center>
          </ul>
        </div>
      </div>
    </div>
  );
  
}