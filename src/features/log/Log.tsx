import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import useAxiosToBackend from '../auth/useAxiosToBackend';
import { get } from 'http';

const columns: GridColDef[] = [
  { field: 'user_id', 
    headerName: 'ID', 
    width: 90
  },
  {
    field: 'username',
    headerName: 'Email',
    width: 150,
    editable: true,
  },
  {
    field: 'datetime',
    headerName: 'Time',
    width: 150,
    editable: true,
  },
  {
    field: 'log',
    headerName: 'Chat Log',
    width: 400,
    editable: true,
    renderCell: (params) => (
      <pre style={{ whiteSpace: 'pre-wrap' }}>
        {params.value}
      </pre>
    ),
  },
  {
    field: 'summary',
    headerName: 'Summary',
    width: 400,
    editable: true,
  },
  {
    field: 'priority',
    headerName: 'Priorty',
    width: 200,
    editable: true,
  },
];

function Log() {
  const axiosToBackend = useAxiosToBackend();
  const [chatHistory, setChatHistory] = useState([])
  useEffect(() => {
    const getChatHistory = async () => {
      const chatHistory = await axiosToBackend.get(
        '/chat/chat_history_client',
        {headers: {'Content-Type': 'application/json'}}
      )
      console.log(chatHistory.data)
      setChatHistory(chatHistory.data)
    }
    getChatHistory()
  }, [])

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <DataGrid
        getRowHeight={() => 'auto'}
        rows={chatHistory}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        sx={{color: 'var(--primary-text-color)', height: '100%'}}
      />
    </Box>
  );
}


export default Log;
