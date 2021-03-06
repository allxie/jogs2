import DB from "@root/db";
import {runQuery} from "@data/runQuery";
import moment from 'moment';

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

export const getCurrentSprint = async () => {
  const now = moment().toISOString()
  return await runQuery({
    label: "GET_SPRINT_BY_ID",
    queryFn: async () => {
      return await DB.select("*")
        .from("sprints")
        .whereNull('deleted_at')
        .where('ends_at', '>', now)
        .first()
    },
    errorFn: async (e) => {
      return {
        error: "GET_SPRINT_BY_ID",
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