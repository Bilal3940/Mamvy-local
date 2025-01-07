import { Box, Container } from "@mui/material";
import { CheckoutForm } from "./components/CheckoutForm";

interface CheckoutProps {
  handleClose: () => void;
}

export const Checkout: React.FC<CheckoutProps> = ({ handleClose }) => {
  return (
      <CheckoutForm handleClose={handleClose} />
  );
}