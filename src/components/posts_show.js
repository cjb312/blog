import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPost, deletePost } from '../actions';

class PostsShow extends Component {
	componentDidMount() {
		const { id } = this.props.match.params; //react-router params -> obj conatins all wilcard values that exists inside that given url. in this case its just id
		this.props.fetchPost(id);
	}

	onDeleteclick() {
		const { id } = this.props.match.params;
		this.props.deletePost(id, () =>{
			this.props.history.push('/'); //back to post index after deleteion of a post
		});
	}

	render() {
		const { post } = this.props;

		if (!post) {
			return <div>Loading...</div>;
		}

		return (
		 <div>
		 	<Link to="/" className="btn btn-primary">Back To Index</Link>
		 	<button
		 		className=" btn btn-danger pull-xs-right"
		 		onClick={this.onDeleteclick.bind(this)}
		 	>
		 	Delete Post
		 	</button>
		 	<h3>{post.title}</h3>
		 	<h6>Categories: {post.categories}</h6>
		 	<p>{post.content}</p>
		 </div>
		);
	}
}

function mapStateToProps({ posts }, ownProps) { //ownProps -> props object that is going to render. this.props === ownProps
	return { post: posts[ownProps.match.params.id] }; //mapping the single post
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);


// in bigger apps you would have mapStateToProps in its own file so this component is just for displaying

