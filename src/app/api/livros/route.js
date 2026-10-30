import { revalidatePath } from "next/cache";
import { inserirLivro, listarLivros } from "@/lib/livros";
import { validarLivro } from "@/lib/validacao";

// GET /api/livros -> lista todos
export async function GET(){
    const livros = await listarLivros();
    return Response.json(livros);
}

// POST /api/livros -> cria um livro
export async function POST(request){
    const corpo = await request.json();

    const dados = {
        titulo: corpo.titulo,
        autor: corpo.autor,
        ano: corpo.ano,
        disponivel: corpo.disponivel ?? true,
    }

    const erros = validarLivro(dados);
    if (Object.keys(erros).length>0){
        return Response.json({ erros }, { status: 400 });
    }

    const novo = await inserirLivro(dados);
    revalidatePath('/livros');
    return Response.json(novo, {status: 201});
}

