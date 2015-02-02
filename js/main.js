/** @jsx React.DOM */
var data = [
  {author: "Pete Hunt", text: "This is one comment"},
  {author: "Jordan Walke", text: "This is *another* comment"}
];

React.renderComponent(
	React.DOM.h1({className: "heading"}, "React Chat"),
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
        React.DOM.div({className: "commentBox"}, 
        	React.DOM.h2(null, "Comments"), 
        	CommentList({data: this.state.data}), 
        	CommentForm({onCommentSubmit: this.handleCommentSubmit})
        )
    );
  }
});

var CommentList = React.createClass({displayName: 'CommentList',
  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      return (
        Comment({author: comment.author}, 
          comment.text
        )
      );
    });
    return (
      React.DOM.div({className: "commentList"}, 
        commentNodes
      )
    );
  }
});

var CommentForm = React.createClass({displayName: 'CommentForm',
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
      React.DOM.form({className: "commentForm", onSubmit: this.handleSubmit}, " ", React.DOM.br(null), 
        React.DOM.input({type: "text", placeholder: "Your name", ref: "author"}), " ", React.DOM.br(null), 
        React.DOM.input({type: "text", placeholder: "Say something...", ref: "text"}), " ", React.DOM.br(null), 
        React.DOM.input({type: "submit", value: "Post"})
      )
    );
  }
});

var Comment = React.createClass({displayName: 'Comment',
  render: function() {
    return (
      React.DOM.div({className: "comment"}, 
        React.DOM.h3({className: "commentAuthor"}, 
          this.props.author
        ), 
        this.props.children
      )
    );
  }
});

React.renderComponent(
  CommentBox({data: data}),
  document.getElementById('content')
);