import * as React from "react";
import 'rc-menu/assets/index.css';
import Menu, { MenuItem } from 'rc-menu';

import * as _ from 'lodash';

import Input from "@components/Input";
import Select from "@components/Select";
import NumberInput from "@components/NumberInput";
import MenuButton from "@components/MenuButton";
import StoryLayout from "@components/StoryLayout";
import statusEnums from '@common/statusEnums';
import { Story } from '@common/types/Story';
import { faEllipsisVertical, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from "@components/Story.module.scss";
import * as Actions from '@common/actions';

interface StoryParams {
  story: Story;
  handleStoryDelete;
  handleStoryChange;
}

export default ({story, sprintsState, handleStoryDelete, handleStoryChange}: StoryParams) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const [isSprintMenuOpen, setIsSprintMenuOpen] = React.useState(false)

  const addStoryToSprint = (event, storyId: string, sprintId: string) => {
    Actions.execute("ADD_STORY_TO_SPRINT", {storyId, sprintId})
  }

  return (
    <StoryLayout>
        <Input
          key={`${story.id}_title`}
          autoComplete="off"
          defaultValue={story.title}
          placeholder="As a user..."
          name="title"
          onChange={(e) => handleStoryChange(e, story.id)}
        />
        <NumberInput
          key={`${story.id}_value`}
          color="green"
          autoComplete="off"
          defaultValue={story.value}
          placeholder="value"
          name="value"
          onChange={(e) => handleStoryChange(e, story.id)}
        />
        <NumberInput
          key={`${story.id}_size`}
          color="red"
          autoComplete="off"
          defaultValue={story.points}
          placeholder="size"
          name="points"
          onChange={(e) => handleStoryChange(e, story.id)}
        />
        <Select
          key={`${story.id}_status`}
          defaultValue={story.status}
          autoComplete="off"
          name="status"
          list="statuses"
          onChange={(e) => handleStoryChange(e, story.id)}
        >
          {
            statusEnums.map((status, index) => {
              return (
                <option
                  key={index}
                  value={status}
                >
                  {status}
                </option>  
              )
            })
          }
        </Select>
        <div>
          <MenuButton onClick={() => {
            setIsMenuOpen(!isMenuOpen)
          }}>
            <FontAwesomeIcon icon={faEllipsisVertical}/>
          </MenuButton>
          { isMenuOpen && 
            <div className={styles.storyMenuOuterContainer}>
              <div className={styles.storyMenuInnerContainer}>
                <Menu>
                  <MenuItem onClick={() => {
                    setIsSprintMenuOpen(!isSprintMenuOpen)
                  }}>
                    Add to Sprint
                    { isSprintMenuOpen &&
                      <Menu>
                        {
                          sprintsState.map((sprint, index) => {
                            return (
                              <MenuItem
                                key={index}
                                value={status}
                              >
                                <MenuButton 
                                  onClick={(e) => addStoryToSprint(e, story.id, sprint.id)}
                                >
                                  {sprint.name}
                                </MenuButton>
                              </MenuItem>  
                            )
                          })
                        }
                      </Menu>
                    }
                  </MenuItem>
                  <MenuItem>
                    <MenuButton onClick={(e) => handleStoryDelete(e, story.id)}>
                      <FontAwesomeIcon icon={faTrashCan} />
                    </MenuButton>
                  </MenuItem>
                </Menu>
              </div>
            </div>
          }      
        </div>  
      </StoryLayout>
  )
}