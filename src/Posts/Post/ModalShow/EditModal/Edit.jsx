import React from 'react';
import { Route, Routes } from 'react-router-dom';
import EditResulme from './editResulme';
import EditDebate from './editDebate';
import EditRule from './editRule';
import EditGeneral from './editGeneral';

function Edit() {


    return (
        <>
            <Routes>
                <Route path='/ResumeSystemPost/editResulme/:id' element={<EditResulme />} />
                <Route path='/DebatePost/editDebate/:id' element={<EditDebate />} />
                <Route path='/RulePost/editRule/:id' element={<EditRule />} />
                <Route path='/GeneralPost/editGeneral/:id' element={<EditGeneral/>} />
            </Routes>

        </>
    );
}

export default Edit
