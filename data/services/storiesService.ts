import * as StoriesDao from '@root/data/dao/storiesDao';
import * as _ from 'lodash';
import STATUSES from '@common/statusEnums'

type storyType = {
  id: string;
  value: number | null;
  size: number | null;
  status: string;
}

const _getSortedStoriesByPriority = (stories: storyType[]): storyType[] => {
  return _.sortBy(stories, (story) => story.points/story.value)
}

const _setCompletedAt = async (body, storyId:string) => {
  const existingStory = await StoriesDao.getStoryById(storyId);

  if(
    existingStory.status !== STATUSES.DONE 
    && body.status === STATUSES.DONE
  ) {
    body['completed_at'] = new Date().toISOString();
  } else if(
    existingStory.status === STATUSES.DONE 
    && body.status !== STATUSES.DONE
  ) {
    body['completed_at'] = null;
  }
}

export const getNonDeletedStories = async (): Promise<storyType[]> => {
  const stories = await StoriesDao.getStories()
  console.log("about to sort")

  return _getSortedStoriesByPriority(stories)
}

export const createStory = async (req): Promise<storyType> => {
  const {account, body} = req;

  return StoriesDao.createStory(body);
}

export const updateStory = async (req) => {
  const {account, body, query: { storyId } } = req;
  await _setCompletedAt(body, storyId)

  return StoriesDao.updateStory(body, storyId);
}

export const deleteStory = async (req) => {
  const {account, query: { storyId } } = req;

  return StoriesDao.updateStory({'deleted_at': new Date().toISOString()}, storyId);
}