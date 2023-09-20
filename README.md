# BigData-and-Generative-AI-customer-profiling-system
BigData system to capture user actions on buttons and links, as well as their time spent on a website, to subsequently perform unsupervised clustering and analysis of keywords via generative AI and webscraping. Javascript application that connects to MongoDB, using a node.js server, and passes the captured data to a Python backend.

# How to perform
You must create a new folder on your computer and include all the files there (taking into account that node_modules.rar must be unzipped). Then, you must have all the necessary programs, plugins and libraries installed: MongoDb Compass, Atlas Server with an assigned cluster, Node.js accompanied by npm and express, Python together with an IDE (including pymongo, sklearn, matplotlib, numpy, beautiful soup and nltk).

It is important to change the Atlas Server string with the one in your case, both in app.js and in Python_Backend.py.

Then, you activate your server, open index.html, fill the website with various data (understanding that each time you close and open a new user is counted), update the collection in MongoDB compass, and run the Python script.

# Screenshots
![Texto alternativo](https://drive.google.com/uc?id=1fvnF7iMIKpL52nuB3O0544mdMAL4pDjB)

![Texto alternativo](https://drive.google.com/uc?id=1-mhN5yXAfFUT3zYzjX9CLUk7Zx_vI249)
