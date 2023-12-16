import React, { useEffect, useState } from 'react'
import Folder from './Folder'
import { useDispatch, useSelector } from 'react-redux';
import { getUserFoldersAsync } from '../../redux/features/filefolder/fileFolderSlice';

export default function FolderList() {
  const dispatch = useDispatch();
  const [DriverPath, setDriverPath] = useState("Path/Driver>");

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getUserFoldersAsync());
        console.log("succes");
      } catch (error) {
        console.log(error);
      }
    };

    // async fonksiyonu çağırın
    fetchData();
  }, []);

  return (
    <section className='Sec-2-1' style={{ zIndex: 0 }}>
      <section className='Sec-2'>
        <section className='filebar'>
          <p>{DriverPath}</p>
        </section>
        <Folder></Folder>
      </section>
    </section>
  )
}
