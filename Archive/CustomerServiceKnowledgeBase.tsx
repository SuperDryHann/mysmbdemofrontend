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

import {useState, useContext} from 'react';
import KnowledgeBaseContext from './KnowledgeBaseContext';
import {KnowledgeBaseFile} from './KnowledgeBaseInterface';
import '../global/Global.css';
import useAxiosToBackend from '../auth/useAxiosToBackend';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import axios from 'axios';
import { setRef } from '@mui/material';



export function FileList() {
  const {
    files,
    setFiles,
    setSelectedFile,
    refresh,
    setRefresh
  } = useContext(KnowledgeBaseContext);

  const axiosToBackend = useAxiosToBackend();

  const handleItemClick = (currentFile: KnowledgeBaseFile) => {
    console.log(currentFile);
    setSelectedFile(currentFile)
  };

  const handleDelete = async (currentFile: KnowledgeBaseFile) => {
    console.log(currentFile);
    await axiosToBackend.post(
      '/knowledgebase/delete_file/',
      {name: currentFile.name},
      {headers: {'Content-Type': 'application/json', 'Case': 'customerservice'}}
    );
    setRefresh(!refresh);
  }

  useEffect(() => {
    async function getBlobs() {
      const response = await axiosToBackend.get(
        '/knowledgebase/get_blob_info/',
        {headers: {'Content-Type': 'application/json', 'Case': 'customerservice'}}
      );
      console.log(response.data);
      setFiles(response.data);
    }
    getBlobs();
  }
  , [refresh]);

  return (
    <List dense sx={{ width: '100%', bgcolor: 'transparent' }}>
      {files?.map((x, index) => {
        const labelId = `${index}`;
        return (
          <ListItem
            key={index}
            secondaryAction={
              <IconButton onClick={() =>handleDelete(x)} size="large">
                <DeleteRoundedIcon fontSize="inherit" />
              </IconButton>
              // <Checkbox
              //   edge="end"
              //   onChange={handleToggle(index)}
              //   checked={checked.indexOf(index) !== -1}
              //   inputProps={{ 'aria-labelledby': labelId }}
              // />
            }
            disablePadding
          >
            <ListItemButton onClick={() => handleItemClick(x)}>
              <ListItemAvatar>
                <ArticleOutlinedIcon sx = {{fontSize: 'var(--icon-size)', color: 'var(--primary-color)'}}/>
              </ListItemAvatar>
              <ListItemText id={labelId} primary={x.name} secondary={null} primaryTypographyProps={{ sx: {color: 'var(--primary-text-color)', fontSize: '20px'}}} secondaryTypographyProps={{ sx: {color: 'var(--primary-color)', fontSize: '14px'} }}/>
            </ListItemButton>

          </ListItem>
        );
      })}
    </List>
  );
}



function ChooseFileButton() {
  const {uploadFiles, setUploadFiles} = useContext(KnowledgeBaseContext);
  const handleFileUpload = (event: any) => {
    setUploadFiles([...event.target.files]);
  };

  return (
    <Button component="label" sx={{color:'rgb(23, 23, 23)', background: 'rgb(255, 218, 23)', fontWeight: 'bold', fontStyle: 'italic', fontSize: '16px', paddingLeft: 2, paddingRight: 2, mr: 2}}>
      Choose Files
      <input type="file" hidden onChange={handleFileUpload} multiple/>
    </Button>
  );
}



function BuildKnowledgeBaseButton() {
  const {
    uploadFiles,
    refresh,
    setRefresh
  } = useContext(KnowledgeBaseContext);

  const AxiosToBackend = useAxiosToBackend();

  const handleClick = async (event: any) => {
      // Upload files to blob storage
    const response = await AxiosToBackend.post(
      '/knowledgebase/upload/',
      uploadFiles,
      {headers: {'Content-Type': 'multipart/form-data', 'Case': 'customerservice'}}
    );

    // Create index
    await AxiosToBackend.get(
      '/knowledgebase/create_index/',
      {headers: {'Content-Type': 'application/json', 'Case': 'customerservice'}}
    );

    setRefresh(!refresh);
  };



  return (
    <Button onClick={handleClick} component="label" sx={{color:'rgb(23, 23, 23)', background: 'rgb(255, 218, 23)', fontWeight: 'bold', fontStyle: 'italic', fontSize: '16px', paddingLeft: 2, paddingRight: 2}}>
      Build Knowledge Base
    </Button>
  );
}



function CustomerServiceKnowledgeBase() {
  const {selectedFile} = useContext(KnowledgeBaseContext);
  return (
    <Grid container sx={{height:'var(--height-main)', border: 'none', padding:5}}> {/*main height is 84vh*/}
      <Grid item xs={4} sx={{height:'90vh', backgroundColor:'rgb(246, 243, 235)', borderRadius:'20px', padding: 3, border: 'none'}}>
        <Grid container>
          <Grid item xs={12} sx={{height:'76vh'}}>
            <FileList />
          </Grid>
          <Divider sx={{border:'1px solid var(--border-color)', width: '100%', m:0}}/>
          <Grid item xs={12} sx={{height:'10vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', border: 'none'}}>
            <ChooseFileButton />
            <BuildKnowledgeBaseButton/>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={0.5}/>

      <Grid item xs={7.5} sx={{backgroundColor:'rgb(246, 243, 235)', borderRadius:'20px', padding: 5}}>
        {selectedFile ? <iframe
            src={selectedFile.url}
            width="100%"
            height="100%"
            style={{
              borderRadius: '20px',
              opacity: '0.8',
              border: 'none'}}
          /> : null}
      </Grid>
    </Grid>
  );
}



export default CustomerServiceKnowledgeBase;