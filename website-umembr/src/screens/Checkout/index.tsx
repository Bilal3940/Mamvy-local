import { Box, Container } from "@mui/material";
import { CheckoutForm } from "./components/CheckoutForm";

interface CheckoutProps {
  handleClose: () => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ handleClose }) => {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        overflow:'auto',

      }}
    >
      <CheckoutForm handleClose={handleClose} />
    </Container>
  );
}