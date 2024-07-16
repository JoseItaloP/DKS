import React from 'react'
import JoditEditor from 'jodit-react'

import styles from './styles/JoditEditorText.module.css'

const JoditEditorText = ({content, onBlur}) => {

    const editor = React.useRef(null)
    const config = {
        readonly: false,
        height: 'auto',
    }

  return (
    <div className={styles.DivJodit}>
      <JoditEditor 
        ref={editor}
        value={content}
        config={config}
        tabIndex={1}
        onBlur={onBlur}
        onChange={(newContent) => {}}
        className={styles.editColor}
      />
    </div>
  )
}

export default JoditEditorText
