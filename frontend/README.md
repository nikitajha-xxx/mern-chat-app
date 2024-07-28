# React
* first file to load ./public/index.html which has root id div, this root id div is taken in main.jsx file which has all the elements of the dom from the components
* CSS with Chakra UI : https://chakra-ui.com/getting-started
* for background gradient : https://cssgradient.io/gradient-backgrounds/
* Container : for handling different screen sizes
* Cloudinary 
    * Cloud platform to store image
    * https://medium.com/@aalam-info-solutions-llp/how-to-upload-images-to-cloudinary-with-react-js-ad402f775818
    * upload an image and gives the url for the image stored on the cloud which we are storing in the db
* Context Api --> 
    * Lifting State Up : Sometimes, you want the state of two components to always change together. To do it, remove state from both of them, move it to their closest common parent, and then pass it down to them via props. This is known as lifting state up, and it’s one of the most common things you will do writing React code.
    * understanding context : https://react.dev/learn/passing-data-deeply-with-context

* Debounce Versus Throttle

* Debounce
    * Debounce is a technique used to improve the performance of a system by limiting the rate at which a particular function or event is executed. It works by delaying the execution of a function or event until a certain amount of time has passed without that function or event being triggered again

* what is memoization in react
    * https://www.syncfusion.com/blogs/post/what-is-memoization-in-react
    * Memoization is an optimization technique for accelerating computer programs by caching the results of heavy function calls and returning them when similar inputs are encountered repeatedly. Simply, React memoization is similar to caching
    * As an example, consider a long-running, sophisticated function that accepts input. To speed up this function execution, you can cache the results after executing it. So that, you can take the cached value without recomputing the value whenever you execute it again with the same inputs. Consequently, we can avoid unwanted rerenders for the same resultant output with the same set of inputs. We can capture the initial render result and cache it in memory for later use. This will boost app performance
    * When props within a React  functional component change, the whole component rerenders by default. To put it in another way, if a value inside the component changes, the entire component will rerender, along with all the functions or components whose values or props haven’t changed.
    * Memoization for functional components is also possible with React.memo() HOC and useMemo() Hook. The useCallback() Hook is also there for caching functions instead of values.
* useCallback
    * useCallback is a React Hook that lets you cache a function definition between re-renders.
    * const cachedFn = useCallback(fn, dependencies)
    * https://react.dev/reference/react/useCallback

* lookup : 
    * https://stackoverflow.com/questions/53551680/how-to-use-regex-search-in-referenced-field-in-mongodb
    * https://stackoverflow.com/questions/9621928/how-do-i-query-referenced-objects-in-mongodb


Search bar ui: 13:14
search drawer : 29:21
32:06
User List UI on search : 39:35
New Chat UI : 42:33


Below is final chat search by name using aggregate fucntion
 <!-- db.chats.aggregate([
                { "$match" : {"users":{"$elemMatch": {"$eq": user._id}}}},
                {
                     "$lookup":{
                         "from":"users",
                         "localField":"users",
                         "foreignField":"_id",
                         "pipeline":[
                            {
                                 "$match":
                 { "$expr":
                    { "$and":
                       [
                          { "$regexMatch": {
        "input": "$name",
        "regex": "pam", 
        "options": "i",
      }
    }
                       ]
                    }
                 }
                },
               
                           
                        
                         ],
                         "as":"user_details"
                     }
                 },
                 {
                    
                        "$match":
        { "$expr":
           { "$and":
              [
                {
                    "$in":[user._id, "$users"]
                },
                 {
                    "$gt":[{ "$size": "$user_details" }, 0 ]
                 }
              ]
           }
        }
       
                 },
                 {
                    
                     $unset: "user_details" 
                 }
                
            ]) -->





<!-- Other Solution -->
<!-- db.chats.aggregate([ { $match: { users: user._id } }, { $lookup: { from: "users", localField: "users", foreignField: "_id", as: "usersInfo" } }, { $unwind: "$usersInfo" }, { $match: { "usersInfo.name": { $regex: "pam", $options: "i" } } }, { $project: { _id: 1, chatName: 1, isGroupChat: 1, latestMessage: 1, groupAdmin: 1 } }]) -->



Perfectly working query below

<!-- db.chats.aggregate([ { $match: { users: user._id } }, { $lookup: { from: "users", localField: "users", foreignField: "_id", as: "usersInfo" } }, { $match: { "usersInfo.name": { $regex: "pam", $options: "i" } } }, { $project: { _id: 1, chatName: 1, isGroupChat: 1, latestMessage: 1, groupAdmin: 1, users: { $map: { input: "$usersInfo", as: "userDetail", in: { _id: "$$userDetail._id", name: "$$userDetail.name", email: "$$userDetail.email", picture: "$$userDetail.picture" } } } } }]) -->

To index the users field in the Chat collection, you can create a single-field index on that field. Here's how you can do it using Mongoose:

javascript
Copy code
const mongoose = require('mongoose');

// Define your chat schema
const chatSchema = new mongoose.Schema({
    // Chat schema definition
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

// Define the index on the users field
chatSchema.index({ users: 1 });

// Create your Chat model
const Chat = mongoose.model('Chat', chatSchema);

// Export the Chat model
module.exports = Chat;
In this example:

We define the chat schema, including the users field, which is an array of ObjectIds referencing the User model.
We then use the index() method to create a single-field index on the users field with a value of 1 to specify ascending order.
Finally, we create the Chat model using mongoose.model() and export it for use in other parts of the application.
With this index in place, queries that involve filtering, sorting, or searching based on the users field in the Chat collection should be more efficient. Make sure to apply the index to the users field if it's a common field used in your queries. Additionally, consider other fields or compound indexes depending on your specific query patterns.