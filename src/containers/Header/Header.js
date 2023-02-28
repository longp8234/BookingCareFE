import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';

import { LANGUAGES, USER_ROLE } from "../../utils";
import _ from 'lodash';

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menuApp: []
        }
    }
    
    handleChangeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    componentDidMount() {
        let { userInfo } = this.props;
            let menu = []
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleId
            if (role === USER_ROLE.ADMIN) {
                menu = adminMenu
            }
            if (role === USER_ROLE.DOCTOR) {
                menu = doctorMenu
            }
        }
        this.setState({
            menuApp: menu
        })
    }

    render() {
        const { processLogout, language, userInfo } = this.props;

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menuApp} />
                </div>

                <div className='header-right-content'>
                    <span className='header-greeting'>
                        <FormattedMessage id={'header-be.welcome'} />, {userInfo && userInfo.lastName ? userInfo.lastName : ''}
                    </span>
                    <div
                        className={language === LANGUAGES.VI ? 'language-header-vi active' : 'language-header-vi'}
                        onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}>
                        <i class="fab fa-vimeo"></i><span> Tiếng Việt</span>
                    </div>
                    <div
                        className={language === LANGUAGES.EN ? 'language-header-en active' : 'language-header-en'}
                        onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}>
                        <i class="fab fa-etsy"></i><span> English</span>
                    </div>
                    <div className="btn btn-logout" onClick={processLogout} title="Log out">
                        <i className="fas fa-sign-out-alt logout-icon"></i>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
