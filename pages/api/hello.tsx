import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query;
  //console.log(query);

  let answer;
  if ( !Object.keys(query).length ) {
    answer = 'Hello! このAPIはクエリパラメータをそのまま返します。  /api/hello?param=hoge  を試してみてください。';
  } else {
    answer = query;
  }

  res.status(200).json(answer);
};