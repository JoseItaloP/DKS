import React from 'react'
import {  Route, Routes } from 'react-router-dom'
import DebatePost from './DebatePost'
import GeneralPost from './GeneralPost'
import ResumeSystemPost from './ResumeSystemPost'
import RulePost from './RulePost'
import NewPost from './NewPosts/NewPost'
import Edit from './Post/ModalShow/EditModal/Edit'

const Post = () => {
  return (
    <>
        <Routes>
            <Route path='/DebatePost' element={<DebatePost/>}/>
            <Route path='/GeneralPost' element={<GeneralPost/>}/>
            <Route path='/ResumeSystemPost' element={<ResumeSystemPost/>}/>
            <Route path='/NewPost*' element={<NewPost />}/>
            <Route path='/RulePost' element={<RulePost/>}/>
            <Route path="/*" element={<Edit />} />
        </Routes>
    </>
  )
}

export default Post
