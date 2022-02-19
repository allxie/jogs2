import * as Data from "@data/node-data";
import * as Server from "@common/server";
import * as StoriesService from "@data/services/storiesService";

export default async function stories(req, res) {
  await Server.cors(req, res);

  switch(req.method) {
    case 'GET':
      const stories = await StoriesService.getNonDeletedStories();
      console.log(stories)
      res.json(stories);
      break;
    case 'POST':
      res.json(await StoriesService.createStory(req));
      break;
    case 'DELETE':
    // code block
      break;
    default:
      // code block
  }
    
}
