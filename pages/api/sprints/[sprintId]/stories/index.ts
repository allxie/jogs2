import * as StoriesService from '@data/services/storiesService';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function sprints(req: NextApiRequest, res: NextApiResponse) {
  switch(req.method) {
    case 'GET':
      const getSprints = await StoriesService.getStoriesBySprint(req);
      res.json(getSprints);
      break;
    default:
      // code block
  }
    
}
