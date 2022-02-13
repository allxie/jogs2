import * as Requests from "@common/requests";
import * as Constants from "@common/constants";
import * as Strings from "@common/strings";

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

  return alert(response.error);
};

const createStory = async ({title}) => {
  const body = {title}
  let response = await Requests.post("/api/stories", body);
  if (response.success) {
    cookies.remove(Constants.SESSION_KEY);
    return window.location.reload();
  } else {
    return alert(response.error);
  }
}

export const execute = async (key: string, body?: any) => {
  if (key === "SIGN_IN") return await signIn(body);
  if (key === "SIGN_OUT") return await signOut();
  if (key === "VIEWER_DELETE_USER") return await deleteViewer();
  if (key === "CREATE_STORY") return await createStory(body);

  return alert(`There is no action: ${key}`);
};
