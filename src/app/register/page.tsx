'use client';
import Button from '@/components/Button';
import Input from '@/components/Input';
import { Form, Formik } from 'formik'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import * as Yup from 'yup';

const Register = () => {

  const [error,setError] = useState("");
  const [formSubmitting, setFormSubmitting] = useState(false);
  const router = useRouter();
  
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("O nome é obrigatório").min(3, "O nome deve ter pelo menos 3 caracteres"),
    
    email: Yup.string().email("Digite um email válido").required("O email é obrigatório"),
    password: Yup.string().min(6, "A senha deve ter pelo menos 6 caracteres").required("A senha é obrigatória")
  })
  
  const initialValues = {
    name: '',
    email: '',
    password: ''
  }
  
  async function handleSubmit(values:any, { resetForm }:any) {
    setFormSubmitting(true);
    try {
      await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password
        })
      }).then(async (res) =>{
          const result = await res.json()

          if(result.status === 201){
            alert(result.message)
            router.push("/login")
          }else{
            renderError(result.message)
            resetForm()
          }
          
          setFormSubmitting(false);

        })
        alert('Usuário criado com sucesso!')
        router.push("/login")
    } catch (error: any) {
      setFormSubmitting(false);
      renderError("Erro ao criar a conta: " + error.message);
    }
  }
 
  function renderError(msg:string){
    setError(msg);
    setTimeout(() => {
      setError("");
    }, 3000);
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-start">
      <header className="text-3xl font-bold text-white w-full text-center shadow-lg p-4 bg-blue-900 mb-4">
        To Do List
      </header>
      <section className='w-full max-w-sm px-8'>
          <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={handleSubmit}>
            {({ values }) =>
            <Form noValidate className='flex flex-col gap-2 p-4 border border-gray-300 rounded-lg shadow-lg bg-white'>
                <Input name='name' type='text' placeholder='Digite seu nome' required />
                <Input name='email' type='email' placeholder='Digite seu Email...' required/>
                <Input name='password' type='password' placeholder='**********' required />
                <Button type="submit" text={formSubmitting? "Aguarde..." : "Cadastrar-se"} disable={formSubmitting} className="bg-blue-600 text-white border-none shadow-lg rounded-lg p-2 hover:bg-blue-700 active:bg-blue-500"></Button>
                {!values.name && !values.email && !values.password && error && (<span className='text-red-500 text-sm text-center'>{error}</span>)}
                <span className='text-xs text-zinc-500'>Já possui uma conta? 
                <strong className='text-zinc-700'>
                  <Link href='/login'>Voltar a Login</Link>
                  </strong>
                </span>
            </Form>}
          </Formik>
      </section>
    </div>
  )
}


export default Register
