import { IconChevronLeft, IconChevronRight } from "@promcars/icons";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { IconButton } from "@erp/ui";

const PaginationListFrame = styled.div`
  background: var(--white);
  border-radius: 0px 0px 20px 20px;
  padding: 20px 30px;
`;

const PaginationListIcon = styled(IconButton)`
  width: 44px !important;
  height: 44px !important;
`
const PaginationListText = styled.div<{ color?: string }>`
  height: 28px;
  width: 28px;
  margin: 0;
  color: ${(props) => (props.color ? "props.color" : "var(--grey-blue-60)")};
  font-size: 12px;
  font-weight: 900;
  line-height: 28px;
`;

const PaginationListLeft = styled.div`
  display: flex;
  gap: 15px;
`;


export function PaginationList (props: {
    selectpage: number;
    allPage: number;
    setPage: Dispatch<SetStateAction<number>>;
  }){
    return (
      <PaginationListFrame>
        <PaginationListLeft>
          {props.selectpage != 1 ? (
            <PaginationListIcon
              variant={"Light"}
              size={"Small"}
              icon={<IconChevronLeft />}
              onClick={() => props.setPage(props.selectpage - 1)}
            />
          ) : null}
          {props.allPage <= 7 || props.selectpage <= 4 ? null : (
            <>
              <PaginationListIcon
                variant={"Light"}
                size={"Small"}
                icon={<PaginationListText>{1}</PaginationListText>}
                onClick={() => props.setPage(1)}
              />
              <PaginationListIcon
                variant={"Light"}
                size={"Small"}
                icon={<PaginationListText>...</PaginationListText>}
              />
            </>
          )}
  
          {props.allPage - props.selectpage <= 3 && props.allPage > 7 ? (
            <>
              {[...Array(5)].map((e, i) => (
                <PaginationListIcon
                  key={i}
                  variant={
                    props.selectpage == props.allPage - 4 + i
                      ? "Primary"
                      : "Light"
                  }
                  size={"Small"}
                  onClick={() => props.setPage(props.allPage - 4 + i)}
                  icon={
                    <PaginationListText
                      color={
                        props.selectpage == props.allPage - 4 + i
                          ? "var(--white)'"
                          : ""
                      }
                    >
                      {props.allPage - 4 + i}
                    </PaginationListText>
                  }
                />
              ))}
            </>
          ) : null}
  
          {props.selectpage <= 4 && props.allPage > 7 ? (
            <>
              {[...Array(5)].map((e, i) => (
                <PaginationListIcon
                  key={i}
                  variant={props.selectpage == i + 1 ? "Primary" : "Light"}
                  size={"Small"}
                  onClick={() => props.setPage(i + 1)}
                  icon={
                    <PaginationListText
                      color={props.selectpage == i + 1 ? "var(--white)'" : ""}
                    >
                      {i + 1}
                    </PaginationListText>
                  }
                />
              ))}
            </>
          ) : null}
  
          {props.allPage > 7 &&
          props.selectpage > 4 &&
          props.allPage - props.selectpage > 3 ? (
            <>
              <PaginationListIcon
                variant={"Light"}
                size={"Small"}
                onClick={() => props.setPage(props.selectpage - 1)}
                icon={
                  <PaginationListText>{props.selectpage - 1}</PaginationListText>
                }
              />
              <PaginationListIcon
                variant={"Primary"}
                size={"Small"}
                onClick={() => props.setPage(props.selectpage)}
                icon={
                  <PaginationListText color={"var(--white)"}>
                    {props.selectpage}
                  </PaginationListText>
                }
              />
              <PaginationListIcon
                variant={"Light"}
                size={"Small"}
                onClick={() => props.setPage(props.selectpage + 1)}
                icon={
                  <PaginationListText>{props.selectpage + 1}</PaginationListText>
                }
              />
            </>
          ) : null}
  
          {props.allPage <= 7 ? (
            <>
              {[...Array(props.allPage)].map((e, i) => (
                <PaginationListIcon
                  key={i}
                  variant={props.selectpage == i + 1 ? "Primary" : "Light"}
                  size={"Small"}
                  onClick={() => props.setPage(i + 1)}
                  icon={
                    <PaginationListText
                      color={props.selectpage == i + 1 ? "var(--white)'" : ""}
                    >
                      {i + 1}
                    </PaginationListText>
                  }
                />
              ))}
            </>
          ) : null}
  
          {props.allPage - props.selectpage <= 3 || props.allPage <= 7 ? null : (
            <>
              <PaginationListIcon
                variant={"Light"}
                size={"Small"}
                icon={<PaginationListText>...</PaginationListText>}
              />
              <PaginationListIcon
                variant={"Light"}
                size={"Small"}
                onClick={() => props.setPage(props.allPage)}
                icon={<PaginationListText>{props.allPage}</PaginationListText>}
              />
            </>
          )}
  
          {props.selectpage != props.allPage ? (
            <PaginationListIcon
              variant={"Light"}
              size={"Small"}
              icon={<IconChevronRight />}
              onClick={() => props.setPage(props.selectpage + 1)}
            />
          ) : null}
        </PaginationListLeft>
      </PaginationListFrame>
    );
  };
