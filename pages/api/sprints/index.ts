import * as SprintsService from "@data/services/sprintsService";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function sprints(req: NextApiRequest, res: NextApiResponse) {
  switch(req.method) {
    case 'GET':
      const getStories = await SprintsService.getSprints();
      res.json(getStories);
      break;
    case 'POST':
      const postSprint = await SprintsService.createSprint(req)
      res.json([postSprint]);
      break;
    default:
      // code block
  }
    
}
