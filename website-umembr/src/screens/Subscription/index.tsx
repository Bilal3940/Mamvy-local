// components/SubscriptionContainer.tsx
import React, { useEffect, useState } from 'react';
import { Container, Box } from '@mui/material';
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
    handleNext()
  };



  return (
    <Container maxWidth="xl" sx={{ padding: '1rem 0' }}>
      {products &&
        products.map((product: any) => (
          <Box key={product.productId}>
            <Box >
              <SubscriptionInfo title={product?.name} description={product?.description} />
            </Box>
            <Box
              justifyContent={'center'}
              sx={{
                display:'flex',
                flex:'1',
                height:'20.063rem',
                maxHeight: '800px',
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
            <Box>

                <FAQ/>


            </Box>
          </Box>
        ))}
    </Container>
  );
};

export default SubscriptionContainer;
