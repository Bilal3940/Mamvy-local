import { FC, useMemo, useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { createEditor, Descendant, Editor, Element as SlateElement, Transforms, Text, BaseEditor } from 'slate';
import { Slate, Editable, withReact, useSlate, ReactEditor } from 'slate-react';
import { Box, Divider, IconButton, MenuItem, MenuList, Paper, Theme, Typography, useMediaQuery } from '@mui/material';
import { palette } from '@/theme/constants';
import isHotkey from 'is-hotkey';
import { withHistory, HistoryEditor } from 'slate-history';
import { MuiIconButton } from '..';
import { styles } from './styles';
import { UseIntermitence } from '@/hooks';
import Image from 'next/image';
import { templatesSelector } from '@/store/selectors';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

interface IRichTextProps {
  name: string;
  error?: boolean;
  label?: string;
  errorMessage?: string | any;
  placeholder: string;
  testId?: string;
  onChange: any;
  value?: any;
  disabled?: boolean;
}

type CustomText = {
  text: string;
  fontSize?: string;
};

interface CustomElement {
  type: 'paragraph' | 'heading' | 'list-item' | 'list';
  children: CustomDescendant[];
}


type CustomDescendant = CustomElement | CustomText;

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const HOTKEYS: any = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
};
const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'];
const LIST_TYPES = ['numbered-list', 'bulleted-list'];
const FONT_SIZE = ['12px', '14px', '16px', '18px', '20px', '22px', '24px', '26px', '28px', '30px'];

export const RichText: FC<IRichTextProps> = ({
  name,
  error = false,
  label = '',
  errorMessage = '',
  placeholder,
  testId,
  value,
  onChange,
  disabled,
}) => {
  const { t } = useTranslation();
  const editor: any = useMemo(() => withHistory(withReact(createEditor())), []);
  const renderLeaf = useCallback((props: any) => <Leaf {...props} />, []);
  const renderElement = useCallback((props: any) => <Element {...props} />, []);
  const router = useRouter();
  const [wordCount, setWordCount] = useState(0);
  const [letterCount, setLetterCount] = useState(0);
  const { status, switchStatus } = UseIntermitence();
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const [adminPalette, setAdminPalette] = useState({
    storyBackgroundColor: '', 
    textColor: '', 
    accentColor: '', 
  });
  const { template } = useSelector(templatesSelector);
  useEffect(() => {
    if (template?.template?.colors) {
      const colors = template.template.colors.reduce((acc: any, color: any) => {
        
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

      
      setAdminPalette({
        storyBackgroundColor: colors.storyBackgroundColor || 'transparent', 
        textColor: colors.textColor || '#fff', 
        accentColor: colors.accentColor || '#BF5700', 
      });
    }
  }, [template]); 

  const backgroundColorEdit = adminPalette.storyBackgroundColor;
  const accentColor = adminPalette.accentColor;
  const buttonBackground =
    router.pathname === '/app/story/[id]/update'
      ? accentColor
      : palette?.cardBackground;
  const notificationBackground =
    router.pathname === '/app/story/[id]/update'
      ? accentColor
      : palette?.primary;
  const EditStoryBackground =
    router.pathname === '/app/story/[id]/update'
      ? palette.cardBackground :palette.cardBackground;

  const initialValue: any = [
    {
      type: 'paragraph',
      children: [{ text: '', fontSize: '1rem' }],
    },
  ];
  const [editorValue, setEditorValue]: any = useState<Descendant[]>(value?.length ? value : initialValue);

  useEffect(() => {
    if (value?.length && editorValue !== value) {
      Transforms.delete(editor, {
        at: {
          anchor: Editor.start(editor, []),
          focus: Editor.end(editor, []),
        },
      });

      
      Transforms.removeNodes(editor, {
        at: [0],
      });

      
      Transforms.insertNodes(editor, value);

      setEditorValue(value);

     
      const counts = countWordsAndLetters(value);
      setWordCount(counts.wordCount);
      setLetterCount(counts.letterCount);
    }
  }, [value]);

  const handleChange = (newValue: Descendant[]) => {
    onChange(name, newValue);
    setEditorValue(newValue);
    const counts = countWordsAndLetters(newValue);
    setWordCount(counts.wordCount);
    setLetterCount(counts.letterCount);
  };

  const undo = useCallback(() => {
    HistoryEditor.undo(editor);
  }, [editor]);

  const redo = useCallback(() => {
    HistoryEditor.redo(editor);
  }, [editor]);

  const setFontSize = (fontSize: any) => {
    const { selection } = editor;
    if (selection) {
      Transforms.setNodes(editor, { fontSize: fontSize }, { match: (n) => Text.isText(n), split: true });
    }
  };

  return (
    <Box width={'100%'} flexDirection={'column'} display={'flex'}>
      <Typography variant='body1' marginBottom={'1rem'} color={palette.white}>
        {t(label)}
      </Typography>

      <Paper elevation={0} data-cy={testId} sx={styles( EditStoryBackground).paper}>
        <Slate editor={editor} initialValue={editorValue} onChange={handleChange}>
          <Box
            display={isMobile ? 'grid' : 'flex'}
            justifyContent={'flex-start'}
            alignItems={'center'}
            sx={{ gridTemplateColumns: 'repeat(8, 1fr)' }}
            borderBottom={`0.0625rem solid ${palette.cardBorder}`}>
            <HistoryButton format='undo' icon='undo' method={undo} />
            <HistoryButton format='redo' icon='redo' method={redo} />
            {!isMobile && <Divider orientation='vertical' sx={styles().divider} />}

            <MarkButton format='bold' icon='bold' />
            <MarkButton format='italic' icon='italic' />
            <MarkButton format='underline' icon='underline' />
            <MarkButton format='strike_trought' icon='strike-through' />

            {!isMobile && <Divider orientation='vertical' sx={styles().divider} />}
            <BlockButton format='left' icon='align-left' />
            <BlockButton format='center' icon='align-center' />
            <BlockButton format='right' icon='align-right' />
            <BlockButton format='justify' icon='align-justify' />
            {!isMobile && <Divider orientation='vertical' sx={styles().divider} />}
            <BlockButton format='numbered-list' icon='list-number' />
            <BlockButton format='bulleted-list' icon='list-dots' />
            <Box position={'relative'}>
              <IconButton
                onClick={() => switchStatus()}
                sx={{ borderRadius: 0, display: 'flex', justifyContent: 'center' }}>
                <Image src={`/icons/fontsize.svg`} alt={'fontsize'} width={16} height={16} quality={80} />
                <Image src={`/icons/chevron-down.svg`} alt={'chevron-down'} width={12} height={12} quality={80} />
              </IconButton>
              {status && (
                <Paper elevation={2} sx={styles().dropdown}>
                  <MenuList>
                    {FONT_SIZE?.map((item: any) => {
                      return (
                        <MenuItem key={item} sx={{ padding: 0 }}>
                          <Typography
                            onClick={() => {
                              setFontSize(item);
                              switchStatus();
                            }}
                            color={palette?.black}
                            variant='caption'>
                            {item}
                          </Typography>
                        </MenuItem>
                      );
                    })}
                  </MenuList>
                </Paper>
              )}
            </Box>
          </Box>

          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder={t(placeholder)}
            spellCheck
            readOnly={disabled}
            autoFocus
            style={{
              minHeight: '10.75rem',
              maxHeight: '10.75rem',
              overflowY: 'auto',
              overflowX: 'hidden',
              padding: '1rem',
              color: palette.white,
              fontFamily: 'DM Sans',
            }}
            onKeyDown={(event) => {
              for (const hotkey in HOTKEYS) {
                if (isHotkey(hotkey, event as any)) {
                  event.preventDefault();
                  const mark = HOTKEYS[hotkey];
                  toggleMark(editor, mark);
                }
              }
            }}
          />
        </Slate>
        <Box display={'flex'} borderTop={`0.0625rem solid ${palette.cardBorder}`} paddingLeft={'1rem'}>
          <Typography variant='body2' color={palette.white}>
            {t('words', { number: wordCount })}
          </Typography>
          <Typography variant='body2' marginLeft={'1rem'} color={palette.white}>
            {t('letters', { number: letterCount })}
          </Typography>
        </Box>
      </Paper>
      {error && <Typography color='error'>{t(errorMessage)}</Typography>}
    </Box>
  );
};

export default RichText;

const isMarkActive = (editor: any, format: any) => {
  const marks: any = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const isBlockActive = (editor: any, format: any, blockType: any = 'type') => {
  const { selection } = editor;
  if (!selection) return false;

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: (n: any) => {
        if (!Editor.isEditor(n) && SlateElement.isElement(n)) {
          const newN: any = n;
          return newN[blockType] === format;
        }
        return false;
      },
    }),
  );

  return !!match;
};

const toggleMark = (editor: any, format: any) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const toggleBlock = (editor: any, format: any) => {
  const isActive = isBlockActive(editor, format, TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type');
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n: any) => {
      if (!Editor.isEditor(n) && SlateElement.isElement(n)) {
        const typeN: any = n;
        return LIST_TYPES.includes(typeN.type) && !TEXT_ALIGN_TYPES.includes(format);
      }
      return false;
    },
    split: true,
  });
  let newProperties: any;
  if (TEXT_ALIGN_TYPES.includes(format)) {
    newProperties = {
      align: isActive ? undefined : format,
    };
  } else {
    newProperties = {
      type: isActive ? 'paragraph' : isList ? 'list-item' : format,
    };
  }

  Transforms.setNodes(editor, newProperties);

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const Element = ({ attributes, children, element }: any) => {
  const style = { textAlign: element.align };
  switch (element.type) {
    case 'bulleted-list':
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );

    case 'list-item':
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case 'numbered-list':
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

const Leaf = ({ attributes, children, leaf }: any) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  if (leaf.strike_trought) {
    children = <s>{children}</s>;
  }

  if (leaf.fontSize) {
    children = <span style={{ fontSize: leaf.fontSize }}>{children}</span>; 
  }

  return <span {...attributes}>{children}</span>;
};

const HistoryButton = ({ format, icon, method }: any) => {
  const editor = useSlate();
  return (
    <Box margin={'0 0.1rem'}>
      <MuiIconButton
        icon={`/icons/${icon}`}
        isRounded={false}
        background={isMarkActive(editor, format) ? palette.inputLight : 'transparent'}
        altIcon={icon}
        method={(event: any) => {
          event.preventDefault();
          method();
        }}
      />
    </Box>
  );
};

const MarkButton = ({ format, icon }: any) => {
  const editor = useSlate();
  return (
    <Box margin={'0 0.1rem'}>
      <MuiIconButton
        icon={`/icons/${icon}`}
        isRounded={false}
        background={isMarkActive(editor, format) ? palette.inputLight : 'transparent'}
        altIcon={icon}
        method={(event: any) => {
          event.preventDefault();
          toggleMark(editor, format);
        }}></MuiIconButton>
    </Box>
  );
};

const BlockButton = ({ format, icon }: any) => {
  const editor = useSlate();
  return (
    <Box margin={'0 0.1rem'}>
      <MuiIconButton
        icon={`/icons/${icon}`}
        isRounded={false}
        altIcon={icon}
        background={
          isBlockActive(editor, format, TEXT_ALIGN_TYPES.includes(format) ? 'align' : 'type')
            ? palette.inputLight
            : 'transparent'
        }
        method={(event: any) => {
          event.preventDefault();
          toggleBlock(editor, format);
        }}></MuiIconButton>
    </Box>
  );
};

const countWordsAndLetters = (nodes: any) => {
  let textContent = '';

  const extractText = (nodes: any) => {
    nodes.forEach((node: any) => {
      if (node.text) {
        textContent += node.text;
      } else if (node.children) {
        extractText(node.children);
      }
    });
  };

  extractText(nodes);

  const words = textContent.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const letterCount = textContent.replace(/\s+/g, '').length;
  const spaceCount = textContent.split('').filter((char) => char === ' ').length;

  return { wordCount, letterCount, spaceCount };
};
