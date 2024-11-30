"use client";

import React, { useState, useEffect } from "react";
import {
  useStripe,
  useElements,
  CardElement,
  PaymentRequestButtonElement,
} from "@stripe/react-stripe-js";
import {  PaymentRequest } from '@stripe/stripe-js';
import { colors } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createUserPurchase } from "@/store/actions";
import { authSelector, purchaseSelector, storySelector } from "@/store/selectors";

interface PaymentProps {
  
  onSuccessfullPayment: () => void;
}

const EmbeddedPaymentForm: React.FC<PaymentProps> = ({onSuccessfullPayment}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [paymentRequest, setPaymentRequest] = useState<PaymentRequest | null>(null); // State to hold paymentRequest
  const [canMakePayment, setCanMakePayment] = useState(false);
  const {user} = useSelector(authSelector);
  const {story}= useSelector(storySelector);
  const {purchase, actionSuccess}= useSelector(purchaseSelector);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const dispatch = useDispatch()
 useEffect(()=>{
 if(purchase)
 {
  onSuccessfullPayment();
 }
 },[actionSuccess])
  // Setting up Payment Request for Google Pay
  useEffect(() => {
    if (stripe) {
      const pr = stripe.paymentRequest({
        country: "US",
        currency: "usd",
        total: {
          label: "Total",
          amount: 8800, // $88.00 in cents
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      // Check if Google Pay or other methods are available
      pr.canMakePayment().then((result) => {
        if (result) {
          setPaymentRequest(pr); // Set the paymentRequest if available
          setCanMakePayment(true);
        }
      });

      pr.on("paymentmethod", async (event) => {
        setIsProcessing(true);
        try {
          // Handle the payment method server-side (simulated)
          event.complete("success");
          alert("Google Pay Payment Successful!");
        } catch (error) {
          console.error(error);
          event.complete("fail");
          setErrorMessage("Google Pay Payment failed. Please try again.");
        } finally {
          setIsProcessing(false);
        }
      });
    }
  }, [stripe]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) {
      console.error("Stripe has not loaded yet.");
      return;
    }

    setIsProcessing(true);

    try {
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        setErrorMessage("Card element not found.");
        return;
      }

      // Create a payment method using the CardElement
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        setErrorMessage(error.message!);
      } else if (paymentMethod) {

// DUMMY METHOD ADDED TO CRAETE THE ORDER

        // console.log('payment response',paymentMethod);
        const payload={
        userEmail: user?.email ?? "usertest1@example.com",
        userName:  user?.name ?? "John Doe test1",
        userId: user?.id  ?? 143,
        paymentMethodId: paymentMethod.id,
        storyId: story.id|| 2,
        amount: 50
        }
        dispatch(createUserPurchase(payload))
        // alert(`Payment Successful! Token: ${paymentMethod.id}`);
        // Send the token to your server for processing
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Payment failed. Please try again.");
    } 
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "auto",
        padding: "20px",
        background: "transparent",
        borderRadius: "8px",
        
      }}
    >

      
      {canMakePayment && paymentRequest && (
        <div style={{ marginBottom: "20px" }}>
          <h4>Pay with Google Pay:</h4>
          {/* Pass the paymentRequest object directly */}
          <PaymentRequestButtonElement options={{ paymentRequest }} />
        </div>
      )}

      {/* Embedded Card Payment Form */}
      <form onSubmit={handleSubmit}>
        <label style={{ display: "block", marginBottom: "10px" }}>
          Card Details:
        </label>
        <div style={{backgroundColor:'white', padding:'10px', borderRadius:'6px'}}>
        <CardElement
          options={{
            style: {
              
              
              base: {
                fontSize: "16px",
                backgroundColor:'white',
                color: "black",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "red",
              },
            },
          }}
          />

          </div>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button
          type="submit"
          disabled={isProcessing || !stripe}
          style={{
            padding: "10px",
            width: "100%",
            height:"70px",
            backgroundColor: "#BA0C2F",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "12px",
            marginTop:"55px"
          }}
        >
          {isProcessing ? "Processing..." : "Complete Your Purchase"}
        </button>
      </form>
    </div>
  );
};

export default EmbeddedPaymentForm;
