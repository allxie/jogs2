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
