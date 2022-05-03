import * as React from "react";

import Link from 'next/link'
import * as Actions from '@common/actions';
import Button from "@components/Button";
import Layout from "@components/Layout";
import LayoutLeft from "@components/LayoutLeft";
import LayoutRight from "@components/LayoutRight";
import LineItem from "@components/LineItem";
import Content from "@components/Content";
import H2 from "@components/H2";
import Header from "@components/Header";
import H1 from "@components/H1";
import StoryList from "@components/StoryList";
import * as Requests from "@common/requests";
import { Story } from '@common/types/Story';
import { Sprint } from '@common/types/Sprint';
import { faArrowDown19 } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { sortByPriority } from '@common/sortStories';
import NewStoryForm from "@components/NewStoryForm";

export async function getServerSideProps() {

  const [stories, sprints] = await Promise.all([
    Requests.get('http://localhost:3005/api/stories'),
    Requests.get('http://localhost:3005/api/sprints')
  ])

  return {
    props: {
      stories,
      sprints
    },
  };
}

export default function Backlog(props: { stories: Story[]; sprints: Sprint[]}) {
  const [storyListState, setStoryListState] = React.useState(props.stories)
  const [sprintState, setSprintState] = React.useState(props.sprints)

  const sortStories = () => {
    const sortedList = sortByPriority([...storyListState]);
    setStoryListState(sortedList)
  }

  const newSprintHandler = async (e) => {
    e.preventDefault()
    const response = await Actions.execute("CREATE_SPRINT")

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
          
          {
            <LineItem>
              <Content>
                <H2>Backlog</H2>
                <Button onClick={sortStories}>
                  <FontAwesomeIcon icon={faArrowDown19} />
                </Button>
                <StoryList storyListState={storyListState} setStoryListState={setStoryListState} sprintsState={sprintState}></StoryList>
              </Content>
            </LineItem>
          }
          <NewStoryForm storyListState={storyListState} setStoryListState={setStoryListState} />
        </LayoutLeft>
        <LayoutRight>
          <LineItem>
            <Content>
              <H2>Sprints</H2>
              <LineItem>
                <Link href="/current-sprint">
                  <a>Go to Current Sprint</a>
                </Link>
              </LineItem>
              <Button onClick={newSprintHandler}>New Sprint</Button>
            </Content>
          </LineItem>
        </LayoutRight>
      </Layout>
    </>
  )
}