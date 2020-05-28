import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import './styles.css'
import '../../global.css'

import logoImg from '../../assets/logo.svg'

import api from '../../services/api'

export default function Logon() {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsloading] = useState(false)
  const history = useHistory()

  async function handleLogin(e) {
    e.preventDefault()

    try {
      setIsloading(true)
      const response = await api.post('users/login', { name, password })
      localStorage.setItem('sessionToken', response.data.token)
      history.push('/pedidos')
      setIsloading(false)
    } catch (err) {
      alert('Falha no login, por favor tente novamente')
    }
  }

  return (
    <div className='logon-container'>
      <div className='logo'>
        <img src={logoImg} alt='Logo de uma mão em sinal de oração' />
      </div>

      <section className='form'>
        <form onSubmit={handleLogin}>
          <div className='boasVindas'>
            <p className='titulo'>Bem-vindo(a) ao</p>
            <p className='subtitulo'>
              aplicativo de pedidos de orações da Maanaim
            </p>
          </div>
          <input
            placeholder='Usuário'
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            placeholder='Senha'
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          {isLoading ? (
            <h3>Por favor, aguarde...</h3>
          ) : (
            <button className='button' type='submit'>
              Entrar
            </button>
          )}
        </form>
      </section>

      {/* <img src={heroesImg} alt="Heroes" /> */}
    </div>
  )
}
