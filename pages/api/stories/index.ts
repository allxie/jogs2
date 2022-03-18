import * as StoriesService from "@data/services/storiesService";
import { Req, StoryRes } from '@common/types/Server'

export default async function stories(req: Req, res: StoryRes) {
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
