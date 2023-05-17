const test = require('./testlol.js');


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
}

console.log(test(input))
