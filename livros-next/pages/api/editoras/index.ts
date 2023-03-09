import ControleEditora from "@/classes/controle/ControleEditora";
import { NextApiRequest, NextApiResponse } from "next";
export const controleEditora = new ControleEditora();

const resp = (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method == "GET") {
		try {
			const editoras = controleEditora.getEditoras();
			res.status(200).json(editoras);
		} catch (error) {
			res.status(500).json({ message: error });
		}
	} else {
		res.status(405).json({ message: "Método não permitido" });
	}
};

export default resp;
