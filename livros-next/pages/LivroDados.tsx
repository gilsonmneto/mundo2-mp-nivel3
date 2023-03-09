import type { NextPage } from "next";
import React, { useState } from "react";
import styles from "../styles/Home.module.css";
import ControleEditora from "@/classes/controle/ControleEditora";
import Livro from "@/classes/modelo/Livro";
import { Menu } from "@/componentes/Menu";
import Head from "next/head";
import { useRouter } from "next/router";

const LivroDados: NextPage = () => {
	const controleEditora = new ControleEditora();
	const baseURL = "http://localhost:3000/api/livros";
	const [titulo, setTitulo] = useState("");
	const [resumo, setResumo] = useState("");
	const [autores, setAutores] = useState("");
	const [codEditora, setCodEditora] = useState(0);
	const router = useRouter();

	const incluirLivro = async (livro: Livro) => {
		const resposta = await fetch(baseURL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(livro),
		});
		return resposta.ok;
	};

	const opcoes = controleEditora.getEditoras().map((editora) => ({
		value: editora.codEditora,
		text: editora.nome,
	}));

	const tratarCombo = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setCodEditora(Number(event.target.value));
	};

	const incluir = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const novoLivro = {
			codigo: 0,
			codEditora: codEditora,
			titulo: titulo,
			resumo: resumo,
			autores: autores.split("\n"),
		} as Livro;

		await incluirLivro(novoLivro);
		await router.push("/LivroLista");
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
				<h1>Adicionar livro</h1>
				<form onSubmit={incluir}>
					<div className="form-group">
						<label htmlFor="titulo">Título</label>
						<input
							id="titulo"
							className="form-control"
							type="text"
							value={titulo}
							onChange={(e) => setTitulo(e.target.value)}
						/>
					</div>
					<div>
						<label htmlFor="resumo">Resumo</label>
						<textarea id="resumo" className="form-control" value={resumo} onChange={(e) => setResumo(e.target.value)} />
					</div>
					<div>
						<label htmlFor="codEditora">Editora:</label>
						<select id="codEditora" value={codEditora} onChange={tratarCombo}>
							{opcoes.map((editora) => (
								<option key={editora.value} value={editora.value}>
									{editora.text}
								</option>
							))}
						</select>
					</div>
					<div>
						<label htmlFor="autores">Autores (1 por linha)</label>
						<textarea
							id="autores"
							className="form-control"
							value={autores}
							onChange={(e) => setAutores(e.target.value)}
						/>
					</div>
					<br></br>
					<button type="submit">Salvar</button>
				</form>
			</main>
		</div>
	);
};

export default LivroDados;
