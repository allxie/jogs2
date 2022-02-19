import * as React from "react";
import LineItem from "@components/LineItem";
import Story from "@components/Story";



export default ({stories}) => {
  return <LineItem>
    { 
       stories.map((story, index) => {
        return (<Story story={story} key={index}/>)
      })
    }
  </LineItem>
}