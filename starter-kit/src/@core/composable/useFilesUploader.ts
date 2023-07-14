import axiosIns from "@axios";

interface RunningUpload {
  id?: string
  label: string
  filesCount: number
  progress: number
  icon: string
}

const runningUploads: RunningUpload[] = []
export const useFilesUploader = () => {

  const upload = async (files: Array<File>, label = '', icon = '', type = 'IMAGE') => {
    const uploadForm = new FormData()

    uploadForm.append('type', type)

    files.forEach(file => {
      console.log(file)
      uploadForm.append('files[]', file)
    })

    try {
      const runningUpload = {
        id: (Math.random() + 1).toString(36).substring(7),
        label,
        filesCount: files.length,
        progress: 0,
        icon,
      }

      return await axiosIns.post('uploader/upload', uploadForm)
    } catch (err) {
      console.log(err)
    }
  }

  return {
    runningUploads,

    upload,
  }
}
