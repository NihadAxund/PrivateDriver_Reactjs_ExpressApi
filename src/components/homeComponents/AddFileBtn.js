import React from 'react';


export default function AddFileBtn({ isfolder = false }) {
  return (
    <button className={`additem-btn ${!isfolder ? 'inactive' : ''}`} disabled={!isfolder}>
      <p className='p1'>+</p>
      <p className='p2'>ADD FILE</p>

    </button>
  );
}
