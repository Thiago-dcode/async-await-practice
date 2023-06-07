export function createHtmlElement(element, properties) {
    const htmlElement = document.createElement(element);
    if (properties) {
        const propsToArray = Object.entries(properties);
        propsToArray.forEach((prop) => {
            const [key, value] = prop;
            htmlElement[key] = value;
        });
    }
    return htmlElement;
}
