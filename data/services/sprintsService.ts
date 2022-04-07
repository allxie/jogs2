import * as SprintsDao from '@root/data/dao/sprintsDao';
import { Sprint } from '@root/common/types/Sprint';
import moment from 'moment';

export const getSprints = async(): Promise<Sprint> => {
  return SprintsDao.getSprints()
}

export const createSprint = async (req): Promise<Sprint> => {
  const {account, body} = req;
  
  return SprintsDao.createSprint({
    startsAt: moment(),
    endsAt: moment().add(1, 'week')
  });
}