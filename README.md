# Horns App

This is an API about concerts at Lima. This API is made with NodeJS, MongoDB  and Typescript. Here you will obtain:

1. Concerts that will happened soon
2. Bands' information
3. News about this bands & concerts.
4. The last bands' videos released.

---

## Installation
First, this project need Git, Node JS and MongoDB previously installed, the steps for installation depend on OS you have.

Then, you should clone the repository.
```
$ git clone git@github.com:Yesferal/Hornsapp-Api.git
$ cd Hornsapp-Api
```
Finally, you need to install `express` that provides a set of features for web, `concurrently` to run script simultaneously, `nodemon` for a automaticatlly server restart and `mongoose` to model application data (MongoDB).
```
$ npm install
``` 

---
## Usage
Open a terminal and run.
```
$ npm run dev
```
Then open your local browser and try accessing.
```
https://localhost:8080/concert/
```

---
## License
```
Copyright 2020 HornsApp Contributors

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

     https://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```