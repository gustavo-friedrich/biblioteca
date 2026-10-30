import Link from 'next/link';
//import { livros } from '@/lib/dados-exemplo';
import { listarLivros } from '@/lib/livros';
import FiltroLivros from '@/components/FiltroLivros';

export default async function ListaLivros(){
    const livros = await listarLivros();
    return(
        <div>
            <h1>Livros</h1>
           <FiltroLivros livros={livros} />
        </div>
    )
}