import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../componentsCss/Home.css'
import AddFolderBtn from './homeComponents/AddFolderBtn';
import AddFileBtn from './homeComponents/AddFileBtn';
import Folder from './homeComponents/Folder';

let emailtxt = 'nihataxundzade06@gmail.com';


export default function Home() {
  const [Driver, setDriver] = useState("Path/Driver>")
  return (
    <section className='HomeSection'>
      <section className='Sec-1-1'>
        <section className='Sec-1'>
          <section className='Profile-sec1'>
            <section className='Profile-sec'>
              <img src='https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/7_avatar-512.png' />
              <p>
                {emailtxt}
              </p>
            </section>
          </section>

          <section className='Tool-sec'>
            <AddFolderBtn />
            <AddFileBtn />
          </section>

        </section>
      </section>

      <section className='Sec-2-1'>
      <section className='Sec-2'>
          <section className='filebar'>
            <p>{Driver}</p>
          </section>
          <Folder></Folder>
          <Folder></Folder>
          <Folder></Folder>
          <Folder></Folder>
          <Folder></Folder>
          <Folder></Folder>
          <Folder></Folder>
          <Folder></Folder>
          <Folder></Folder>
        </section>
      </section>
    </section>
  )
}
