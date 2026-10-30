export function validarLivro({ titulo, autor, ano }){
    const erros = {};
    const anoAtual = new Date().getFullYear();

    if(!titulo || titulo.trim().length < 2){
        erros.titulo = 'Informe um título com pelo menos 2 caracteres.';
    }
    if(!autor || autor.trim().length < 2){
        erros.autor = 'Informe um título com pelo menos 2 caracteres.';
    }
    if(!Number.isInteger(ano) || ano < 1000 || ano > anoAtual){
        erros.ano = `Informe um ano entre 1000 e ${anoAtual}.`;
    }
    return erros; //objeto vazio = dados válidos
}