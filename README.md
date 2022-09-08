# Running the site locally
1. Install any of the tested LTS Node versions, to manage node versions we recommend using [nvm](https://github.com/nvm-sh/nvm)
   
   Tested on versions **v10, v12, v14, v16**
3. [Install Redux Devtools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) - This will be incredibly helpful for learning and following the actions, and state changes.
4. Install project dependencies
    ```
    npm install
    ``` 
      **Note:** If `npm install` fails then make sure you are using one of the above node version.
    
5. Run the app
    ```
    npm start
    ```

The site should now be running at <http://localhost:8080>


If you are new to react/redux
---

You may want to check out these articles to learn a bit more:

1. https://facebook.github.io/react/tutorial/tutorial.html 
2. https://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html


Next, play around with any type of boilerplate - or play around with our own...
 
You should feel comfortable looking through things and playing.
 
Architectural Elements
---

#### LINTING

You should run `yarn run lint` in our example application. We do not 
accept un-linted code.

### Lodash

Lodash is javascript utility library. If you need to perform any sort of sorting or manipulation of 
objects and array, chances are lodash has it and will make your life much easier.
Please use curried and not the chain function.  If you use chain, it imports the entire lodash 
library, which will be non-performant.

### Redux Form, src/utils/validators, validation, and forms

You'll see the input in the example application automatically has errors on it and validation.  
This is a perfect example of how you build a form or input system that has validation.  See our 
pre-built list of [validators](src/utils/validators.js)

### Understand Progressive Loading:

Please understand via the application that you just cloned. Reload top-level with error button. 
Notice that its children will never get called, loaded (nor its children's api calls from the 
sagas) until after the top-level is loaded successfully.  This is all in place for you to 
understand fractal architecture and the mechanism of progressive loading.

[QB](https://6sense-my.sharepoint.com/:w:/p/vivek_tikar/EZ5gvoNAGv1Eqsdp4pMtFIABjz60WAMIjyE3_wXpQ5Nuyw?e=UI8jy3)
