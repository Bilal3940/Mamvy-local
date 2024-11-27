import { RtfComponent } from '@/components';
import { convertToTitleCase } from '@/utils';
import { Box, Grid, Theme, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const InfoRender: FC<any> = ({ title, data }) => {
  const { t } = useTranslation();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const validateData = useMemo(
    () =>
      Object.keys(data || {}).reduce((acc: any, item: any) => {
        const check = data[item];
        let valid = acc;
        if (Array.isArray(check)) {
          for (const value of check) {
            const keys = Object.keys(value || {});
            for (const key of keys) {
              valid = valid || !!value[key];
            }
          }
        } else if (typeof check === 'object' && check !== null) {
          const keys = Object.keys(check);
          for (const key of keys) {
            const isTruthy = !!check[key];
            valid = valid || isTruthy;
          }
        } else {
          valid = valid || !!check;
        }
        return valid;
      }, false),
    [data],
  );

  const values = useMemo(() => {
    return Object.keys(data || {});
  }, [data]);

  const hasValidData = (obj: any) => {
    return Object.values(obj || {}).some((value) => {
      if (Array.isArray(value)) {
        return value.some((item) => Object.values(item || {}).some(Boolean));
      }
      return Boolean(value);
    });
  };

  const shouldRenderTitle =
    (title !== 'general_notes' && title !== 'general_notes_section') ||
    ((title === 'general_notes' || title === 'general_notes_section') &&
      ((title === 'general_notes' && data[0]?.children[0]?.text !== '') ||
        (title === 'general_notes_section' && data.general_notes[0]?.children[0]?.text !== '')));

  return validateData ? (
    <Box marginTop={isMobile ? '0rem' : '2rem'}>
      {shouldRenderTitle && (
        <Typography variant='h5' fontWeight={'600'} marginBottom={'1rem'}>
          {convertToTitleCase(t(`${title}`))}
        </Typography>
      )}
      <Grid container>
        {Array?.isArray(data) ? (
          <RtfComponent rtf={data} label={'p'} />
        ) : (
          values.map((value: any) => {
            return hasValidData(data[value]) ? (
              // return !!data[value] ? (
              Array.isArray(data[value]) && !data[value][0]?.type ? (
                <Box width={'100%'}>
                  {data[value].map((item: any) => (
                    <Box
                      display={'grid'}
                      width={'100%'}
                      sx={{
                        gridTemplateColumns: `repeat(${isMobile ? 1 : value === 'general_notes' || value === 'general_notes_minus' ? 1 : 2
                          }, 1fr)`,
                      }}
                      marginBottom={'1rem'}
                      key={item}>
                      {Object.keys(item || {})
                        ?.reverse()
                        .map(
                          (key: any) =>
                            item[key] && (
                              <Box display={'flex'} marginBottom={'0.5rem'} key={key}>
                                <Typography fontWeight={'600'} marginRight={'0.5rem'}>
                                  {t(key)}:
                                </Typography>
                                <Typography>
                                  {key?.includes('date') ? new Date(item[key]).toLocaleDateString() : item[key]}
                                </Typography>
                              </Box>
                            ),
                        )}
                    </Box>
                  ))}
                </Box>
              ) : typeof data[value] !== 'string' && !Array.isArray(data[value]) ? (
                <Box width={'100%'}>
                  <Typography marginBottom={'1rem'}>{t(`${value}_minus`)}</Typography>
                  <Box
                    display={'grid'}
                    width={'100%'}
                    sx={{ gridTemplateColumns: 'repeat(2, 1fr)' }}
                    marginBottom={'1rem'}>
                    {Object.keys(data[value] || {})
                      ?.reverse()
                      .map((key: any) => {
                        return (
                          data[value][key] && (
                            <Box display={'flex'} width={'100%'} marginBottom={'0.5rem'} key={key}>
                              <Typography fontWeight={'600'} marginRight={'0.5rem'}>
                                {key == 'general_information' ? t(`${key}_minus`) : t(`${key}`)}:
                              </Typography>
                              <Typography key={key}>
                                {key?.includes('date') ? (
                                  new Date(data[value][key]).toLocaleDateString()
                                ) : Array.isArray(data[value][key]) ? (
                                  <RtfComponent rtf={data[value][key]} label={'p'} />
                                ) : (
                                  data[value][key]
                                )}
                              </Typography>
                            </Box>
                          )
                        );
                      })}
                  </Box>
                </Box>
              ) : Array.isArray(data[value]) ? (
                <RtfComponent rtf={data[value]} label={'p'} />
              ) : (
                <Box display={'grid'} width={isMobile ? '100%' : '50%'} marginBottom={'1rem'}>
                  <Box display={'flex'}>
                    <Typography fontWeight={'600'} marginRight={'0.5rem'}>
                      {t(value)}:
                    </Typography>
                    <Typography key={value}>{data[value]}</Typography>
                  </Box>
                </Box>
              )
            ) : null;
          })
        )}
      </Grid>
    </Box>
  ) : null;
};

export default InfoRender;
