import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import {BiLinkExternal} from 'react-icons/bi'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import SimilarJobItem from '../SimilarJobItem'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class AboutJobItem extends Component {
  state = {
    jobDetailsData: [],
    apiStatus: apiStatusConstants.initial,
    similarJobDetailsData: [],
  }

  componentDidMount() {
    this.getJobData()
  }

  getJobData = async props => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const jobDetailsApiUrl = `https://apis.ccbp.in/jobs/${id}`
    const optionsJobsData = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const responseJobData = await fetch(jobDetailsApiUrl, optionsJobsData)
    if (responseJobData.ok === true) {
      const fetchedData = await responseJobData.json()
      const updatedJobDetailsData = fetchedData.job_details.map(
        eachJobItem => ({
          companyLogoUrl: eachJobItem.company_logo_url,
          companyWebsiteUrl: eachJobItem.company_website_url,
          employmentType: eachJobItem.employment_type,
          id: eachJobItem.id,
          jobDescription: eachJobItem.job_description,
          lifeAtCompany: {
            description: eachJobItem.life_at_company.description,
            imageUrl: eachJobItem.life_at_company.image_url,
          },
          location: eachJobItem.location,
          packagePerAnnum: eachJobItem.package_per_annum,
          rating: eachJobItem.rating,
          skills: eachJobItem.skills.map(eachSkill => ({
            imageUrl: eachSkill.image_url,
            name: eachSkill.name,
          })),
          title: eachJobItem.title,
        }),
      )

      const updatedSimilarJobDetailsData = fetchedData.similar_jobs.map(
        eachSimilarJobItem => ({
          companyLogoUrl: eachSimilarJobItem.company_logo_url,
          id: eachSimilarJobItem.id,
          jobDescription: eachSimilarJobItem.job_description,
          employmentType: eachSimilarJobItem.employment_type,
          location: eachSimilarJobItem.location,
          rating: eachSimilarJobItem.rating,
          title: eachSimilarJobItem.title,
        }),
      )
      this.setState({
        jobDetailsData: updatedJobDetailsData,
        similarJobDetailsData: updatedSimilarJobDetailsData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderJobDetailsView = () => {
    const {jobDetailsData, similarJobDetailsData} = this.state

    if (jobDetailsData.length >= 1) {
      const {
        companyLogoUrl,
        companyWebsiteUrl,
        employmentType,
        id,
        jobDescription,
        lifeAtCompany,
        location,
        packagePerAnnum,
        rating,
        skills,
        title,
      } = jobDetailsData[0]
      return (
        <>
          <div className="job-item-container">
            <div className="company-logo-container">
              <div className="image-container">
                <img
                  src={companyLogoUrl}
                  alt="job details company logo"
                  className="company-logo"
                />
                <div className="title-rating-container">
                  <h1 className="company-title">{title}</h1>
                  <div className="rating-container">
                    <AiFillStar className="star-icon" />
                    <p className="company-rating">{rating}</p>
                  </div>
                </div>
              </div>
              <div className="jobType-location-container">
                <div className="location-jobType-container">
                  <div className="location-container">
                    <MdLocationOn className="location-icon" />
                    <p className="location">{location}</p>
                  </div>
                  <div className="job-type-container">
                    <BsFillBriefcaseFill className="brief-case-icon" />
                    <p className="job-type-para">{employmentType}</p>
                  </div>
                </div>
                <p className="package">{packagePerAnnum}</p>
              </div>
            </div>
            <hr className="company-hr-line" />
            <div className="company-description-container">
              <div className="description-visit-container">
                <h1 className="description-heading">Description</h1>
                <a className="visit-link" href={companyWebsiteUrl}>
                  Visit
                  <BiLinkExternal className="visit-icon" />
                </a>
              </div>
              <p className="job-description">{jobDescription}</p>
            </div>
            <h1 className="side-heading">Skills</h1>
            <ul className="job-details-skills-container">
              {skills.map(eachSkill => (
                <li className="job-details-skills-list-item">
                  <img
                    src={eachSkill.imageUrl}
                    alt={eachSkill.name}
                    className="skill-image"
                  />
                  <p className="skill-name">{eachSkill.name}</p>
                </li>
              ))}
            </ul>
            <div className="company-life-at-container">
              <div className="life-at-heading-container">
                <h1 className="life-at-heading">Life at Company</h1>
                <p className="life-at-para">{lifeAtCompany.description}</p>
              </div>
              <img
                src={lifeAtCompany.imageUrl}
                alt="life at company"
                className="life-at-image"
              />
            </div>
          </div>
          <h1 className="side-heading">Similar Jobs</h1>
          <ul className="similar-jobs-list-container">
            {similarJobDetailsData.map(eachSimilarJobItem => (
              <SimilarJobItem
                key={eachSimilarJobItem.id}
                similarJobsData={eachSimilarJobItem}
                employmentType={employmentType}
              />
            ))}
          </ul>
        </>
      )
    }
    return null
  }

  onRetryJobDetailsAgain = () => {
    this.getJobData()
  }

  renderJobFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Oops! Something Went Wrong</h1>
      <p className="failure-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="failure-retry-button"
        data-testid="button"
        onClick={this.onRetryJobDetailsAgain}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsView()
      case apiStatusConstants.failure:
        return this.renderJobFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-details-view-container">
          {this.renderJobDetails()}
        </div>
      </>
    )
  }
}

export default AboutJobItem
