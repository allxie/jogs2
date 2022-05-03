import * as _ from 'lodash';
import type { NextApiRequest } from 'next'

import { Status } from '@common/types/Status'
import * as StoriesDao from '@root/data/dao/storiesDao';
import { isFibonacci } from '@common/utilities';
import { Story } from '@root/common/types/Story';
import { sortByPriority } from '@common/sortStories';

type StoryPayloadType = {
  id?: string;
  value: number | null;
  points: number | null;
  status: Status;
  completed_at: string | null;
}

const _parseNumbers = (body: StoryPayloadType) => {
  if(!_.isNull(body.value) && !isNaN(body.value)) {
    body.value = Number(body.value)
  }

  if(!_.isNull(body.points) && !isNaN(body.points)) {
    body.points = Number(body.points)
  }
}

const _setCompletedAt = async (body: StoryPayloadType, storyId:string) => {
  const existingStory = await StoriesDao.getStoryById(storyId);

  if(
    existingStory.status !== 'Done' 
    && body.status === 'Done'
  ) {
    body['completed_at'] = new Date().toISOString();
  } else if(
    existingStory.status === 'Done' 
    && body.status !== 'Done'
  ) {
    body['completed_at'] = null;
  }
}

const _validateStoryPayload = async (body: StoryPayloadType) => {
  if(_.isNumber(body.value) && body.value <= 0) {
    console.log("body value", body.value)
    throw new Error('"Value" must be a positive integer.') 
  }

  if(_.isNumber(body.points) && !isFibonacci(body.points)) {
    console.log("this is not a fibbonacci number", body.points)
    throw new Error('"Size" must be a Fibonacci number.') 
  }
}

export const getNonDeletedStories = async (): Promise<Story[]> => {
  const stories = await StoriesDao.getStories()

  return sortByPriority(stories)
}

export const getStoriesBySprint = async(req: NextApiRequest): Promise<Story[]> => {
  const {query: { sprintId } } = req;

  const stories = await StoriesDao.getStoriesBySprint(sprintId)
  return sortByPriority(stories)
}

export const createStory = async (req: NextApiRequest): Promise<Story> => {
  const {account, body} = req;

  _parseNumbers(body)
  _validateStoryPayload(body);
  // @TODO: throwing an error doesn't seem to set off a response
  return StoriesDao.createStory(body);
}

export const updateStory = async (req: NextApiRequest) => {
  const {account, body, query: { storyId } } = req;

  _parseNumbers(body)
  _validateStoryPayload(body);

  await _setCompletedAt(body, storyId)

  return StoriesDao.updateStory(body, storyId);
}

export const deleteStory = async (req: NextApiRequest) => {
  const {account, query: { storyId } } = req;

  return StoriesDao.updateStory({'deleted_at': new Date().toISOString()}, storyId);
}