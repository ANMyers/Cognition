# About
   This is my Front End Capstone for [Nashville Software School](http://nashvillesoftwareschool.com/). I built this application in memory of my grandmother, she was diagnosed with breast cancer when I was a teenager. I remember seeing her under tremendous amounts of stress when she had her bio sample taken for a diagnosis and I wanted a way to help. I wanted a way for her to start preparing for the most likely outcome before recieving her results so I built Cognition. Without much of a mathematical background I tried my best to build a machine learning application that a user can read about how the algorithm works, see the algorithm run, and then see a real world application of that algorithm.

# Description
   Front End Capstone utilizing [UCI Machine Learning Repository](https://archive.ics.uci.edu/ml/datasets.html) breast cancer dataset to build a machine learning application for predicting malignant or benign breast cancer bio samples.

# How It Works
   After landing on the home page a User will see: 
![image](https://user-images.githubusercontent.com/24867879/27463472-7192f01a-578d-11e7-87a6-fda719aa4cfd.png)

   From here a user can select to read more about how Cognition works, or perhaps try their hand at seeing it run against a breast cancer dataset. If a user chooses to see 'How It Works' they will see:
![image](https://user-images.githubusercontent.com/24867879/27463519-c59670ba-578d-11e7-8f7d-7162ac0b3b10.png)
   From this page the user can see a small demonstration of how the Nearest Neighbor forms clusters in short steps for readability and understandability.

   If the user chooses to try it for themselves they can click on 'Demonstration' and they will see:
![image](https://user-images.githubusercontent.com/24867879/27463549-f61d4af6-578d-11e7-9622-9dcac581d903.png)
   From here the user can select a predetermined dataset quantity to train on and against for their tinkering pleasure. The results are not being calculated on the spot but instead the results have already been calculated and are simply being retrieved via firebase. Running the Nearest Neighbor in Javascript on my personal laptop took anywhere from 30-60 seconds to form the results and therefore it would be more time effient to save the results.

## Built With

* [Javascript](https://www.javascript.com/) - Main Language
* [AngularJs](https://angularjs.org/) - Framework
* [pip](https://maven.apache.org/) - Dependency Management
* [grunt](https://gruntjs.com/) - Javascript Task Runner
* [npm](https://www.npmjs.com/) - Package Manager
