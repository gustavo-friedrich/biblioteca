import Link from 'next/link';
import { notFound } from 'next/navigation';
//import { livros } from '@/lib/dados-exemplo';
import { buscarLivro } from '@/lib/livros';
export default async function DetalheLivro({ params }){
    const { id } = await params;
    const livro = await buscarLivro(id);

    if(!livro){
        notFound();
    }

    return(
        <div>
            <h1>{livro.titulo}</h1>
            <p><strong>Autor: </strong>{livro.autor}</p>
            <p><strong>Ano: </strong>{livro.ano}</p>
            <p><strong>Situação: </strong>{livro.disponivel ? 'Disponível': 'Emprestado'}</p>
            <p><Link href="/livros">Voltar para a lista</Link></p>
        </div>
    );
}