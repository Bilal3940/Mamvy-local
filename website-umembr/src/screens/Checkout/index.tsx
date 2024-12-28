import { Box, Container } from "@mui/material";
import { CheckoutForm } from "./components/CheckoutForm";

interface CheckoutProps {
  handleClose: () => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ handleClose }) => {
  return (
    <Container
      maxWidth="lg"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <CheckoutForm handleClose={handleClose} />
    </Container>
  );
}