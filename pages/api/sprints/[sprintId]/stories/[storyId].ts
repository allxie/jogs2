import * as StorySprintService from '@data/services/storySprintService';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function sprintStories(req: NextApiRequest, res: NextApiResponse) {
  switch(req.method) {
    case 'POST':
      res.json(await StorySprintService.addStoryToSprint(req));
      break;
    case 'DELETE':
      res.json(await StorySprintService.removeStoryFromSprint(req));
      break;
    default:
      // code block
  }
    
}
