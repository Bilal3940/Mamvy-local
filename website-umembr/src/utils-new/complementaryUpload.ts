import { getUploadSignedUrl } from "@/store/actions"
import FetchFileService from "./FetchFileService"
import { fileConverter } from "./fileConverter"
import { cdn_url } from "./path"

export const complementaryUpload = async (dispatch: any, files: any, story: any, isVideo: boolean = false, isImage: boolean = false) => {
  return new Promise(async (resolve, reject) => {
    const data: any = []
    for (const file of files) {
      const fileName = isVideo ? `videos/${file?.name?.split('/')?.pop()}` : isImage ? `stories/${story?.title}/memories/${file?.name?.split('/')?.pop()?.replace(/\.[^.]+$/, '.webp')}` : `stories/${story?.title}/memories/${file?.name?.split('/')?.pop()}`
      dispatch(getUploadSignedUrl({ file: fileName, type: isImage ? 'image/webp' : file?.type }, async (res: any) => {
        let response: any = null
        if (isImage) {
          const newFile = await fileConverter(file);
          response = await FetchFileService(res?.value?.url?.uploadUrl, 'PUT', newFile, 'image/webp');
        } else {
          response = await FetchFileService(res?.value?.url?.uploadUrl, 'PUT', file, file?.type);
        }
        if (response?.ok) {
          data.push(fileName)
        }
        if (data.length == files.length) resolve(data)
      }))
    }
  })
}

export const complementaryDownload = async (dispatch: any, files: any) => {
  return new Promise(async (resolve, reject) => {
    const data: any = []
    for (const file of files) {
      const response = await FetchFileService(`${cdn_url}${file?.video || file}`, 'GET', null);
      const blob = await response?.data?.blob();
      const fileDownloaded = new File([blob], file, { type: blob.type });
      data.push(fileDownloaded)
      if (data.length == files.length) resolve(data)
    }
  })
}