import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions';
import { Link } from 'react-router-dom';
import _ from 'lodash';

class PostsIndex extends Component {
	componentDidMount() {
		this.props.fetchPosts();
	}

	renderPosts() { //working with an object that contains posts with the second agrument (post) returning the data
		return _.map(this.props.posts, post => {
			return (
				<li className="list-group-item" key={post.id}>
				<Link className="post-name" to={ `/posts/${post.id}`}>
				{post.title}
				</Link>
				</li>
				);
		});
	}


	render() {
		return (
			//when you click on a link tag it prevents some of the defualt behavior of the browser
			<div className="posts-container">
				<h3 className="posts-header">Posts</h3>
				<ul className="list-group">
					{this.renderPosts()}
				</ul>
				<div className="text-xs-left">
					<Link className="btn btn-primary addpost-button" to="/posts/new">
					Add a Post
					</Link>
				</div>
				<div className="push"></div>
			</div>
			);
	}
}

//consume anything from application level state = define map state to props function
function mapStateToProps(state) {
	return { posts: state.posts };
}

export default connect(mapStateToProps, { fetchPosts })(PostsIndex); //action creator as an object



//side note: console logging this.props.posts will return two results becuase of the this.props.fetchPosts is called its rendered one time in the dom with no posts being available.
//the second result is once state is recalculated the problem is resolved and re-renders a populated prop of posts
