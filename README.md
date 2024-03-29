# Pintro App
Pintro is a mobile social networking app built for ios and android devices. The app consists of four parts, the react native client, the NodeJS server, the Admin panel and the Mongo database + Mongo Express.

## Client App
* The beta version of the app is run using the expo framework
* The expo server should be installed on a computer on the same network as the target mobile device for best results.
* Install the expo cli with -g flag `npm install -g expo-cli`
* cd into /client
* run `npm install`
* If you want to run the app using a local backend, follow the next step, if not then skip and set `production` to true in `/client/src/env.js`
* Get your local device IP (This step is optional if you want to run using a local backend)
  * On Mac - Go to `Networking` on System preferences and grab the IP on the right hand side
  * In terminal, run `REACT_NATIVE_PACKAGER_HOSTNAME=[ip]` replacing [ip] with the one you just copied
* run `expo start`
* Install the Expo client on android or ios
* Scan the QR code found on localhost:19002. Expo should build the react bundle and download it to your mobile device
* Alternatively, it is possible to use either the Android or iOS simulator.
  * Follow relevant guide to get started
    * iOS -  https://docs.expo.io/workflow/ios-simulator/
    * Android - https://docs.expo.io/workflow/android-studio-emulator/


* Possible errors
  * App silently times out and never starts the application
    * This could be caused by a firewall rule blocking the expo client port (19001).
      * Solutions:
        * Allow this port on the firewall
        * Start expo in tunnel mode `expo start --tunnel` or start it normally and choose `tunnel` from the left menu
        
### Add platform-tools to your path (pre-req to run using local backend with android device/emulator)
* In terminal, run the following:
`echo 'export ANDROID_HOME=/Users/$USER/Library/Android/sdk' >> ~/.bash_profile`
`echo 'export PATH=${PATH}:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools' >> ~/.bash_profile`
* Refresh your bash profile (or restart your terminal app)
`source ~/.bash_profile`
* Run `adb start-server`
* Start your android emulator
* In terminal run `adb reverse tcp:3000 tcp:3000`
        

## Backend Deployment

A live version of the DB and NodeJS server has been deployed on google cloud. The IP can be found in `/client/src/env.js`

### NodeJS Server & Mongo DB & Mongo Express
The backend components have been dockerized for simple deployment. This tutorial will go through deployment on an AWS Linux ec2 instance.


* Launch a new Amazon Linux 2 AMI instance on AWS and connect to it through ssh
* Create security groups which allow incoming and outgoing connections from anywhere for the following ports [3000, 8081, 5000]
* Install and start docker
  * `sudo yum update -y`
  * `sudo amazon-linux-extras install docker`
  * `sudo service docker start`
* Clone the Repo onto the instance
  * Install git
    * `sudo yum install git -y`
* Add enviroment variables
  * Create a file name ".env" in /server with the following content
```
MONGO_USERNAME=root
MONGO_PASSWORD=example
MONGO_HOST=127.0.0.1
MONGO_PORT=27017
MONGO_DB=pintro

LINKED_IN_CLIENT_ID=[Add creds]
LINKED_IN_CLIENT_SECRET=[Add creds]

FACEBOOK_CLIENT_ID=[Add creds]
FACEBOOK_CLIENT_SECRET=[Add creds]

GOOGLE_CLIENT_ID=[Add creds]
GOOGLE_CLIENT_SECRET=[Add creds]

FIREBASE_APIKEY=[Add creds]
FIREBASE_AUTHDOMAIN=[Add creds]
FIREBASE_DBURL=[Add creds]
FIREBASE_PROJECTID=[Add creds]
FIREBASE_STORAGEBUCKET=[Add creds]
FIREBASE_MESSAGINGSENDERID=[Add creds]
FIREBASE_APPID=[Add creds]
FIREBASE_MEASUREMENTID=[Add creds]
```
* Start the docker container
  * While in the root directory run `docker-compose up`
  * This will start three different container
    * Server Container
      * Node container
    * Database Container
      * Mongo DB
    * MongoExpress container
      * See the contents of MongoDB
      
* Possible errors
  * Error related to gRPC
    * This error is because of firebase. To fix the error, run `docker-compose up`, then in a new terminal tab, enter `docker exec -it server bash` (so you can bash into the container). Then `run npm rebuild`. Exit the bash and restart the container
  * Missing Modules 
    * If you get missing package errors or some other package error, bash into the container (`docker exec -it server bash`), delete node_modules dir, delete package-lock.json in and try to install them again using `npm install`. To install specific packages user `npm install [package name]`
  * For any other errors check the GitHub wiki
  * Sign in with linked in will only work if your expo client has been added to the trusted callback URLs in linked in
  * App notifications will only work on physical devices + you must be logged in to expo
  
### Admin Panel
* On the aws instance `cd admin-panel`
* `npm install`
*  `$export PORT=5000` to use port 5000 for the admin panel
* `npm start`

