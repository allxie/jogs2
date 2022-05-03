import * as _ from 'lodash';

import { Story } from '@common/types/Story'

export function sortByPriority(stories: Story[]) {
  return _.sortBy(stories, (story: Story) => {
    if(story.points && story.value) return story.value/story.points
    if(story.value) return story.value
    if(story.points) return 1 / story.points
    return 0
  }).reverse()
}
