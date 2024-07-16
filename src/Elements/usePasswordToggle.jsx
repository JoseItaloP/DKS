import React, { useState } from 'react'
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa";

const usePasswordToggle = () => {
    const [visible, setVisible] = useState(false)
    const Icon = (
        visible ? <FaEyeSlash/> : <IoEyeSharp />
    )
    const InputType = visible ? 'text' : 'password'
  return {
    visible,
    setVisible,
    Icon, 
    InputType,
  }
}

export default usePasswordToggle
