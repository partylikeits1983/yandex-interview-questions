module.exports = function(routeTree, data, urls) {
    const result = [];
  
    function buildRoute(node, path, params = {}) {
      const route = node.route.startsWith('/') ? node.route : `/${node.route}`;
      const fullPath = path + route;
  
      if (node.redirectTo) {
        const redirectTo = node.redirectTo.startsWith('/') ? node.redirectTo : `/${node.redirectTo}`;
        const redirectPath = path + redirectTo;
        const redirectNode = findNode(routeTree, redirectPath);
        
        if (redirectNode) {
          buildRoute(redirectNode, path, params);
        }
      }
  
      if (route.includes(':')) {
        const matches = route.match(/:([^\/]+)/g);
        if (matches) {
          matches.forEach(match => {
            const param = match.substring(1);
            if (params[param]) {
              fullPath = fullPath.replace(match, params[param]);
            }
          });
        }
      }
  
      if (node.title) {
        const title = node.title.startsWith(':') ? data[node.title.substring(1)] : node.title;
        result.push({ route: fullPath, title });
      }
  
      if (node.children && node.children.length > 0) {
        node.children.forEach(child => {
          buildRoute(child, fullPath, params);
        });
      }
    }
  
    function findNode(tree, path) {
      if (tree.route === path) {
        return tree;
      }
  
      if (tree.children && tree.children.length > 0) {
        for (let i = 0; i < tree.children.length; i++) {
          const child = tree.children[i];
          const foundNode = findNode(child, path);
          if (foundNode) {
            return foundNode;
          }
        }
      }
  
      return null;
    }
  
    urls.forEach(url => {
      const node = findNode(routeTree, url);
      if (node) {
        buildRoute(node, '');
      }
    });
  
    return result;
  };
  