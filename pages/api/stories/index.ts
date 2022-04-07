import * as StoriesService from "@data/services/storiesService";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function stories(req: NextApiRequest, res: NextApiResponse) {
  switch(req.method) {
    case 'GET':
      const getStories = await StoriesService.getNonDeletedStories();
      res.json(getStories);
      break;
    case 'POST':
      const postStory = await StoriesService.createStory(req)
      res.json([postStory]);
      break;
    default:
      // code block
  }
    
}
