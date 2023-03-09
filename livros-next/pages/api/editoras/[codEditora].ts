import { controleEditora } from ".";
import { NextApiRequest, NextApiResponse } from "next";

const resp = (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method == "GET") {
		try {
			const codEditora = Number(req.query.codEditora);
			const nomeEditora = controleEditora.getNomeEditora(codEditora);
			res.status(200).json({ nomeEditora });
		} catch (error) {
			res.status(500).json({ error: error });
		}
	} else {
		res.status(405).json({ message: "Método não permitido" });
	}
};
export default resp;
