import * as Data from "@data/node-data";
import * as Stories from "@root/data/dao/storiesDao";
import * as Server from "@common/server";
import * as StoriesService from "@data/services/storiesService";
// NOTE(jim):
// CORS API example.
export default async function stories(req, res) {
  await Server.cors(req, res);
  switch(req.method) {
    case 'PATCH':
      res.json(await StoriesService.updateStory(req));
      break;
    case 'DELETE':
      console.log("TRYING TO DELETE")
      res.json(await StoriesService.deleteStory(req));
      break;
    default:
      // code block
  }
    
}
