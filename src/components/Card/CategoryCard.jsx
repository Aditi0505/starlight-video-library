import { Link } from "react-router-dom";

const CategoryCard = ({ image, title, handleClick }) => {
  return (
    <Link to="/feed" state={title} onClick={() => handleClick(title)}>
      <div className="card">
        <div className="card-inner-container">
          <div className="card-image-overlay">
            <img
              src={image}
              alt={`${title} card`}
              className="img"
              loading="lazy"
            />
          </div>
        </div>
        <div className="icons">
          <span className="card-badge-text">{title}</span>
        </div>
      </div>
    </Link>
  );
};

export { CategoryCard };
