module.exports = function (routeTree, data, urls) {
  
    const result = [
        [
          { "route": "/", "title": "Карта" },
          { "title": "Звезды", "route": "/stars" },
          { "route": "/stars/1", "title": "Вега" }
        ],
        [
          { "route": "/", "title": "Карта" },
          { "title": "Созвездия", "route": "/constellations" },
          { "route": "/constellation/2", "title": "Орион" },
          { "title": "Звезды", "route": "/constellation/2/stars" },
          { "route": "/constellation/2/stars/2", "title": "Бетельгейзе" }
        ]
      ]
  
    return result;
  };
  