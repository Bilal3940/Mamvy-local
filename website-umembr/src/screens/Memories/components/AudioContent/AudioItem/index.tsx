import { AudioPlayer } from "@/components";
import { cdn_url } from "@/utils";
import { FC } from "react";

const AudioItem: FC<any> = ({ item, index }) => {
  return (<AudioPlayer index={index} name={item?.split('/').pop()} audioData={`${cdn_url}${item}`} />)
}

export default AudioItem