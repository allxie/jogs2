import DB from "@root/db";
import {runQuery} from "@data/runQuery";

export const getSprints = async () => {
  return await runQuery({
    label: "GET_SPRINT",
    queryFn: async () => {
      return await DB.select("*")
        .from("sprints")
        .whereNull('deleted_at')
    },
    errorFn: async (e) => {
      return {
        error: "GET_SPRINT",
        source: e,
      };
    },
  });
}

export const createSprint = async (body) => {
  return await runQuery({
    label: "CREATE_SPRINT",
    queryFn: async () => {
      return DB('sprints').insert(body).returning('*')
    },
    errorFn: async (e) => {
      return {
        error: "CREATE_SPRINT",
        source: e,
      };
    },
  });
}