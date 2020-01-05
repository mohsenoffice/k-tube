KTube project

1. Build a system that know to search videos from YouTube, show the results and when the user click on each result load it into an embedded YouTube player.
2. Add login/signup page for accessing that system.
3. Log users system activities: 
    a.search criteria 
    b.watched videos c.duration of watched videos
4. Add user with role admin that can access system stats.



To run both server and client: 
1. Make sure you have mongoDB up and running.
2. download the code (it includes all the required packages)
3. go to the main project directory and run: 
    pm run dev

Please note:
1. use my own google API key (you can change to your API key in case it stopped working)

Still need to be done (a promise to do if I find the time)
1. Clean the code:
    a. remove unused variables
    b. remove unused libraries
    c. divide the server (index.js) into more modules
2. Add more useful functionality:
    a. take the API key as a system parameter and not hardcode it!
    b. using bootstrap framework - UI is not the main part here but it should be nicer 
3. The authentication mechanism here is simple but not the right way (we should use )
4. Still need to implement the "Total votes" - note sure where to get this yet! 
5. Encrypt password
6. Write server logs into file.

IMPORTANT:
This is the first time I use reactJs so you may see some code that it's not the best practice!
