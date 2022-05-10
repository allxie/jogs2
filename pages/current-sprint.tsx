import * as React from "react";
import Link from 'next/link'
import * as Requests from "@common/requests";
import { Story as StoryType } from '@common/types/Story';
import { Sprint } from '@common/types/Sprint';
import StoryTile from '@components/StoryTile';

export async function getServerSideProps() {
  const sprint = await Requests.get('http://localhost:3005/api/sprints?current=true')
  const stories = await Requests.get(`http://localhost:3005/api/sprints/${sprint.id}/stories`)
  return {
    props: {
      sprint,
      stories
    },
  };
}

export default function CurrentSprint(props: {sprint: Sprint, stories: StoryType[]}) {
  const [storyListState, setStoryListState] = React.useState(props.stories)

  return (
    <>
      <h1>Current Sprint: {props.sprint.name} </h1>
      <h2>
        <Link href="/backlog">
          <a>Back to home</a>
        </Link>
      </h2>

      <div style={{display: "flex", flexDirection: "row"}}>
        <div style={{"width": "33%", "height": "300px", backgroundColor: 'lightBlue', margin: '20px'}}>
          <div>TO DO</div>
          {
            storyListState.filter((story) => story.status === 'To Do').map((story: StoryType, index: number) => {
              return <StoryTile story={story} key={index}/>
            })
          }
        </div>
        <div style={{"width": "33%", "height": "300px", backgroundColor: 'lightBlue', margin: '20px'}}>
          <div>IN PROGRESS</div>
          {
            storyListState.filter((story) => story.status === 'In Progress').map((story: StoryType, index: number) => {
              return <StoryTile story={story} key={index}/>
            })
          }
        </div>
        <div style={{"width": "33%", "height": "300px", backgroundColor: 'lightBlue', margin: '20px'}}>
          <div>DONE</div>
          {
            storyListState.filter((story) => story.status === 'Done').map((story: StoryType, index: number) => {
              return <StoryTile story={story} key={index}/>
            })
          }
        </div>
      </div>
    </>
  )
}