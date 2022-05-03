import * as StorySprintDao from '@root/data/dao/storySprintDao';
import type { NextApiRequest } from 'next'

export const addStoryToSprint = async (req: NextApiRequest): Promise<void> => {
  const {query: { storyId, sprintId } } = req;

  // throw if sprint is already ended
  // throw if story is done or refused
  // throw if story is sized too high
  // throw if story is missing size or value

  return StorySprintDao.addStoryToSprint({storyId, sprintId});
}

export const removeStoryFromSprint = async(req: NextApiRequest): Promise<void> => {
  const {query: { storySprintId } } = req;

  return StorySprintDao.removeStoryFromSprint({'deleted_at': new Date().toISOString()}, storySprintId);
}
