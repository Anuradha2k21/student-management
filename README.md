# Student Management System
### IMPORTANT
I am not the first author of this repo. Me and my team added multiple security improvements. You can visit the author's repo by using this link
[donskytech
/
rfid-security-app](https://github.com/donskytech/rfid-security-app?tab=Apache-2.0-1-ov-file)
---
## A Student badgeNumber Management System using MERN stack (MongoDB-Express-React-Node)  


![alt text](https://user-images.githubusercontent.com/69466026/198886526-62aa9cf4-9613-4391-80c1-e00f466aeacf.PNG "badgeNumber Security Application")

### For writeup of the project then please look [MERN Stack Tutorial – badgeNumber Management System](https://www.donskytech.com/mern-stack-tutorial-badgeNumber-management-system/)    

### To install and run the project then do the following steps:  
You should have installed Node.js in your workstation first and setup your own MongoDB Atlas database cluster.

### To run the backend application:  
1. Open a new terminal
2. ```git clone https://github.com/Anuradha2k21/student-management?tab=readme-ov-file```  
3. ```cd student-management```  
4. ```cd backend```  
5. Create a .env file and enter your MongoDB Atlas connection string.  
Format is the following: ```MONGO_DB_URL=mongodb+srv://<username>:<password>@<server>/badgeNumberdb?retryWrites=true&w=majority```
6. ```npm install && npm start```  
7. Type localhost:5000 in your browser and check if you would see "Cannot GET /".  If you see this message then it means that you were able to run the backend server.  

### To run the frontend application:  
1.  Open another terminal and cd into where you clone your project  
2.  ```cd frontend```  
3.  ```npm install && npm start```  
3.  Type localhost:3001 in your browser and check if you would see the user interface.  You should be able to see the application but with no data displayed as your MongoDB is not populated with any test data.  

### Populating your MongoDB Atlas database with test data
The backend\data\MOCK_DATA.json contains mock data that you could insert into your application.  If you want to insert this into your database cluster then do the
following:

1.  Open a new terminal and cd into the backend folder
2.  Type in ```npm run data:import```  
3.  Check your database if it has been populated with values then you can now close the terminal
---
### IMPORTANT
This repository is made to run along with another service (repository). You can find that repo in here [link](https://github.com/Anuradha2k21/Sign-in_and_Sign-up)

## Collaborators

- [Adithya](https://github.com/adithya-yashodhi?query=anuradhasanjaya2024%40gmail.com)
- [Umandi](https://github.com/ThisaruUmandi)
- [Hansani](https://github.com/Samudi1234)