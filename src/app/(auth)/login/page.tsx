'use client';
import Button from '@/components/Button';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Input from '@/components/Input';
import { Form, Formik } from 'formik'
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import * as Yup from 'yup';


const Login = () => {
  const [error, setError] = useState("");
  const [formSubmitting, setFormSubmitting] = useState(false);
  const router = useRouter();
  const {status} = useSession();

  useEffect(() => {
    if(status === "authenticated"){
      router.push("/todo")
    }
  }, [status, router]);

    if(status !== 'unauthenticated'){
      return null;
    }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Digite um email válido").required("O email é obrigatório"),
    password: Yup.string().min(6, "A senha deve ter pelo menos 6 caracteres").required("A senha é obrigatória")
  })
  
  const initialValues = {
    email: '',
    password: ''
  }
  
  async function handleSubmit(values:any, { resetForm }:any) {
    setFormSubmitting(true);
      try {
        signIn("Credentials", {...values, redirect: false}).then (
          ({error}:any) => {
            if(!error){
            router.push("/todo")
            }else{
              renderError(error.replace("Error: ", ""))
              resetForm();
            }
            setFormSubmitting(false)
          }
        )
      } catch (error) {
      setFormSubmitting(false)
      renderError("Erro ao login");
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
      <Header/>
      <section className='w-full max-w-sm px-8'>
          <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={handleSubmit}>
            {({ values }) =>
            <Form noValidate className='flex flex-col gap-2 p-4 border border-gray-300 rounded-lg shadow-lg bg-white'>
                <Input name='email' type='email' placeholder='Digite seu Email...' required/>
                <Input name='password' type='password' placeholder='**********' required />
                <Button type="submit" text={formSubmitting ? "Enviando..." : "Entrar"} disabled={formSubmitting} className="bg-blue-600 text-white border-none shadow-lg rounded-lg p-2 hover:bg-blue-700 active:bg-blue-500" />
                {!values.email && !values.password && error && (<span className='text-red-500 text-sm text-center'>{error}</span>)}
                <span className='text-xs text-zinc-500'>Não possui uma conta? 
                <strong className='text-zinc-700'>
                  <Link href='/register'>Cadastre-se</Link>
                  </strong>
                </span>
            </Form>}
          </Formik>
      </section>
      <Footer/>
    </div>
  )
}

export default Login