function simplifyObject(jsonObj) {
    const { routeTree, data, urls } = jsonObj;
    const simplifiedObjects = [];

    console.log(routeTree);
  
    function traverseRouteTree(node, currentPath, simplifiedPath) {
      const { route, title, children, redirectTo } = node;
  
      if (redirectTo) {
        const redirectedNode = routeTree.children.find(child => child.route === redirectTo);
        traverseRouteTree(redirectedNode, currentPath, simplifiedPath);
        return;
      }
  
      currentPath += `/${route}`;
      simplifiedPath.push({ route: currentPath, title });
  
      if (children) {
        children.forEach(child => {
          traverseRouteTree(child, currentPath, simplifiedPath);
        });
      } else if (data[route]) {
        const ids = currentPath.match(/\/(\d+)/g);
        const titles = ids.map(id => data[route][id.substring(1)]);
        simplifiedPath.push({ route: currentPath, title: titles[titles.length - 1] });
        simplifiedObjects.push([...simplifiedPath]);
        simplifiedPath.pop();
      }
  
      currentPath = currentPath.substring(0, currentPath.lastIndexOf('/'));
      simplifiedPath.pop();
    }
  
    routeTree.children.forEach(child => {
      traverseRouteTree(child, '', []);
    });
  
    return simplifiedObjects;
  }
  
  const input = {
    "routeTree": {
      "route": "/",
      "title": "Карта",
      "children": [
        {
          "route": "stars",
          "title": "Звезды",
          "children": [
            {
              "route": ":starId"
            }
          ]
        },
        {
          "route": "constellations",
          "title": "Созвездия"
        },
        {
          "route": "constellation",
          "redirectTo": "constellations",
          "children": [
            {
              "route": ":constellationId",
              "children": [
                {
                  "route": "stars",
                  "title": "Звезды",
                  "children": [
                    {
                      "route": ":starId"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    "data": {
      "constellation": {
        "1": "Лира",
        "2": "Орион"
      },
      "star": {
        "1": "Вега",
        "2": "Бетельгейзе"
      }
    },
    "urls": ["/stars/1", "/constellation/2/stars/2"]
  };
  
  const simplifiedOutput = simplifyObject(input);
  console.log(simplifiedOutput);
  