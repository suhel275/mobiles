import React, { useState, useContext } from 'react';
import MobileContext from '../../context/mobile/mobileContext';
import AlertContext from '../../context/alert/alertContext';

const Search = () => {
  const mobileContext = useContext(MobileContext);
  const alertContext = useContext(AlertContext);

  const [text, setText] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    if (text === '') {
      alertContext.setAlert('Please enter something', 'light');
    } else {
      mobileContext.searchMobiles(text);
      setText('');
    }
  };

  const onChange = e => setText(e.target.value);

  return (
    <div>
      <form onSubmit={onSubmit} className='form'>
        <input
          type='text'
          name='text'
          placeholder='Search Manufacturer...'
          value={text}
          onChange={onChange}
        />
        <input
          type='submit'
          value='Search'
          className='btn btn-dark btn-block'
        />
      </form>
      {mobileContext.mobiles.length > 0 && (
        <button
          className='btn btn-light btn-block'
          onClick={mobileContext.clearMobiles}
        >
          Clear
        </button>
      )}
    </div>
  );
};

export default Search;
