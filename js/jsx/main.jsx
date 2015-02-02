/** @jsx React.DOM */
var data = [
  {author: "Pete Hunt", text: "This is one comment"},
  {author: "Jordan Walke", text: "This is *another* comment"}
];

React.renderComponent(
	<h1 className="heading">React Chat Application</h1>,
	document.getElementById('heading')
);

var CommentBox = React.createClass({displayName: 'CommentBox',
  getInitialState: function() {
    return {data: []};
  },
  handleCommentSubmit: function(comment) {
    data.push(comment);
    this.setState({data: data});
  },
  componentDidMount: function() {
    this.setState({data: data});
  },
  render: function() {
    return (
        <div className="commentBox">
        	<h2>Comments</h2>
        	<CommentList data={this.state.data} />
        	<CommentForm onCommentSubmit={this.handleCommentSubmit} />
        </div>
    );
  }
});

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment author={comment.author}>
          {comment.text}
        </Comment>
      );
    });
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    );
  }
});

var CommentForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.refs.author.getDOMNode().value.trim();
    var text = this.refs.text.getDOMNode().value.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text});
    this.refs.author.getDOMNode().value = '';
    this.refs.text.getDOMNode().value = '';
    return;
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}> <br />
        <input type="text" placeholder="Your name" ref="author" /> <br />
        <input type="text" placeholder="Say something..." ref="text" /> <br />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

var Comment = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <h3 className="commentAuthor">
          {this.props.author}
        </h3>
        {this.props.children}
      </div>
    );
  }
});

React.renderComponent(
  <CommentBox data={data} />,
  document.getElementById('content')
);