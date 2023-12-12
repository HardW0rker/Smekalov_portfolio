import React, { useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

const createWrapperAndAppendToBody = (
  wrapperId: string,
  close: (e: MouseEvent) => any
) => {
  const parentNode = document.createElement("div");
  parentNode.setAttribute("id", wrapperId);
  parentNode.style.width = "100%";
  parentNode.style.height = "100%";
  parentNode.style.position = "absolute";
  parentNode.style.top = "0";
  parentNode.style.left = "0";
  parentNode.style.zIndex = "100";
  parentNode.addEventListener("click", (e) => close(e));

  const wrapper = document.createElement("div");
  wrapper.style.width = "100%";
  wrapper.style.width = "100%";
  wrapper.style.height = "100%";
  wrapper.style.position = "relative";

  parentNode.append(wrapper);
  document.body.appendChild(parentNode);
  return [parentNode, wrapper];
};

export const Portal = ({
  id,
  children,
  close,
}: {
  id: string;
  children: React.ReactElement;
  close: (e: MouseEvent) => any;
}) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(
    null
  );

  useLayoutEffect(() => {
    let parentElement = document.getElementById(id),
      wrapper = parentElement?.firstChild as HTMLElement;
    let systemCreated = false;
    if (!parentElement) {
      systemCreated = true;
      [parentElement, wrapper] = createWrapperAndAppendToBody(id, close);
    }
    setWrapperElement(wrapper);

    return () => {
      if (systemCreated && parentElement?.parentNode && wrapper?.parentNode) {
        parentElement.parentNode.removeChild(parentElement);
      }
    };
  }, [id]);

  if (wrapperElement === null) return null;

  return createPortal(children, wrapperElement);
};
