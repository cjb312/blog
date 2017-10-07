import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';
import _ from 'lodash';

//defaulting state to be an object since that will contain the array of posts
export default function(state ={}, action) {

	switch (action.type) {
	case DELETE_POST:
		return _.omit(state, action.payload);  //looks at state obj.  if it has a key of post.id then get rid of it(benefit of obj as app level state than an array)

	case FETCH_POST: //take all the existing posts out of their state object and put into { .. state }
		return { ...state, [action.payload.data.id]: action.payload.data}; 

	case FETCH_POSTS:
		return _.mapKeys(action.payload.data, "id"); //maps through the array of objects(posts), pulls the property "id", and displays its state
			
	default:
		return state;
	}
}


/* Side note: On line 10 the [] is key interpoltion not making an array.  
   whatever varialbe [action.payload.data.id] is -> set its value to action.payload.data */



//es5 version of line 10
//const post = action.payload.data;   
//const newState = {...state};
//newState[post.id] = post;
//return newState;