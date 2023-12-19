import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Button } from 'reactstrap';
import { addFileAsync, getfolderfilesnameAsync } from '../../redux/features/filefolder/fileFolderSlice';

export default function ModalAddFileBtn(props) {

    const dispatch = useDispatch();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { folder } = props;
    const toggleDropdown = () => {
        setDropdownOpen(prevState => !prevState);
    };

    
    const fetchAddFileAsync = async (event) => {
        event.preventDefault(); // Prevents the form from submitting
        let folderid = folder.id;
        // Access the file input value
        const inputFile = event.target.querySelector('.EnterFileInput');
        
        // Check if a file has been selected
        if (!inputFile || !inputFile.files || inputFile.files.length === 0) {
            alert('Please select a file before submitting.');
            return;
        }
        
        // Check if the file size is within the limit (10 MB in this case)
        const maxSizeInBytes = 1 * 1024 * 1024; // 10 MB
        if (inputFile.files[0].size > maxSizeInBytes) {
            alert('File size exceeds the limit of 10 MB. Please choose a smaller file.');
            inputFile.value = '';
            return;
        }
        console.log(inputFile.files[0])
        await dispatch(addFileAsync({ folderId: folder.id, file: inputFile.files[0] }));
         dispatch(getfolderfilesnameAsync({ folderid }));
        inputFile.value = '';
        //setDropdownOpen(prevState => !prevState);
        // Call your fetchAddFileAsync function here
        // fetchAddFileAsync();
    };



    return (
        <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown} direction="left">
            <DropdownToggle color="primary" style={{ padding: 0, backgroundColor: "transparent", border: 0 }}>
                <Button color="primary" outline style={{ padding: 5 }} >
                    Add File
                </Button>
            </DropdownToggle>
            <DropdownMenu className="m-2 DropdownFile-1">
            <form onSubmit={fetchAddFileAsync}>
                <div className='DropdownFile-2'>

                    <label htmlFor="exampleDropdownFormEmail2" className="form-label">
                        Add File
                    </label>
                        <input type="file" className="form-control EnterFileInput" placeholder="Enter file" required />
                        <button type="submit" className="btn btn-light">
                            Add File
                        </button>
                        </div>
                        </form>
            </DropdownMenu>
        </Dropdown>
    )
}
