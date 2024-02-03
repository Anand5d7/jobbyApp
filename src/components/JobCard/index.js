import {Link} from 'react-router-dom'

import {BsFillBriefcaseFill, BsStarFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

const JobCard = props => {
  const {jobData} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobData

  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="job-item">
        <div className="job-card-list-view-container">
          <div className="logo-title-location-container">
            <div className="logo-title-container">
              <img
                src={companyLogoUrl}
                alt="company logo"
                className="job-card-company-logo"
              />
              <div className="job-card-title-rating-container">
                <h1 className="title-heading">{title}</h1>
                <div className="job-card-rating-container">
                  <BsStarFill className="rating-icon" />
                  <p className="rating-heading">{rating}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="location-package-container">
            <div className="location-employee-container">
              <div className="job-location-container">
                <MdLocationOn className="job-location-icon" />
                <p className="location-para">{location}</p>
              </div>
              <div className="job-card-type-container">
                <BsFillBriefcaseFill className="job-brief-case-icon" />
                <p className="job-card-type-para">{employmentType}</p>
              </div>
            </div>
            <p className="job-card-package">{packagePerAnnum}</p>
          </div>
          <hr className="line" />
          <h1 className="job-description-heading">Description</h1>
          <p className="description-text">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobCard
