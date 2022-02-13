import * as StoriesDao from "@root/data/dao/storiesDao";

export const createStory = async (req) => {
  const {account, body} = req;

  const story = await StoriesDao.createStory(body);
  console.log("story in service ", story)
  return story
}
