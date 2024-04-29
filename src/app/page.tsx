import Button from "@/components/Button";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import axios from "axios";
import Link from "next/link";

axios.defaults.baseURL = 'https://localhost:3000';

export default function Home() {
  return (
      <div className="bg-gray-100 h-full w-full">
        <Header/>
        <section className='flex flex-col items-center justify-center mt-10 p-5 w-1/2 h-1/2 mx-auto'>
          <h1 className="text-8xl">Olá!</h1>
          <h3 className="text-2xl mt-5 text-center">Bem vindo a sua lista de tarefas!</h3>
        </section>
          <div className="flex flex-col items-center justify-center pt-5">
            <Link href="/login">
              <Button type="" text="Vamos Começar!"  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"/>
            </Link>
          </div>
      
          <Footer />
      </div>
);
}
