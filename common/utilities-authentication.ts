import * as Constants from '@common/constants';
import * as Strings from '@common/strings';
import { Req } from '@common/types/Server';

export const getToken = (req: Req) => {
  if (Strings.isEmpty(req.headers.cookie)) {
    return null;
  }

  return req.headers.cookie.replace(Constants.SESSION_KEY_REGEX, "$1");
};

export const parseAuthHeader = (value: string) => {
  if (typeof value !== "string") {
    return null;
  }

  var matches = value.match(/(\S+)\s+(\S+)/);
  return matches && { scheme: matches[1], value: matches[2] };
};
