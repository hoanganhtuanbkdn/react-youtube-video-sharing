import { getLinkPreview } from 'link-preview-js';
import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
	const link = req.query.link;
	res.setHeader('Content-Type', 'application/json');

	const result = await getLinkPreview(link as string);
	// send request to the original file

	res.status(200).json(result);
};
