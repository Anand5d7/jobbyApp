import {BsSearch} from 'react-icons/bs'

import ProfileDetails from '../ProfileDetails'

import './index.css'

const FiltersGroup = props => {
  const onChangeSearchInput = event => {
    const {changeSearchInput} = props
    changeSearchInput(event)
  }

  const onEnterSearchInput = event => {
    const {getJobs} = props
    if (event.key === 'Enter') {
      getJobs()
    }
  }

  const renderSearchInput = () => {
    const {getJobs, searchInput} = props

    return (
      <div className="search-input-container">
        <input
          type="search"
          className="search-input"
          placeholder="Search"
          value={searchInput}
          onChange={onChangeSearchInput}
          onKeyDown={onEnterSearchInput}
        />
        <button
          type="button"
          className="search-button"
          id="searchButton"
          onClick={getJobs}
        >
          <BsSearch aria-label="50" className="search-icon" />
        </button>
      </div>
    )
  }

  const renderTypeOfEmployment = () => {
    const {employmentTypesList} = props

    return (
      <div className="filters-container">
        <h1 className="filters-heading">Type of Employment</h1>
        <ul className="filters-list-container">
          {employmentTypesList.map(eachEmployment => {
            const {changeEmploymentType} = props
            const onSelectEmployeeType = event => {
              changeEmploymentType(event.target.value)
            }
            return (
              <li
                className="filters-list-item"
                key={eachEmployment.employmentTypeId}
                onChange={onSelectEmployeeType}
              >
                <input
                  type="checkbox"
                  id={eachEmployment.employmentTypeId}
                  className="check-input"
                  value={eachEmployment.employmentTypeId}
                />
                <label
                  className="check-label"
                  htmlFor={eachEmployment.employmentTypeId}
                >
                  {eachEmployment.label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  const renderSalaryRange = () => {
    const {salaryRangesList} = props

    return (
      <div className="salary-range-container">
        <h1 className="salary-heading">Salary Range</h1>
        <ul className="salary-list-container">
          {salaryRangesList.map(eachSalary => {
            const {changeMinimumSalary} = props
            const onClickSalary = () => {
              changeMinimumSalary(eachSalary.salaryRangeId)
            }

            return (
              <li
                className="salary-list-item"
                key={eachSalary.salaryRangeId}
                onClick={onClickSalary}
              >
                <input
                  type="radio"
                  id={eachSalary.salaryRangeId}
                  name="salary"
                  className="salary-check-input"
                />
                <label
                  htmlFor={eachSalary.salaryRangeId}
                  className="check-label"
                >
                  {eachSalary.label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  return (
    <div className="filters-group-container">
      {renderSearchInput()}
      <ProfileDetails />
      <hr className="hr-line" />
      {renderTypeOfEmployment()}
      <hr className="hr-line" />
      {renderSalaryRange()}
    </div>
  )
}

export default FiltersGroup
