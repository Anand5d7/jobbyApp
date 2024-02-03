import './index.css'

const SkillsCard = props => {
  const {skillDetails} = props
  const {imageUrl, name} = skillDetails

  return (
    <li className="skill-card-item-container">
      <div className="skills-card-container-1">
        <img src={imageUrl} alt={name} className="skills-card-img" />
        <p className="skills-card-heading">{name}</p>
      </div>
    </li>
  )
}
export default SkillsCard
