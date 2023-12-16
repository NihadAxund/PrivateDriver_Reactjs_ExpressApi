import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { addFolderAsync } from '../../redux/features/filefolder/fileFolderSlice';
import { useDispatch } from 'react-redux';

export default function AddFolderBtn() {
    const dispatch = useDispatch();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(prevState => !prevState);
    };

    const fetchAddFolderAsync = async () => {
        let folderName =null;
        let inputfoldername = document.getElementById("examplefoldername");
        folderName = inputfoldername.value;

        if(!folderName)
            return
        alert(folderName)
        try {
            await dispatch(addFolderAsync({ folderName }));

            console.log('Folder Succes!');
        } catch (error) {
            console.error('Add Folder failed:', error.message);

        }
    };

    return (
        <Dropdown isOpen={dropdownOpen} style={{ zIndex: 4 }} toggle={toggleDropdown} direction="left">
            <DropdownToggle color="primary" className='additem-btn'>
                <p className='p1'>+</p>
                <p className='p2'>ADD FOLDER</p>
            </DropdownToggle>
            <DropdownMenu className="m-2 DropdownMenu-1">
                <div className='DropdownMenu-2'>

                        <label htmlFor="exampleDropdownFormEmail2" className="form-label">
                            New Folder
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="examplefoldername"
                            placeholder="Enter folder name"
                            required
                        />

                    <button onClick={fetchAddFolderAsync} type="submit" className="btn btn-light">
                        SAVE
                    </button>
                </div>
            </DropdownMenu>
        </Dropdown>
    );
}
