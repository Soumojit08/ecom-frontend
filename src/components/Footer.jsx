import Logo from "/logo.svg";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import { FaFacebook, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground  border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <Link to="/">
              <img src={Logo} alt="SNOPEX" className="w-20 mb-4" />
            </Link>
            <p className="text-sm text-justify">
              From processors and graphics cards to gaming chairs, monitors,
              operating systems, productivity software, networking devices, and
              accessories, SNOPEX is your one-stop destination for everything
              computing.
            </p>
            <h6 className="text-sm mt-4 font-bold font-sora">
              Developed By : Soumojit Banerjee
            </h6>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-base">
              <li>
                <Link
                  to="/loginDashboard"
                  className="hover:text-white transition-colors"
                >
                  Register as User
                </Link>
              </li>
              <li>
                <Link
                  to="/loginDashboard"
                  className="hover:text-white transition-colors"
                >
                  Become a Seller
                </Link>
              </li>
              <li>
                <Link
                  to="https://github.com/Soumojit08/ecom-frontend"
                  className="hover:text-white transition-colors"
                  target="_blank"
                >
                  Want to contribute?
                </Link>
              </li>
              <li>
                <Link
                  to="/buymeacoffee"
                  className="hover:text-white transition-colors"
                >
                  Buy me a Coffee
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Phone size={24} className=" mr-2" />
                <span>+91 7439932564</span>
              </li>
              <li className="flex items-center">
                <Mail size={24} className=" mr-2" />
                <span>soumojitbanerjee08@gmail.com</span>
              </li>
              <li className="flex items-center">
                <MapPin size={24} className="mr-2" />
                <span>Kolkata, West Bengal - 711112</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Follow Us</h4>
            <div className="flex space-x-4">
              <Link to="#">
                <FaFacebook size={24} />
              </Link>
              <Link to="#">
                <FaInstagram size={24} />
              </Link>
              <Link to="#">
                <FaGithub size={24} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
