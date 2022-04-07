import * as StoriesService from '@data/services/storiesService';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function stories(req: NextApiRequest, res: NextApiResponse) {
  switch(req.method) {
    case 'PATCH':
      res.json(await StoriesService.updateStory(req));
      break;
    case 'DELETE':
      res.json(await StoriesService.deleteStory(req));
      break;
    default:
      // code block
  }
    
}
