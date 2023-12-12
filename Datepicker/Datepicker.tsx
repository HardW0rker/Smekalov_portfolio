import React, { useEffect, useId, useRef, useState,SetStateAction,Dispatch } from "react";
import { mergeRefs } from "./mergeRefs";
import { Portal } from "./Portal";
import styled, { css, keyframes } from "styled-components";
import { IconButton } from "@erp/ui";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getMonth,
  getYear,
  isEqual,
  isSameMonth,
  parse,
  setDefaultOptions,
  startOfWeek,
} from "date-fns";
import classNames from "classnames";
import { ru } from "date-fns/locale";
import { IconChevronLeft, IconChevronRight, IconEvent } from "@promcars/icons";

export const weekDates: string[] = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
export const months: string[] = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

export interface IDatepickerProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  minDate: Date;
  type?: "date";
  corner?:"rounded" | "rectangle";
  size?:"big" | "small";
  changeDate?:Dispatch<SetStateAction<string | undefined>>;
}

const Input = styled.input`
  outline: none;
  border: none;
  background: inherit;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  font-weight: inherit;
  width:100px;

  &::placeholder {
    color: var(--grey-blue-60);
  }

  color: var(--grey-blue-60);

  /* ::-webkit-inner-spin-button,
  ::-webkit-calendar-picker-indicator {
    display: none;
    appearance: none;
  } */
`;

const cancelBorder = keyframes`
    0% {
      display: block;
    }
  `;

const Root = styled.div<{ isOpen: boolean, corner: string, size:string }>`
  position: relative;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 20px;
  background-color: #ffffff;
  display: inline-flex;
  transition:0.35s;
  height:fit-content;
  padding: ${(props)=>props.size == 'small' ? (props.corner == 'rectangle' ? '7px 12px;': '7px 15px 7px 27px ') : (props.corner == 'rectangle' ? '12px;': '12px 15px 12px 27px ')};
  border-radius: ${(props)=>props.corner == 'rectangle' ? '5px' : '30px'};
  border-bottom:${(props)=>props.isOpen ? '2px solid var(--blue);' : '2px solid var(--white)'};

  svg {
    color: var(--grey-blue-80);
    width:24px !important;
    height:24px !important;
  }

  &:has(Input:focus)::after {
    transform: scale(1) translateX(0);
  }

  animation-name: ${cancelBorder};
  animation-duration: 10ms;

  ::before {
    display: block;
    height: 2px;
    background-color: #f5f6f7;
    left: -1px;
    right: -2px;
    bottom: -2px;
    width: auto;
    content: "";
    position: absolute;
    transition: border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    pointer-events: none;
  }

  ::after {
    display: block;
    height: 2px;
    background-color: #3361ff;
    left: -2px;
    right: -2px;
    bottom: -2px;
    content: "";
    position: absolute;
    transform: scaleX(0);
    transition: transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms;
    pointer-events: none;
  }

  ${({ isOpen }) =>
    isOpen &&
    css`
      &::after {
        transform: scale(1) translateX(0);
      }
    `}
`;

const Calendar = styled.section<{ position: any }>`
  font-family: "Roboto";
  font-weight: 700;

  user-select: none;
  position: absolute;
  box-sizing: border-box;

  top: ${({ position }) => position.top || 0}px;
  left: ${({ position }) => position.left || 0}px;

  background: #ffffff;
  border: 2px solid #f5f6f7;
  box-shadow: 0 2px 5px rgba(38, 51, 77, 0.03);
  border-radius: 10px;
  translate: 0 50px;
  z-index: 999999999999;
`;

const Header = styled.header`
  font-family: inherit;
  font-weight: inherit;
  font-size: 12px;
  line-height: 20px;
  box-sizing: inherit;
  padding: 15px 10px 13px;
  border-bottom: 2px solid #f5f6f7;
  width: 100%;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  color: #6b7a99;
`;

const CalendarBody = styled.section`
  font-family: inherit;
  font-weight: inherit;

  --cellSize: 25px;

  font-size: 12px;
  line-height: var(--cellSize);

  padding: 15px 16.5px;

  display: grid;
  grid-template-columns: repeat(7, var(--cellSize));
  grid-template-rows: minmax(var(--cellSize, var(--cellSize)));
  row-gap: 10px;
  column-gap: 8.9px;

  text-align: center;
`;

const WeekDate = styled.span`
  font-weight: 700;
  font-size: 12px;
  line-height: 20px;
  color: #7d8fb3;
`;

const Day = styled.div`
  box-sizing: border-box;

  color: #4d5e80;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  position: relative;
  border-radius: 50%;

  &.anotherMonth {
    color: #7d8fb3;
    cursor: default;
    :hover{
      color: #7d8fb3 !important;
    }
  }

  &.selected {
    color: #ffffff;
    background: #3361ff;
    :hover{
      color: #ffffff !important;
    }
  }

  :hover {
    color: #3361ff;
    :after {
      display: inline-block;
    }
  }

  :after {
    content: "";
    display: none;
    position: absolute;
    height: 1px;
    width: 100%;
    background: #3361ff;
    bottom: 0;
  }
`;

const Datepicker = React.forwardRef<HTMLInputElement, IDatepickerProps>(
  (
    {
      corner = "rectangle",
      size = "small",
      value,
      placeholder = "Добавить дату",
      minDate = new Date(),
      changeDate,
      className,
      style,
      type = "date",
      ...rest
    },
    ref,
  ) => {
    setDefaultOptions({ locale: ru, weekStartsOn: 1 });
    const [open, setOpen] = useState(false);
    const [position, setPosition] = useState({});
    const inputRef = useRef<HTMLInputElement>(null);
    const uid = useId();
    const [inputText, setInputText] = useState<string>('');
    const [date, setDate] = useState<string>(value ? value.toString() : "");
    const [selectedDay, setSelectedDay] = useState(undefined);
    const [currentMonth, setCurrentMonth] = useState(format(minDate, "MMM-yyyy"));
    let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
    const dates = eachDayOfInterval({
      start: startOfWeek(firstDayCurrentMonth),
      end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
    });


    function previousMonth() {
      const firstDayPrevMonth = add(firstDayCurrentMonth, { months: -1 });
      setCurrentMonth(format(firstDayPrevMonth, "MMM-yyyy"));
    }

    function nextMonth() {
      const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
      setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
    }

    const selectDate = (day: Date) => {
      setDate(format(day, "dd MMMM yyyy"));
      // if((format(selectedDay, "dd MMMM yyyy") == format(day, "dd MMMM yyyy")) && (format(selectedDay, "hh") != format(minDate, "hh"))){
      //   day = new Date();
      //   setDate("");
      //   if(changeDate){
      //     changeDate("");
      //   }
      // }
      // else{
      //   if(changeDate){
      //     changeDate(format(day, "yyyy-MM-dd"));
      //   }
      // }
      setSelectedDay(day);
      // setOpen(false);
    };

    return (
      <Root
        onClick={() => inputRef.current?.focus()}
        className={className}
        style={style}
        isOpen={open}
        corner = {corner}
        size = {size}
      >
        <Input
          value={inputText}
          placeholder={placeholder}
          ref={mergeRefs([inputRef, ref])}
          {...rest}
          onChange={(e)=>{
            setInputText(e.target.value);
          }}
          onFocus={(e) => {
            setOpen(true);
            e.target.select();
            const { left, top } =
              inputRef.current?.parentElement?.getBoundingClientRect() as DOMRect;
            setPosition({
              top: top + 10,
              left: left,
            });
          }}
        />
        <IconEvent />
        {open && (
          <Portal id={uid} close={(e) => setOpen(false)}>
            <Calendar
              onClick={(e) => {
                e.stopPropagation();
              }}
              position={position}
            >
              <Header>
                <IconButton
                  size={"Extra small"}
                  variant={"Light"}
                  corner={"Rounded"}
                  onClick={previousMonth}
                  icon={<IconChevronLeft />}
                  style={{
                    border: 0,
                    padding: 0,
                  }}
                />
                <span>
                  {months[getMonth(firstDayCurrentMonth)]}{" "}
                  {getYear(firstDayCurrentMonth)}
                </span>
                <IconButton
                  size={"Extra small"}
                  variant={"Light"}
                  corner={"Rounded"}
                  onClick={nextMonth}
                  icon={<IconChevronRight />}
                  style={{
                    border: 0,
                    padding: 0,
                  }}
                />
              </Header>
              <CalendarBody>
                {weekDates.map((date, index) => (
                  <WeekDate key={index}>{date}</WeekDate>
                ))}
                {dates.map((day, index) => (
                  <Day
                    key={index}
                    className={classNames({
                      ["anotherMonth"]: !isSameMonth(day, firstDayCurrentMonth),
                      ["selected"]: isEqual(day, selectedDay),
                    })}
                    onClick={() =>
                      isSameMonth(day, firstDayCurrentMonth)
                        ? selectDate(day)
                        : null
                    }
                  >
                    <time dateTime={format(day, "dd-MM-yyyy")}>
                      {format(day, "d")}
                    </time>
                  </Day>
                ))}
              </CalendarBody>
            </Calendar>
          </Portal>
        )}
      </Root>
    );
  },
);

export default Datepicker;
