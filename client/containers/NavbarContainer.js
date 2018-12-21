import React, {Component} from 'react';
import {connect} from 'react-redux';
import { browserHistory } from 'react-router';
import Navbar from '../components/Navbar';

// import { logoutUser } from '../actions/user';
import { toggleClick } from '../actions/navbar';
import isEmpty from 'lodash/isEmpty';

const mapStateToProps = (state, ownProps) => {
  return {
    // user         : state.userReducer.loggedInUser,
    // board        : state.board.selectedBoard,
    // location     : ownProps.location.pathname,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logoutUser: () => {
      dispatch(logoutUser())
        .then(() => browserHistory.push('/signup'));
    },
    toggleSidebar : (field) => dispatch(toggleClick(field)),
    getUnreadNotes: (userId) => dispatch(getUnreadNotes(userId)),
  };
};

class NB extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aria       : false,
      toggleClass: 'navClass navbar-collapse collapse',
    };
    this.expandNav = this.expandNav.bind(this);
    this.newPage = this.newPage.bind(this);
  }

  componentWillReceiveProps({user}) {
    if (!isEmpty(this.props.user)) {
      this.props.getUnreadNotes(this.props.user.id);
    }
  }

  expandNav() {
    let newToggleClassValue = '';

    if (this.state.toggleClass === 'navClass navbar-collapse collapse') {
      newToggleClassValue = 'navClass navbar-collapse collapse in navToggle';

    } else {
      newToggleClassValue = 'navClass navbar-collapse collapse';
    }
    this.setState({
      aria       : !this.state.aria,
      toggleClass: newToggleClassValue,
    });
  }
  newPage() {
    this.setState({toggleClass: 'navClass navbar-collapse collapse'});
  }
  render() {
    return (
      <Navbar
        aria={this.state.aria}
        expandNav={this.expandNav}
        navClass={this.state.toggleClass}
        titleClass={this.state.toggleTitle}
        user={this.props.user}
        logoutUser={this.props.logoutUser}
        toggleSidebar={this.props.toggleSidebar}
        board={this.props.board}
        location={this.props.location}
        newPage={this.newPage}
        numOfUnread={this.props.numOfUnread}
      />
    );
  }
}

const NavbarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NB);

export default NavbarContainer;
