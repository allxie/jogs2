import * as _ from 'lodash';

import STATUSES from '@common/statusEnums'
import * as StoriesDao from '@root/data/dao/storiesDao';
import { isFibonacci } from '@common/utilities';
import { StoryType } from '@common/storyType';


type StoryPayloadType = {
  id?: string;
  value: number | null;
  points: number | null;
  status: string;
  completed_at: string | null;
}

const _getSortedStoriesByPriority = (stories: StoryType[]): StoryType[] => {
  return _.sortBy(stories, (story: StoryType) => {
    if(story.points && story.value) return story.value/story.points
    if(story.value) return story.value
    if(story.points) return 1 / story.points
    return 0
  }).reverse()
}

const _parseNumbers = (body: StoryPayloadType) => {
  console.log(body)
  if(!_.isNull(body.value) && !isNaN(body.value)) {
    body.value = Number(body.value)
  }

  if(!_.isNull(body.points) && !isNaN(body.points)) {
    body.points = Number(body.points)
  }
  console.log(body)
}

const _setCompletedAt = async (body: StoryPayloadType, storyId:string) => {
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

const _validateStoryPayload = async (body: StoryPayloadType) => {
  if(_.isNumber(body.value) && body.value >= 0) {
    console.log("body value", body.value)
    throw new Error('"Value" must be a positive integer.') 
  }

  if(_.isNumber(body.points) && !isFibonacci(body.points)) {
    console.log("this is not a fibbonacci number", body.points)
    throw new Error('"Size" must be a Fibonacci number.') 
  }
}

export const getNonDeletedStories = async (): Promise<StoryType[]> => {
  const stories = await StoriesDao.getStories()

  return _getSortedStoriesByPriority(stories)
}

export const createStory = async (req: any): Promise<StoryType> => {
  const {account, body} = req;

  _parseNumbers(body)
  _validateStoryPayload(body);
  return StoriesDao.createStory(body);
}

export const updateStory = async (req: any) => {
  const {account, body, query: { storyId } } = req;

  _parseNumbers(body)
  _validateStoryPayload(body);

  await _setCompletedAt(body, storyId)

  return StoriesDao.updateStory(body, storyId);
}

export const deleteStory = async (req: any) => {
  const {account, query: { storyId } } = req;

  return StoriesDao.updateStory({'deleted_at': new Date().toISOString()}, storyId);
}