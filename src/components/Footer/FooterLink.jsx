const FooterLink = ({ link, iconclassName }) => {
  return (
    <li>
      <a href={link} className="nav-icon" target="_blank" rel="noreferrer">
        <i className={`fab ${iconclassName} text-sm`}></i>
      </a>
    </li>
  );
};
export { FooterLink };
