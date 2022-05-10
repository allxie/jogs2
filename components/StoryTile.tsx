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
}

export default ({story}: StoryParams) => {

  return (
    <StoryLayout>
      {story.title}
    </StoryLayout>
  )
}