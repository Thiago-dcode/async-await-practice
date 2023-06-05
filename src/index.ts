import { createHtmlElement } from "./lib/createHtmlElement";

type comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};
type post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const appDiv = document.getElementById("app");
const url = "https://jsonplaceholder.typicode.com/";
const elemet = createHtmlElement('h1',{'textContent': 'Hello world'})
appDiv?.appendChild(elemet)
//Create elements

const app = () => {
  const createHtmlElements = (
    data: comment[] | post[],
    parentElement: string,
    attAndTags: {
      [key: string]: string;
    }
  ): {
    data: comment | post;
    element: HTMLElement;
  }[] => {
    const arrOfAttAndTags = Object.entries(attAndTags);

    let elements: {
      data: comment | post;
      element: HTMLElement;
    }[] = [];
    for (let i: number = 0; i < data.length; i++) {
      const parent = document.createElement(parentElement)
      console.log
      arrOfAttAndTags.forEach((childElement) => {
        const [att, tag] = childElement;

        const element = document.createElement(tag);
        element.textContent = data[i][att as keyof (typeof data)[0]].toString();
        parent.appendChild(element);
      });
      elements.push({
        ["data"]: data[i],
        ["element"]: parent,
      });
    }
    return elements;
  };

  //Append elements

  const appendElements = (
    parentArr: { data: comment | post; element: HTMLElement }[],
    childArr: { data: comment | post; element: HTMLElement }[],
    parentId: string,
    childId: string
  ) => {
    let elements: HTMLElement[] = [];
    for (let i = 0; i < parentArr.length; i++) {
      const div = document.createElement("div");
      const { data: parentData, element: parentElement } = parentArr[i];
      childArr.forEach((child) => {
        const { data: childData, element: childElement } = child;

        if (
          childData[childId as keyof typeof childData] ===
          parentData[parentId as keyof typeof parentData]
        ) {
          childElement.style.border = "1px solid black";
          div.appendChild(childElement);
          div.style.border = "1px solid black";
        }
      });
      if (div.hasChildNodes()) {
        const title = document.createElement("h3");
        title.textContent = "Comments:";
        div.insertBefore(title, div.firstChild);
        parentElement.appendChild(div);
      }
      parentElement.style.padding = "1rem";
      parentElement.style.margin = "0.5rem 0";
      parentElement.style.border = "1px solid black";
      elements.push(parentElement);
    }

    return elements;
  };

  //Fetch data
  const fetchData = async (query: string) => {
    const res = await fetch(url + query);
    const data = await res.json();

    return data;
  };
  const getPosts = async () => {
    const [posts, comments] = await Promise.all([
      fetchData("posts"),
      fetchData("comments"),
    ]);

    const postElements = createHtmlElements(posts, 'article', {
      
      title: "h1",
      body: "p",
      id: 'h4'
    });

    const commentElements = createHtmlElements(comments, 'div', {
      name: "h3",
      body: "p",
    });
    const postCommentsElements = appendElements(
      postElements,
      commentElements,
      "id",
      "postId"
    );
    printElements("main", postCommentsElements);
  };

  const printElements = (parent: string, elements: HTMLElement[]) => {
    const main = document.createElement(parent);

    elements.forEach((element) => {
      main.appendChild(element);
    });

    if (!appDiv) return;

    appDiv.appendChild(main);
  };

  getPosts();
};

// app();
