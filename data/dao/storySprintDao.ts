import DB from "@root/db";
import {runQuery} from "@data/runQuery";

export const addStoryToSprint = async (body: {storyId: string | string[], sprintId: string | string[]}) => {
  return await runQuery({
    label: "ADD_STORY_TO_SPRINT",
    queryFn: async () => {
      return DB('story_sprints').insert({story_id: body.storyId, sprint_id: body.sprintId}).returning('*')
    },
    errorFn: async (e) => {
      console.log("error", e)
      return {
        error: "ADD_STORY_TO_SPRINT",
        source: e,
      };
    },
  });
}

export const removeStoryFromSprint = async (body, id: string | string[]) => {
  return await runQuery({
    label: "UPDATE_STORY_SPRINT",
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

