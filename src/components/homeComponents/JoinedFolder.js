import React, { useState } from 'react'
import FolderModal from './FolderModal';
import { setSharedFolderCode } from '../../redux/features/filefolder/fileFolderSlice';
import { useDispatch, useSelector } from 'react-redux';

let justFolderName = "";

function getLastPathComponent(fullPath) {
  // Yolu / karakterine göre ayırın ve pop ile en sonuncuyu alın
  const pathParts = fullPath.split('/');
  const lastPart = pathParts.pop();
  return lastPart;
}


export default function JoinedFolder(props) {
  
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const { folder } = props;
  console.log(folder)

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    dispatch(setSharedFolderCode(null));
  };

  return (
    <div className='animate__animated animate__zoomInDown folderbtn'>

      <button style={{ overflow: "hidden" }} onClick={openModal}>
        <i className="fa-regular fa-folder-open" style={{ color: '#0275d8' }}></i>
        <p>
          {getLastPathComponent(folder.name)}
        </p>
      </button>
      {showModal && (
        <FolderModal folder={folder} isGuest={true} closeModal={closeModal} />
      )}
    </div>
  )
}
