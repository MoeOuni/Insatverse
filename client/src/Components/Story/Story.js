import React, { useState } from "react";
import { Card, Tooltip, Typography, Image } from "antd";
import { EditOutlined, DeleteTwoTone, HeartTwoTone } from "@ant-design/icons";
import styles from "./styles";
import { useDispatch } from "react-redux";
import { deleteStory, likeStory } from "../../Actions/stories";
import moment from "moment";
const { Meta } = Card;
const { Link, Paragraph, Text } = Typography;

function Story({ story, setSelectedId }) {
  const dispatch = useDispatch();

  const [expand, setExpand] = useState(true);
  return (
    <Card
      style={styles.card}
      cover={<Image src={story.image} />}
      actions={[
        <div
          style={styles.actions}
          onClick={() => {
            dispatch(likeStory(story._id));
          }}
        >
          <Tooltip placement='top' title='Like' color='magenta'>
            <HeartTwoTone twoToneColor='magenta' />
            &nbsp; {story.likes} &nbsp;
          </Tooltip>
        </div>,
        <Tooltip placement='top' title='Edit'>
          <EditOutlined
            onClick={() => {
              setSelectedId(story._id);
            }}
          />
        </Tooltip>,
        <Tooltip placement='top' title='Delete' color='red'>
          <DeleteTwoTone
            twoToneColor='red'
            onClick={() => {
              dispatch(deleteStory(story._id));
            }}
          />
        </Tooltip>,
      ]}
    >
      <Meta title={story.userName} />
      <Paragraph
        style={{ margin: 0 }}
        ellipsis={{
          rows: 2,
          expandable: true,
          symbol: "more",
          onExpand: () => {
            setExpand(true);
          },
          onEllipsis: () => {
            setExpand(false);
          },
        }}
      >
        {story.caption}
      </Paragraph>
      {expand ? (
        <Link href='#'>{story.tags.split(" ").map((tag) => `#${tag} `)}</Link>
      ) : null}
      <Text type='secondary'>{moment(story.postDate).fromNow()}</Text>
    </Card>
  );
}

export default Story;
