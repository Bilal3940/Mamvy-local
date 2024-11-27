import React, { FC, useCallback, useMemo, useRef, useState } from 'react';
import { Box, Grid, Theme, Typography, useMediaQuery } from '@mui/material';
import { palette } from '@/theme/constants';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { styles } from './styles';
import FileItem from './FileItem';

interface IMediaFileRowProps {
  name: string;
  onChange: any;
  acceptedFormats?: any;
  value: string;
  placeholderIcon?: string;
  placeholder?: string;
  disabled?: boolean;
}
export const MediaFileRow: FC<IMediaFileRowProps> = ({
  onChange,
  acceptedFormats,
  name,
  placeholderIcon,
  placeholder,
  value,
  disabled,
}: any) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropzoneRef = useRef<HTMLDivElement>(null);

  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

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

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement> | DragEvent) => {
      setLoading(true);
      let files: File[] = [];
      if ('dataTransfer' in e) {
        files = e?.dataTransfer?.files ? Array.from(e?.dataTransfer?.files) : [];
      } else {
        files = e.target.files ? Array.from(e.target.files) : [];
      }

      const validatedFiles = validateFiles(files);
      onChange(name, [...value, ...validatedFiles]);
      setLoading(false);
    },
    [value?.length, name, onChange, acceptedFormats],
  );

  const deleteImage = useCallback(
    (index: number) => {
      const newFiles = [...value];
      newFiles.splice(index, 1);
      onChange(name, newFiles);
    },
    [value?.length, onChange, name],
  );

  const elements = useMemo(() => {
    if (isMobile) {
      // On mobile, do not show initial placeholders
      return Array.from({ length: value?.length }, (_, index) => index);
    } else {
      // On larger screens, ensure there are always at least 4 placeholders
      return Array.from({ length: value?.length > 4 ? value?.length : 4 }, (_, index) => index);
    }
  }, [value?.length, isMobile]);

  return (
    <Box display={'grid'} sx={{ gridTemplateColumns: `repeat(${isMobile ? 1 : 5}, 1fr)`, gap: 2 }}>
      <Grid
        item
        xs={isMobile ? 12 : 2.15}
        padding={1}
        ref={dropzoneRef}
        sx={styles(null).gridItem}
        onClick={handleUpload}
        marginTop={'1rem'}
        onDragOver={handleDragOver}
        onDrop={handleDrop}>
        <Image src={`/icons/media.svg`} alt={'media'} priority width={42} height={42} quality={80} />
        <Typography color={palette.white} variant='caption'>
          {t(placeholder)}
        </Typography>
        <input
          type='file'
          style={{ display: 'none' }}
          ref={inputRef}
          multiple
          disabled={disabled}
          accept={acceptedFormats}
          onChange={handleFileChange}
        />
      </Grid>

      {elements.map((item, index) => (
        <FileItem
          key={index}
          index={index}
          placeholderIcon={placeholderIcon}
          value={value[index]}
          deleteImage={deleteImage}
          loading={loading}
        />
      ))}
    </Box>
  );
};
