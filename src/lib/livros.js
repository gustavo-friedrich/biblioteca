import 'server-only';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ARQUIVO = path.join(process.cwd(), 'data', 'livros.json');

async function lerTodos(){
    const conteudo = await readFile(ARQUIVO, 'utf-8');
    return JSON.parse(conteudo);
}

async function salvarTodos(livros){
    await writeFile(ARQUIVO, JSON.stringify(livros, null, 2));
}

export async function listarLivros(){
    return lerTodos();
}

export async function buscarLivro(id){
    const livros = await lerTodos();
    return livros.find((livro) => livro.id === Number(id));
}

export async function inserirLivro(dados){
    const livros = await lerTodos();
    const proximoId = livros.length > 0 ? Math.max(...livros.map((l) => l.id)) + 1 : 1;
    const novo = { id: proximoId, ...dados };
    livros.push(novo);
    await salvarTodos(livros);
    return novo;
}

export async function alterarLivro(id, dados){
    const livros = await lerTodos();
    const indice = livros.findIndex((livro) => livro.id === Number(id));
    if (indice === -1) return null;
    livros[indice] = { ...livros[indice], ...dados, id: Number(id) };
    await salvarTodos(livros);
    return livros[indice];
}

export async function excluirLivro(id){
    const livros = await lerTodos();
    const restantes = livros.filter((livro) => livro.id != Number(id));
    if (restantes.length === livros.length) return false;
    await salvarTodos(restantes);
    return true;
}


