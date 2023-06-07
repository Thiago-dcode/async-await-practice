import { styleHtmlElement } from "../elementsFactory";
describe('StyleHtmlElement function', () => {
    test('Should style the html element given', () => {
        const style = {
            'backgroundColor': 'red',
            'fontSize': '20px'
        };
        const h1 = document.createElement('h1');
        styleHtmlElement(h1, style);
        expect(h1.style.backgroundColor).toBe(style.backgroundColor);
        expect(h1.style.fontSize).toBe(style.fontSize);
    });
});
