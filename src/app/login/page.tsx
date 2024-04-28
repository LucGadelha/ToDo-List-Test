'use client';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { Form, Formik } from 'formik'
import Link from 'next/link';
import React from 'react'
import * as Yup from 'yup';


const Login = () => {
  
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Digite um email válido").required("O email é obrigatório"),
    password: Yup.string().min(6, "A senha deve ter pelo menos 6 caracteres").required("A senha é obrigatória")
  })
  
  const initialValues = {
    email: '',
    password: ''
  }
  
  async function handleSubmit(values:any, { resetForm }:any) {}
 
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-start">
      <header className="text-3xl font-bold text-white w-full text-center shadow-lg p-4 bg-blue-900 mb-4">
        To Do List
      </header>
      <section className='w-full max-w-sm px-8'>
          <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={handleSubmit}>
            {({ values }) =>
            <Form noValidate className='flex flex-col gap-2 p-4 border border-gray-300 rounded-lg shadow-lg bg-white'>
                <Input name='email' type='email' placeholder='Digite seu Email...' required/>
                <Input name='password' type='password' placeholder='**********' required />
                <Button type="submit" text="Entrar" className="bg-blue-600 text-white border-none shadow-lg rounded-lg p-2 hover:bg-blue-700 active:bg-blue-500"></Button>
                <span className='text-xs text-zinc-500'>Não possui uma conta? 
                <strong className='text-zinc-700'>
                  <Link href='/register'>Cadastre-se</Link>
                  </strong>
                </span>
            </Form>}
          </Formik>
      </section>
    </div>
  )
}

export default Login