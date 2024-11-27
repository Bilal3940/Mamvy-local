'use client';

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Breakpoint,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

import Link from 'next/link';

import { motion, useInView } from 'framer-motion';
import React from 'react';

import Image from 'next/image';
import Footer from './Footer';
import Header from './Header';

/*
What's Left
- Testimonials -> future work
- Improved animations? -> ask Dag and Luke on Friday
- Accessibility testing -> optionally change color on highlight for some buttons + outlining when tabbing
- Fix thread on desktop and improve shadows -> Thursday
- Testing - weekend
*/

export const Landing = () => {
  const PinkGradient = ({ children }: { children: any }) => (
    <span
      style={{
        background: '-webkit-linear-gradient(#FED9D1, #F1E0FF)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}>
      {children}
    </span>
  );

  const Section = ({
    children,
    maxWidth,
    minHeight,
    id,
    position,
  }: {
    id?: string;
    children: any;
    maxWidth?: false | Breakpoint | undefined;
    minHeight?: string;
    position?: string;
  }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, transform: 'translateY(32px)' }}
        animate={{ opacity: isInView ? 1 : 0, transform: isInView ? 'translateY(0)' : 'translateY(32px)' }}
        transition={{ ease: 'easeInOut', duration: 0.75 }}>
        <Container
          maxWidth={maxWidth !== undefined ? maxWidth : 'lg'}
          sx={{
            minHeight: minHeight || 'max(60vh, 384px)',
            position: position || 'relative',
            zIndex: 5,
            py: { xs: 8, md: 2 },
          }}
          id={id}>
          {children}
        </Container>
      </motion.div>
    );
  };

  const NumberedStep = ({
    title,
    description,
    stepNumber,
  }: {
    title: string;
    description: string;
    stepNumber: number | string;
  }) => {
    return (
      <Stack direction='column' spacing={1}>
        <Stack direction='row' spacing={1} alignItems='center'>
          <Typography
            sx={{
              width: 24,
              height: 24,
              lineHeight: '24px',
              textAlign: 'center',
              color: '#131544',
              borderRadius: '50%',
              backgroundImage: 'linear-gradient(#FED9D1, #F1E0FF)',
            }}>
            {stepNumber}
          </Typography>
          <Typography variant='h4' component='h2'>
            {title}
          </Typography>
        </Stack>

        <Typography variant='caption' sx={{ textWrap: 'balance', fontSize: '0.875rem' }}>
          {description}
        </Typography>
      </Stack>
    );
  };

  const Feature = ({ title, description, icon }: { title: string; description: string; icon: string }) => {
    return (
      <Stack direction='column' spacing={1}>
        <Stack direction='row' spacing={1} alignItems='center'>
          <Image src={`/icons/landing/${icon}.svg`} alt={''} width={24} height={24} quality={95} />
          <Typography variant='h4' component='h2'>
            {title}
          </Typography>
        </Stack>

        <Typography variant='caption' sx={{ textWrap: 'balance', color: '#B3BED4', fontSize: '1.25rem' }}>
          {description}
        </Typography>
      </Stack>
    );
  };

  const ExpandIcon = () => (
    <Image src={`/icons/chevron-down-gray.svg`} alt={'chevron-down'} width={24} height={24} quality={80} />
  );

  const FAQ = () => {
    const faq = [
      /* {
        question: 'Is there a minimum age to use Memvy?',
        answer: 'Yes, you must be at least 13 years old to use Memvy.',
      },
      {
        question: 'How do I become a creator on Memvy?',
        answer:
          'To become a creator, you need to sign up for an account. This will allow you to start creating and managing your own stories.',
      },
      {
        question: 'What happens if I forget my password or email address?',
        answer:
          'If you have forgotten your password, you can reset it by going to Memvy and clicking “Forgot password?”. If you have forgotten your email address, you can contact our support.',
      },*/
      {
        question: 'How can I contact support?',
        answer: 'You can contact support by emailing support@falcon9324.com.',
      },
      /*{
        question: 'Why are there only four prompts?',
        answer:
          'Four prompts are designed to get collaborators thinking about specific memories and to start uploading their content. The fourth prompt is a general question that allows collaborators to add any other relevant memories to the story.',
      },*/
      {
        question: 'Does it cost money to use Memvy?',
        answer:
          'For now, Memvy is free to use. We are exploring plans allowing you to create and maintain stories with additional features and storage options. Being a collaborator or viewer will remain free. Subscription details will be provided when available.',
      },
      {
        question: 'Why do I have to register as a user to be a collaborator?',
        answer:
          'You need an account to add memories to Memvy. This helps us keep your contributions organized and linked to your profile.',
      },
      {
        question: 'Is there a limit to how much data I can have in my account?',
        answer:
          'Yes, you can create stories that contain up to 50 gigabytes of content. Any content uploaded by collaborators counts toward this limit. We are exploring plans that will allow for a higher storage allotment.',
      },
      /*{
        question: 'Can I answer a prompt more than once?',
        answer:
          'Yes, and that is the preferred method when you have more than one answer to the prompt.  For example, if the prompt is asking you to share a memory about a fun time with a person, but you have many of them, it would be appropriate to upload the media to the prompt for each individual memory.  Keep in mind, you can have multiple media types for a single response, but you want different responses to be uploaded as separate memories.  This provides for more dynamic filtering and enjoyment of the memories when viewing your story.',
      },*/
      {
        question: 'What types of media am I allowed to upload?',
        answer:
          'You can upload audio recordings, images, videos, and text relevant to the story. However, we cannot accept any copyrighted material. You are also prohibited from uploading any offensive material, such as adult content or hate speech. Any copyrighted or offensive material will be subject to removal and your account may be permanently banned.',
      },
      {
        question: 'Are the stories I create available for anyone to see, or can I keep them private?',
        answer: 'You have the choice to make the story public or private, and this can be changed later if desired.',
      },
      {
        question: 'Can I see other stories that have been published?',
        answer:
          'Yes, you can search for published stories.  To view a private story, you must have the link and access code to view it.',
      },
      /*{
        question: 'Is there a way to have all the media from a story show on my screen like a video or slideshow?',
        answer:
          'Memvy was created to provide a highly personalized and interactive experience for the viewer. This means there is no universal way to view a story. Each viewer will enjoy the memories that make the story in an order based on their preferred filtering methods.',
      },
      {
        question: 'Do you have more templates in development?',
        answer:
          'Yes, we currently focus on life story (celebrating the life of the deceased), classmates story(capturing the memories from a shared experience as classmates), and teammates story (capturing the memories from a shared experience of being teammates - regardless of the type of team) templates. We also have an option for other stories that do not match any of our curated templates. We are exploring other curated story templates.',
      },
      {
        question: 'Can I remove a collaborator from my story?',
        answer:
          'You can remove a collaborator from your story by accessing the “Manage Access” popup in the same manner as you did to add them. You can then remove the collaborator, deleting any associated memories if desired.',
      },
      {
        question: 'Can I delete a memory or story?',
        answer:
          'To delete a memory, go to the memory you wish to delete and select the delete option. Confirm your choice to remove the memory from your story.',
      },*/
      {
        question: 'Is there a mobile app for Memvy?',
        answer:
          'Currently, Memvy is accessible via web browser on mobile devices. We are exploring the development of a dedicated mobile app.',
      },
      {
        question: 'Can I provide feedback or suggest new features?',
        answer:
          'We welcome your feedback and suggestions. You can provide feedback by contacting us at support@falcon9324.com.',
      },
      {
        question: 'Do you have any branding/media guidelines?',
        answer: 'Yes, you can contact us at support@falcon9324.com for any branding or media-related requests.',
      },
    ];

    return faq.map((item) => (
      <Accordion sx={{ backgroundColor: '#2B3672', color: 'white' }} key={item.question}>
        <AccordionSummary expandIcon={<ExpandIcon />} aria-controls='panel1-content' id='panel1-header'>
          <Typography color='white'>{item.question}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography color='white' sx={{ fontSize: '0.875rem' }}>
            {item.answer}
          </Typography>
        </AccordionDetails>
      </Accordion>
    ));
  };

  return (
    <Box height={'100vh'} sx={{ overflowY: 'auto', overflowX: 'hidden' }}>
      <Header />
      <div style={{ height: 72 }}></div>
      <div id='test'>
        <div style={{ position: 'relative' }}>
          <Section position='inherit'>
            <Stack gap={2} sx={{ pt: 4 }}>
              <Typography
                variant='h2'
                component='h1'
                align='center'
                sx={{
                  background: '-webkit-linear-gradient(#fff, #aeaeae)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}>
                The Future of
                <br />
                Enjoying the Past
              </Typography>
              <Typography sx={{ color: '#B3BED4', fontSize: '0.875rem' }} variant='caption' align='center'>
                Create richer and deeper stories of your shared
                <br />
                experiences by sharing audio, image, and video
                <br />
                memories to collaborate with friends and family
                <br />
                to share your cherished memories.
              </Typography>
              <Stack direction='row' justifyContent='center'>
                <Box>
                  <Button
                    component={Link}
                    href={'/app/login'}
                    variant={'contained'}
                    disabled={false}
                    style={{ zIndex: 10, borderRadius: '19px' }}>
                    <Typography variant='button'>Start creating & collaborating</Typography>
                  </Button>
                </Box>
              </Stack>
              <Box
                sx={{ position: 'relative', height: { xs: '45vh', sm: '60vh', md: '75vh' }, minHeight: { sm: 384 } }}>
                <Image src='/images/landing_logo_desktop.png' fill alt='' objectFit='contain' style={{ zIndex: 10 }} />
              </Box>
              <svg
                style={{ position: 'absolute', overflow: 'visible', bottom: -128, width: '100%', top: 320 }}
                preserveAspectRatio='xMinYMin slice'
                viewBox='0 0 1440 1183'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'>
                <g filter='url(#filter0_f_110_2)'>
                  <path
                    d='M802.265 278.801C852.572 100.267 1168.88 183.712 1347.42 234.02C1525.95 284.328 1236.55 497.763 1500.36 626.919C1607.24 846.727 1302.35 1094.96 1065.88 859.512C623.228 682.573 1029.37 439.384 802.265 278.801Z'
                    fill='#0072CE'
                    fillOpacity='0.33'
                  />
                </g>
                <g filter='url(#filter1_f_110_2)'>
                  <path
                    d='M789.366 534.046C924.791 618.801 779.33 860.11 694.576 995.536C609.821 1130.96 503.353 840.118 332.798 1026.97C125.249 1062.18 -6.23644 750.117 245.572 611.56C498.868 288.416 601.706 682.965 789.366 534.046Z'
                    fill='#F1E0FF'
                    fillOpacity='0.33'
                  />
                </g>
                <defs>
                  <filter
                    id='filter0_f_110_2'
                    x='652.265'
                    y='20.0032'
                    width='1020.09'
                    height='1084.81'
                    filterUnits='userSpaceOnUse'
                    colorInterpolationFilters='sRGB'>
                    <feFlood floodOpacity='0' result='BackgroundImageFix' />
                    <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
                    <feGaussianBlur stdDeviation='75' result='effect1_foregroundBlur_110_2' />
                  </filter>
                  <filter
                    id='filter1_f_110_2'
                    x='-42.3721'
                    y='330.375'
                    width='1037.03'
                    height='852.499'
                    filterUnits='userSpaceOnUse'
                    colorInterpolationFilters='sRGB'>
                    <feFlood floodOpacity='0' result='BackgroundImageFix' />
                    <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
                    <feGaussianBlur stdDeviation='75' result='effect1_foregroundBlur_110_2' />
                  </filter>
                  <linearGradient
                    id='paint0_linear_110_2'
                    x1='862.015'
                    y1='183.388'
                    x2='690.387'
                    y2='1014.38'
                    gradientUnits='userSpaceOnUse'>
                    <stop stopColor='#D8E8F6' />
                    <stop offset='1' stopColor='#77BCE5' />
                  </linearGradient>
                </defs>
              </svg>

              <svg
                style={{
                  position: 'absolute',
                  bottom: 64,
                  left: 0,
                  width: 'max(468px, 100%)',
                  overflow: 'visible',
                  transform: `translateY(25vw)`,
                }}
                viewBox='0 0 1440 1183'
                preserveAspectRatio='xMinYMin slice'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M1730.09 562.948C1718.65 643.968 1688.47 723.858 1635.12 787.6C1583.66 849.094 1511.85 892.506 1431.41 904.987C1353.89 917.015 1277.98 898.855 1212.12 857.909C1181.55 838.897 1153.66 812.387 1139.34 779.24C1123.78 743.253 1125.14 702.848 1138.84 666.381C1165.86 594.443 1245.75 536.461 1325.94 555.833C1364.19 565.07 1393.64 593.688 1409.93 628.109C1426.22 662.529 1429.32 699.64 1427.17 736.253C1422.95 807.784 1394.8 883.218 1343.11 935.019C1315 963.184 1278.43 982.574 1238.59 988.469C1198.2 994.458 1158.21 986.389 1121.92 968.658C1047.45 932.268 994.231 865.895 927.255 819.028C854.269 767.953 765.916 736.086 675.325 739.341C635.738 740.759 597.377 748.798 561.24 764.965C528.355 779.669 498.187 799.099 468.093 818.595C436.123 839.319 403.756 860.41 368.176 874.749C329.282 890.433 283.767 902.685 241.333 899.647C222.805 898.318 203.078 892.266 192.209 876.454C182.776 862.725 179.595 844.875 181.059 828.573C184.271 792.958 206.291 759.823 231.874 735.404C283.904 685.755 349.333 652.563 410.68 615.631C469.813 580.028 532.199 539.545 567.202 478.833C583.699 450.212 582.222 413.733 554.555 392.456C520.944 366.586 471.037 370.037 431.439 376.779C398.667 382.363 366.974 393.133 335.029 401.976C303.911 410.592 269.231 421.039 236.536 417.34C224.207 415.939 209.85 412.332 207.072 398.555C203.702 381.81 215.423 364.574 224.201 351.362C247.329 316.547 282.696 287.035 297.752 247.499C308.01 220.591 300.783 195.104 275.885 179.534C263.862 172.02 249.671 167.649 235.86 164.536C212.769 159.333 189.138 156.119 165.673 152.955C142.106 149.771 118.21 147.455 94.9621 142.48C78.5013 138.959 60.5965 133.873 48.4498 121.735C21.3158 94.6002 45.0375 48.9424 19.0113 20.1276C-1.2379 -2.27172 -36.485 -1.06742 -64.3069 1.25404C-77.5711 2.36615 -76.451 22.7058 -63.0949 21.578C-34.6246 19.1996 6.31142 17.3485 11.9463 52.9862C15.1339 73.163 11.8284 94.2716 19.281 113.768C25.8521 130.983 39.4506 143.594 56.1516 151.45C73.0446 159.398 91.805 163.151 110.216 165.912C136.925 169.919 163.797 172.936 190.494 177.079C209.756 180.069 230 182.688 248.446 189.187C259.719 193.164 272.439 199.174 278.563 209.842C284.686 220.511 281.662 233.835 276.657 244.651C267.548 264.336 252.916 281.387 239.265 298.156C224.21 316.664 208.897 335.223 197.196 356.021C189.204 370.245 183.629 386.686 186.97 402.991C193.853 436.631 234.081 439.978 262.579 437.553C298.513 434.495 333.607 423.682 368.074 413.729C402.54 403.775 437.47 393.882 473.965 392.624C508.256 391.43 563.797 401.947 557.141 447.052C554.678 463.72 543.943 478.783 533.705 491.884C522.922 505.705 510.615 518.327 497.473 529.996C469.37 554.953 437.366 575.512 405.216 595.036C341.908 633.507 274.481 667.518 220.146 718.338C193.186 743.566 170.663 775.765 162.77 811.94C154.877 848.115 164.3 889.809 198.614 908.798C233.749 928.234 280.79 920.01 318.049 911.674C360.38 902.2 399.561 884.632 436.57 862.59C501.878 823.7 562.81 773.339 640.897 762.592C734.358 749.729 829.05 777.631 906.09 829.161C976.589 876.322 1030.97 944.826 1107.16 984.122C1144.24 1003.25 1186.12 1013.86 1228.19 1010.12C1270.26 1006.39 1308.75 990.746 1340.42 964.859C1399.72 916.366 1433.7 840.643 1444.61 766.921C1455.54 693.066 1444.48 604.918 1378.45 557.935C1310.88 509.851 1216.83 534.149 1162.41 590.659C1105.68 649.556 1087.66 743.617 1134.47 812.899C1155.37 843.83 1185.77 867.719 1218.78 885.328C1253.18 903.675 1289.92 918.655 1328.73 925.022C1408.65 938.109 1493.35 920.365 1561.98 878.136C1634.57 833.48 1687.87 763.292 1718.96 685.671C1734.25 647.485 1744.66 607.7 1750.39 567.105C1752.21 554.192 1731.94 549.901 1730.1 562.915L1730.09 562.948Z'
                  fill='url(#paint0_linear_110_2)'
                  fillOpacity='0.5'
                />
                <defs>
                  <filter
                    id='filter0_f_110_2'
                    x='652.265'
                    y='20.0032'
                    width='1020.09'
                    height='1084.81'
                    filterUnits='userSpaceOnUse'
                    colorInterpolationFilters='sRGB'>
                    <feFlood floodOpacity='0' result='BackgroundImageFix' />
                    <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
                    <feGaussianBlur stdDeviation='75' result='effect1_foregroundBlur_110_2' />
                  </filter>
                  <filter
                    id='filter1_f_110_2'
                    x='-42.3721'
                    y='330.375'
                    width='1037.03'
                    height='852.499'
                    filterUnits='userSpaceOnUse'
                    colorInterpolationFilters='sRGB'>
                    <feFlood floodOpacity='0' result='BackgroundImageFix' />
                    <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
                    <feGaussianBlur stdDeviation='75' result='effect1_foregroundBlur_110_2' />
                  </filter>
                  <linearGradient
                    id='paint0_linear_110_2'
                    x1='862.015'
                    y1='183.388'
                    x2='690.387'
                    y2='1014.38'
                    gradientUnits='userSpaceOnUse'>
                    <stop stopColor='#D8E8F6' />
                    <stop offset='1' stopColor='#77BCE5' />
                  </linearGradient>
                </defs>
              </svg>
            </Stack>
          </Section>
        </div>
        <Section id='about' minHeight='max(50vh, 384px)'>
          <Stack direction='column' justifyContent='center' spacing={2} sx={{ height: 'max(50vh, 384px)' }}>
            <Typography
              variant='h4'
              component='h2'
              align='center'
              sx={{ lineHeight: 1.25, mb: 4, fontSize: '1.75rem', fontWeight: 'semibold' }}>
              Relive your memories
              <br />
              <PinkGradient> for years to come.</PinkGradient>
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <NumberedStep
                  stepNumber={1}
                  title='Create'
                  description='Start your memory journey by choosing from our wide range of templates'
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <NumberedStep
                  stepNumber={2}
                  title='Collaborate'
                  description='Invite friends and family to add their perspectives and enrich your memories: shared experiences, different perspectives, and richer stories.'
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <NumberedStep
                  stepNumber={3}
                  title='Interact'
                  description='Relive your memories through our Interactive Memory Map, a dynamic and engaging way to view your stories.'
                />
              </Grid>
            </Grid>
          </Stack>
        </Section>
        <Section maxWidth={false}>
          <svg
            style={{ position: 'absolute', overflow: 'visible', top: 0, left: 0, right: 0, bottom: 64 }}
            preserveAspectRatio='xMinYMin slice'
            viewBox='0 0 2293 1360'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'>
            <g filter='url(#filter0_f_2174_11)'>
              <path
                d='M1134.9 811.962C1134.9 995.872 670.816 1159.96 486.905 1159.96C302.994 1159.96 458.405 920.372 458.405 736.462C-224.095 845.962 667.405 94.4617 613.405 361.462C742.905 525.462 680.405 740.462 1134.9 811.962Z'
                fill='#166BE1'
                fillOpacity='0.2'
                style={{ mixBlendMode: 'multiply' }}
              />
            </g>
            <g filter='url(#filter1_f_2174_11)'>
              <path
                d='M1129.37 774.519C993.298 607.038 1284.62 362.14 1452.1 226.063C1619.58 89.987 1628.63 508.234 1928.24 343.897C2208.9 389.557 2240.66 845.849 1858.29 912.962C1393.39 1215.36 1434.28 666.143 1129.37 774.519Z'
                fill='#F1E0FF'
                fillOpacity='0.15'
              />
            </g>
            <defs>
              <filter
                id='filter0_f_2174_11'
                x='0'
                y='103.703'
                width='1334.9'
                height='1256.26'
                filterUnits='userSpaceOnUse'
                colorInterpolationFilters='sRGB'>
                <feFlood floodOpacity='0' result='BackgroundImageFix' />
                <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
                <feGaussianBlur stdDeviation='100' result='effect1_foregroundBlur_2174_11' />
              </filter>
              <filter
                id='filter1_f_2174_11'
                x='944.222'
                y='48.3669'
                width='1347.89'
                height='1106.59'
                filterUnits='userSpaceOnUse'
                colorInterpolationFilters='sRGB'>
                <feFlood floodOpacity='0' result='BackgroundImageFix' />
                <feBlend mode='normal' in='SourceGraphic' in2='BackgroundImageFix' result='shape' />
                <feGaussianBlur stdDeviation='75' result='effect1_foregroundBlur_2174_11' />
              </filter>
            </defs>
          </svg>
          <Grid container spacing={2} sx={{ zIndex: 10 }}>
            <Grid item xs={12} md={6} display='flex' justifyContent='center' order={{ xs: 2, md: 1 }}>
              <Stack direction='column' spacing={2} justifyContent='center' sx={{ maxWidth: 256 + 128 }}>
                <Typography variant='h4' component='h2' sx={{ fontSize: '1.75rem', fontWeight: 'semibold' }}>
                  Join Memvy
                  <br />
                  and start capturing
                  <br />
                  your stories today!
                </Typography>
                <Typography variant='caption' sx={{ textWrap: 'balance', color: '#B3BED4', fontSize: '0.875rem' }}>
                  Become part of a community that preserves your memories for nostalgic return whenever you choose.
                </Typography>
                <Box style={{ marginRight: 'auto' }}>
                  <Button
                    component={Link}
                    href={'/app/login'}
                    variant={'contained'}
                    sx={{ backgroundColor: '#2B3672', borderRadius: '19px' }}>
                    <Typography variant='button'>Get started</Typography>
                  </Button>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6} style={{ display: 'flex', justifyContent: 'flex-end' }} order={{ xs: 1, md: 2 }}>
              <Image
                src={`/images/phone_screen.png`}
                alt={''}
                width={590}
                height={439}
                quality={95}
                style={{ marginRight: '-24px', zIndex: 10 }}
              />
            </Grid>
          </Grid>
        </Section>
        <Section>
          <Typography
            variant='h4'
            component='h2'
            align='center'
            sx={{ mt: { xs: 4, md: 8 }, mb: 4, fontSize: '1.75rem', fontWeight: 'semibold' }}>
            Memvy brings your memories to life.
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Feature title='Centralized' icon='centralized' description='All your cherished memories in one place.' />
            </Grid>
            <Grid item xs={12} md={4}>
              <Feature title='Inspired' icon='inspired' description='Guided prompts to spark your storytelling.' />
            </Grid>
            <Grid item xs={12} md={4}>
              <Feature
                title='Collaborative'
                icon='collaborative'
                description='Collect and tell richer, deeper stories through collaboration.'
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Feature
                title='Effortless'
                icon='effortless'
                description='Simple story creation and interaction on our platform.'
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Feature
                title='Interactive'
                icon='interactive'
                description='Unique interaction experience using our filtering tool.'
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Feature
                title='Accessible'
                icon='accessible'
                description='Access your memories anytime, any place, using our beautiful interface.'
              />
            </Grid>
          </Grid>
        </Section>
        <Section>
          <div
            style={{
              position: 'absolute',
              overflow: 'visible',
              width: '100%',
              height: '100%',
              zIndex: 10,
              pointerEvents: 'none',
              transform: 'translateY(224px)',
            }}>
            <img
              alt=''
              loading='lazy'
              decoding='async'
              data-nimg='fill'
              sizes='100vw'
              src='/images/shadow_cta.png'
              style={{
                minHeight: '100%',
                maxHeight: '180%',
                width: '100%',
                objectFit: 'cover',
                color: 'transparent',
                overflow: 'visible',
              }}
            />
          </div>

          {/*<Image
            src='/images/shadow_cta.png'
            fill
            alt=''
            style={{
              overflow: 'visible',
              objectFit: 'cover',
              zIndex: 10,
              transform: 'translateY(224px)',
              pointerEvents: 'none',
            }}
          />*/}
          <Stack direction='column' alignItems='center' gap={4}>
            <Box sx={{ width: 128, height: 128, borderRadius: 30, position: 'relative' }}>
              <Image
                src={`/images/logo_blue.png`}
                alt={'Memvy'}
                width={128}
                height={128}
                quality={100}
                style={{
                  position: 'relative',
                  zIndex: 8,
                  backgroundColor: '#131544',
                  borderRadius: '30px',
                  boxShadow:
                    '0px 37px 15px 0px rgba(0,0,0,0.01), 0px 21px 13px 0px rgba(0,0,0,0.05), 0px 9px 9px 0px rgba(0,0,0,0.09), 0px 2px 5px 0px rgba(0,0,0,0.10)',
                }}
              />
              <Box
                sx={{
                  zIndex: 5,
                  borderRadius: '30px',
                  position: 'absolute',
                  inset: 0,
                  transform: 'translateY(17px)',
                  backgroundColor: 'rgba(241, 224, 255, 0.1)',
                  filter: 'blur(37px)',
                  boxShadow:
                    '0px 37px 15px 0px rgba(0,0,0,0.01), 0px 21px 13px 0px rgba(0,0,0,0.05), 0px 9px 9px 0px rgba(0,0,0,0.09), 0px 2px 5px 0px rgba(0,0,0,0.10)',
                }}
              />
            </Box>
            <Typography
              variant='caption'
              align='center'
              sx={{ textTransform: 'uppercase', color: '#B3BED4', letterSpacing: '0.125rem' }}>
              Memvy is available now
            </Typography>
            <Typography variant='h3' component='h2' align='center'>
              Start making memories,
              <br />
              <PinkGradient>together.</PinkGradient>
            </Typography>
            <Box>
              <Button
                component={Link}
                href={'/app/login'}
                variant={'contained'}
                sx={{ borderRadius: '19px', backgroundColor: '#2B3672' }}>
                <Typography variant='button'>Get started today</Typography>
              </Button>
            </Box>
          </Stack>
        </Section>
        <Section id='faq'>
          <Typography
            variant='h4'
            component='h2'
            align='center'
            sx={{ mb: 4, fontSize: '1.75rem', fontWeight: 'semibold' }}>
            You might be wondering <PinkGradient> about Memvy.</PinkGradient>
            {/* Or Got questions about Memvy? */}
          </Typography>
          <FAQ />
        </Section>
        <Footer />
      </div>
    </Box>
  );
};
