import * as _ from 'lodash';
import * as React from "react";
import LineItem from '@components/LineItem';
import Story from '@components/Story';
import {Story as StoryType} from '@common/types/Story';
import * as Actions from '@common/actions';
import Input from "@components/Input";
import Button from "@components/Button";
import Content from "@components/Content";
import H2 from "@components/H2";

type NewStoryFormProps = {
  storyListState;
  setStoryListState;
}

export default ({storyListState, setStoryListState}: NewStoryFormProps) => {
  
  const [createStoryState, setCreateStoryState] = React.useState({
    title: "",
    isSubmitting: false,
    submitError: ""
  });

  const handleCreateFormChange = (e) => {
    setCreateStoryState({ ...createStoryState,
      [e.target.name]: e.target.value
    });
  };

  const handleNewStorySubmit = async(e) => {
    e.preventDefault()
    setCreateStoryState({
      ...createStoryState,
      isSubmitting: true,
      submitError: ""
    })
  
    const response = await Actions.execute("CREATE_STORY", createStoryState.title)
    if(response.error) {
      setCreateStoryState({
        ...createStoryState,
        submitError: response.error,
        isSubmitting: false,
      })
    } else {
      console.log(response)
      setStoryListState([...storyListState, ...response[0]])
      setCreateStoryState({
        isSubmitting: false,
        title: "",
        submitError: ""
      })
    }
  }

  return  (
    <LineItem>
      <Content>
        <H2>Create Story</H2>
        <Input
          autoComplete="off"
          value={createStoryState.title}
          placeholder="As a user..."
          name="title"
          onChange={(e) => handleCreateFormChange(e)}
        />
        <Button onClick={(e) => handleNewStorySubmit(e)} disabled={createStoryState.isSubmitting}>
          Create
        </Button>
        { createStoryState.submitError && (<p>I am an error</p>) }
      </Content>
    </LineItem>
  )
}