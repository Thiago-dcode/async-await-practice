interface element {
  element: string;
  props?: { [att: string]: string };
  styleProps?: { [att: string]: string };
}
//Elements is an object, where each key represents a property of the array of
//objects given. And the value, represents the instruccion to what to do with
//that property.
interface elements {
  [objectAtt: string]: element | (() => HTMLElement[]);
}

export function htmlElementFactory(
  obj: object,
  parentEl: string | element | HTMLElement,
  props: elements
): HTMLElement | null {
  const propsToArray = Object.entries(props);
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

  if (!(parent instanceof HTMLElement) || parent instanceof HTMLUnknownElement)
    return null;

  propsToArray.forEach((prop,i) => {
    const [key, value] = prop;
    if (typeof value === "object") {
      const child = createHtmlElement(
        value.element,
        {
          textContent: obj[key as keyof typeof obj],
          ...value.props,
        },
        value.styleProps
      );
      parent.appendChild(child);
    }
    if(typeof value === 'function'){
      
       value().forEach(parentChildElement =>{
        parent.appendChild(parentChildElement)
       })
     
    

    }
  });

  return parent;
}

export function htmlElementsFactory(
  arr: {}[],
  parentEl: string | element | HTMLElement,
  elements: elements,
  wrapperEl?: string | element | HTMLElement,
): HTMLElement[]|[] {
  if (arr.length === 0 || !Array.isArray(arr)) return [];

  try {
    let elementsArr: HTMLElement[]  = []
    
   

    for (let i = 0; i < arr.length; i++) {
      const parent = htmlElementFactory(arr[i], parentEl, elements);
      if (parent === null) return [];
      elementsArr.push(
       parent
      );
    }
    if(wrapperEl){
   
      const wrapperParent = createHtmlElement(wrapperEl)
      wrapperParent.append(...elementsArr)
     
      return [wrapperParent]
    }
    return elementsArr;
  } catch (error) {
    throw new Error("Somethin went wrong");
  }
}

export function createHtmlElement(
  element: string|HTMLElement|element,
  properties?: { [att: string]: string },
  styleProps?: { [att: string]: string }
): HTMLElement {
  let htmlElement: HTMLElement;
  if(typeof element === 'string'){
    htmlElement = document.createElement(element)
  }
  else if(element instanceof HTMLElement){
    htmlElement = element
  }
  else{
    htmlElement = createHtmlElement(element.element, element.props,element.styleProps)
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
