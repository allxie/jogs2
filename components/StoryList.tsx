import * as React from "react";
import LineItem from "@components/LineItem";
import Story from "@components/Story";
import {Story as StoryType} from "@common/types/Story";


type StoryProps = {
  stories: StoryType[]
}

export default ({stories}: StoryProps) => {
  return <LineItem>
    { 
       stories.map((story: StoryType, index: number) => {
        return (<Story story={story} key={index}/>)
      })
    }
  </LineItem>
}