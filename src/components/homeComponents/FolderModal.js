import React, { useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import DropDown from './DropDown';
import { useDispatch, useSelector } from 'react-redux';
import ModalAddFileBtn from './ModalAddFileBtn';
import { getfolderfilesnameAsync } from '../../redux/features/filefolder/fileFolderSlice';

function getLastPathComponent(fullPath) {
  const pathParts = fullPath.split('/');
  const lastPart = pathParts.pop();
  return lastPart;
}


const FolderModal = ({ folder, closeModal }) => {

  const { files } = useSelector((state) => state.fileFolder);

  const dispatch = useDispatch();

  useEffect(() => {
    let folderid = folder.id
    const fetchData = async () => {
      try {
        await dispatch(getfolderfilesnameAsync({ folderid }));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Modal style={{ opacity: "85%", maxWidth: "70%", minWidth:"350px" }} isOpen={true}>
      <section className='modalheader'>
        <p className="text-primary">{getLastPathComponent(folder.name)}</p>
        <DropDown closeModal={closeModal} folder={folder} ></DropDown>

      </section>
      <div className="black-line"></div>
      <ModalBody style={{ height: "50vh", width:"100%" }}>
        <div className='FolderModalFilesList'>
          {files.map((file, index) => (
            <p key={index}>{file}</p>

          ))}
        </div>
      </ModalBody>
      <ModalFooter>
        <ModalAddFileBtn folder={folder}></ModalAddFileBtn>
        <Button color="secondary" onClick={closeModal}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default FolderModal;
