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
  hovercolor?: string;
  color?: string;
  isOpen: boolean;
  handleClose: () => void;
  width?: string;
  listItem: {
    label: string;
    action: () => void;
  }[];
}

export const MuiDropdown = ({ hovercolor, color, isOpen, handleClose, listItem, width = '10rem' }: CustomPopperProps) => {
  const { t } = useTranslation();
  const { pathname } = useRouter();
  const bgColor = pathname === '/app/home' ? palette.cardBackground : color;
  const bghoverColor = pathname === '/app/home' ? palette.primary : hovercolor;

  return (
    <AnimatePresence>
      {isOpen && (
        <MotionContainer
          initial="closed"
          exit="closed"
          animate="open"
          position="fixed"
          top="4.374rem"
          right={'1rem'}
          width={width}
          zIndex={10000}
          sx={styles(bgColor).dropDown}
          id="dropdown"
        >
          <MotionList
            variants={{
              open: {
                clipPath: 'inset(0% 0% 0% 0%)',
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
            sx={{
              pointerEvents: isOpen ? 'auto' : 'none',
              borderRadius: '0.25rem',
              backgroundColor: 'transparent',
              border: `0.063rem solid ${palette.cardBorder}`,
              backdropFilter: 'blur(1.5625rem) !important',
              WebkitBackdropFilter: 'blur(1.5625rem) !important' , // Safari compatibility
            }}
          >
            {listItem?.map((item) => (
              <MotionItem
                key={item.label}
                sx={styles(bghoverColor).item}
                variants={itemVariants}
                onClick={() => {
                  item.action();
                  handleClose();
                }}
                disableRipple
              >
                <Box>
                  <Typography variant="body1">{t(item.label)}</Typography>
                </Box>
              </MotionItem>
            ))}
          </MotionList>
        </MotionContainer>
      )}
    </AnimatePresence>
  );
};

