import type { NextPage } from "next";
import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";
import Head from "next/head";
import Livro from "@/classes/modelo/Livro";
import { Menu } from "../componentes/Menu";
import { LinhaLivro } from "@/componentes/LinhaLivro";

const LivroLista: NextPage = () => {
	const baseURL: string = "http://localhost:3000/api/livros";
	const [livros, setLivros] = useState<Array<Livro>>([]);
	const [carregado, setCarregado] = useState(false);

	const obterLivros = async () => {
		const resposta = await fetch(baseURL);
		return resposta.json();
	};

	const excluirLivro = async (codigo: number) => {
		const resposta = await fetch(`${baseURL}/${codigo}`, {
			method: "DELETE",
		});
		return (await resposta.json()).ok;
	};

	useEffect(() => {
		obterLivros().then((dados) => {
			setLivros(dados.livros);
			setCarregado(true);
		});
	}, [carregado]);

	const excluir = (codigo: number) => {
		excluirLivro(codigo).then(() => setCarregado(false));
	};

	return (
		<div className={styles.container}>
			<Head>
				<title>Loja Next</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Menu />
			<main className="w-75 mx-auto">
				<h1>Catálogo de Livros</h1>
				<table className="table table-hover">
					<thead className="table-dark">
						<tr>
							<th>Título</th>
							<th>Resumo</th>
							<th>Editora</th>
							<th>Autores</th>
						</tr>
					</thead>
					<tbody>
						{livros.map((livro) => (
							<LinhaLivro key={livro.codigo} livro={livro} excluir={() => excluir(livro.codigo)} />
						))}
					</tbody>
				</table>
			</main>
		</div>
	);
};

export default LivroLista;
