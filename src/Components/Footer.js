import { Link } from "react-router-dom";

import { socialLinks } from "../constants";
import { contact, cvIcon } from "../assets/icons";
import { CVPDF } from "../assets/CV";
import Tooltip from "../Shared/Tooltip";

const Footer = () => {

  const handleDownloadCV = () => {
    try {
      // Create a temporary anchor element
      const anchor = document.createElement("a");
      anchor.href = CVPDF;
      anchor.download = "KARN_SAMEER_CV.pdf"; // Specify the filename for download
      document.body.appendChild(anchor);
      anchor.click(); // Simulate a click on the anchor element to start download
      document.body.removeChild(anchor); // Remove the anchor from the body
    } catch (error) {

    }
  };

  return (
    <footer className="mx-auto sm:px-16 pb-6 px-8 flex flex-col gap-7 font-poppins text-[#70d8bd] bg-black">
      <hr className="border-slate-200" />

      <div className="footer-container ">
        <p>
          © {new Date().getFullYear()} <strong>Sameer Karn</strong>. All rights
          reserved.
        </p>

        <div className="flex gap-3 justify-center items-center bg-white p-2 rounded-md">
          <Tooltip text={'Contact'}>
            <Link to={'/contact'} >
              <img
                src={contact}
                alt={'Contact'}
                className="w-6 h-6 object-contain"
              />
            </Link>
          </Tooltip>
          {socialLinks.map((link) => (
            <Link key={link.name} to={link.link} target="_blank">
              <img
                src={link.iconUrl}
                alt={link.name}
                className="w-6 h-6 object-contain"
              />
            </Link>
          ))}
          <Tooltip text={'Download.CV'}>
            <button onClick={handleDownloadCV} className="cursor-pointer">
              <img src={cvIcon}
                alt="CV"
                className="w-6 h-6 object-contain"

              />
            </button>
          </Tooltip>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
