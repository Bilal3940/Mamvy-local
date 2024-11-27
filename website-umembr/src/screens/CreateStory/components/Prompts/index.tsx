import { Box, Checkbox, InputLabel, Theme, Typography, useMediaQuery } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { storySelector } from '@/store/selectors';
import { palette } from '@/theme/constants';
import { MuiTextField } from '@/components';

const storyPrompts = [
  {
    text: 'life_story',
    prompts: [
      { checked: true, placeholder: 'share_a_memory_life', value: '' },
      { checked: true, placeholder: 'share_a_memory_person', value: '' },
      { checked: true, placeholder: 'share_a_memory_working', value: '' },
      { checked: true, placeholder: 'share_a_memory_other', value: '' },
    ],
  },
  {
    text: 'classmates_story',
    prompts: [
      { checked: true, placeholder: 'share_a_memory_fun', value: '' },
      { checked: true, placeholder: 'share_a_memory_challenge', value: '' },
      { checked: true, placeholder: 'share_a_memory_group', value: '' },
      { checked: true, placeholder: 'share_a_memory_other2', value: '' },
    ],
  },
  {
    text: 'teammates_story',
    prompts: [
      { checked: true, placeholder: 'share_a_memory_team', value: '' },
      { checked: true, placeholder: 'share_a_memory_win', value: '' },
      { checked: true, placeholder: 'share_a_memory_team2', value: '' },
      { checked: true, placeholder: 'share_a_memory_fan', value: '' },
    ],
  },
  {
    text: 'none_of_this_story',
    prompts: [
      { checked: true, placeholder: 'share_a_memory_other3', value: '' },
      { checked: true, placeholder: 'share_a_memory_fun2', value: '' },
      { checked: true, placeholder: 'share_a_memory_challenge2', value: '' },
      { checked: true, placeholder: 'share_a_memory_other4', value: '' },
    ],
  },
  {
    text: 'uga_story',
    prompts: [
      { checked: true, placeholder: 'share_a_memory_other3', value: '' },
      { checked: true, placeholder: 'share_a_memory_fun2', value: '' },
      { checked: true, placeholder: 'share_a_memory_challenge2', value: '' },
      { checked: true, placeholder: 'share_a_memory_other4', value: '' },
    ],
  },
];

export const PromptsStories = ({
  setSelectedPrompts,
}: {
  selectedPrompts: {};
  setSelectedPrompts: (value: React.SetStateAction<{}>) => void;
}) => {
  const { t } = useTranslation();

  const createData = useSelector(storySelector);
  const { storySection, prev_stories } = createData;

  const [prompts, setPrompts] = useState(storyPrompts);
  console.log("i am the prompts", prompts)
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const statePrompts = useSelector((state: any) => state.story.prompts);

  useEffect(() => {
    if (statePrompts && Object.keys(statePrompts || {}).length > 0) {
      const updatedPrompts = filteredPrompts.map((story) => ({
        ...story,
        prompts: story.prompts.map((prompt) => ({
          ...prompt,
          checked: !!statePrompts[prompt.placeholder],
          value: statePrompts[prompt.placeholder] ? t(prompt.placeholder) : '',
        })),
      }));
      setPrompts(updatedPrompts);
    }
  }, [statePrompts]);

  const handleCheckboxChange = (storyText: string, promptPlaceholder: string) => {
    const updatedPrompts = prompts.map((story) => {
      if (story.text === storyText) {
        return {
          ...story,
          prompts: story.prompts.map((prompt) => {
            if (prompt.placeholder === promptPlaceholder) {
              const isChecked = !prompt.checked;
              const promptIdentifier = `${storyText}-${promptPlaceholder}`;
              setSelectedPrompts((prevSelectedPrompts: { [key: string]: string }) => ({
                ...prevSelectedPrompts,
                [promptPlaceholder]: isChecked,
              }));
              // if (isChecked) {
              //   setSelectedPromps(() => [...selectedPromps, promptIdentifier]);
              // } else {
              //   setSelectedPromps((prev) => prev.filter((id) => id !== promptIdentifier));
              // }
              return {
                ...prompt, checked: isChecked, value: storyText !== 'none_of_this_story' ?
                  t(prompt.placeholder) : `${t(prompt.placeholder)} ${t('from')} ${prev_stories?.title}`
              };
            }
            return prompt;
          }),
        };
      }
      return story;
    });
    setPrompts(updatedPrompts);
  };

  const filteredPrompts = useMemo(() => {
    const selectedPrompts = prompts?.filter((story) => story?.text === storySection);
    selectedPrompts.map((story) => {
      story.prompts.map((prompt) => {
        if (prompt.checked) {
          setSelectedPrompts((prevSelectedPrompts: { [key: string]: string }) => ({
            ...prevSelectedPrompts,
            [prompt.placeholder]: prompt.checked,
          }));
        }
      });
    });
    return selectedPrompts;
  }, [prompts, storySection]);

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      width={isMobile ? '100%' : 'calc(100% - 2rem)'}
      margin={'1.5rem auto 0 auto'}
      bgcolor={palette.cardBackground}
      border={`0.063rem solid ${palette.cardBorder}`}
      sx={{ backdropFilter: 'blur(1.5625rem)' }}
      borderRadius={'0.5rem'}
      minHeight={'30.625rem'}
      padding={isMobile ? '1.5rem' : '3.5rem'}>
      <Typography
        variant={isMobile ? 'body2' : 'h5'}
        color={palette.white}
        textAlign={isMobile ? 'center' : 'left'}
        marginBottom={'1rem'}>
        {t('automated_prompts')} {t(storySection)} {t('memories')}
      </Typography>
      <Typography variant={'caption'} color={palette.white}>
        {t('select_prompts')}
      </Typography>
      <Box marginTop={'1rem'}>
        {filteredPrompts.map((story, storyIndex) =>
          story.prompts.map((prompt, promptIndex) => (
            <Box key={`prompt-${storyIndex}-${promptIndex}`} display={'flex'} margin={'1rem 0'}>
              <Checkbox
                checked={prompt.checked}
                onChange={() => handleCheckboxChange(story.text, prompt.placeholder)}
                color={'error'}
                sx={{
                  color: palette.white,
                  '&.Mui-checked': {
                    color: palette.primary,
                  },
                  marginRight: '0.5rem',
                }}
              />
              <InputLabel
                sx={{
                  color: palette.white,
                  marginTop: '0.6rem',
                  whiteSpace: 'normal',
                  fontSize: isMobile ? '12px' : '15px',
                  overflow: 'visible',
                  textOverflow: 'unset',
                }}>
                {t(prompt.placeholder)}
              </InputLabel>
              <MuiTextField
                sx={{
                  display: 'none'
                }}
                fullWidth
                disabled
                InputLabelProps={{ shrink: true }}
                id={`Prompt-${storyIndex}-${promptIndex}`}
                name={`Prompt-${storyIndex}-${promptIndex}`}
                placeholder={
                  story?.text !== 'none_of_this_story'
                    ? t(prompt.placeholder)
                    : `${t(prompt.placeholder)} ${t('from')} ${prev_stories?.title}`
                }
                disabledColor={prompt.checked ? palette.white : palette.gray}
                // label={`Prompt ${promptIndex + 1}`}
                value={prompt.value}
                onChange={(event) => {
                  const newValue = event.target.value;
                  const updatedPrompts = filteredPrompts.map((story, sIndex) => {
                    if (sIndex === storyIndex) {
                      return {
                        ...story,
                        prompts: story.prompts.map((p, pIndex) => {
                          if (pIndex === promptIndex) {
                            return { ...p, value: newValue };
                          }
                          return p;
                        }),
                      };
                    }
                    return story;
                  });
                  setPrompts(updatedPrompts);
                }}
                isDarkTheme={false}
              />
            </Box>
          )),
        )}
      </Box>
    </Box>
  );
};
