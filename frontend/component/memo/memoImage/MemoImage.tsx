import { useEffect, useState } from 'react'
import { FileUploader } from 'react-drag-drop-files'
import { useDispatch } from 'react-redux'
import { changeMemoState } from 'core/store/modules/diary'
import styles from '../../../styles/scss/Memo.module.scss'
const fileTypes = ['JPEG', 'PNG', 'GIF']
interface Props {
  width: number
  height: number
  content: any
  header: any
  drag: any
  memoInfo: any
  onDeleteMemo: any
}
export default function MemoImage({ memoInfo, drag, onDeleteMemo }) {
  const dispatch = useDispatch()
  const { width, height, info } = memoInfo
  const [file, setFile] = useState(null)
  const [previewImage, setPreviewImage] = useState(info)
  const [isEditable, setIsEditable] = useState(false)
  const handleChange = (file) => {
    setFile(file)
  }
  const onUpdateButtonClick = () => {
    setIsEditable(true)
    drag.disableDragging()
    dispatch(
      changeMemoState({
        ...memoInfo,
        isEditing: true,
      }),
    )
  }
  const onApproveUpdateClick = () => {
    setIsEditable(false)
    drag.enableDragging()
    dispatch(
      changeMemoState({
        ...memoInfo,
        info: previewImage,
        isEditing: false,
      }),
    )
  }
  const onDeleteButtonClick = () => {
    onDeleteMemo(memoInfo.id)
  }
  useEffect(() => {
    if (file !== null) {
      setPreviewImage(URL.createObjectURL(file[0]))
    }
  }, [file])
  const [mouseState, setMouseState] = useState(false);
  
  const mouseOverEvent = () =>{
    setMouseState(true);
  }
  const mouseLeaveEvent = () =>{
    setMouseState(false);
  }
  return (
    <div className="App" onMouseOver={mouseOverEvent} onMouseLeave={mouseLeaveEvent}>
      {mouseState && <div className={styles.deleteButton} onClick={onDeleteButtonClick} >
        ❌
      </div>}
      {mouseState && !isEditable && (
        <div className={styles.updateButton} onClick={onUpdateButtonClick}>
          ✏️
        </div>
      )}
      {previewImage !== null && (
        <img className={styles.image} src={previewImage} style={{width: width, height: height}}  />
      )}
      {isEditable && (
        <div className={styles.fileUploader}>
          <FileUploader
            multiple={true}
            handleChange={handleChange}
            name="file"
            types={fileTypes}
          />
        </div>
      )}
      {mouseState && isEditable && (
        <div
          className={styles.approveUpdateButton}
          onClick={onApproveUpdateClick}
        >
          ✔️
        </div>
      )}
    </div>
  )
}
