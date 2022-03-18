import * as React from "react";
import 'rc-menu/assets/index.css';
import * as _ from 'lodash';

import * as Actions from "@common/actions";
import Input from "@components/Input";
import Select from "@components/Select";
import Trash from "@components/Trash";
import NumberInput from "@components/NumberInput";
import Button from "@components/Button";
import StoryLayout from "@components/StoryLayout";
import statusEnums from '@common/statusEnums';
import { Story } from '@common/types/Story';

const handleChange = (e: any, storyState: any, setState: any) => {
  if(e.target.value === '') {
    if(['points', 'value'].includes(e.target.name)) {
      e.target.value = null;
    }
  }

  Actions.execute("UPDATE_STORY", _.defaults({[e.target.name]: e.target.value}, {...storyState}))
  setState({...storyState, [e.target.name]: e.target.value});
};

interface StoryParams {
  story: Story;
}
export default ({story} :StoryParams) => {
  const [storyState, setStoryState] = React.useState(story);
  return (
    <StoryLayout>
        <Input
          autoComplete="off"
          defaultValue={story.title}
          placeholder="As a user..."
          name="title"
          onChange={(e: any) => handleChange(e, storyState, setStoryState)}
        />
        <NumberInput
          color="green"
          autoComplete="off"
          defaultValue={story.value}
          placeholder="value"
          name="value"
          onChange={(e: any) => handleChange(e, storyState, setStoryState)}
        />
        <NumberInput
          color="red"
          autoComplete="off"
          defaultValue={story.points}
          placeholder="size"
          name="points"
          onChange={(e: any) => handleChange(e, storyState, setStoryState)}
        />
        <Select
          autoComplete="off"
          defaultValue={story.status}
          name="status"
          list="statuses"
          onChange={(e: any) => handleChange(e, storyState, setStoryState)}
        >
          {
            statusEnums.map((status) => {
              return (
                <option
                  value={status}
                  selected={story.status===status}
                >
                  {status}
                </option>  
              )
            })
          }
        </Select>
        {/* <Menu>
          <Item>1</Item>
          <SubMenu title="2">
            <Item>2-1</Item>
          </SubMenu>
        </Menu> */}
        <Trash onClick={() => Actions.execute("DELETE_STORY", storyState.id)}/>
      </StoryLayout>
  )
}