RunningChallenge notice:

requirements:
-mongoDB: v4.0
-nodeJS: v8.12.0
-npm: 6.0.0
-postman

***************************************************************************************
For developpers:
-install node dependencies with command: >npm install
-run mongoDB (on port 27017) in a terminal with command: >mongod

choose the script of interest:
    >npm run test --> Launch unit test
    >npm run start --> Launch local app in with production environment
    >npm run dev --> Launch local app in dev environment
    >npm run prod --> Launch production app in production environment (can be used if app for production is built)
    >npm build --> Launch prebuild, build and postbuild script to build app for production in /dist repository
    >npm lint --> Launch eslint for codeStyle
    >npm lint:fix --> fix codeStyle
    >npm clean --> clean production repository
    >npm clean --> clean logs repository

URI available:
-Create a Run
 http://localhost:3000/runnings
 method : Post
 exemple of body request: {
                                "name":"blop",
                                "numberCaloriesBurnt":1000,
                                "numberKmRan":800,
                                "startDate": "2019-09-06",
                                "stopDate": "2019-09-08"
                            }
 if startDate or stopDate is incorrect format, throw error;
 if startDate or stopDate is not set, app will set Date.now() by default
 if dates are set dateFormat should be at least YYYY-MMM-DD, format YYYY-MM-DDTHH:MM:SS.sssZ is possible

 -calculate the average of run between startDate and stopDate
   http://localhost:3000/runnings
   method: Post
   exemple of body request: {
                                   "startDate": "2019-09-06",
                                   "stopDate": "2019-09-08"
                             }
 should have startDate and stopDate format
 dateFormat should be at least YYYY-MMM-DD, format YYYY-MM-DDTHH:MM:SS.sssZ is possible


 -find all run recorded
  http://localhost:3000/runnings
  method: get

 -healthCheck for resilience. Give the state of the app and the connection with the db
  http://127.0.0.1:3000/health
  method: get


***************************************************************************************
----what next---
-use _.unset instead of _.pick (facultatif)
-fastify-swagger (facultatif)