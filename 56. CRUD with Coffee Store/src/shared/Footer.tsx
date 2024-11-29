import { FaInstagram, FaLinkedin, FaPhoneAlt, FaTwitter } from 'react-icons/fa';
import { MdFacebook, MdLocationOn, MdOutlineEmail } from 'react-icons/md';
import bgFooterTwo from '../assets/images/bg-footer-2.jpg';
import bgFooter from '../assets/images/bg-footer.jpg';
import logo from '../assets/images/logo.png';

export default function Footer() {
  return (
    <footer
      style={{
        backgroundImage: `url(${bgFooter})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="pb-12 pt-28">
        <div className="container grid items-center gap-6 lg:gap-40 2xl:gap-60 lg:grid-cols-2">
          <div className="space-y-5">
            <img src={logo} alt="" className="w-16" />
            <h3 className="text-4xl">Espresso Emporium</h3>
            <p className="lg:max-w-2xl">
              Always ready to be your friend. Come & Contact with us to share
              your memorable moments, to share with your best companion.
            </p>
            <div className="flex gap-4">
              <MdFacebook size={32} />
              <FaTwitter size={32} />
              <FaInstagram size={32} />
              <FaLinkedin size={32} />
            </div>
            <h3 className="text-4xl">Get in Touch</h3>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-5">
                <FaPhoneAlt size={16} />
                <span>+88 01533 333 333</span>
              </div>
              <div className="flex items-center gap-5">
                <MdOutlineEmail size={16} />
                <span>info@gmail.com</span>
              </div>
              <div className="flex items-center gap-5">
                <MdLocationOn size={16} />
                <span>72, Wall street, King Road, Dhaka</span>
              </div>
            </div>
          </div>
          <div className="lg:pt-20">
            <h3 className="pb-8 text-4xl">Connect with Us</h3>
            <form className="space-y-3">
              <input
                type="text"
                placeholder="Name"
                className="rounded w-full py-2.5 outline-none border-none focus:outline pl-3"
              />
              <input
                type="text"
                placeholder="Email"
                className="rounded w-full py-2.5 outline-none border-none focus:outline pl-3"
              />
              <textarea
                placeholder="Message"
                className="w-full py-4 pl-3 border-none rounded outline-none resize-none focus:outline"
              ></textarea>
              <button className="flex items-center gap-2 px-4 py-2 transition duration-150 ease-out bg-transparent border rounded-full hover:bg-[#E3B577] hover:ease-in">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>

      <div
        className="flex items-center justify-center h-12 text-xs text-white"
        style={{
          backgroundImage: `url(${bgFooterTwo})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        &copy; Espresso Emporium! All Rights Reserved 2024
      </div>
    </footer>
  );
}
