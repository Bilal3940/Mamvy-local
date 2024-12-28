    import React  from 'react';
    import { AppBar, Toolbar, Button, Box, Typography, Avatar, AvatarGroup, ThemeProvider, Divider } from '@mui/material';
    import Image from 'next/image';
    import { createTheme } from '@mui/material/styles';

    import Link from 'next/link';
    import { useDispatch, useSelector } from 'react-redux';
    import { authSelector} from '@/store/selectors';
    import { cdn_url, checkRoleAndPermission, formatDate } from '@/utils';
    import { useRouter } from 'next/router';
    import { openModal, openSubscriptionPopup, refreshUserData } from '@/store/actions';

    interface StoryHeaderProps {
    extendedPalette: any;
    isLocked:boolean;
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
    const { user} = useSelector(authSelector);
    const router = useRouter()
    const dispatch = useDispatch()

    const images = collaborators && collaborators?.map((collaborator: any) => ({
        src: collaborator.user.picture
        ? `${cdn_url}${collaborator.user.picture}` 
        : '/default-profile.png', // Fallback profile image
        alt: `${collaborator.user.name} ${collaborator.user.lastname}`, // Alt text for the image
    }))

    const EditMemvy =()=>{
        dispatch(refreshUserData())
        if(checkRoleAndPermission(user?.roles, "Subscriber_Individual", "CLIENT_MEMORY_UPDATE", story?.user_id)){

        
        router.push(`/app/story/${title}/update`)
    }
    else{
        dispatch(openModal({content:'You are not a subscriber.'}))
        setTimeout(()=>{

        
        dispatch(openSubscriptionPopup())
    }, 2000)
    }

    }

    return (

        <div>
            <AppBar position='relative' style={{ boxShadow:'none', backgroundColor: 'inherit', marginTop: '5rem' }}>
            {user.id === userId && !isLocked &&  (
                <Toolbar
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    padding: { xs: '0 10px', md: '0 50px' },
                }}>

                {/* <Button
                    variant='contained'
                    sx={{
                    ...extendedPalette.editButton,
                    // Replace with your desired hover color// Optional: change text color on hover
                    }}
                    startIcon={<Image src={'/icons/editmem.svg'} alt={'icon'} width={13} height={13} />}>
                    <Button  onClick={EditMemvy} style={{ textDecoration: 'none' , color:extendedPalette.edittextColor}}>
                    Edit this Memvy
                    </Button>
                </Button> */}
                <Button
    variant="contained"
    sx={{
        ...extendedPalette.editButton,
        padding: '12px 12px', // Adjust padding to reduce size
        fontSize: '12px', // Smaller text size
        minWidth: 'auto', // Prevents the button from having a default width
        minHeight: 'auto',
        color: extendedPalette.edittextColor,
        textDecoration:'none', // Prevents the button from having a default height
    }}
    startIcon={<Image src={'/icons/editmem.svg'} alt={'icon'} width={13} height={13} />}
    onClick={EditMemvy} // Move the onClick here, as the inner Button is redundant
    >
    Edit this Memvy
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
            sx={{ height: '100px', borderColor: extendedPalette.dividerColor, margin: '21px 10px' }} 
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
            {/* <Box
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
                        width: { xs: 150, sm: 200 }, 
                        height: { xs: 75, sm: 100 }, 
                        objectFit: 'contain',
                    }}>
                    <Image src={imgSrc} alt='Extra Asset 1' layout='intrinsic' width={200} height={100} />
                    </Box>
                )}
                <Divider
                    orientation='vertical'
                    flexItem
                    sx={{
                    height: '100px',
                    borderColor: extendedPalette.dividerColor,
                    margin: '15px 10px',
                    }}
                />
                {secondImgSrc && (
                    <Box
                    sx={{
                        width: { xs: 150, sm: 200 }, 
                        height: { xs: 75, sm: 100 }, 
                        objectFit: 'contain',
                    }}>
                    <Image src={secondImgSrc} alt='Extra Asset 2' layout='intrinsic' width={200} height={100} />
                    </Box>
                )}
                </>
            ) : (
                <Box
                sx={{
                    width: { xs: 150, sm: 200 }, 
                    height: { xs: 150, sm: 200 }, 
                    objectFit: 'contain',
                }}>
                <Image src={coverImage} alt='Cover Image' layout='intrinsic' width={200} height={200} />
                </Box>
            )}
            </Box> */}
            <Box
    sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: { xs: '10px', sm: '20px' },
        margin: { xs: '5px 10px', sm: '5px 40px' },
        flexWrap: 'wrap', // Ensure this is needed; otherwise, remove if wrapping is not required
    }}
    >
    {imgSrc !== '' && secondImgSrc !== '' ? (
        <>
        {imgSrc && (
            <Box
            sx={{
                display: 'flex', // Ensures internal content alignment
                justifyContent: 'center',
                alignItems: 'center',
                width: { xs: 150, sm: 200 },
                height: { xs: 75, sm: 100 },
            }}
            >
            <Image src={imgSrc} alt="Extra Asset 1" layout="intrinsic" width={200} height={100} />
            </Box>
        )}
        <Divider
            orientation="vertical"
            flexItem
            sx={{
            alignSelf: 'center', // Ensures the divider aligns with the content
            height: '100px',
            borderColor: extendedPalette.dividerColor,
            margin: '15px 10px',
            }}
        />
        {secondImgSrc && (
            <Box
            sx={{
                display: 'flex', // Ensures internal content alignment
                justifyContent: 'center',
                alignItems: 'center',
                width: { xs: 150, sm: 200 },
                height: { xs: 75, sm: 100 },
            }}
            >
            <Image src={secondImgSrc} alt="Extra Asset 2" layout="intrinsic" width={200} height={100} />
            </Box>
        )}
        </>
    ) : (
        <Box
        sx={{
            display: 'flex', // Ensures internal content alignment
            justifyContent: 'center',
            alignItems: 'center',
            width: { xs: 200, sm: 200 },
            height: { xs: 200, sm: 200 },
        }}
        >
        <Image src={coverImage} alt="Cover Image" layout="intrinsic" width={200} height={200} style={{
            borderRadius:'10px',
        }}/>
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
            <Typography variant='h6' sx={{ ...extendedPalette.dateStyle, fontSize: { xs: '12px', sm: '16px' }, }}>
            {/* Created {format(new Date(), 'MMM dd, yyyy')} */}
            Created {formatDate(createdDate)}
            
            </Typography>

            <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: { xs: '12px', sm: '12px',md:'24px' },
            }}>
            <AvatarGroup max={6}>
                {images.map((collab, index) => (
                <Avatar key={index} title={collab?.alt}  alt={collab?.alt} src={collab?.src} sx={{ 
                    width: { xs: 36, sm: 40 },
                    height: { xs: 36, sm: 40 }, }} />
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
