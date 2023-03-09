import ControleLivro from "@/classes/controle/ControleLivros";
import { NextApiRequest, NextApiResponse } from "next";

export const controleLivro = new ControleLivro();

const resp = (req: NextApiRequest, res: NextApiResponse) => {
	switch (req.method) {
		case "GET":
			try {
				const livros = controleLivro.obterLivros();
				res.status(200).json({ livros });
			} catch (error) {
				res.status(500).json({ message: "Erro ao obter livros" });
			}
			break;
		case "POST":
			try {
				const livro = req.body;
				controleLivro.incluir(livro);
				res.status(200).json({ message: "Livro incluido com sucesso" });
			} catch (error) {
				res.status(500).json({ message: "Erro ao incluir livro" });
			}
			break;
		default:
			res.status(405).json({ message: "Método não permitido" });
			break;
	}
};
export default resp;
