import React from 'react';
import { Dialog, DialogTitle, DialogContent, Avatar, Grid, Typography, Divider, Box, AvatarGroup } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface Collaborator {
  alt: string;
  src: string;
}

interface CollaboratorDialogProps {
  open: boolean;
  handleClose: () => void;
  images: Collaborator[];
  handleOpen: () => void;
  isMobile: boolean;
  palette: {
    cardBorder: string;
    gray: string;
  };
}

const CollaboratorDialog: React.FC<CollaboratorDialogProps> = ({ open, handleClose, images, handleOpen, isMobile, palette }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      sx={{
        '& .MuiPaper-root': {
          backgroundColor: 'transparent',
          color: 'white',
          backdropFilter: 'blur(1.5625rem)',
          outline: 'none',
          border: `0.063rem solid ${palette.cardBorder}`,
          width: isMobile ? '100%' : '48.25rem',
          height: isMobile ? '100%' : 'inherit',
          maxHeight: isMobile ? '100%' : '95vh',
          padding: '1.5rem',
          borderRadius: isMobile ? 0 : '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: isMobile ? 'flex-start' : 'space-between',
          alignItems: 'flex-start',
          position: 'relative',
          overflow: 'auto',
        },
      }}
    >
      <DialogTitle sx={{ fontSize:'1.5rem', textAlign: 'start' }}>Collaborators</DialogTitle>
      <Divider sx={{ border: `0.063rem solid ${palette.gray}`, width: '100%' }} />
      <DialogContent sx={{ textAlign: 'start' }}>
        <Grid container spacing={2}>
          {images.map((collab, index) => (
            <Grid
              item
              xs={4}
              sm={4}
              md={4}
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
              }}
            >
              <Avatar
                alt={collab?.alt}
                src={collab?.src}
                sx={{
                  width: { xs: 60, sm: 70 },
                  height: { xs: 60, sm: 70 },
                  marginBottom: 1,
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: 'white',
                  fontSize: { xs: '0.8rem', sm: '1rem' },
                }}
              >
                {collab?.alt || 'Unnamed'}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default CollaboratorDialog;
