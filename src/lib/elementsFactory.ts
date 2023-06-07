interface element {
  element: string;
  props?: { [att: string]: string };
  styleProps?: { [att: string]: string };
}

interface elements {
  [objectAtt: string]: element | (() => void);
}

export function htmlElementFactory(
  arr: {}[],
  parentEl: string | element | HTMLElement,
  elements: elements
): {
  data: (typeof arr)[0];
  element: HTMLElement;
}[] {
  if (arr.length === 0 || !Array.isArray(arr)) return [];

  try {
    //declaring variables

    let elementsArr: {
      data: (typeof arr)[0];
      element: HTMLElement;
    }[] = [];

    //Elements is an object, where each key represents a property of the array of
    //objects given. And the value, represents the instruccion to what to do with
    //that property.
    const elementsToArray = Object.entries(elements);

    for (let i = 0; i < arr.length; i++) {
      let parent: HTMLElement;
      if (typeof parentEl === "string") {
        parent = document.createElement(parentEl);
      } else if (!(parentEl instanceof HTMLElement)) {
        parent = createHtmlElement(
          parentEl.element,
          parentEl.props,
          parentEl.styleProps
        );
      } else {
        parent = parentEl;
      }
      if (!(parent instanceof HTMLElement)) return [];

      elementsToArray.forEach((element) => {
        const [key, value] = element;
        if (typeof value == "object") {
          const child = createHtmlElement(
            value.element,
            {
              textContent: arr[i][key as keyof (typeof arr)[0]],
              ...value.props,
            },
            value.styleProps
          );
          parent.appendChild(child);
        }
      });
      elementsArr.push({
        data: arr[i],
        element: parent,
      });
    }

    return elementsArr;
  } catch (error) {
    throw new Error("Somethin went wrong");
  }
}

export function createHtmlElement(
  element: string,
  properties?: { [att: string]: string },
  styleProps?: { [att: string]: string }
): HTMLElement {
  const htmlElement = document.createElement(element);
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
