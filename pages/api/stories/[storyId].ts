import * as StoriesService from '@data/services/storiesService';
import { Req, StoryRes } from '@common/types/Server'

export default async function stories(req: Req, res: StoryRes) {
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
