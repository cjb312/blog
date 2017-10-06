import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class PostsNew extends Component {
	renderField(field) { //field contains event handler that makes sure <Field /> is repsonsible for this input
		return (
			<div className="form-group">
			 <label> {field.label} </label>
			 <input
			 	className="form-control"
			 	type="text"
			 	{...field.input}
			 />
			</div>
		);
	}

	render() {
		return (
			<form>
			 <Field
			 	label="Post Title"
				name="title"
				component={this.renderField}
			 />
			 <Field
			 	label="Tags"
			 	name="tags"
			 	component={this.renderField}
			 />
			 <Field
			 	label="Post Content"
			 	name="content"
			 	component={this.renderField}
			 />
			</form>
		);
	}
}

export default reduxForm({
	form: 'PostsNewForm'
})(PostsNew);