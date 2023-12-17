import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

function getLastPathComponent(fullPath) {
    // Yolu / karakterine göre ayırın ve pop ile en sonuncuyu alın
    const pathParts = fullPath.split('/');
    const lastPart = pathParts.pop();
    return lastPart;
  }


const FolderModal = ({ folder, closeModal }) => {
  return (
    <Modal isOpen={true} toggle={closeModal}>
      <ModalHeader toggle={closeModal}>{getLastPathComponent(folder.name)}</ModalHeader>
      <ModalBody>

        <p>Folder ID: {folder.id}</p>

      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={closeModal}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default FolderModal;
