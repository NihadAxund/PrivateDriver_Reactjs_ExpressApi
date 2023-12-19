import React, { useState } from 'react'
import FolderModal from './FolderModal';

let justFolderName = "";

function getLastPathComponent(fullPath) {
  // Yolu / karakterine göre ayırın ve pop ile en sonuncuyu alın
  const pathParts = fullPath.split('/');
  const lastPart = pathParts.pop();
  return lastPart;
}


export default function Folder(props) {
  const [showModal, setShowModal] = useState(false);
  const { folder } = props;
  console.log(folder)

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className='animate__animated animate__zoomInDown folderbtn'>

      <button style={{ overflow: "hidden" }} onClick={openModal}>
        <i className="fa-regular fa-folder-open" style={{ color: '#ffe14d' }}></i>
        <p>
          {getLastPathComponent(folder.name)}
        </p>
      </button>
      {showModal && (
        <FolderModal folder={folder} closeModal={closeModal} />
      )}
    </div>
  )
}
