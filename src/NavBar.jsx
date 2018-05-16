import React, {Component} from 'react';




class NavBar extends Component {
  constructor(props){
    super(props);

  }

  render() {

    return (
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chattr</a>
        <div className='userNum'> {this.props.userNums} Users Online </div>
      </nav>
    );
  }
}
export default NavBar;
