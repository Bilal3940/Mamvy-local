import { Grid, Typography } from '@mui/material';
import { styles } from '../../styles';
import StoryItem from '../StoryItem';

const CategoriesContainer = ({ title, data, t, isMobile, scrollMargin, containerRef, handleItemClick }: any) => {
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
      <Typography margin={!isMobile ? '0 1.75rem' : '0  1.25rem'} variant={isMobile ? 'h5' : 'h4'}>
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
        width={'100%'}>
        {data?.map((item: any) => {
          return <StoryItem key={item.id} isMobile={isMobile} item={item} handleItemClick={handleItemClick} />;
        })}
      </Grid>
    </Grid>
  );
};

export default CategoriesContainer;
