export type Req = {
  method: any;
  headers: any;
}

export type StoryRes = { 
  json: (
    arg0: { 
      id: string; 
      value: number | null;
      points: number | null;
      status: string;
    }[]
  ) => void;
}
