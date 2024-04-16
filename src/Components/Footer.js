import { Link } from "react-router-dom";

import { socialLinks } from "../constants";
import { contact } from "../assets/icons";

const Footer = () => {
  return (
    <footer className="mx-auto sm:px-16 pb-6 px-8 flex flex-col gap-7 font-poppins text-[#70d8bd] bg-black">
      <hr className="border-slate-200" />

      <div className="footer-container ">
        <p>
          © {new Date().getFullYear()} <strong>Sameer Karn</strong>. All rights
          reserved.
        </p>

        <div className="flex gap-3 justify-center items-center bg-white p-2 rounded-md">
          <Link to={'/contact'} >
            <img
              src={contact}
              alt={'Contact'}
              className="w-6 h-6 object-contain"
            />
          </Link>
          {socialLinks.map((link) => (
            <Link key={link.name} to={link.link} target="_blank">
              <img
                src={link.iconUrl}
                alt={link.name}
                className="w-6 h-6 object-contain"
              />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
