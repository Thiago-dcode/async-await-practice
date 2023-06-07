export function htmlElementFactory(arr, parentEl, elements) {
    if (arr.length === 0 || !Array.isArray(arr))
        return [];
    try {
        //declaring variables
        let elementsArr = [];
        //Elements is an object, where each key represents a property of the array of
        //objects given. And the value, represents the instruccion to what to do with
        //that property.
        const elementsToArray = Object.entries(elements);
        for (let i = 0; i < arr.length; i++) {
            let parent;
            if (typeof parentEl === "string") {
                parent = document.createElement(parentEl);
            }
            else if (!(parentEl instanceof HTMLElement)) {
                parent = createHtmlElement(parentEl.element, parentEl.props, parentEl.styleProps);
            }
            else {
                parent = parentEl;
            }
            if (!(parent instanceof HTMLElement))
                return [];
            elementsToArray.forEach((element) => {
                const [key, value] = element;
                if (typeof value == "object") {
                    const child = createHtmlElement(value.element, {
                        textContent: arr[i][key],
                        ...value.props,
                    }, value.styleProps);
                    parent.appendChild(child);
                }
            });
            elementsArr.push({
                data: arr[i],
                element: parent,
            });
        }
        return elementsArr;
    }
    catch (error) {
        throw new Error("Somethin went wrong");
    }
}
export function createHtmlElement(element, properties, styleProps) {
    const htmlElement = document.createElement(element);
    if (properties) {
        addPropsHtmlElement(htmlElement, properties);
    }
    if (styleProps) {
        styleHtmlElement(htmlElement, styleProps);
    }
    return htmlElement;
}
export function addPropsHtmlElement(element, properties) {
    const propsToArray = Object.entries(properties);
    propsToArray.forEach((prop) => {
        const [key, value] = prop;
        element[key] = value;
    });
}
export function styleHtmlElement(element, styleProps) {
    const propsToArray = Object.entries(styleProps);
    propsToArray.forEach((prop) => {
        const [key, value] = prop;
        element.style[key] = value;
    });
}
