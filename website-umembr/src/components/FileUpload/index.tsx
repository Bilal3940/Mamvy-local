import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { Box, CircularProgress, IconButton, Theme, Typography, useMediaQuery } from '@mui/material';

import { palette } from '@/theme/constants';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';

import { styles } from './styles';
import { VideoPlayer } from '../VideoPlayer';

interface IFileUploadProps {
  name: string;
  onChange: any;
  acceptedFormats?: any;
  s3Url?: string;
  error?: boolean;
  errorMessage?: string;
  placeholder?: string;
  height?: string;
  value: string;
  setFileName?: any;
  fileName?: any;
  mediaType?: any;
  disabled?: boolean;
  deleteMethod?: any;
}

export const FileUpload: FC<IFileUploadProps> = ({
  onChange,
  s3Url = null,
  mediaType,
  acceptedFormats = (mediaType === 'image' && '.jpg, .jpeg, .png') ||
    (mediaType === 'video' && '.mp4, .mkv, .mov, webm') ||
    (mediaType === 'audio' && '.mp3, .wav, .ogg') ||
    (mediaType === 'text' && '.pdf, .txt, .doc, .docx'),
  error = false,
  errorMessage = '',
  name,
  value,
  placeholder = 'click_to_upload',
  height = '14.5rem',
  setFileName,
  fileName,
  disabled = false,
  deleteMethod,
}: any) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const inputRef: any = useRef(null);
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const [file, setFile] = useState<any>();
  const [inputKey, setInputKey] = useState(0);
  const dropzoneRef = useRef<HTMLDivElement>(null);

  const handleUpload = () => {
    inputRef?.current?.click();
  };

  const validateFiles = (files: File[]): File[] => {
    if (!acceptedFormats) return files;

    const acceptedTypes = acceptedFormats.split(',').map((type: string) => type.trim());
    return files.filter((file) => acceptedTypes.some((type: string) => file.type.startsWith(type.split('/')[0])));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleFileChange(e as any);
  };

  const handleFileChange = async (event: any) => {
    let files: File[] = [];
    if ('dataTransfer' in event) {
      files = event.dataTransfer.files ? Array.from(event.dataTransfer.files) : [];
    } else {
      files = event.target.files ? Array.from(event.target.files) : [];
    }

    const validatedFiles = validateFiles(files);
    if (validatedFiles.length === 0) {
      setLoading(false);
      return;
    }

    const file = validatedFiles[0];

    setLoading(true);
    if (file.type.startsWith('image/')) {
      setSelectedImage(file);
      onChange(name, file);
      if (mediaType === 'image') setFileName(file);
    } else {
      const fileURL = URL.createObjectURL(file);
      setFile(fileURL);
      setFileName(file);
      onChange(name, file);
      if (inputRef.current) {
        inputRef.current.src = fileURL;
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    if (value) {
      return setSelectedImage(value);
    }
    setSelectedImage(null);
    onChange(name, '');
  }, [value]);

  const deleteImage = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    if (inputRef.current && inputRef.current.src) {
      URL.revokeObjectURL(inputRef.current.src);
      inputRef.current.src = '';
    }
    setSelectedImage(null);
    setFile('');
    onChange(name, '');

    setInputKey((prevKey) => prevKey + 1);
  };

  const showImageType = (acceptedFormats: string, image: string) => {
    switch (selectedImage?.type?.split('/')[0]) {
      case 'image':
        return image;
      case 'audio':
        return '/images/music.png';
      default:
        return image;
    }
  };

  const urlImage = useMemo(() => (selectedImage == null ? '' : URL.createObjectURL(selectedImage)), [selectedImage]);

  return (
    <Box
      display={'flex'}
      width={'100%'}
      role={'presentation'}
      flexDirection={'column'}
      alignItems={'flex-start'}
      justifyContent={'flex-start'}>
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        borderRadius={'1.25rem'}
        tabIndex={0}
        overflow={'hidden'}
        ref={dropzoneRef}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => {
          handleUpload();
        }}
        onKeyPress={(event) => {
          if (event.key === 'Enter') {
            handleUpload();
          }
        }}
        position={'relative'}
        width={'100%'}
        sx={{ cursor: 'pointer' }}
        height={height}
        border={`0.125rem dashed ${error ? palette.error : palette.cardBorder}`}>
        {!selectedImage && !file && !loading ? (
          <Typography
            textAlign={'center'}
            variant={isMobile ? 'subtitle1' : 'h4'}
            color={palette.white}
            width={isMobile ? '90%' : '100%'}>
            {t(placeholder)}
          </Typography>
        ) : selectedImage && !loading ? (
          <>
            {selectedImage?.type?.split('/')[0] === 'video' ? (
              <VideoPlayer url={urlImage} disabledVideo width={'100%'} height={'100%'} />
            ) : (
              <Image
                src={showImageType(acceptedFormats, urlImage) || s3Url || selectedImage}
                alt='storie image'
                fill
                priority
                sizes='100%'
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                quality={80}
              />
            )}
            <IconButton sx={styles.icon} disabled={loading} onClick={deleteImage}>
              <Image src={`/icons/trash.svg`} alt={'trash'} width={20} height={20} quality={80} />
            </IconButton>{' '}
          </>
        ) : mediaType === 'text' && !loading ? (
          <>
            <Box display='flex' flexDirection='column' alignItems='start' mt={2}>
              <Typography variant='body1' color={palette.white}>
                {' '}
                {t(fileName.name)}
              </Typography>
            </Box>
            <IconButton sx={styles.icon} disabled={loading} onClick={deleteImage}>
              <Image src={`/icons/trash.svg`} alt={'trash'} width={20} height={20} quality={80} />
            </IconButton>
          </>
        ) : file && !loading ? (
          <>
            <video ref={inputRef as any} width='80%' height='100%' controls={true}>
              <source src={file} type='video/mp4' />
            </video>
            <IconButton sx={styles.icon} disabled={loading} onClick={deleteImage}>
              <Image src={`/icons/trash.svg`} alt={'trash'} width={20} height={20} quality={80} />
            </IconButton>
          </>
        ) : (
          <CircularProgress sx={{ color: palette.primary }} />
        )}
        <input
          key={inputKey}
          id='story-image'
          className='story-image'
          type='file'
          style={{ display: 'none' }}
          ref={inputRef}
          disabled={disabled || loading}
          accept={acceptedFormats}
          onChange={(e: any) => {
            handleFileChange(e);
          }}
        />
      </Box>
      {error && (
        <Typography variant='caption' marginLeft={'0.875rem'} marginTop={'0.1875rem'} color={palette?.error}>
          {t(errorMessage)}
        </Typography>
      )}
    </Box>
  );
};
