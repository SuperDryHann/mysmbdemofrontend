import React from 'react';
import axios from 'axios';
import useAxiosToBackend from './features/auth/useAxiosToBackend';
import { useContext } from 'react';
import KnowledgeBaseContext from './features/knowledge_base/KnowledgeBaseContext';

const TestButton: React.FC = () => {

  const axiosToBackend = useAxiosToBackend();
  const handleClick = async () => {
    try {
        const response = await axiosToBackend.get(
            '/knowledgebase/get_knowledge_base_status/',
            {headers: { 'Content-Type': 'application/json', 'Case': 'organisation'}}
        );
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <button onClick={handleClick}>Test Request</button>
  );
};

export default TestButton;