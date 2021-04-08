const { loadDomSelector } = require("./hoge");

const dirTree = require("directory-tree");

const filter = (dir) => {
  if (dir.type !== "directory") {
    return dir;
  }
  return Object.assign(dir, {
    children: dir.children
      .filter((d) => {
        if (d.type !== "file") {
          return true;
        } else {
          try {
            return loadDomSelector(d.path).length != 0;
          } catch (e) {
            console.error(e);
            return false;
          }
        }
      })
      .map((d) => {
        if (d.type !== "file") {
          return d;
        } else {
          return Object.assign(d, { domSelectors: loadDomSelector(d.path) });
        }
      })
      .map(filter),
  });
};

export const getDirTree = (path: string) => {
  const root = dirTree(path, {
    extensions: /\.(js)$/,
    exclude: /node_modules|.git/,
  });

  return filter(root);
};
