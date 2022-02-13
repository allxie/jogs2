import * as Data from "@data/node-data";
import * as Stories from "@root/data/dao/storiesDao";
import * as Server from "@common/server";
import * as StoriesService from "@data/services/storiesService";
// NOTE(jim):
// CORS API example.
export default async function stories(req, res) {
  await Server.cors(req, res);

  switch(req.method) {
    case 'GET':
      const stories = await Stories.getStories();
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
