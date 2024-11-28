import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Button, Box, Typography, Avatar, AvatarGroup, ThemeProvider, Divider } from '@mui/material';
import Image from 'next/image';
import { createTheme } from '@mui/material/styles';
// import { format } from 'date-fns';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { authSelector, currentStorySelector, intermitenceSelector, templatesSelector } from '@/store/selectors';
import { useDispatch } from 'react-redux';

interface StoryHeaderProps {
  extendedPalette: any;
  imgSrc: string; 
  secondImgSrc?: string; 
  coverImage: string; 
  title: string;
  themeId?: string;
  createdDate: string;
  description: string;
  collaborators: { src: string; alt: string }[];
  onBackClick: () => void;
  userId:string,
}




const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#2B3672',
    },
  },
  
  shadows: Array(25).fill('none') as [
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
    'none',
  ], 
});

const StoryHeader: React.FC<StoryHeaderProps> = ({
  extendedPalette,
  imgSrc,
  secondImgSrc,
  coverImage,
  title,
  description,
  collaborators = [],
  onBackClick,
  userId,
}) => {
  const { user, isAuth } = useSelector(authSelector);
  console.log('Umar I am user',user.id)
    

  return (
    <ThemeProvider theme={theme}>
      <div>
        <AppBar position='relative' style={{ backgroundColor: 'inherit', marginTop: '10rem' }}>
           {user.id === userId && (<Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              padding: { xs: '0 10px', md: '0 50px' },
            }}>
            {/* <Button
              style={{ ...extendedPalette.backButton, textTransform: 'none' }}
              startIcon={<Image src={'/icons/backbu.svg'} alt={'icon'} width={8} height={14} />}
              onClick={onBackClick}>
              Back
            </Button> */}

            {/* <Button
              variant='contained'
              sx={{
                ...extendedPalette.editButton,
              }}
              startIcon={<Image src={'/icons/editMem.svg'} alt={'icon'} width={13} height={13} />}>
              <Link href={`/app/story/${title}/update`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Typography>{userId}</Typography>
                Edit this Memvy
              </Link>
            </Button> */}
           
      <Button
        variant='contained'
        sx={{
          ...extendedPalette.editButton,
        }}
        startIcon={<Image src={'/icons/editMem.svg'} alt={'icon'} width={13} height={13} />}
      >
        <Link href={`/app/story/${title}/update`} style={{ textDecoration: 'none', color: 'inherit' }}>
          Edit this Memvy
        </Link>
      </Button>
      </Toolbar>
 )}
        </AppBar>

        {/* Conditionally render images */}
        {/* <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '20px', 
            margin: '5px 40px',
          }}>
          {imgSrc !== '' && secondImgSrc !== '' ? (
            <>
              {imgSrc && (
                <Image src={imgSrc} alt='Extra Asset 1' width={200} height={100} style={{ objectFit: 'contain' }} />
              )}
               <Divider
        orientation="vertical"
        flexItem
        sx={{ height: '100px', borderColor: extendedPalette.dividerColor, margin: '21px 10px' }} // Adjust height and color as needed
      />
              {secondImgSrc && (
                <Image
                  src={secondImgSrc}
                  alt='Extra Asset 2'
                  width={200}
                  height={100}
                  style={{ objectFit: 'contain' }}
                />
              )}
            </>
          ) : (
            <Image src={coverImage} alt='Cover Image' width={200} height={200} style={{ objectFit: 'contain' }} />
          )}
        </Box> */}
        <Box
  sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: { xs: '10px', sm: '20px' }, // Adjust gap for mobile views
    margin: { xs: '5px 10px', sm: '5px 40px' }, // Adjust margin for mobile views
    flexWrap: 'wrap', // Allows images to wrap on smaller screens if needed
  }}
>
  {imgSrc !== '' && secondImgSrc !== '' ? (
    <>
      {imgSrc && (
        <Box
          sx={{
            width: { xs: 150, sm: 200 }, // Smaller size on mobile views
            height: { xs: 75, sm: 100 }, // Smaller size on mobile views
            objectFit: 'contain',
          }}
        >
          <Image src={imgSrc} alt="Extra Asset 1" layout="intrinsic" width={200} height={100} />
        </Box>
      )}
      <Divider
        orientation="vertical"
        flexItem
        sx={{
          height: '100px',
          borderColor: extendedPalette.dividerColor,
          margin: '21px 10px',
        }}
      />
      {secondImgSrc && (
        <Box
          sx={{
            width: { xs: 150, sm: 200 }, // Smaller size on mobile views
            height: { xs: 75, sm: 100 }, // Smaller size on mobile views
            objectFit: 'contain',
          }}
        >
          <Image src={secondImgSrc} alt="Extra Asset 2" layout="intrinsic" width={200} height={100} />
        </Box>
      )}
    </>
  ) : (
    <Box
      sx={{
        width: { xs: 150, sm: 200 }, // Smaller size on mobile views
        height: { xs: 150, sm: 200 }, // Smaller size on mobile views
        objectFit: 'contain',
      }}
    >
      <Image src={coverImage} alt="Cover Image" layout="intrinsic" width={200} height={200} />
    </Box>
  )}
</Box>


        <Typography
          variant='h3'
          sx={{
            fontFamily: 'sans-serif',
            fontSize: '55px',
            color: extendedPalette.storyTitle,
            
            textAlign: 'center',
            marginBottom: '10px',
          }}>
          {title}
        </Typography>
        <Typography variant='h6' sx={{ ...extendedPalette.dateStyle }}>
          {/* Created {format(new Date(), 'MMM dd, yyyy')} */}
        </Typography>

        {/* <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '24px',
          }}>
          <AvatarGroup max={4}>
            {collaborators.map((collab, index) => (
              <Avatar key={index} alt={collab.alt} src={collab.src} sx={{ width: 36, height: 36 }} />
            ))}
          </AvatarGroup>
        </Box> */}

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            margin: '10px 20px',
            marginBottom: '10px',
          }}>
          <Typography variant='body1' style={{ ...extendedPalette.description }}>
            {description}
          </Typography>
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default StoryHeader;
