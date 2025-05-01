import React, { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { toast, ToastContainer } from 'react-toastify'
import { useNavigate, useLocation } from 'react-router-dom'
import { decodeJwt } from '../utils/jwt'

function loginUser(data) {
  return fetch('http://localhost:3000/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(res => res.json())
}

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message)
        const decodedToken = decodeJwt(data.jwtToken)
        if (decodedToken?.role === 'admin') {
          navigate('/admin', { replace: true })
        } else {
          navigate('/home', { replace: true })
        }
      }
    }
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    mutation.mutate(form)
  }

  return (
    <>

      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button type="submit" disabled={mutation.isLoading}>Login</button>
      </form>

      <ToastContainer />
    </>
  )
}
