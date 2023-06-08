import { element, elements } from "../types";
export function htmlElementFactory(
  obj: object,
  parentEl: string | element | HTMLElement,
  props: elements
): HTMLElement | null {
  const propsToArray = Object.entries(props);
  let parent = createHtmlElement(parentEl);

  if (!(parent instanceof HTMLElement) || parent instanceof HTMLUnknownElement)
    return null;

  propsToArray.forEach((prop, i) => {
    const [key, value] = prop;
    if (!Array.isArray(value)) {
      const child = createHtmlElement(
        value.element,
        {
          textContent: obj[key as keyof typeof obj],
          ...value.props,
        },
        value?.styleProps
      );
      parent.appendChild(child);
    } else {
      const [parentOfValue, element, wrapper] = value;
      const arrayPropToHtmlElement = htmlElementsFactory(
        obj[key as keyof typeof obj],
        parentOfValue,
        element,
        wrapper
      );
      parent.append(...arrayPropToHtmlElement);
    }
  });

  return parent;
}

export function htmlElementsFactory(
  arr: {}[],
  parentEl: string | element | HTMLElement,
  elements: elements,
  wrapperEl?: string | element | HTMLElement
): HTMLElement[] | [] {
  if (arr.length === 0 || !Array.isArray(arr)) return [];

  try {
    let elementsArr: HTMLElement[] = [];

    for (let i = 0; i < arr.length; i++) {
      const parent = htmlElementFactory(arr[i], parentEl, elements);
      if (parent === null) return [];
      elementsArr.push(parent);
    }
    if (wrapperEl) {
      const wrapperParent = createHtmlElement(wrapperEl);
      wrapperParent.append(...elementsArr);

      return [wrapperParent];
    }
    return elementsArr;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export function createHtmlElement(
  element: string | HTMLElement | element,
  properties?: { [att: string]: string },
  styleProps?: { [att: string]: string }
): HTMLElement {
  let htmlElement: HTMLElement;
  if (typeof element === "string") {
    htmlElement = document.createElement(element);
  } else if (element instanceof HTMLElement) {
    htmlElement = element;
  } else {
    htmlElement = createHtmlElement(
      element.element,
      element.props,
      element.styleProps
    );
  }
  if (properties) {
    addPropsHtmlElement(htmlElement, properties);
  }
  if (styleProps) {
    styleHtmlElement(htmlElement, styleProps);
  }
  return htmlElement;
}

export function addPropsHtmlElement(
  element: HTMLElement,
  properties: { [att: string]: string }
): void {
  const propsToArray = Object.entries(properties);
  propsToArray.forEach((prop) => {
    const [key, value] = prop;

    (element[key as keyof typeof element] as any) = value;
  });
}
export function styleHtmlElement(
  element: HTMLElement,
  styleProps: { [att: string]: string }
): void {
  const propsToArray = Object.entries(styleProps);
  propsToArray.forEach((prop) => {
    const [key, value] = prop;

    (element.style[key as keyof typeof element.style] as any) = value;
  });
}


export  const mergeArray = (parentArr: object[],childArr: object[], parentKey:string, childKey:string) =>{
  return parentArr.map((parent: typeof parentArr[0]) => {
    let childToMerge: typeof childArr[0][] = [];
    childArr.forEach((child: typeof childArr[0]) => {
      if (parent[parentKey as keyof typeof parent] === child[childKey as keyof typeof child]) {
        childToMerge.push(child);
      }
    });
    return { ...parent, comments: childToMerge };
  });
}
