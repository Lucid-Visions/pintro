#! /bin/bash

mongoimport --host mongo --db pintro --collection actionButtons --type json --file /seed-data/action-buttons.json --jsonArray -u ${MONGO_INITDB_ROOT_USERNAME} -p ${MONGO_INITDB_ROOT_PASSWORD} --authenticationDatabase admin
mongoimport --host mongo --db pintro --collection articles --type json --file /seed-data/articles.json --jsonArray -u ${MONGO_INITDB_ROOT_USERNAME} -p ${MONGO_INITDB_ROOT_PASSWORD} --authenticationDatabase admin
mongoimport --host mongo --db pintro --collection businesses --type json --file /seed-data/businesses.json --jsonArray -u ${MONGO_INITDB_ROOT_USERNAME} -p ${MONGO_INITDB_ROOT_PASSWORD} --authenticationDatabase admin
mongoimport --host mongo --db pintro --collection notifications --type json --file /seed-data/notifications.json --jsonArray -u ${MONGO_INITDB_ROOT_USERNAME} -p ${MONGO_INITDB_ROOT_PASSWORD} --authenticationDatabase admin
mongoimport --host mongo --db pintro --collection relationship --type json --file /seed-data/relationship.json --jsonArray -u ${MONGO_INITDB_ROOT_USERNAME} -p ${MONGO_INITDB_ROOT_PASSWORD} --authenticationDatabase admin
mongoimport --host mongo --db pintro --collection hubs --type json --file /seed-data/hubs.json --jsonArray -u ${MONGO_INITDB_ROOT_USERNAME} -p ${MONGO_INITDB_ROOT_PASSWORD} --authenticationDatabase admin
mongoimport --host mongo --db pintro --collection status --type json --file /seed-data/status.json --jsonArray -u ${MONGO_INITDB_ROOT_USERNAME} -p ${MONGO_INITDB_ROOT_PASSWORD} --authenticationDatabase admin
mongoimport --host mongo --db pintro --collection users --type json --file /seed-data/users.json --jsonArray -u ${MONGO_INITDB_ROOT_USERNAME} -p ${MONGO_INITDB_ROOT_PASSWORD} --authenticationDatabase admin
