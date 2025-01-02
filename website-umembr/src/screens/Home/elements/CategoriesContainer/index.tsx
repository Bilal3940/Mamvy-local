import { Grid, Typography } from '@mui/material';
import { styles } from '../../styles';
import StoryItem from '../StoryItem';

const CategoriesContainer = ({ 
  title, 
  data, 
  t, 
  isMobile, 
  scrollMargin, 
  containerRef, 
  handleItemClick 
}: any) => {
  return (
    <Grid
      container
      padding={0}
      rowGap={0}
      marginBottom={isMobile ? 0 : '2rem'}
      marginTop={'0.5rem'}
      width={'100%'}
      columnGap={isMobile ? 0 : 2.5}
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'flex-start'}>
      <Typography margin={!isMobile ? '0 1.75rem' : '0 1.25rem'} variant={isMobile ? 'h5' : 'h4'}>
        {t(title)}
      </Typography>
      <Grid
        item
        ref={containerRef}
        padding={`0 ${scrollMargin}`}
        paddingRight={isMobile ? '2rem' : 0}
        gap={'0.75rem'}
        display={'flex'}
        sx={styles.scrollableContainer}
        width={'100%'}
        flexDirection={data.length === 1 ? 'column' : 'row'} // Adjust layout for single item
        // justifyContent={data.length === 1 ? 'center' : 'flex-start'} // Center a single item
        // alignItems={data.length === 1 ? 'center' : 'flex-start'}
        >
        {data.length > 0 ? (
          data.map((item: any) => (
            <StoryItem 
              key={item.id} 
              isMobile={isMobile} 
              item={item} 
              handleItemClick={handleItemClick} 
              singleItem={data.length === 1} // Pass a prop to handle single-item styling
            />
          ))
        ) : (
          <StoryItem 
          key={data?.id} 
          isMobile={isMobile} 
          item={data} 
          handleItemClick={handleItemClick} 
          singleItem={data.length === 1} // Pass a prop to handle single-item styling
        />
        )}
      </Grid>
    </Grid>
  );
};

export default CategoriesContainer;
