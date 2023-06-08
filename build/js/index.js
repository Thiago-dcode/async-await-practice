import { htmlElementsFactory, mergeArray } from "./lib/elementsFactory.js";
const appDiv = document.getElementById("app");
const url = "https://jsonplaceholder.typicode.com/";
//Fetch data
const fetchData = async (query) => {
    const res = await fetch(url + query);
    const data = await res.json();
    return data;
};
const getData = async () => {
    const [posts, comments] = await Promise.all([
        fetchData("posts"),
        fetchData("comments"),
    ]);
    toHtmlElementData(mergeArray(posts, comments, 'id', 'postId'));
};
const toHtmlElementData = (data) => {
    //main wrapper element 
    const main = {
        element: "main",
        props: { className: "main", innerHTML: "<h1>Posts</h1>" },
        styleProps: {
            maxWidth: "1200px",
            margin: "0 auto",
            backgroundColor: "",
        },
    };
    //post + comment wrapper element 
    const article = {
        element: "article",
        props: { className: "article" },
        styleProps: {
            display: "flex",
            flexDirection: "column",
            alignItems: 'center',
            justifyContent: "center",
            marginBottom: "1rem",
        },
    };
    // comments wrapper element
    const section = {
        element: "section",
        props: { className: "section", innerHTML: "<h3>Comments</h3>" },
        styleProps: {
            display: "flex",
            flexDirection: "column",
            backgroundColor: "brown",
        },
    };
    const postElements = {
        title: { element: "h2", props: {}, styleProps: { color: "blue" } },
        body: { element: "p", props: {}, styleProps: { color: "pink" } },
        comments: [
            { element: "div", props: {}, styleProps: { backgroundColor: "blue" } },
            {
                name: {
                    element: "h3",
                    props: { className: "commentTitleClass" },
                    styleProps: { fontSize: "25px" },
                },
                body: {
                    element: "p",
                    props: { className: "commentBodyClass" },
                    styleProps: { fontSize: "15px" },
                },
            },
            section,
        ],
    };
    const htmlElements = htmlElementsFactory(data, article, postElements, main);
    printElements(htmlElements);
};
const printElements = (elements) => {
    appDiv?.append(...elements);
};
getData();
