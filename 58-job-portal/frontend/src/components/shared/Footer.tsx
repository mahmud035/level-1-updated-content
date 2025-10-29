import { Link } from 'react-router';
import logo from '../../assets/icons/job-logo.png';

export default function Footer() {
  return (
    <footer className="w-full text-slate-500">
      {/*      <!-- Main footer --> */}
      <div className="pt-16 pb-12 text-sm border-t border-slate-200 bg-slate-100">
        <div className="container px-6 mx-auto">
          <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
            <div
              className="col-span-4 md:col-span-8 lg:col-span-4"
              aria-labelledby="footer-header"
            >
              <Link to="/" className="flex items-center gap-2">
                <img src={logo} alt="" className="h-12" />
                <span className="text-xl font-medium">Job Portal</span>
              </Link>
              <p>
                Expertly made, responsive, accessible components in React and
                HTML ready to be used on your website or app. Just copy and
                paste them on your Tailwind CSS project.
              </p>
            </div>
            <nav
              className="col-span-2 md:col-span-4 lg:col-span-2"
              aria-labelledby="footer-product-5-logo"
            >
              <h3
                className="mb-6 text-base font-medium text-slate-700"
                id="footer-product-5-logo"
              >
                Product
              </h3>
              <ul>
                <li className="mb-2 leading-6">
                  <a
                    href="#"
                    className="transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600"
                  >
                    Features
                  </a>
                </li>
                <li className="mb-2 leading-6">
                  <a
                    href="#"
                    className="transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600"
                  >
                    Customers
                  </a>
                </li>
                <li className="mb-2 leading-6">
                  <a
                    href="#"
                    className="transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600"
                  >
                    Why us?
                  </a>
                </li>
                <li className="mb-2 leading-6">
                  <a
                    href="#"
                    className="transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600"
                  >
                    Pricing
                  </a>
                </li>
              </ul>
            </nav>
            <nav
              className="col-span-2 md:col-span-4 lg:col-span-2"
              aria-labelledby="footer-docs-5-logo"
            >
              <h3
                className="mb-6 text-base font-medium text-slate-700"
                id="footer-docs-5-logo"
              >
                Docs & Help
              </h3>
              <ul>
                <li className="mb-2 leading-6">
                  <a
                    href="#"
                    className="transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600"
                  >
                    Documentation
                  </a>
                </li>
                <li className="mb-2 leading-6">
                  <a
                    href="#"
                    className="transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600"
                  >
                    Training
                  </a>
                </li>
                <li className="mb-2 leading-6">
                  <a
                    href="#"
                    className="transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600"
                  >
                    System status
                  </a>
                </li>
                <li className="mb-2 leading-6">
                  <a
                    href="#"
                    className="transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600"
                  >
                    FAQ's
                  </a>
                </li>
                <li className="mb-2 leading-6">
                  <a
                    href="#"
                    className="transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600"
                  >
                    Help Center
                  </a>
                </li>
              </ul>
            </nav>
            <nav
              className="col-span-2 md:col-span-4 lg:col-span-2"
              aria-labelledby="footer-about-5-logo"
            >
              <h3
                className="mb-6 text-base font-medium text-slate-700"
                id="footer-about-5-logo"
              >
                About us
              </h3>
              <ul>
                <li className="mb-2 leading-6">
                  <a
                    href="#"
                    className="transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600"
                  >
                    About us
                  </a>
                </li>
                <li className="mb-2 leading-6">
                  <a
                    href="#"
                    className="transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600"
                  >
                    Careers
                  </a>
                </li>
                <li className="mb-2 leading-6">
                  <a
                    href="#"
                    className="transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600"
                  >
                    Leadership
                  </a>
                </li>
                <li className="mb-2 leading-6">
                  <a
                    href="#"
                    className="transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600"
                  >
                    Blog
                  </a>
                </li>
                <li className="mb-2 leading-6">
                  <a
                    href="#"
                    className="transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600"
                  >
                    Events
                  </a>
                </li>
              </ul>
            </nav>
            <nav
              className="col-span-2 md:col-span-4 lg:col-span-2"
              aria-labelledby="footer-get-in-touch-5-logo"
            >
              <h3
                className="mb-6 text-base font-medium text-slate-700"
                id="footer-get-in-touch-5-logo"
              >
                Get in touch
              </h3>
              <ul>
                <li className="mb-2 leading-6">
                  <a
                    href="#"
                    className="transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600"
                  >
                    Contact
                  </a>
                </li>
                <li className="mb-2 leading-6">
                  <a
                    href="#"
                    className="transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600"
                  >
                    Support
                  </a>
                </li>
                <li className="mb-2 leading-6">
                  <a
                    href="#"
                    className="transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600"
                  >
                    Partners
                  </a>
                </li>
                <li className="mb-2 leading-6">
                  <a
                    href="#"
                    className="transition-colors duration-300 hover:text-emerald-500 focus:text-emerald-600"
                  >
                    Join research
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
