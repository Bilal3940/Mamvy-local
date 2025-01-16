import React, { FC } from 'react';
import { Modal, Box, Typography, Grid, Button, useMediaQuery, Theme } from '@mui/material';
import { MuiButton, MuiSelect } from '@/components';
import { palette } from '@/theme/constants';

interface Role {
  id: number;
  name: string;
  preset: boolean;
}

interface User {
  id: number;
  name: string;
  lastname: string;
  email: string;
  picture?: string;
}

interface Collaborator {
  id: number;
  role_id: number;
  story_id: number;
  created_at: string;
  updated_at: string;
  user_type: string;
  validated: boolean;
  user?: User;
  role?: Role;
}

interface Option {
  label: string;
  value: string;
}

interface EditProps {
  typeOfStory: any;
  extendedPalette: any;
  isEditing: boolean;
  selectedCollaborator: Collaborator | any;
  setSelectedCollaborator: React.Dispatch<React.SetStateAction<Collaborator | any>>;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  handleUpdate: () => void;
  optionsUserType: any; // Options for user types
}

const EditCollaboratorModal: FC<EditProps> = ({
  typeOfStory,
  isEditing,
  selectedCollaborator,
  extendedPalette,
  setSelectedCollaborator,
  setIsEditing,
  handleUpdate,

  optionsUserType,
}) => {
    console.log("selected collaborator", selectedCollaborator)
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const options_role =
  typeOfStory === "custom_event"
    ? [
      { id: 'owner', name: 'Owner' },
      { id: 'collaborator', name: 'Collaborator' },
      { id: 'viewer', name: 'Viewer' },
      {id:'uga_collaborator', name:'UGA Collaborator'},
    ]
    : [
      { id: 'owner', name: 'Owner' },
      { id: 'collaborator', name: 'Collaborator' },
      { id: 'viewer', name: 'Viewer' },
    ];

  return (
    <Modal
      open={isEditing}
      onClose={() => setIsEditing(false)}
      aria-labelledby='edit-collaborator-title'
      aria-describedby='edit-collaborator-description'>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 500,
          bgcolor: palette?.cardBackground,
          backdropFilter: 'blur(1.5625rem)',
          outline: 'none',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
        border={`0.063rem solid ${palette.cardBorder}`}>
        <Typography id='edit-collaborator-title' variant='h4' mb={2}>
          Edit Collaborator
        </Typography>

        {selectedCollaborator && (
          <Box>
            {/* Display User Information */}
            <Box mb={2}>
              <Typography variant='body1' fontWeight='bold'>
                User: {`${selectedCollaborator.user.name} ${selectedCollaborator.user.lastname}`}
              </Typography>
              <Typography variant='body2' color='textSecondary'>
                Email: {selectedCollaborator.user.email}
              </Typography>
            </Box>

            {/* Role Selection with Custom MuiSelect */}
            <Grid container spacing={2}>
              {/* Role Selection with Label */}
              <Grid item xs={6}>
                <Typography variant='subtitle2' gutterBottom>
                  Role
                </Typography>
                <Box
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: '1px solid white',
                    },
                    '& .MuiSelect-select': {
                      textAlign: 'start',
                      paddingRight: '1rem',
                    },
                  }}>
                  <MuiSelect
                    name='role'
                    value={selectedCollaborator.role?.name.replace('Story_', '').replace(/_/g, ' ').toLowerCase()}
                    handleSelect={(event: any) =>
                      setSelectedCollaborator({
                        ...selectedCollaborator,
                        role: { ...selectedCollaborator.role, name: event.target.value },
                      })
                    }
                    placeholder='Select Role'
                    options={options_role}
                  />
                </Box>
              </Grid>

              {/* User Type Selection with Label */}
              <Grid item xs={6}>
                <Typography variant='subtitle2' gutterBottom>
                  User Type
                </Typography>
                <Box
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      border: '1px solid white',
                    },
                    '& .MuiSelect-select': {
                      textAlign: 'start',
                      paddingRight: '1rem',
                    },
                  }}>
                  <MuiSelect
                    name='userType'
                    value={selectedCollaborator.user_type || ''}
                    handleSelect={(event: any) =>
                      setSelectedCollaborator({
                        ...selectedCollaborator,
                        user_type: event.target.value,
                      })
                    }
                    placeholder='Select User Type'
                    options={optionsUserType}
                  />
                </Box>
              </Grid>
            </Grid>

            {/* Validation Status */}
            <Box mt={2}>
              <Typography variant='body2'>
                Validation Status: <strong>{selectedCollaborator.validated ? 'Validated' : 'Not Validated'}</strong>
              </Typography>
            </Box>

            {/* Action Buttons */}
            <Box display='flex' justifyContent='flex-end' gap={2} mt={3}>
              <MuiButton
                type='button'
                disabled={false}
                loading={false}
                variant={'outlined'}
                method={() => setIsEditing(false)}
                sx={{
                  '&:hover': {
                    borderColor: extendedPalette.buttonbackgroundIcon,
                  },
                }}>
                <Typography color={palette.white} variant='button'>
                  Cancel
                </Typography>
              </MuiButton>
              <MuiButton
                type='button'
                method={() => handleUpdate()}
                disabled={false}
                backgroundColor={extendedPalette.buttonbackgroundIcon}
                loading={false}
                variant={'contained'}
                sx={{
                  backgroundColor: extendedPalette.buttonbackgroundIcon,
                  '&:hover': {
                    backgroundColor: extendedPalette.buttonbackgroundIcon,
                  },
                }}>
                <Typography variant={isMobile ? 'caption' : 'button'}>Update</Typography>
              </MuiButton>
            </Box>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default EditCollaboratorModal;
