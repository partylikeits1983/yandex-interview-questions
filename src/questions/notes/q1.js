module.exports = function (routeTree, data, urls) {
    const routes = {};

    function populateRoutes(node, path = '') {
        const newPath = path + '/' + node.route;
        if (node.title) {
            routes[newPath] = node.title;
        } else if (node.redirectTo) {
            routes[newPath] = routes[path + '/' + node.redirectTo];
        } else {
            const key = Object.keys(data).find(key => newPath.includes(key));
            if (key) {
                const id = newPath.split('/').pop();
                routes[newPath] = data[key][id];
            }
        }
        if (node.children) {
            node.children.forEach(child => populateRoutes(child, newPath));
        }
    }
    
    populateRoutes(routeTree);
    
    const result = urls.map(url => {
        const title = routes[url];
        return { route: url, title };
    });

    return result;
};
