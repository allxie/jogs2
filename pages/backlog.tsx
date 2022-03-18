import * as React from "react";
import * as Actions from "@common/actions";

import Link from 'next/link'
import Input from "@components/Input";
import Button from "@components/Button";
import Layout from "@components/Layout";
import LayoutLeft from "@components/LayoutLeft";
import LineItem from "@components/LineItem";
import Content from "@components/Content";
import H2 from "@components/H2";
import Header from "@components/Header";
import H1 from "@components/H1";
import StoryList from "@components/StoryList";
import * as Requests from "@common/requests";
import { StoryType } from '@common/storyType';

export async function getServerSideProps() {
  const stories = await Requests.get('http://localhost:3005/api/stories');

  return {
    props: {
      stories
    },
  };
}

export default function Backlog(props: { stories: StoryType[]; }) {
  const [createStoryState, setCreateStoryState] = React.useState({
    title: "",
    isSubmitting: false,
    submitError: ""
  });
  const [storyListState, setStoryListState] = React.useState(props.stories)

  const handleChange = (e: any) => {
    setCreateStoryState({ ...createStoryState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async() => {
    setCreateStoryState({
      ...createStoryState,
      isSubmitting: true,
      submitError: ""
    })
  
    const response = await Actions.execute("CREATE_STORY", createStoryState)
    if(response.error) {
      setCreateStoryState({
        ...createStoryState,
        submitError: response.error,
        isSubmitting: false,
      })
    } else {
      setStoryListState([...storyListState, ...response])
      setCreateStoryState({
        isSubmitting: false,
        title: "",
        submitError: ""
      })
    }
  }

  return (
    <>
    <Header>
        <Content>
          <H1>Backlog</H1>
        </Content>
      </Header>
      <Layout>
        <LayoutLeft>
          <LineItem>
            <Link href="/current-sprint">
              <a>Go to Current Sprint</a>
            </Link>
          </LineItem>
          {
            <LineItem>
              <Content>
                <H2>Backlog</H2>
                <StoryList stories={storyListState}></StoryList>
              </Content>
            </LineItem>
          }
          {
            <LineItem>
              <Content>
                <H2>Create Story</H2>
                <Input
                  autoComplete="off"
                  value={createStoryState.title}
                  placeholder="As a user..."
                  name="title"
                  onChange={(e: any) => handleChange(e)}
                />
                <Button onClick={() => handleSubmit()} disabled={createStoryState.isSubmitting}>
                  Create
                </Button>
                { createStoryState.submitError && (<p>I am an error</p>) }
              </Content>
            </LineItem>
          }
        </LayoutLeft>
      </Layout>
    </>
  )
}