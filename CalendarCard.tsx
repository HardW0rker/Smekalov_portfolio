import styled from "styled-components";
import UserList from "../UserList/UserList";
import { useRef, useEffect, useState } from "react";
import React from "react";
import { format } from "date-fns";
import HoverPopup from "../HoverPopup/HoverPopup";

export interface CalendarCardProps {
  type?: "card" | "pop-up" | "small";
  content: string;
  start: Date;
  end?: Date;
  width?: number;
  availabilityEnd?: boolean;
  color: string;
  users: Array<{ id: number; name: string }>;
}

const Frame = styled.div<CalendarCardProps & { height: number; width: number }>`
  border: 2px solid ${(props) => props.color};
  background: ${(props) => props.color + "0D"};
  padding: ${(props) =>
    props.type == "small"
      ? "5px 8px 5px 8px"
      : props.end
      ? "8px"
      : "8px 8px 3px 8px"};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: ${(props) => props.height + "px"};
  width: ${(props) => (props.width ? props.width + "px" : "100%")};
  box-sizing: border-box;
`;
const Content = styled.p<{ height: number }>`
  color: var(--grey-blue-50);
  font-weight: var(--w-bold);
  line-height: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-wrap;
  display: -webkit-box;
  -webkit-line-clamp: ${(props) => Math.floor(props.height / 16)};
  -webkit-box-orient: vertical;
  /* width: 155px; */
  font-size: var(--font_12);
`;

const TimeItemStyle = styled.div`
  background: ${(props) => props.color};
  color: var(--white);
  border-radius: 5px;
  height: 20px;
  padding: 0px 7px;
  line-height: 20px;
  font-size: 10px;
  width: fit-content;
  font-weight: 900;
`;
const TimeFrame = styled.div`
  display: flex;
  gap: 5px;
`;
const TopFrame = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const PositionAbsolute = styled.div`
  position: absolute;
  margin-top: -130px;
`;

function Header(props: CalendarCardProps & { positionList: boolean }) {
  return (
    <TimeFrame>
      <TimeItemStyle color={props.color}>
        {format(props.start, "HH:mm")}
      </TimeItemStyle>
      {props.end ? (
        <TimeItemStyle color={props.color}>
          {format(props.end, "HH:mm")}
        </TimeItemStyle>
      ) : null}
      {!props.positionList ? <UserList users={props.users} /> : null}
    </TimeFrame>
  );
}

export default function CalendarCard({
  type = "card",
  ...props
}: CalendarCardProps) {
  function Item(props: CalendarCardProps & { type: string }) {
    const { end, start } = props;
    const type = props.type;

    function heightConvert(): number {
      if (type == "pop-up") {
        return 120;
      }
      if (type == "small") {
        return 30;
      }
      if (!end) {
        return 80;
      }

      //@ts-ignore
      let result = (end - start) / (60 * 1000);
      if (result < 80) {
        return 80;
      }
      return result * 1.44;
    }

    function userPosition(height: number): boolean {
      if (!end) {
        return false;
      }
      return height > 80;
    }

    function calculationContentHeight(
      height: number,
      positionList: boolean,
      type: string
    ) {
      height = height - 20 - 16 - 10;
      if (positionList) {
        height = height - 20 - 10;
      }
      if (!end) {
        height = height + 5;
      }
      if (type == "small") {
        height = 16;
      }
      return height;
    }

    let height = heightConvert();
    let positionList = userPosition(height);
    let contentHeight = calculationContentHeight(
      height,
      positionList,
      props.type
    );

    return (
      <Frame height={height} {...props}>
        <TopFrame>
          {type != "small" ? (
            <Header positionList={positionList} {...props} type={type} />
          ) : null}
          <Content height={contentHeight}>{props.content}</Content>
        </TopFrame>
        {positionList && type != "small" ? (
          <UserList users={props.users} />
        ) : null}
      </Frame>
    );
  }

  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => {
        if (type == "small") setHover(true);
      }}
      onMouseLeave={() => setHover(false)}
      style={{ paddingTop: "10px" }}
    >
      {hover ? (
        <PositionAbsolute>
          <Item type={"pop-up"} {...props} />
        </PositionAbsolute>
      ) : null}
      <Item type={type} {...props} />
    </div>
  );
}
