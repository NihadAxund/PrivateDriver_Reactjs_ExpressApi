import React, { useState } from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'; // Bu importları kendi projenize göre ayarlayın
import { useDispatch } from 'react-redux';
import { RemoveUserFolderAsync, createShareLinkAsync, getFolderZipAsync } from '../../redux/features/filefolder/fileFolderSlice';
export default function DropDown(props) {
  let dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { folder, closeModal } = props;

  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const clickremovefolderfunctionasync = async () => {
    // alert(folder.id)
    const folderid = folder.id;
    await dispatch(RemoveUserFolderAsync({ folderid }))
    closeModal();
  }

  const clickdownloadfolderfuncasync = async () => {
    const folderid = folder.id;
    await dispatch(getFolderZipAsync({ folderid }))
  }

  const clickcreatesharedlinkasync = async () =>{
    const folderid = folder.id;
    let response =  await dispatch(createShareLinkAsync({ folderid }));
    let data = response.payload;
  }

  return (
    <UncontrolledDropdown isOpen={isOpen} toggle={toggleDropdown} style={{ opacity: "95*%" }}>
      <DropdownToggle color="dark" style={{
        padding: 0
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16" style={{ margin: "10 8 10 8" }}>
          <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
        </svg>
      </DropdownToggle>
      <DropdownMenu dark>

        <DropdownItem className='text-danger DropdowItem_DeleteFolder' style={{}} onClick={clickremovefolderfunctionasync}>
          Delete Folder
        </DropdownItem>
        <DropdownItem className='text-success DropdowItem_DownloadFolder' onClick={clickdownloadfolderfuncasync}>
          Download Folder
        </DropdownItem>
        <DropdownItem onClick={clickcreatesharedlinkasync}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-link-45deg" viewBox="0 0 16 16">
            <path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z" />
            <path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z" />
          </svg>
          Share Folder
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
}


// <DropdownItem header>
// Header
// </DropdownItem>
// <DropdownItem>
// Some Action
// </DropdownItem>
// <DropdownItem text>
// Dropdown Item
// </DropdownItem>
// <DropdownItem disabled>
// Action (disabled)
// </DropdownItem>
// <DropdownItem divider />
