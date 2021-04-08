import {
  nestMap,
  fetchSync,
  DomNode,
  MultipleDomSelector,
  NestArray,
  SingleDomSelector,
} from "gigantes";

type DomSelector = SingleDomSelector | MultipleDomSelector<NestArray<DomNode>>;

export const loadDomSelector = (path: string) => {
  const module = require(path);
  const domSelectors: { name: string; domSelector: DomSelector }[] = [];
  Object.keys(module).forEach((key) => {
    if (
      ["SingleDomSelector", "MultipleDomSelector"].includes(
        module[key].constructor.name
      )
    ) {
      domSelectors.push({
        name: key,
        domSelector: module[key],
      });
    }
  });

  return domSelectors;
};

const applyDomNode = (
  body: DomNode,
  data: { name: string; domSelector: DomSelector },
  fn: (domNode: DomNode, name: string) => void
) => {
  const domNodes = data.domSelector.getDomNode()(body);
  if (Array.isArray(domNodes)) {
    nestMap(domNodes as NestArray<DomNode>, (domNode: DomNode) => {
      fn(domNode, data.name);
    });
  } else {
    fn(domNodes, data.name);
  }
};

export const html = (
  filePath: string,
  url: string,
  domSelectorName: string
) => {
  try {
    const $ = fetchSync(url);
    const body = new DomNode($("body"), $);

    $("head").append(
      `<style>
    .gigantes-focus {
        position: relative;
        border: solid 10px #ff0099;
    }
    .domselector-name {
        position: absolute;
        top: -40px;
        background-color: lightgray;
        padding: 2px 4px;
        color: black;
        left: -10px;
    }
    </style>`
    );
    const domSelector = loadDomSelector(filePath).find(
      ({ name }) => name == domSelectorName
    );
    applyDomNode(body, domSelector, (domNode, name) => {
      domNode.cheerio.addClass("gigantes-focus");

      domNode.cheerio.append(`<span class="domselector-name">${name}</span>`);
    });

    return $.html();
  } catch {
    return "";
  }
};
