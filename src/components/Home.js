import React, { useState } from 'react'
import '../componentsCss/Home.css'
import AddFolderBtn from './homeComponents/AddFolderBtn';
import AddFileBtn from './homeComponents/AddFileBtn';
import { useDispatch, useSelector } from 'react-redux';
import FolderList from './homeComponents/FolderList';



export default function Home() {
  const { name, email, token, isUser } = useSelector(state => state.login);

  if (!isUser || !token) {
    //return <Navigate to="/siginsignup" />;
  }

  return (
    <section className='HomeSection'>
      <section className='Sec-1-1'>
        <section className='Sec-1'>
          <section className='Profile-sec1'>
            <section className='Profile-sec'>
              <img src='https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/7_avatar-512.png' />
              <p> {email} </p>
            </section>
          </section>

          <section className='Tool-sec'>
            <AddFolderBtn />
          </section>

        </section>
      </section>
      
      <FolderList/>
    </section>
  )
}
