import { FooterLink } from "../";

const Footer = () => {
  return (
    <footer className="footer padding-xs full-width">
      <div className="flex-center">
        <ul className="nav-icons">
          <FooterLink
            link={"https://github.com/Aditi0505"}
            iconclassName={"fa-github"}
          />
          <FooterLink
            link={"https://twitter.com/aadyaaditi"}
            iconclassName={"fa-twitter"}
          />
          <FooterLink
            link={"https://www.linkedin.com/in/aditi-35bba3149/"}
            iconclassName={"fa-linkedin-in"}
          />
          <li className="primary-color text-sm">&copy; Aditi</li>
        </ul>
      </div>
    </footer>
  );
};
export { Footer };
