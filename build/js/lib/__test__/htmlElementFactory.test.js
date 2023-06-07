import { htmlElementFactory } from "../elementsFactory";
describe("htmlElementFactory function", () => {
    const data = [
        {
            title: "hello world",
            body: "hello all people of this world",
        },
        {
            title: "hello world 1",
            body: "hello all people of this world 1",
        },
    ];
    const parentStyle = {
        backgroundColor: 'red',
    };
    const dataElements = htmlElementFactory(data, { element: 'article', props: {}, styleProps: parentStyle }, {
        'title': { element: 'h1', props: { className: 'style' }, styleProps: {
                color: 'yellow'
            } },
        'body': { element: 'p', props: { className: 'style1' }, styleProps: {
                color: 'blue'
            } }
    });
    test('Testing the first argument with a wrong input', () => {
        const dataElements = htmlElementFactory([], { element: 'article', props: {}, styleProps: parentStyle }, {
            'title': { element: 'h1', props: { className: 'style' }, styleProps: {
                    color: 'yellow'
                } },
            'body': { element: 'p', props: { className: 'style1' }, styleProps: {
                    color: 'blue'
                } }
        });
        expect(dataElements.length === 0).toBe(true);
    });
    test('Testing the first argument with a wrong input', () => {
        const dataElements = htmlElementFactory([], { element: 'fdf', props: {}, styleProps: parentStyle }, {
            'title': { element: 'h1', props: { className: 'style' }, styleProps: {
                    color: 'yellow'
                } },
            'body': { element: 'p', props: { className: 'style1' }, styleProps: {
                    color: 'blue'
                } }
        });
        expect(dataElements.length === 0).toBe(true);
    });
    test("should return an array of objects, where the first position is an object given and the second an html element", () => {
        expect(JSON.stringify(dataElements[1].data)).toBe(JSON.stringify(data[1]));
        expect(dataElements[0].element.tagName).toBe('ARTICLE');
    });
    test("The parent element given, should have the child element given", () => {
        expect(dataElements[0].element.children[0].tagName).toBe('H1');
        expect(dataElements[0].element.children[1].tagName).toBe('P');
    });
    test("The child elements, should have the props given", () => {
        expect(dataElements[0].element.children[0].className).toBe('style');
        expect(dataElements[0].element.children[1].className).toBe('style1');
    });
    test("The child elements, should have the textContent of the data props", () => {
        expect(dataElements[0].element.children[0].textContent).toBe(data[0].title);
        expect(dataElements[0].element.children[1].textContent).toBe(data[0].body);
    });
});
