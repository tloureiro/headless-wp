import React, { Component } from 'react';


class Post extends Component {

  render() {

    const postSlug = this.props.routeProps.match.params.postSlug;

    const post = this.props.posts.find((item) => {
      if(item.slug === postSlug){
        return true;
      }
    });

    const title = post ? post.title.rendered : '';
    const postBody = post ? post.content.rendered : '';

    return(
      <div>
        <h3>{title}</h3>
        <p dangerouslySetInnerHTML={{__html: postBody}} />
      </div>
    )
  }
}

export default Post;