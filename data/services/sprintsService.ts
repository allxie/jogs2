import type { NextApiRequest } from 'next'

import * as SprintsDao from '@root/data/dao/sprintsDao';
import { Sprint } from '@root/common/types/Sprint';
import moment from 'moment';

export const getSprints = async(): Promise<Sprint[]> => {
  return SprintsDao.getSprints()
}

export const getCurrentSprint = async(): Promise<Sprint> => {
  return SprintsDao.getCurrentSprint()
}

export const createSprint = async (req: NextApiRequest): Promise<Sprint> => {
  const {account, body} = req;
  
  return SprintsDao.createSprint({
    starts_at: moment(),
    ends_at: moment().add(1, 'week'),
    name: body.name || `Sprint - ${Date.now()}`
  });
}