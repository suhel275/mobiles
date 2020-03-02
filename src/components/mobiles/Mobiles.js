import React, { useState, useContext } from 'react';
import Spinner from '../layout/Spinner';
import MobileContext from '../../context/mobile/mobileContext';
import AlertContext from '../../context/alert/alertContext';

const Mobiles = () => {
  const mobileContext = useContext(MobileContext);
  const alertContext = useContext(AlertContext);

  const [text, setText] = useState('');
  const [mobile_id, setId] = useState('');

  const { loading, mobiles, updateCartItem } = mobileContext;
  let cartItem = {
    model: '',
    param1: '',
    param2: '',
    param3: '',
    quantity: 0
  };

  const onSubmit = e => {
    e.preventDefault();
    if (text === '') {
      alertContext.setAlert('Please enter quantity', 'light');
    } else {
      let cartItems = JSON.parse(localStorage.getItem('cart'));
      if (!cartItems) {
        cartItems = {
          mi: [],
          apple: [],
          samsung: []
        };
      }
      console.log(mobile_id);
      let specifications = document.getElementsByClassName(mobile_id);
      console.log('specifications = ' + specifications[0].textContent);
      console.log('manufacturer = ' + mobiles[0].Manufacturer);

      cartItem.model = specifications[0].textContent;
      cartItem.param1 = specifications[1].textContent;
      cartItem.param2 = specifications[2].textContent;
      cartItem.param3 = specifications[3].textContent;
      cartItem.quantity = parseInt(text, 10);

      console.log('cartItem = ' + cartItem);
      cartItems[mobiles[0].Manufacturer].push(cartItem);
      cartItems[mobiles[0].Manufacturer].sort(function(a, b) {
        return a.quantity - b.quantity;
      });
      console.log(cartItems);
      localStorage.setItem('cart', JSON.stringify(cartItems));

      setText('');
    }
  };

  // to download file in JSON formate

  function exportToJson(cartItems) {
    let filename = 'export.json';
    let contentType = 'application/json;charset=utf-8;';
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      var blob = new Blob(
        [decodeURIComponent(encodeURI(JSON.stringify(cartItems)))],
        { type: contentType }
      );
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      var a = document.createElement('a');
      a.download = filename;
      a.href =
        'data:' +
        contentType +
        ',' +
        encodeURIComponent(JSON.stringify(cartItems));
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }

  const onClickDownload = () => {
    let cartItems = JSON.parse(localStorage.getItem('cart'));
    if (!cartItems) {
      alertContext.setAlert('Cart is empty...', 'light');
    } else {
      updateCartItem(cartItems);
    }
    console.log(cartItems);

    exportToJson(cartItems);
  };

  const onClickReset = () => {
    let cartItems = {
      mi: [],
      apple: [],
      samsung: []
    };
    localStorage.setItem('cart', JSON.stringify(cartItems));
  };

  const onChange = e => {
    setId(e.target.name);
    setText(e.target.value);
  };
  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div>
        <div style={mobileStyle}>
          {mobiles.map(mobile => (
            <div key={mobile.id} className='card text-center'>
              <h3 className={mobile.id}>{mobile.model}</h3>
              <h3 className={mobile.id}>{mobile.param3}</h3>
              <h3 className={mobile.id}>{mobile.param1}</h3>
              <h3 className={mobile.id}>{mobile.param2}</h3>
              <form onSubmit={onSubmit} className='form'>
                <input
                  type='text'
                  name={mobile.id}
                  className={mobile.id}
                  placeholder='Enter Quantity'
                  value={text}
                  onChange={onChange}
                />
                <input
                  type='submit'
                  value='Add To Cart'
                  className='btn btn-dark btn-block'
                />
              </form>
            </div>
          ))}
        </div>
        <input
          type='button'
          value='Download Cart'
          className='btn btn-dark btn-sm my-1'
          onClick={onClickDownload}
        />
        <input
          type='button'
          value='Reset Cart'
          className='btn btn-dark btn-sm my-1'
          onClick={onClickReset}
        />
      </div>
    );
  }
};

const mobileStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem'
};

export default Mobiles;
