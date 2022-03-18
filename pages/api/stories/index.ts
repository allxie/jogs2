import * as StoriesService from "@data/services/storiesService";

type Req = { method: any; }
type Res = { 
  json: (
    arg0: { 
      id: string; 
      value: number | null;
      points: number | null;
      status: string;
    }[]
  ) => void;
}

export default async function stories(req: Req, res: Res) {
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
