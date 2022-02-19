import * as SprintsDao from '@root/data/dao/sprintsDao';

type sprintType =  {
  id: string;
  startsAt: string;
  endsAt: string;
}

export const createSprint = async (req): Promise<sprintType> => {
  const {account, body} = req;

  return SprintsDao.createSprint({
    
  });
}