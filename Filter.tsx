import styled from "styled-components";
import { Dispatch, SetStateAction } from "react";
import { Checkbox } from "@erp/ui";
import { Avatar } from "@erp/ui";
import { ReactNode } from "react";
import { useState, useEffect } from "react";
import { IconClose } from "@promcars/icons";
import {
  DateFilterType,
  FilterItemProps,
  FilterFilterProps,
} from "../../Common/Interface/ICommon.ts";
import { UniqueElementResponse } from "../../Common/Interface/ICommon.ts";

import { IconExpandMore } from "@promcars/icons";

const FilterFrame = styled.div`
  padding: 20px 30px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
`;
const FilterItemFrame = styled.div`
  display: flex;
  cursor: pointer;
  justify-content: space-between;
  background: var(--white);
  color: var(--grey-blue-80);
  font-size: 12px;
  font-weight: 700;
  line-height: 20px;
  padding: 10px 15px;
`;
const FilterItemFrameLeft = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  flex: 1 1;
`;
const FilterItemInput = styled.input`
  outline: none;
  width: 100%;
  border: none;
  font-family: Roboto;
  font-style: normal;
  font-size: 12px;
  font-weight: 700;
  line-height: 20px;
  color: var(--grey-blue-60);
  &::placeholder {
    color: var(--grey-blue-80);
  }
`;

const FilterItemAll = styled.div`
  position: relative;
`;
const FilterItemList = styled.div`
  margin-top: 5px;
  position: absolute;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  border: 2px solid var(--grey-blue-97);
  background: var(--white, #fff);
  box-shadow: 0px 2px 5px 0px rgba(38, 51, 77, 0.03);
`;
const FilterItemListItem = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 10px 15px;
  height: 50px;
  box-sizing: border-box;
  p {
    color: var(--grey-blue-70);
    font-size: 12px;
    font-weight: 700;
    line-height: 20px; /* 166.667% */
  }
`;

const FilterList = styled.div`
  display: flex;
  padding: 0px 30px 30px 30px;
  flex-direction: column;
  gap: 6px;
`;
const FilterListHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 34px;
  p {
    color: #464f60;
    font-size: 12px;
    font-weight: 500;
    line-height: 20px;
  }
  span {
    cursor: pointer;
    color: var(--blue);
    font-size: 12px;
    font-weight: 500;
    line-height: 20px; /* 166.667% */
  }
`;
const FilterListContent = styled.div`
  display: flex;
  gap: 10px;
`;

const FilterListContentItem = styled.div`
  width: fit-content;
  display: flex;
  padding: 2px 8px;
  align-items: center;
  gap: 4px;
  border-radius: 4px;
  background: var(--blue-5);
  p {
    color: var(--blue);
    font-size: 12px;
    font-weight: 500;
    line-height: 20px; /* 166.667% */
  }
  span {
    color: var(--grey-blue-50);
    display: flex;
    align-items: center;
    font-size: 12px;
    font-weight: 500;
    line-height: 12px;
    svg {
      cursor: pointer;
      width: 16px !important;
      height: 16px !important;
    }
  }
`;

function FilterItem<T>(props: {
  id: number;
  active: boolean;
  text: string;
  name?: boolean;
  setActiveId: Dispatch<SetStateAction<number>>;
  icon: ReactNode;
  filterParams: () => DateFilterType;
  keyFilter: string;
  getUniqueMethod: () => UniqueElementResponse<T>;
  addFilterParams(keyFilter: string, value: string): void;
}) {
  const [filterValue, setFilterValue] = useState<string>("");
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      let data = await props.getUniqueMethod();
      console.log(data);
      setData(
        data.data.map((value: T) => {
          return value as string;
        }),
      );
    };

    if (props.active) {
      fetchData();
    }
  }, [props.active]);

  // console.log(props.filter)
  return (
    <FilterItemAll>
      <FilterItemFrame>
        <FilterItemFrameLeft>
          {props.icon}
          <FilterItemInput
            placeholder={props.text}
            value={filterValue}
            onChange={(e) => {
              setFilterValue(e.target.value);
              props.setActiveId(props.id);
            }}
          />
        </FilterItemFrameLeft>
        <IconExpandMore
          onClick={() => {
            !props.active ? props.setActiveId(props.id) : props.setActiveId(0);
          }}
        />
      </FilterItemFrame>
      {props.active ? (
        <FilterItemList>
          {data
            .filter((item: string) =>
              item.toLowerCase().includes(filterValue.toLowerCase()),
            )
            .map((item) => (
              <FilterItemListItem key={item}>
                <Checkbox
                  checked={
                    props.filterParams[props.keyFilter].filter(
                      (itemParams: string) => itemParams == item,
                    ).length > 0
                  }
                  corner="Rectangle"
                  style={{ marginRight: "-15px" }}
                  onChange={() => {
                    console.log(props.filterParams);
                    props.addFilterParams(props.keyFilter, item);
                  }}
                />
                {props.name ? (
                  <Avatar name={item} size={30} borderRadius={"5px"} />
                ) : null}
                <p>{item}</p>
              </FilterItemListItem>
            ))}
        </FilterItemList>
      ) : null}
    </FilterItemAll>
  );
}
// fdata = data.filter((item) =>
//         (item.user.name.split(" ")[0] + item.user.name.split(" ")[1])
//           .toLowerCase()
//           .includes(filter.search.toLowerCase()),
//       );

export function Filter(props: FilterFilterProps) {
  const [activeId, setActiveId] = useState<number>(0);

  function addFilterParams(keyFilter: string, value: string) {
    let newValue = { ...props.filterParams };
    let index = props.filterParams[keyFilter].indexOf(value);
    if (index != -1) {
      newValue[keyFilter].splice(index, 1);
    } else {
      newValue[keyFilter].push(value);
    }
    props.setFilterParams(newValue);
  }

  function clearFilterParams(keyFilter: string) {
    if (keyFilter != "all") {
      let newValue = { ...props.filterParams };
      newValue[keyFilter] = [];
      props.setFilterParams(newValue);
    } else {
      props.setFilterParams({names:[],fios:[], types:[]});
    }
  }
  return (
    <>
      <FilterFrame>
        {props.items.map((item: FilterItemProps) => (
          <FilterItem
            addFilterParams={addFilterParams}
            key={item.id}
            filterParams={props.filterParams}
            keyFilter={item.keyFilter}
            name={item.name}
            active={activeId == item.id}
            text={item.text}
            icon={item.icon}
            id={item.id}
            getUniqueMethod={item.getUniqueMethod}
            // changeFilter={props.changeFilter}
            setActiveId={setActiveId}
          />
        ))}
      </FilterFrame>
      {props.items.filter(
        (item: FilterItemProps) =>
          props.filterParams[item.keyFilter].length > 0,
      ).length > 0 ? (
        <FilterList>
          <FilterListHeader>
            <p>
              Фильтры:
              {
                props.items.filter(
                  (item: FilterItemProps) =>
                    props.filterParams[item.keyFilter].length > 0,
                ).length
              }
            </p>
            <span onClick={() => clearFilterParams("all")}>Очистить всё</span>
          </FilterListHeader>
          <FilterListContent>
            {props.items.map((item: FilterItemProps) => (
              <>
                {props.filterParams[item.keyFilter].length > 0 ? (
                  <FilterListContentItem>
                    <p>{item.text}:</p>
                    {props.filterParams[item.keyFilter].map(
                      (text: string, index: number) => (
                        <span>
                          {text}
                          {index + 1 !=
                          props.filterParams[item.keyFilter].length ? (
                            ","
                          ) : (
                            <IconClose
                              onClick={() => clearFilterParams(item.keyFilter)}
                            />
                          )}
                        </span>
                      ),
                    )}
                  </FilterListContentItem>
                ) : null}
              </>
            ))}
          </FilterListContent>
        </FilterList>
      ) : null}
    </>
  );
}
