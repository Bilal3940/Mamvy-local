// components/SubscriptionContainer.tsx
import React, { useEffect, useState } from 'react';
import { Container, Box, Grid, useMediaQuery, Theme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { subscriptionSelector } from '@/store/selectors';
import { getProducts, setSelectedTier } from '@/store/actions';
import SubscriptionInfo from './components/SubscriptionInfo';
import SubscriptionPlanCard from './components/SubscriptionPlanCard';
import FAQ from './components/FAQ';

interface SubscriptionContainerProps {
  handleNext: () => void;
}

const SubscriptionContainer: React.FC<SubscriptionContainerProps> = ({ handleNext }) => {
  const dispatch = useDispatch();
  const { products, actionSuccess, selectedTier } = useSelector(subscriptionSelector); // selectedTier from Redux
  const [selectedPlan, setSelectedPlan] = useState<string | null>(selectedTier?.priceId || null); // Initial value from Redux
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  useEffect(() => {
    dispatch(getProducts({}));
  }, [dispatch, actionSuccess]);

  useEffect(() => {
    if (selectedTier) {
      setSelectedPlan(selectedTier.priceId); // Set selected plan based on Redux state
    }
  }, [selectedTier]);

  const handlePlanSelect = (priceId: string, price: any, productId: string) => {
    setSelectedPlan(priceId);
    dispatch(setSelectedTier({ productId, priceId, Tier: price })); // Store in Redux
    setTimeout(()=>{},2000)
    handleNext();
  };



  return (
    <Container  sx={{ padding: '1rem 0', overflow:'auto' }}>
      {products &&
        products.map((product: any) => (
          <Box key={product.productId}>
            <Box width={isMobile? '100%': '80%'} margin={'0 auto'} >
              <SubscriptionInfo  />
            </Box>
            <Box
              justifyContent={'center'}
              display={ isMobile ? 'grid' : 'flex'}
              sx={{
                
                
                flex:'1',
                height:'100%',
                overflow: 'auto',
                gap:'1rem',
                
                width:'100%',
              }}
            >
              {product?.prices?.map((price: any) => (
                <SubscriptionPlanCard
                  key={price.priceId}
                  price={price}
                  selectedPlan={selectedPlan}
                  onSelect={(priceId) => handlePlanSelect(priceId, price, product.stripeProductId)}
                />
              ))}
            </Box>
            <Box width={isMobile? '100%': '90%'} margin={'0 auto'}>

                <FAQ/>


            </Box>
          </Box>
        ))}
    </Container>
  );
};

export default SubscriptionContainer;
