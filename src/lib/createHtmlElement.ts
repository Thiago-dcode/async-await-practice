export default function createHtmlElement(
  element: string,
  properties?: { [att: string]: string }
): HTMLElement {
  const htmlElement = document.createElement(element);
  if (properties) {
  
    const propsToArray = Object.entries(properties);
    propsToArray.forEach((prop) => {
      const [key, value] = prop;
      
        console.log(Object.getOwnPropertyDescriptor(htmlElement, 'innerHTML')?.writable)
      
      }
    );
  }

  return htmlElement;
}
