import * as Requests from "@common/requests";
import * as Constants from "@common/constants";
import { Story } from '@common/types/Story'
import Cookies from "universal-cookie";

const cookies = new Cookies();

declare const window: any;

const signIn = async (body: any) => {
  cookies.remove(Constants.SESSION_KEY);
  let response = await Requests.post("/api/sign-in", body);
  if (response.success) {
    if (response.token) {
      cookies.set(Constants.SESSION_KEY, response.token);
    }

    return window.location.reload();
  }

  return alert(response.error);
};

const signOut = async () => {
  const jwt = cookies.get(Constants.SESSION_KEY);
  if (jwt) {
    cookies.remove(Constants.SESSION_KEY);
    return window.location.reload();
  }

  return alert("There was no session to sign out of.");
};

const deleteViewer = async () => {
  let response = await Requests.del("/api/viewer/delete");
  if (response.success) {
    cookies.remove(Constants.SESSION_KEY);
    return window.location.reload();
  }

};

const createStory = async (title: string) => {
  const body = {title}
  // await new Promise((resolve) => setTimeout(resolve, 5000))
  try {
    return await Requests.post("/api/stories", body);
  } catch (e) {
    return { error: e }
  }
}

const updateStory = async ({title, points, value, status, id}: Story) => {
  const body = {title, points, value, status}
  return Requests.patch(`/api/stories/${id}`, body);
}

const deleteStory = async (id: string) => {
  await Requests.del(`/api/stories/${id}`);
}

const createSprint = async () => {
  try {
    return await Requests.post("/api/sprints");
  } catch (e) {
    return { error: e }
  }
}

const addStoryToSprint = async({storyId, sprintId}) => {
  try {
    return await Requests.post(`/api/sprints/${sprintId}/stories/${storyId}`);
  } catch (e) {
    return { error: e }
  }
}

export const execute = async (key: string, body?: any) => {
  if (key === "SIGN_IN") return await signIn(body);
  if (key === "SIGN_OUT") return await signOut();
  if (key === "VIEWER_DELETE_USER") return await deleteViewer();

  if (key === "CREATE_STORY") return await createStory(body);
  if (key === "UPDATE_STORY") return await updateStory(body);
  if (key === "DELETE_STORY") return await deleteStory(body);

  if (key === "CREATE_SPRINT") return await createSprint();
  if (key === "ADD_STORY_TO_SPRINT") return await addStoryToSprint(body);

  return alert(`There is no action: ${key}`);
};
