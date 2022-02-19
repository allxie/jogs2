import * as React from "react";
import Menu, { Item, SubMenu, MenuItem } from 'rc-menu';
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

const handleChange = (e, storyState, setState) => {
  Actions.execute("UPDATE_STORY", _.defaults({[e.target.name]: e.target.value}, {...storyState}))
  setState({...storyState, [e.target.name]: e.target.value});
};

export default ({story}) => {
  const [storyState, setStoryState] = React.useState(story);
  return (
    <StoryLayout>
        <Input
          autoComplete="off"
          defaultValue={story.title}
          placeholder="As a user..."
          name="title"
          onChange={(e) => handleChange(e, storyState, setStoryState)}
        />
        <NumberInput
          color="green"
          autoComplete="off"
          defaultValue={story.value}
          placeholder="value"
          name="value"
          onChange={(e) => handleChange(e, storyState, setStoryState)}
        />
        <NumberInput
          color="red"
          autoComplete="off"
          defaultValue={story.points}
          placeholder="size"
          name="points"
          onChange={(e) => handleChange(e, storyState, setStoryState)}
        />
        <Select
          autoComplete="off"
          defaultValue={story.status}
          name="status"
          list="statuses"
          onChange={(e) => handleChange(e, storyState, setStoryState)}
        >
          {
            Object.keys(statusEnums).map((status) => {
              return (
                <option
                  value={statusEnums[status]}
                  selected={story.status===statusEnums[status]}
                >
                  {statusEnums[status]}
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
        <Trash onClick={() => Actions.execute("DELETE_STORY", storyState)}/>
      </StoryLayout>
  )
}