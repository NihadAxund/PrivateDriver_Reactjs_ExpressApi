import React, { useEffect, useState } from 'react'
import Folder from './Folder'
import { useDispatch, useSelector } from 'react-redux';
import { getUserFoldersAsync } from '../../redux/features/filefolder/fileFolderSlice';
import DelayedFolder from './DelayedFolder';



export default function FolderList() {
  const dispatch = useDispatch();
  const { path, folders } = useSelector((state) => state.fileFolder);
  const [DriverPath, setDriverPath] = useState("Path/Driver>");
  const [FolderCount,setFolderCount] = useState(0);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getUserFoldersAsync());
        console.log("succes");
      } catch (error) {
        console.log(error);
      }
    };
    console.log(folders)
    // async fonksiyonu çağırın
    fetchData();
  }, []);

  
  return (
    <section className='Sec-2-1' style={{ zIndex: 0 }}>
      <section className='Sec-2'>
        <section className='filebar'>
          <p>{DriverPath}</p>
        </section>
        {folders.map((folder, index) => (
          <DelayedFolder key={folder.id} folder={folder} delay={index * 500} />
          
        ))}
        
      </section>
    </section>
  )
}
