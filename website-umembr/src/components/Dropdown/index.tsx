import { Box, MenuItem, MenuList, Typography } from '@mui/material';
import { palette } from '@/theme/constants';
import { useTranslation } from 'next-i18next';
import { styles } from './styles';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { useRouter } from 'next/router';

const MotionContainer = motion(Box);
const MotionList = motion(MenuList);

const MotionItem = motion(MenuItem);

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};


interface CustomPopperProps {
  color?:any;
  isOpen: boolean;
  handleClose: any;
  width?: string;
  listItem: {
    label: string;
    action: any;
    
  }[];
}

export const MuiDropdown = ({ color,isOpen, handleClose, listItem, width = '10rem' }: CustomPopperProps) => {
  const { t } = useTranslation();
  const { pathname } = useRouter();
  let bgColor =  pathname ===   '/app/home' ? palette.cardBackground :palette?.cardBackground;

  return (
    <AnimatePresence>
      {isOpen && (
        <MotionContainer
          initial={!isOpen ? 'open' : 'closed'}
          exit={!isOpen ? 'open' : 'closed'}
          position={'absolute'}
          top={'1rem'}
          right={0}
          width={width}
          zIndex={10}
          sx={styles().dropDown}
          id='dropdown'
          animate={isOpen ? 'open' : 'closed'}>
          <MotionList
            sx={{
              borderRadius: '0.25rem',
              background: bgColor,
              border: `0.063rem solid ${palette.cardBorder}`,
              backdropFilter: 'blur(1.5625rem)',
            }}
            variants={{
              open: {
                clipPath: 'inset(0% 0% 0% 0%  )',
                transition: {
                  type: 'spring',
                  bounce: 0,
                  duration: 0.2,
                  delayChildren: 0.1,
                  staggerChildren: 0.02,
                },
              },
              closed: {
                clipPath: 'inset(10% 50% 90% 50%)',
                transition: {
                  type: 'spring',
                  bounce: 0,
                  duration: 0.2,
                },
              },
            }}
            style={{ pointerEvents: isOpen ? 'auto' : 'none' }}>
            {listItem?.map((item: any) => {
              return (
                <MotionItem
                  key={item.label}
                  sx={styles(color).item}
                  variants={itemVariants}
                  onClick={() => {
                    item?.action();
                    handleClose();
                  }}
                  disableRipple>
                  <Box>
                    <Typography variant='body1'>{t(item.label)}</Typography>
                  </Box>
                </MotionItem>
              );
            })}
          </MotionList>
        </MotionContainer>
      )}
    </AnimatePresence>
  );
};
