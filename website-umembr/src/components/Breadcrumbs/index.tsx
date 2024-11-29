// import { palette } from '@/theme/constants';
// import { Box, Breadcrumbs, Link, Typography } from '@mui/material';
// import { useTranslation } from 'next-i18next';
// import NextLink from 'next/link';
// import { Ref, useCallback, useEffect, useRef, useState } from 'react';
// import { authSelector, currentStorySelector, intermitenceSelector, templatesSelector } from '@/store/selectors';
// import { styles } from './styles';
// import { useSelector } from 'react-redux';

// interface IBreadcrumbsProps {
//   route: any;
// }

// export const MuiBreadcrumbs = ({ route }: IBreadcrumbsProps) => {
//   const { t } = useTranslation();
//   const title = typeof route === 'string' ? route : route?.title;
//   const State = typeof route === 'string' ? '' : route?.publish;
//    const [adminPalette, setAdminPalette] = useState({
//     storyBackgroundColor: '',
//     textColor: '',
//     accentColor: '',
//   });
//   const { user, isAuth } = useSelector(authSelector);
//   const story = useSelector(currentStorySelector);
//   const {template} = useSelector(templatesSelector)
//   console.log("Umar I am story",story.user_id)
//   console.log("Hello chudry",user.id)

//   let accentColor:any;

//    useEffect(() => {
//     if (template?.template?.colors) {
//       // Assuming the colors array from the API response
//       const colors = template.template.colors.reduce((acc:any, color:any) => {
//         // Map each color to the corresponding palette key
//         switch (color.PLabel) {
//           case 'storyBackground':
//             acc.storyBackgroundColor = color.PValue;
//             break;
//           case 'TextColor':
//             acc.textColor = color.PValue;
//             break;
//           case 'AccentColor':
//             acc.accentColor = color.PValue;
//             break;
//           default:
//             break;
//         }
//         return acc;
//       }, {});
//   accentColor= colors.accentColor || '#333333'

//       // Set the colors to the adminPalette state
//       setAdminPalette({
//         storyBackgroundColor: colors.storyBackgroundColor || '#333333', // Fallback if color is missing
//         textColor: colors.textColor || '#fff', // Fallback
//         accentColor: colors.accentColor || '#BF5700', // Fallback
//       });
//     }


//   }, [template]);
//   return (
//     <Breadcrumbs aria-label='breadcrumb' sx={styles.separator}>
//       <Link
//         underline={'hover'}
//         color={palette.white}
//         href={'/app/home'}
//         component={NextLink}
//         onClick={() => window.scrollTo(0, 0)}
//         fontSize={'1.25rem'}>
//         {t('home')}
//       </Link>
//       <Box display={'flex'} alignItems={'center'}>
//         <Typography sx={styles.title} color={accentColor} fontSize={'1.25rem'} fontWeight={'700'}>
//           {t(title)}
//         </Typography>{' '}
//         <Typography align='center' variant={'caption'}>
//           &nbsp;
//         </Typography>
        
//          {user.id === story?.user_id && (<span
//           style={{ color: palette.primary, fontWeight: '700', fontSize: '1.25rem' }}
//         >
//           {typeof State === 'string' ? State : <State />
//           }
//           </span>
//          )}
//       </Box>
//     </Breadcrumbs>
//   );
// };
import { palette } from '@/theme/constants';
import { Box, Breadcrumbs, Link, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import { authSelector, currentStorySelector, templatesSelector } from '@/store/selectors';
import { useSelector } from 'react-redux';
import { styles } from './styles';

interface IBreadcrumbsProps {
  route: any;
}

export const MuiBreadcrumbs = ({ route }: IBreadcrumbsProps) => {
  const { t } = useTranslation();
  const title = typeof route === 'string' ? route : route?.title;
  const State = typeof route === 'string' ? '' : route?.publish;
  const [adminPalette, setAdminPalette] = useState({
    storyBackgroundColor: '#333333', // Default value
    textColor: '#fff', // Default value
    accentColor: '#BF5700', // Default value
  });
  const { user, isAuth } = useSelector(authSelector);
  const story = useSelector(currentStorySelector);
  const { template } = useSelector(templatesSelector);

  useEffect(() => {
    if (template?.template?.colors) {
      const colors = template.template.colors.reduce((acc:any, color:any) => {
        // Map each color to the corresponding palette key
        switch (color.PLabel) {
          case 'storyBackground':
            acc.storyBackgroundColor = color.PValue;
            break;
          case 'TextColor':
            acc.textColor = color.PValue;
            break;
          case 'AccentColor':
            acc.accentColor = color.PValue;
            break;
          default:
            break;
        }
        return acc;
      }, {});

      // Set the colors to the adminPalette state
      setAdminPalette({
        storyBackgroundColor: colors.storyBackgroundColor || '#333333', // Fallback if color is missing
        textColor: colors.textColor || '#fff', // Fallback
        accentColor: colors.accentColor || '#BF5700', // Fallback
      });
    }
  }, [template]); // Make sure to add template to the dependency array

  const accentColor = adminPalette.accentColor;

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={styles.separator}>
      <Link
        underline={'hover'}
        color={palette.white}
        href={'/app/home'}
        component={NextLink}
        onClick={() => window.scrollTo(0, 0)}
        fontSize={'1.25rem'}
      >
        {t('home')}
      </Link>
      <Box display={'flex'} alignItems={'center'}>
        <Typography
          sx={styles.title}
          color={accentColor} // Use accent color
          fontSize={'1.25rem'}
          fontWeight={'700'}
        >
          {t(title)}
        </Typography>
        <Typography align="center" variant={'caption'}>
          &nbsp;
        </Typography>

        {user.id === story?.user_id && (
          <span
            style={{ color: palette.primary, fontWeight: '700', fontSize: '1.25rem' }}
          >
            {typeof State === 'string' ? State : <State />}
          </span>
        )}
      </Box>
    </Breadcrumbs>
  );
};
