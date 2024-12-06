import { Card, CardContent } from '@mui/material';
import React from 'react';

interface PopupModalProps {
  open: boolean;
  onClose: () => void;
}

const Thankyou: React.FC<PopupModalProps> = ({ onClose }) => {
  return (
    <Card
      sx={{
        backgroundColor: 'transparent',
        color: 'white',
        padding: '12px',
        boxShadow: 'none',
        marginTop: '70px',
      }}>
      <CardContent>
        <h1>Thankyou for Payment</h1>
      </CardContent>
      <button
        onClick={() => onClose()}
        style={{
          padding: '10px',
          width: '100%',
          height: '70px',
          backgroundColor: '#BA0C2F',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          marginTop: '55px',
        }}>
        {'Continue To Memvy'}
      </button>
    </Card>
  );
};
export default Thankyou;
