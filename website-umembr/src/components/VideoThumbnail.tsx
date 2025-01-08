import { Box, CircularProgress, Theme, useMediaQuery } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";

// Function to extract YouTube video ID from the URL
const extractYouTubeId = (url: string): string | null => {
  const match = url.match(
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/(?:[^\/\n\s]+\/\S+|\S+v=([\w-]+))/
  );
  return match ? match[1] : null;
};

interface VideoThumbnailProps {
  videoSrc: string;
  extendedPalette?: any;
}

const VideoThumbnail: React.FC<VideoThumbnailProps> = ({ videoSrc ,extendedPalette}) => {
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isLarge = useMediaQuery((template: Theme) => template.breakpoints.up('lg'));

  useEffect(() => {
    const youtubeId = extractYouTubeId(videoSrc);
    if (youtubeId) {
      // YouTube thumbnail URL
      const youtubeThumbnail = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
      setThumbnail(youtubeThumbnail);
    } else if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      const handleLoadedMetadata = () => {
        // console.log("Video metadata loaded", video.videoWidth, video.videoHeight);

        if (!video.videoWidth || !video.videoHeight) return;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        try {
          video.currentTime = 1; // Seek to 1 second for the first frame
        } catch (error) {
          console.error("Error seeking video", error);
        }
      };

      video.addEventListener("loadedmetadata", handleLoadedMetadata);

      video.addEventListener("seeked", () => {
        try {
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
            setThumbnail(canvas.toDataURL("image/png"));
          }
        } catch (error) {
          console.error("Error drawing frame", error);
        }
      });

      return () => {
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      };
    }
  }, [videoSrc]);

  return (
    <Box minHeight={isLarge ? '14.4rem' : '100%'} >
      {thumbnail ? (
        <Box style={{ position: "relative" }}>
  <Image 
    src={thumbnail} 
    alt="Video Thumbnail" 
    width={100}
    height={100}
    style={{
      width:'100%',
      height: '100%'
    }}
  />
          <Box
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              cursor: "pointer",
              width: "60px",
              height: "60px",
              backgroundImage: "url('/images/buttonPlay.png')",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              borderRadius: "50%",
            }}
            onClick={() => console.log("Play video")} // Replace with your play video function
          />
        </Box>
      ) : (
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} minHeight={'10rem'} > <CircularProgress sx={{color: extendedPalette.buttonbackgroundIcon }}/> </Box>
      )}

      <video ref={videoRef} style={{ display: "none" }} preload="metadata" crossOrigin="anonymous">
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </Box>
  );
};

export default VideoThumbnail;
