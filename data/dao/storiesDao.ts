import DB from "@root/db";
import {runQuery} from "@data/runQuery";

export const getStories = async () => {
  return await runQuery({
    label: "GET_STORIES",
    queryFn: async () => {
      return await DB.select("*")
        .from("stories")
    },
    errorFn: async (e) => {
      return {
        error: "GET_STORIES",
        source: e,
      };
    },
  });
}

export const createStory = async (body) => {
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
  return body
}