

export type DividerType = {
    isDivider: boolean;
  };
  export type EllipseType = {
    isEllipseLeft: boolean;
    isEllipseRight: boolean;
  }
  export const palette = {
    
    primary: '#0072CE',
    background: '#131544',
    gray: '#5C6372',
    cardBorder: 'rgba(228, 222, 255, 0.2)',
    cardBackground: 'linear-gradient(180deg, rgba(34,42,103,0.5) 0%, rgba(19,21,68,0.5) 100%)',
    lightCardBackground: '#D8E8F6',
    lightText: '#0072ce',
    codGray: '#1d1d1d',
    
  
  
    secondary: '#EB8334',
    black: '#000000',
    white: '#FFFFFF',
    error: '#D32F2F',
    focus: '#2196F3',
    inputLight: 'rgba(0, 0, 0, 0.23)',
    inputLabelLight: 'rgba(0, 0, 0, 0.6)',
    lightGray: '#F5F5F5',
    faintGray: '#4C535F',
    dirtyWhite: '#FAFAFA',
    iron: '#CCCED1',
    gallery: '#EAEAEA',
    backgroundOpacity: 'rgba(32, 34, 38, 0.5)',
    opacityWhie: 'rgba(255, 255, 255, 0.25)',
    opacityBlack: 'rgba(0, 0, 0, 0.50)',
    opacityGray: 'rgba(0, 0, 0, 0.5)',
    opacityBlackInputFile: 'rgba(0, 0, 0, 0.87)',
    silverChalice: '#9E9E9E',
    
    storyBackgroundColor: '#04071E',
    buttonColor: '#2B3672',
  
  };
  export const adminPalette = {
    storyBackgroundColor: "#673409",
    textColor: "#fff",
    accentColor: "#bf5700"
  
  }
  
  export const extendedPalette = {
    storyBackground: adminPalette.storyBackgroundColor,
    backButton: {
      color: adminPalette.textColor,
      opacity: 0.7,
      fontSize: '14px',
    },
    editButton: {
      color: adminPalette.textColor,
      opacity: 0.7, 
      backgroundColor: adminPalette.storyBackgroundColor, 
      fontSize: '14px',
      textTransform: 'none',
      borderRadius: '20px',
      backdropFilter: 'blur(10px)',
      padding: '11px 16px',
      marginRight: { xs: '0', md: '50px' },
      boxShadow: '0px 4px 14px 0px #00000029',
    },
    storyTitle: adminPalette.textColor,
    dateStyle: {
      color: adminPalette.textColor,
      opacity: 0.7,
      fontSize: '16px',
      textAlign: 'center',
    },
    description: {
      color: adminPalette.textColor, maxWidth: '650px'
    },
    toolBarBackground: 'rgba(0, 0, 0, 0.5)',
  
    searchField: {
      width: '16rem',
      '& .MuiOutlinedInput-root': {
        backgroundColor: adminPalette.storyBackgroundColor,
        color: palette.white,
        marginLeft: '20px',
        borderRadius: '30px',
        '& fieldset': { borderColor: adminPalette.storyBackgroundColor },
        '&:hover fieldset': { borderColor: adminPalette.storyBackgroundColor },
        '&.Mui-focused fieldset': { borderColor: adminPalette.storyBackgroundColor },
      },
      '& input': {
        color: adminPalette.textColor,
        padding: '10px 15px',
        fontSize: '0.9rem',
      },
      '& .MuiInputAdornment-root': { backgroundColor: adminPalette.storyBackgroundColor, marginRight: '4px' },
    },
    filterButton: (filter: any, label: any) => ({
      textTransform: 'none',
      backgroundColor: filter === label ? adminPalette.textColor : adminPalette.storyBackgroundColor,
      color: filter === label ? palette.black : adminPalette.textColor,
      borderRadius: '20px',
      margin: '8px',
      '&:hover': {
        backgroundColor: filter === label ? adminPalette.textColor : adminPalette.storyBackgroundColor,
        color: filter === label ? palette.black : adminPalette.textColor,
      },
    }),
  
    viewButton: {
      textTransform: 'none',
      color: palette.dirtyWhite, 
      '&:hover': {
        color: palette.secondary, 
      },
    },
    buttonColorGrid: adminPalette.storyBackgroundColor,
    buttonHoverColor: '#BA0C2F',
  
    cardMediaBackground: adminPalette.storyBackgroundColor,
    cardMediaColor: adminPalette.textColor,
  
  
    cardHeaderBackground: adminPalette.storyBackgroundColor,
    cardHeaderText: adminPalette.textColor,
  
    audioGradientColor1: adminPalette.accentColor,
    audioGradientColor2: '#77BCE580',
  
    isDividerCheck: { isDivider: false } as DividerType,
    isEllipseCheck: { isEllipseLeft: true } as EllipseType,
    isEllipseRightCheck: { isEllipseRight: false } as EllipseType,
    
    ellipseLeftGradientColor: adminPalette.accentColor,
    ellipseLeftGradientOpacity: 0.17,
    ellipseRightGradientColor: '#F1E0FF',
    ellipseRightGradientOpacity: 0.15,
  
    cardIconColor: adminPalette.accentColor,
    filterIconsColor: 'rgba(102, 102, 102, 1)',
    filterIconsHoverColor: adminPalette.accentColor,
  };
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  