import { Card, CardContent } from "@mui/material";
import React from "react";




  interface PopupModalProps {
    open: boolean;
    onClose: () => void;
  }

  const Thankyou: React.FC<PopupModalProps> = () => {
  

    return(

<Card
  sx={{
    backgroundColor:'transparent',
    color:'white',
    padding: '12px',
    boxShadow: 'none',
    marginTop: "70px"
  }}>
  <CardContent>
  <h1>Thankyou for Payment</h1>
  </CardContent>
</Card>

    )
};
export default Thankyou;