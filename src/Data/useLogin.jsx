import React from 'react'

const types ={
  email:{
      regex:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ,
      message: 'Preencha um email valido'

  },
  password:{
      regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
      message: 'A senha deve ter no minimo 8 caracteres com: 1 letra maiscula, 1 letra minuscula e 1 caractere'
  },
  number:{
      regex:/^\d+$/,
      message: 'Utilize números apenas'
  }
}

const useLogin = (type) => {
  const [value, setValue] = React.useState('')
  const [error, setError] = React.useState(null)
  let valor

  function validate(value){
    if(type===false) return true
    if(value.length === 0){
      setError('Prencha um valor')
      return false
    } else if(types[type] && !types[type].regex.test(value)){
      setError(types[type].message)
      return false
    } else{
      setError(null)
      
      return true
    }
  }

  function onChange ({target}){
    if(error) validate(validate)
    setValue(target.value)
  }

  return {
    valor,
    value,
    setValue,
    onChange,
    error,
    validate: () => validate(value),
    onBlur: () => validate(value),
   
  }
}

export default useLogin
