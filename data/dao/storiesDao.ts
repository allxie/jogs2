import DB from "@root/db";
import {runQuery} from "@data/runQuery";
import { Story } from '@common/types/Story';

export const getStoryById = async (storyId: string) => {
  return await runQuery({
    label: "GET_STORY",
    queryFn: async () => {
      return await DB.select('*')
        .from('stories')
        .where('id', storyId)
        .whereNull('deleted_at')
        .first()
    },
    errorFn: async (e) => {
      return {
        error: "GET_STORY",
        source: e,
      };
    },
  });
}

export const getStories = async () => {
  return await runQuery({
    label: "GET_STORIES",
    queryFn: async () => {
      return await DB.select("*")
        .from("stories")
        .whereNull('deleted_at')
    },
    errorFn: async (e) => {
      console.log("error:", e)
      return {
        error: "GET_STORIES",
        source: e,
      };
    },
  });
}

export const getStoriesBySprint = async (sprintId: string | string[]) => {
  return await runQuery({
    label: "GET_STORIES_BY_SPRINT_ID",
    queryFn: async () => {
      return await DB.select("*")
        .from("stories")
        .innerJoin('story_sprints', 'stories.id', 'story_sprints.story_id')
        .where('story_sprints.sprint_id', sprintId)
        .whereNull('stories.deleted_at')
        .whereNull('story_sprints.deleted_at')
    },
    errorFn: async (e) => {
      console.log("error:", e)
      return {
        error: "GET_STORIES",
        source: e,
      };
    },
  });
}

export const createStory = async (body: Story) => {
  return await runQuery({
    label: "CREATE_STORY",
    queryFn: async () => {
      return DB('stories').insert(body).returning('*')
    },
    errorFn: async (e) => {
      return {
        error: "CREATE_STORY",
        source: e,
      };
    },
  });
}

export const updateStory = async (body, id: string) => {
  return await runQuery({
    label: "UPDATE_STORY",
    queryFn: async () => {
      return DB('stories').where({id}).update(body).returning('*')      
    },
    errorFn: async (e) => {
      return {
        error: "UPDATE_STORY",
        source: e,
      };
    },
  });
}