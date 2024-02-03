import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFillBriefcaseFill, BsStarFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import {BiLinkExternal} from 'react-icons/bi'
import SkillsCard from '../SkillsCard'
import SimilarJobItem from '../SimilarJobItem'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobData: {},
    similarJobsData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobData()
  }

  getFormattedSimilarData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    rating: data.rating,
    title: data.title,
  })

  getFormattedData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    location: data.location,
    title: data.title,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    skills: data.skills.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    })),
  })

  getJobData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = this.getFormattedData(data.job_details)
      const updatedSimilarJobsData = data.similar_jobs.map(eachSimilarJob =>
        this.getFormattedSimilarData(eachSimilarJob),
      )
      this.setState({
        jobData: updatedData,
        similarJobsData: updatedSimilarJobsData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderFailureView = () => {
    const {match} = this.props
    const {params} = match
    // eslint-disable-next-line no-unused-vars
    const {id} = params
    return (
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
          id="button"
          onClick={this.getJobData}
        >
          Retry
        </button>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetailsView = () => {
    const {jobData, similarJobsData} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
    } = jobData
    const {description, imageUrl} = lifeAtCompany
    return (
      <div className="job-details-view-container">
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
                  <BsStarFill className="star-icon" />
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
              <div className="visit-container">
                <a className="visit-link" href={companyWebsiteUrl}>
                  Visit <BiLinkExternal className="visit-icon" />
                </a>
              </div>
            </div>
            <p className="job-description">{jobDescription}</p>
          </div>
          <h1 className="side-heading">Skills</h1>
          <ul className="job-details-skills-container">
            {skills.map(eachSkill => (
              <SkillsCard skillDetails={eachSkill} key={eachSkill.name} />
            ))}
          </ul>
          <div className="company-life-at-container">
            <div className="life-at-heading-container">
              <h1 className="life-at-heading">Life at Company</h1>
              <p className="life-at-para">{description}</p>
            </div>
            <img
              src={imageUrl}
              alt="life at company"
              className="life-at-image"
            />
          </div>
        </div>
        <h1 className="side-heading">Similar Jobs</h1>
        <ul className="similar-jobs-list-container">
          {similarJobsData.map(eachSimilarJobItem => (
            <SimilarJobItem
              key={eachSimilarJobItem.id}
              jobDetails={eachSimilarJobItem}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-job-details-item-container">
        <Header />
        <div className="job-item-details-container">
          {this.renderJobDetails()}
        </div>
      </div>
    )
  }
}

export default JobItemDetails
