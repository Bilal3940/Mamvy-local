import React from 'react';
import { AppBar, Toolbar, Button, Box, Typography, Avatar, AvatarGroup, ThemeProvider, Divider, ListItemText, DialogTitle, DialogContent, List, ListItem, Dialog, Grid, useMediaQuery } from '@mui/material';
import Image from 'next/image';
import { createTheme, Theme } from '@mui/material/styles';

import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '@/store/selectors';
import { cdn_url, checkRoleAndPermission, formatDate } from '@/utils';
import { useRouter } from 'next/router';
import { closeModal, openModal, openSubscriptionPopup, refreshUserData } from '@/store/actions';
import { palette } from '@/theme/constants';
import CollaboratorDialog from './CollaboratorDialog';

interface StoryHeaderProps {
extendedPalette: any;
isLocked: boolean;
imgSrc: string;
secondImgSrc?: string;
coverImage: string;
title: string;
themeId?: string;
createdDate: string;
description: string;
collaborators: { src: string; alt: string }[];
onBackClick: () => void;
userId: string;
story: any;
}

const StoryHeader: React.FC<StoryHeaderProps> = ({
extendedPalette,
imgSrc,
secondImgSrc,
isLocked,
coverImage,
createdDate,
title,
description,
collaborators = [],
userId,
story,
}) => {
const { user } = useSelector(authSelector);
const router = useRouter();
const dispatch = useDispatch();
const [open, setOpen] = React.useState(false);
const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
const handleOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};

console.log("i am the collaborators", collaborators);

const images =
  collaborators &&
  collaborators.map((collaborator: any) => ({
    src: collaborator.picture ? `${cdn_url}${collaborator.picture}` : '/default-profile.png',
    alt: `${collaborator.name} ${collaborator.lastname}`,
  }));

console.log("Mapped images", images);

const EditMemvy = () => {
  dispatch(refreshUserData());
  if (checkRoleAndPermission(user?.roles, 'Subscriber_Individual', 'CLIENT_MEMORY_UPDATE', story?.user_id)) {
    router.push(`/app/story/${title}/update`);
  } else {
    dispatch(openModal({ content: 'You are not a subscriber.' }));
    dispatch(closeModal())
    setTimeout(() => {
      dispatch(openSubscriptionPopup());
    }, 2000);
  }
};

return (
  <div>
    <AppBar position='relative' style={{ boxShadow: 'none', backgroundColor: 'inherit', marginTop: '5rem' }}>
      {user.id === userId && !isLocked && (
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            padding: { xs: '0 10px', md: '0 50px' },
          }}>
<Button
  variant="contained"
  sx={{
    ...extendedPalette.editButton,
    padding: '10px 15px 10px 18px',
    fontSize: '12px',
    minWidth: 'auto',
    minHeight: 'auto',
    color: extendedPalette.edittextColor,
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', // Centers content within the button
  }}
  startIcon={
    
    <Image
      src="/icons/editmem.svg"
      alt="Edit Icon"
      width={13}

      height={13}
           />
  }
  onClick={EditMemvy}
>
  Edit this Memvy
</Button>

        </Toolbar>
      )}
    </AppBar>

    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: { xs: '10px', sm: '20px' },
        margin: { xs: '5px 10px', sm: '5px 40px' },
        flexWrap: 'wrap', 
      }}>
      {imgSrc !== '' && secondImgSrc !== '' ? (
        <>
          {imgSrc && (
            <Box
              sx={{
                display: 'flex', 
                justifyContent: 'center',
                alignItems: 'center',
                width: { xs: 150, sm: 200 },
                height: { xs: 75, sm: 100 },
              }}>
              <Image src={imgSrc} alt='Extra Asset 1' layout='intrinsic' width={200} height={100} />
            </Box>
          )}
          <Divider
            orientation='vertical'
            flexItem
            sx={{
              alignSelf: 'center', 
              height: '100px',
              borderColor: extendedPalette.dividerColor,
              margin: '15px 10px',
            }}
          />
          {secondImgSrc && (
            <Box
              sx={{
                display: 'flex', 
                justifyContent: 'center',
                alignItems: 'center',
                width: { xs: 150, sm: 200 },
                height: { xs: 75, sm: 100 },
              }}>
              <Image src={secondImgSrc} alt='Extra Asset 2' layout='intrinsic' width={200} height={100} />
            </Box>
          )}
        </>
      ) : (
        coverImage &&
        <Box
          sx={{
            display: 'flex', 
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: '100%',
            height: 'auto',
          }}>
          <Image
            src={coverImage}
            alt='Cover Image'
            layout='intrinsic'
            width={250}
            height={150}
            style={{
              borderRadius: '10px',
              // objectFit:'scale-down'
            }}
          />
        </Box>
      )}
    </Box>

    <Typography
      variant='h3'
      sx={{
        fontFamily: 'sans-serif',
        fontSize: { xs: '35px', sm: '55px' },
        color: extendedPalette.storyTitle,
        textAlign: 'center',
        marginBottom: '10px',
      }}>
      {title}
    </Typography>
    {createdDate &&
    <Typography variant='h6' sx={{ ...extendedPalette.dateStyle, fontSize: { xs: '12px', sm: '16px' } }}>
      {/* Created {format(new Date(), 'MMM dd, yyyy')} */}
      Created {formatDate(createdDate)}
    </Typography>
}

{images &&
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: images.length > 0 ? '4rem' : '0.4rem',
      }}>
      <AvatarGroup max={6}>
        {images.map((collab:any, index:any) => (
          <Avatar
            key={index}
            title={collab?.alt}
            alt={collab?.alt}
            src={collab?.src}
            sx={{
              width: { xs: 36, sm: 40 },
              height: { xs: 36, sm: 40 },
            }}
          />
        ))}
      </AvatarGroup>
    </Box>}
{/* {images && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: images.length > 0 ? '4rem' : '0.4rem',
          }}
        >
          <AvatarGroup
            max={6}
            componentsProps={{
              additionalAvatar: {
                onClick: handleOpen, // Open popup on overflow click
                style: { cursor: 'pointer' }, // Make it visually clickable
              },
            }}
          >
            {images.map((collab, index) => (
              <Avatar
                key={index}
                title={collab?.alt}
                alt={collab?.alt}
                src={collab?.src}
                sx={{
                  width: { xs: 36, sm: 40 },
                  height: { xs: 36, sm: 40 },
                }}
              />
            ))}
          </AvatarGroup>
        </Box>
      )} */}

      {/* Popup for showing all collaborators */}
      {/* <CollaboratorDialog
        open={open}
        handleClose={handleClose}
        images={images}
        handleOpen={handleOpen}
        isMobile={isMobile}
        palette={palette}
      /> */}
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        margin: '0 20px',
        marginBottom: '30px',
      }}>
      <Typography variant='body1' fontFamily={'DM Sans'} style={{ ...extendedPalette.description }}>
        {description}
      </Typography>
    </Box>
  </div>
);
};

export default StoryHeader;
