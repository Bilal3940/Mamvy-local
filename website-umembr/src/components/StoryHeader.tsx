import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Button, Box, Typography, Avatar, AvatarGroup, ThemeProvider } from '@mui/material';
import Image from 'next/image';
import { createTheme } from '@mui/material/styles';
import { format } from 'date-fns';
import Link from 'next/link';

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
}) => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <AppBar position='relative' style={{ backgroundColor: 'inherit', marginTop: '10rem' }}>
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: { xs: '0 10px', md: '0 50px' },
            }}>
            <Button
              style={{ ...extendedPalette.backButton, textTransform: 'none' }}
              startIcon={<Image src={'/icons/backbu.svg'} alt={'icon'} width={8} height={14} />}
              onClick={onBackClick}>
              Back
            </Button>

            <Button
              variant='contained'
              sx={{
                ...extendedPalette.editButton,
              }}
              startIcon={<Image src={'/icons/editMem.svg'} alt={'icon'} width={13} height={13} />}>
              <Link href={`/app/story/${title}/update`} style={{ textDecoration: 'none', color: 'inherit' }}>
                Edit this Memvy
              </Link>
            </Button>
          </Toolbar>
        </AppBar>

        {/* Conditionally render images */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '20px', 
            margin: '20px 40px',
          }}>
          {imgSrc !== '' && secondImgSrc !== '' ? (
            <>
              {imgSrc && (
                <Image src={imgSrc} alt='Extra Asset 1' width={100} height={100} style={{ objectFit: 'contain' }} />
              )}
              {secondImgSrc && (
                <Image
                  src={secondImgSrc}
                  alt='Extra Asset 2'
                  width={100}
                  height={100}
                  style={{ objectFit: 'contain' }}
                />
              )}
            </>
          ) : (
            <Image src={coverImage} alt='Cover Image' width={200} height={200} style={{ objectFit: 'contain' }} />
          )}
        </Box>

        <Typography
          variant='h3'
          sx={{
            fontFamily: 'PolySans Trial',
            fontSize: '55px',
            color: extendedPalette.storyTitle,
            
            textAlign: 'center',
            marginBottom: '10px',
          }}>
          {title}
        </Typography>
        <Typography variant='h6' sx={{ ...extendedPalette.dateStyle }}>
          Created {format(new Date(), 'MMM dd, yyyy')}
        </Typography>

        <Box
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
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            margin: '0 20px',
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
