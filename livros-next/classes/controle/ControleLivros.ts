import Livro from "../modelo/Livro";

const livros: Array<Livro> = [
	{
		codigo: 1,
		codEditora: 1,
		titulo: "Título Teste 1",
		resumo: "Resumo Teste 1",
		autores: ["Autor Teste 1.1", "Autor Teste 1.2", "Autor Teste 1.3"],
	},
	{
		codigo: 2,
		codEditora: 2,
		titulo: "Título Teste 2",
		resumo: "Resumo Teste 2",
		autores: ["Autor 2.1", "Autor 2.2", "Autor 2.3"],
	},
	{
		codigo: 3,
		codEditora: 3,
		titulo: "Título Teste 3",
		resumo: "Resumo Teste 3",
		autores: ["Autor 3.1", "Autor 3.2", "Autor 3.3"],
	},
];

export default class ControleLivro {
	incluir(livro: Livro) {
		//livro.codigo = livros.length > 0 ? livros.at(-1)!.codigo + 1 : 1;
		livro.codigo = livros.length + 1; //código mais alto do vetor
		livros.push(livro);
	}

	excluir(codigo: number) {
		const index = livros.findIndex((livro) => livro.codigo === codigo);
		livros.splice(index, 1);
	}

	obterLivros() {
		return livros;
	}
}
