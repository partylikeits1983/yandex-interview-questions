module.exports = function (input) {
    const atomicInfo = new Set();
    const mapInfoToKey = info => {
        return Object.entries(info)
            .map(([key, value]) => `info_${key}_${value}`)
            .sort();
    };

    const dfs = (node, inheritedInfo = {}) => {
        const info = { ...inheritedInfo, ...node.info };
        const infoKeys = mapInfoToKey(info);
        infoKeys.forEach(key => atomicInfo.add(key));
        node.children.forEach(child => dfs(child, info));
        node.info = infoKeys;
    };

    dfs(input);

    const bfs = (node) => {
        const childrenInfo = node.children.reduce((info, child) => {
            const childInfo = bfs(child);
            return Object.keys(childInfo).reduce((acc, key) => {
                acc[key] = (acc[key] || []).concat(childInfo[key]);
                return acc;
            }, info);
        }, {});

        const info = {};
        node.info.forEach(key => {
            const [_, prop, value] = key.split("_");
            info[prop] = value;
        });

        Object.entries(childrenInfo).forEach(([key, values]) => {
            if (values.length === node.children.length && (!info[key] || info[key] === values[0])) {
                info[key] = values[0];
            }
        });

        node.info = mapInfoToKey(info);
        node.children.forEach(child => {
            child.info = child.info.filter(key => {
                const [_, prop, value] = key.split("_");
                return info[prop] !== value;
            });
        });

        return info;
    };

    bfs(input);

    return {
        atomicInfo: Array.from(atomicInfo).sort(),
        tree: input
    };
};
