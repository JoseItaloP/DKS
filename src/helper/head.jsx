import React from 'react'

const head = ({tittle}) => {
    React.useEffect(()=>{
        document.title = tittle + ' | DKS'
    }, [tittle])
  return (
    <> 
    </>
  )
}

export default head
