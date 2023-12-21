import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useParams } from 'react-router-dom';
import CongratulationsPage from './CongratulationsPage';
import { checkjoinedLinkAsync } from '../redux/features/filefolder/fileFolderSlice';



export default function JoinFolder() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [isCongratulation,setisCongratulation] = useState(false);
    const [sharecode,setsharecode] = useState("1");

    async function getresponse(sharedcode){

        if(sharedcode&&sharedcode.length>4){
           
            return await dispatch(checkjoinedLinkAsync({sharedcode}))
        }
        else{
            setTimeout(() => {

                window.location.href = '/siginsignup';  
            }, 500)
        }
    }

    async function start(){
        try {
            let response = await getresponse(id);
            let data = response.meta.arg.sharedcode
            setsharecode(data)
            console.log(data);
        } catch (error) {
            setsharecode("error")
        }
    }

    useEffect(()=> {
        start();

    },[]);

    if(!sharecode||sharecode==="error"){
        return <Navigate to="/Home" />
    }
    else if (sharecode==="1"){
        return(
            <></>
        )
    }
    else{
        return (
            
            <CongratulationsPage></CongratulationsPage>
        )
    }
}
