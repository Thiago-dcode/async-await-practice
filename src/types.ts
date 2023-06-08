export interface element {
    element: string;
    props?: { [att: string]: string };
    styleProps?: { [att: string]: string };
  }
  //Elements is an object, where each key represents a property of the array of
  //objects given. And the value, represents the instruccion to what to do with
  //that property.
  export interface elements {
    [objectAtt: string]: element | [string|element|HTMLElement,elements,(string|element|HTMLElement)?];
  }
  