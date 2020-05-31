#! /bin/bash

mongoimport --host mongo --db pintro --collection actionbuttons --type json --file /mongo-seed/action-buttons.json --jsonArray
mongoimport --host mongo --db pintro --collection articles --type json --file /mongo-seed/articles.json --jsonArray
mongoimport --host mongo --db pintro --collection businesses --type json --file /mongo-seed/businesses.json --jsonArray
mongoimport --host mongo --db pintro --collection notifications --type json --file /mongo-seed/notifications.json --jsonArray
mongoimport --host mongo --db pintro --collection relationships --type json --file /mongo-seed/relationships.json --jsonArray
mongoimport --host mongo --db pintro --collection status --type json --file /mongo-seed/status.json --jsonArray
mongoimport --host mongo --db pintro --collection users --type json --file /mongo-seed/users.json --jsonArray
