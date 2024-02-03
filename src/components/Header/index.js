import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {FiLogOut} from 'react-icons/fi'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="nav-header">
      <div className="nav-content">
        <div className="nav-mobile-header-container">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="header-logo-image"
            />
          </Link>
          <ul className="header-list-container">
            <li>
              <Link to="/" className="nav-link-item">
                <AiFillHome aria-label="30" className="home-img" />
              </Link>
            </li>
            <li>
              <Link to="/jobs" className="nav-link-item-1">
                <BsFillBriefcaseFill aria-label="30" className="jobs-img" />
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={onClickLogout}
                className="logout-button"
              >
                <FiLogOut aria-label="30" className="btn-img" />
              </button>
            </li>
          </ul>
        </div>

        <div className="nav-bar-large-header-container">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="header-logo-image-1"
            />
          </Link>
          <ul className="nav-menu-list-item">
            <li>
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/jobs" className="nav-link">
                Jobs
              </Link>
            </li>
          </ul>
          <button
            type="button"
            onClick={onClickLogout}
            className="desktop-logout-button"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Header)
