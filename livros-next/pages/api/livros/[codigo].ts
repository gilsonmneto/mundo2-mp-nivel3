import { controleLivro } from ".";
import { NextApiRequest, NextApiResponse } from "next";

const resp = (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method == "DELETE") {
		try {
			const codigo = Number(req.query.codigo);
			controleLivro.excluir(codigo);
			return res.status(200).json({ message: "Livro excluído com sucesso" });
		} catch (e) {
			return res.status(500).json({ message: "Erro ao excluir livro" });
		}
	} else {
		return res.status(405).json({ message: "Método não permitido" });
	}
};
export default resp;
