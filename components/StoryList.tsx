import * as _ from 'lodash';
import * as React from "react";
import LineItem from '@components/LineItem';
import Story from '@components/Story';
import {Story as StoryType} from '@common/types/Story';
import * as Actions from '@common/actions';

type StoryProps = {
  storyListState: StoryType[]
  setStoryListState: any
}

export default ({storyListState, setStoryListState}: StoryProps) => {

  const handleStoryDelete = (e, id: string) => {
    e.preventDefault()
    Actions.execute("DELETE_STORY", id)
    const deletedIndex = _.findIndex(storyListState, (story) => story.id === id)
    const newState = storyListState.slice()
    newState.splice(deletedIndex, 1)
    setStoryListState(newState)
  }

  const handleStoryChange = async (e, id: string) => {
    if(e.target.value === '') {
      if(['points', 'value'].includes(e.target.name)) {
        e.target.value = null;
      }
    }
    const updatedStoryIndex = _.findIndex(storyListState, (story) => story.id === id)

    const story = await Actions.execute("UPDATE_STORY", _.defaults(
      {[e.target.name]: e.target.value}, 
      {...storyListState[updatedStoryIndex]}
    ))

    const newState = storyListState.slice()
    newState.splice(updatedStoryIndex, 1, story[0])
    setStoryListState(newState)
  }

  return <LineItem>
    { 
       storyListState.map((story: StoryType, index: number) => {
        return (
          <Story
            story={story}
            key={index}
            notKey={index}
            handleStoryDelete={handleStoryDelete}
            handleStoryChange={handleStoryChange}
          />
        )
      })
    }
  </LineItem>
}