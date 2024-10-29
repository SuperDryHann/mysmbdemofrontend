import {useEffect} from 'react';
import List from '@mui/material/List';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Divider from '@mui/material/Divider';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import IconButton from '@mui/material/IconButton';

import {
  useState, 
  useContext
} from 'react';
import KnowledgeBaseContext from './KnowledgeBaseContext';
import {
  KnowledgeBaseFile,
  Url
} from './KnowledgeBaseInterface';
import '../global/Global.css';
import useAxiosToBackend from '../auth/useAxiosToBackend';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import './KnowledgeBase.css';
import GlobalContext from '../global/GlobalContext';
import { name } from '@azure/msal-browser/dist/packageMetadata';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import TestButton from '../../TestButton';
import { stat } from 'fs';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { time } from 'console';
import { Typography } from '@mui/material';



function DeleteBlobButton({file}: {file: KnowledgeBaseFile}) {
  const {
    setFiles,
  } = useContext(KnowledgeBaseContext);
  
  const handleDelete = async (currentFile: KnowledgeBaseFile) => {
    // Remove files state with removed status
    setFiles(prevFiles => prevFiles?.map((file) => ({
      ...file,
      status: file.name === currentFile.name ? 'removed' : file.status
    })));
  }



  return(
    <IconButton onClick={() =>handleDelete(file)} size="large">
      <DeleteRoundedIcon sx={{fontSize: 'var(--icon-size-small)', color: 'var(--text1-color)'}} />
    </IconButton>
  );
}



function UndoButton({file}: {file: KnowledgeBaseFile}) {
  const {
    setFiles,
  } = useContext(KnowledgeBaseContext);
  
  const handleDelete = async (currentFile: KnowledgeBaseFile) => {
    // Remove files state with removed status
    setFiles(prevFiles => prevFiles?.map((file) => ({
      ...file,
      status: file.name === currentFile.name ? '' : file.status
    })));
  }



  return(
    <IconButton onClick={() =>handleDelete(file)} size="large">
      <ReplayRoundedIcon sx={{fontSize: 'var(--icon-size-small)', color: 'var(--no-color)'}} />
    </IconButton>
  );
}



function DeleteUploadButton({file}: {file: KnowledgeBaseFile}) {
  const {
    setFiles,
    setUploadFiles
  } = useContext(KnowledgeBaseContext);
  
  const handleDelete = async (currentFile: KnowledgeBaseFile) => {
    setUploadFiles(prevFiles => prevFiles?.filter((file) => file.name !== currentFile.name));
    setFiles(prevFiles => prevFiles?.filter((file) => file.name !== currentFile.name));
  }



  return(
    <IconButton onClick={() =>handleDelete(file)} size="large">
      <DeleteRoundedIcon sx={{fontSize: 'var(--icon-size-small)', color: 'var(--yes-color)'}} />
    </IconButton>
  );
}



function FileList() {
  const {
    files,
    setFiles,
    setSelectedFile,
    refresh,
    setRefresh
  } = useContext(KnowledgeBaseContext);

  const {
    chatCase
  } = useContext(GlobalContext);

  const axiosToBackend = useAxiosToBackend();



  const handleItemClick = (currentFile: KnowledgeBaseFile) => {
    setSelectedFile(currentFile)
  };



  useEffect(() => {
    async function getBlobs() {
      const response = await axiosToBackend.get(
        '/knowledgebase/get_blob_info/',
        {headers: {'Content-Type': 'application/json', 'Case': chatCase}}
      );
      setFiles(response.data);
    }
    getBlobs();
  }
  , [refresh]);
  


  const colorByStatus = (status: any) => {
    if (status === "added") return "var(--yes-color)";
    if (status === "removed") return "var(--no-color)";
    return "black";
  };

  const iconByStatus = (status: any) => {
    if (status === "added") return <AddCircleOutlineRoundedIcon sx = {{fontSize: 'var(--icon-size-small)', color: 'var(--yes-color)'}}/>;
    if (status === "removed") return <RemoveCircleOutlineRoundedIcon sx = {{fontSize: 'var(--icon-size-small)', color: 'var(--no-color)'}}/>;
    return <ArticleOutlinedIcon sx = {{fontSize: 'var(--icon-size-small)', color: 'var(--text1-color)'}}/>;
  }

  const secondButtonByStatus = (status: any, file: KnowledgeBaseFile) => {
    if (status === "added") return <DeleteUploadButton file={file}/>;
    if (status === "removed") return <UndoButton file={file}/>;
    return <DeleteBlobButton file={file}/>;
  }
  

  return (
    <List dense sx={{ width: '100%', bgcolor: 'transparent' }}>
      {files?.map((x, index) => {
        const labelId = `${index}`;
        return (
          <ListItem
            key={index}
            secondaryAction={
              secondButtonByStatus(x.status, x)
            }
            disablePadding
          >
            <ListItemButton onClick={() => handleItemClick(x)} sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
              <ListItemAvatar sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', m:0}}>
                {iconByStatus(x.status)}
              </ListItemAvatar>
              <ListItemText 
                id={labelId} 
                primary={x.name} 
                secondary={null} 
                primaryTypographyProps={{ sx: {
                  color: colorByStatus(x.status), 
                  fontSize: '14px',
                  }}} 
                secondaryTypographyProps={{ sx: {
                  color: 'var(--primary-color)', 
                  fontSize: '14px'
                  }}}
              />
            </ListItemButton>

          </ListItem>
        );
      })}
    </List>
  );
}



// function UrlList() {
//   const {
//     urls,
//     setUrls,
//     refresh,
//     setRefresh
//   } = useContext(KnowledgeBaseContext);

//   const {
//     chatCase
//   } = useContext(GlobalContext);

//   const axiosToBackend = useAxiosToBackend();

//   // const handleDelete = async (currentUrl: Url) => {
//   //   await axiosToBackend.post(
//   //     '/knowledgebase/tag_delete_file/',
//   //     {name: currentFile.name},
//   //     {headers: {'Content-Type': 'application/json', 'Case': chatCase}}
//   //   );
//   //   setRefresh(!refresh);
//   // }

//   // useEffect(() => {
//   //   async function getBlobs() {
//   //     const response = await axiosToBackend.get(
//   //       '/knowledgebase/get_blob_info/',
//   //       {headers: {'Content-Type': 'application/json', 'Case': chatCase}}
//   //     );
//   //     setFiles(response.data);
//   //   }
//   //   getBlobs();
//   // }
//   // , [refresh]);

//   return (
//     <List dense sx={{ width: '100%', bgcolor: 'transparent' }}>
//       {urls?.map((x, index) => {
//         const labelId = `${index}`;
//         return (
//           <ListItem
//             // key={index}
//             // secondaryAction={
//             //   <IconButton onClick={() =>handleDelete(x)} size="large">
//             //     <DeleteRoundedIcon sx={{fontSize: 'var(--icon-size-small)', color: 'var(--primary-color)'}} />
//             //   </IconButton>
//             // }
//             // disablePadding
//           >
//             <ListItemButton sx={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
//               <ListItemAvatar sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', m:0}}>
//                 <ArticleOutlinedIcon sx = {{fontSize: 'var(--icon-size-small)', color: 'var(--primary-color)'}}/>
//               </ListItemAvatar>
//               <ListItemText 
//                 id={labelId} 
//                 primary={x.name} 
//                 secondary={null} 
//                 primaryTypographyProps={{ sx: {
//                   color: 'var(--primary-text-color)', 
//                   fontSize: '14px',
//                   textDecoration: ('is_deleted' in x.metadata) && x.metadata.is_deleted === 'true' ? 'line-through' : 'none'
//                   }}} 
//                 secondaryTypographyProps={{ sx: {
//                   color: 'var(--primary-color)', 
//                   fontSize: '14px'
//                   }}}
//               />
//             </ListItemButton>

//           </ListItem>
//         );
//       })}
//     </List>
//   );
// }



function AddFileButton() {
  const {
    uploadFiles, 
    setUploadFiles,
    files,
    setFiles
  } = useContext(KnowledgeBaseContext);



  const handleFileUpload = (event: any) => {
    setUploadFiles((prevUploadFiles) => [...(prevUploadFiles || []), ...event.target.files]);


    // Add to files state with added status
    const addedFiles = [...event.target.files].map((file: KnowledgeBaseFile) => ({
      name: file.name,
      status: 'added'
    }));
    
    setFiles((prevFiles) => [...(prevFiles || []), ...addedFiles]);
  };

  return (
    <Button component="label" size="small" sx={{color:'var(--text1-color)', background: 'var(--component3-color)', fontWeight: 'bold', fontStyle: 'italic', fontSize: '12px', paddingLeft: 2, paddingRight: 2, mr: 2}}>
      Add Files
      <input type="file" hidden onChange={handleFileUpload} multiple/>
    </Button>
  );
}



function BuildKnowledgeBaseButton() {
  const {
    chatCase
  } = useContext(GlobalContext);

  const {
    files,
    uploadFiles,
    refresh,
    setRefresh,
    setIndexerStatus,
    setUploadFiles
  } = useContext(KnowledgeBaseContext);

  const axiosToBackend = useAxiosToBackend();
  
  const handleClick = async (event: any) => {
    // Set indxer status
    setIndexerStatus({status: 'running'});

    

    // Empty upload files
    setUploadFiles([]);



    // tag metadata (is_deleted) for "removed" files
    await axiosToBackend.post(
      '/knowledgebase/tag_delete_file/',
      files?.filter((file) => file.status === 'removed').map((file) => (file.name)),
      {headers: {'Content-Type': 'application/json', 'Case': chatCase}}
    );
    


    // Upload files to blob storage
    await axiosToBackend.post(
      '/knowledgebase/upload/',
      uploadFiles,
      {headers: {
        'Content-Type': 'multipart/form-data', 
        'Case': chatCase}}
    );



    // // Scrape urls
    // await axiosToBackend.post(
    //   '/knowledgebase/scrape_urls/',
    //   {urls: ['https://www.microsoft.com/en-au/microsoft-365/copilot', 'https://learn.microsoft.com/en-us/azure/search/hybrid-search-overview', 'https://learn.microsoft.com/en-us/azure/search/search-lucene-query-architecture', 'https://learn.microsoft.com/en-us/azure/search/search-query-overview']},
    //   {headers: {
    //     'Content-Type': 'application/json', 
    //     'Case': chatCase}}
    // );



    // Creat & run index
    await axiosToBackend.get(
      '/knowledgebase/create_or_run_index/',
      {headers: {
        'Content-Type': 'application/json', 
        'Case': chatCase}}
    );
    
    setRefresh(!refresh);

  };



  return (
    <Button onClick={handleClick} size="small" component="label" sx={{color:'var(--text1-color)', background: 'var(--component3-color)', fontWeight: 'bold', fontStyle: 'italic', fontSize: '12px', paddingLeft: 2, paddingRight: 2}}>
      Build Knowledge Base
    </Button>
  );
}



function KnowledgeBase() {
  const {
    indexerStatus,
    setIndexerStatus,
    knowledgeBaseLoading,
    setKnowledgeBaseLoading,
    refresh
  } = useContext(KnowledgeBaseContext);

  const axiosToBackend = useAxiosToBackend();


  useEffect(() => {
    let intervalId: any;
  
    async function getKnowledgeBaseStatus() {
      const response = await axiosToBackend.get(
        '/knowledgebase/get_knowledge_base_status/',
        { headers: { 'Content-Type': 'application/json', 'Case': 'organisation' } }
      );



      // Convert last_updated to a Date object
      const lastUpdatedDate = new Date(response.data[0].last_updated);
      const now = new Date();

      // Calculate the difference in milliseconds
      const diffInMs = now.getTime() - lastUpdatedDate.getTime();

      // Calculate the difference in days, hours, and minutes
      const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
      const diffInHours = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const diffInMinutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
  


      // Set the indexer status
      const status = {
        status: response.data[0].status,
        last_updated: response.data[0].last_updated,
        time_difference: `${diffInDays} days, ${diffInHours} hours, ${diffInMinutes} minutes`
      };

      setIndexerStatus(status);

      setKnowledgeBaseLoading(false);
  
      // If status is 'completed', stop the interval
      if (response.data[0].status === 'completed' || response.data[0].status === null) {
        clearInterval(intervalId);
      }
    }
  
    // Start polling every 5 seconds
    intervalId = setInterval(getKnowledgeBaseStatus, 2000);
  
    // Cleanup: clear interval when component unmounts
    return () => clearInterval(intervalId);
  }, [refresh]);
  

  return (
    <div className="knowledgebase">
      <div className="document">
        <div className="header">
          <h3 style={{
            marginLeft: '20px', 
            fontWeight: 'bolds',
            fontSize: '25px'
            }}>
              Knowledge Base
            </h3>
          <h5 style={{
            fontWeight: 'bold',
            fontStyle: 'italic',
            fontSize: '12px',
            color: 'var(--text2-color)',
            marginRight: '20px'
          }}>
            {indexerStatus?.status === "completed" ? `Your knowledge base has been upadated ( ${indexerStatus.time_difference} ago ).` : ''}
          </h5>
        </div>
        <div className="item-list"> 
          <FileList/>
        </div>
      </div>



      {/* <div className="url">
        <h3 style={{ marginLeft: '20px' }}>Knowledge Base (URLs)</h3>
        <FileList/>
      </div> */}



      <div className='upload-buttons'>
        <AddFileButton />
        <BuildKnowledgeBaseButton/>
      </div>



      <Backdrop
        sx={{
          color: '#fff',
          zIndex: 10,
          position: 'absolute',
          backgroundColor: 'rgba(255, 255, 255, 0.5)'
        }}
        open={indexerStatus?.status === 'running' || knowledgeBaseLoading}
        >
        <CircularProgress sx={{color:'var(--component3-color)'}} />
        {
          indexerStatus?.status === 'running'
            ? <Typography 
              sx={{
                ml:2, 
                color: 'black'
              }}>Building Knowledge Base...</Typography>
            : null
        }      
      </Backdrop>      
    </div>
  );
}



export default KnowledgeBase;

