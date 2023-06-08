export function htmlElementFactory(obj, parentEl, props) {
    const propsToArray = Object.entries(props);
    let parent = createHtmlElement(parentEl);
    if (!(parent instanceof HTMLElement) || parent instanceof HTMLUnknownElement)
        return null;
    propsToArray.forEach((prop, i) => {
        const [key, value] = prop;
        if (!Array.isArray(value)) {
            const child = createHtmlElement(value.element, {
                textContent: obj[key],
                ...value.props,
            }, value?.styleProps);
            parent.appendChild(child);
        }
        else {
            const [parentOfValue, element, wrapper] = value;
            const arrayPropToHtmlElement = htmlElementsFactory(obj[key], parentOfValue, element, wrapper);
            parent.append(...arrayPropToHtmlElement);
        }
    });
    return parent;
}
export function htmlElementsFactory(arr, parentEl, elements, wrapperEl) {
    if (arr.length === 0 || !Array.isArray(arr))
        return [];
    try {
        let elementsArr = [];
        for (let i = 0; i < arr.length; i++) {
            const parent = htmlElementFactory(arr[i], parentEl, elements);
            if (parent === null)
                return [];
            elementsArr.push(parent);
        }
        if (wrapperEl) {
            const wrapperParent = createHtmlElement(wrapperEl);
            wrapperParent.append(...elementsArr);
            return [wrapperParent];
        }
        return elementsArr;
    }
    catch (error) {
        console.log(error);
        return [];
    }
}
export function createHtmlElement(element, properties, styleProps) {
    let htmlElement;
    if (typeof element === "string") {
        htmlElement = document.createElement(element);
    }
    else if (element instanceof HTMLElement) {
        htmlElement = element;
    }
    else {
        htmlElement = createHtmlElement(element.element, element.props, element.styleProps);
    }
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
export const mergeArray = (parentArr, childArr, parentKey, childKey) => {
    return parentArr.map((parent) => {
        let childToMerge = [];
        childArr.forEach((child) => {
            if (parent[parentKey] === child[childKey]) {
                childToMerge.push(child);
            }
        });
        return { ...parent, comments: childToMerge };
    });
};
