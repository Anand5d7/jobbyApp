import {BsFillBriefcaseFill, BsStarFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

const SimilarJobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    rating,
    location,
    title,
    jobDescription,
  } = jobDetails

  return (
    <li className="similar-job-item">
      <div className="similar-logo-container">
        <div className="similar-logo-title-container">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
            className="similar-company-logo"
          />
          <div className="similar-title-rating-container">
            <h1 className="similar-heading">{title}</h1>
            <div className="similar-rating-container">
              <BsStarFill className="similar-rating-icon" />
              <p className="similar-rating-heading">{rating}</p>
            </div>
          </div>
        </div>
        <h1 className="similar-description-heading">Description</h1>
        <p className="similar-para">{jobDescription}</p>
        <div className="similar-jobType-location-container">
          <div className="similar-location-container">
            <MdLocationOn className="similar-location-icon" />
            <p className="similar-location-heading">{location}</p>
          </div>
          <div className="similar-jobType-container">
            <BsFillBriefcaseFill className="similar-jobType-icon" />
            <p className="similar-jobType-heading">{employmentType}</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem
