import React, { useState } from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'; // Bu importları kendi projenize göre ayarlayın
import { useDispatch } from 'react-redux';
import { RemoveUserFolderAsync, getFolderZipAsync } from '../../redux/features/filefolder/fileFolderSlice';
export default function DropDown(props) {
  let dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const { folder, closeModal } = props;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const clickremovefolderfunctionasync = async () =>{
   // alert(folder.id)
    const folderid = folder.id;
    await dispatch(RemoveUserFolderAsync({folderid}))
    closeModal();
  }

  const clickdownloadfolderfuncasync = async ()=>{
    const folderid = folder.id;
    await dispatch(getFolderZipAsync({folderid}))
  }

  return (
    <UncontrolledDropdown isOpen={isOpen} toggle={toggleDropdown} style={{opacity:"95*%"}}>
      <DropdownToggle color="dark" style={{
        padding:0
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16" style={{margin:"10 8 10 8"}}>
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
        <DropdownItem>
          Quo Action
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
