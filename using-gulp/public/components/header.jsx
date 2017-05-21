import React from "react";
import PropTypes from "prop-types";

class Header extends React.Component {
    render() {
        return <h1>{this.props.text}</h1>;
    }
}

Header.propTypes = {
    text: PropTypes.string
};

export default Header;
