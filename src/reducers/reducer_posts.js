import { FETCH_POSTS } from '../actions';
import _ from 'lodash';

//defaulting state to be an object since that will contain the array of posts
export default function(state ={}, action) {

	switch (action.type) {
	case FETCH_POSTS:
		return _.mapKeys(action.payload.data, "id"); //maps through the array of objects(posts), pulls the property "id", and displays its state
			
	default:
		return state;
	}
}
