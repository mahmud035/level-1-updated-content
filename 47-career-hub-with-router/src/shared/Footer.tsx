import SocialMediaIcon from '../assets/icons/social.png';

export default function Footer() {
  return (
    <footer className="py-16 text-white bg-[#1A1919] font-light text-balance">
      <div className="px-4 mx-auto footer max-w-7xl">
        <aside className="flex flex-col gap-4 pb-3 ">
          <p className="text-3xl">CareerHub</p>
          <p>
            There are many variations of passages of <br /> Lorem Ipsum but the
            majority have <br /> suffered alteration in some form.
          </p>
          <img src={SocialMediaIcon} alt="" className="w-24" />
        </aside>
        <nav>
          <h6 className="text-xl">Company</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="text-xl">Product</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="text-xl">Support</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
        <nav>
          <h6 className="text-xl">Contact</h6>
          <a className="link link-hover">Terms of use</a>
          <a className="link link-hover">Privacy policy</a>
          <a className="link link-hover">Cookie policy</a>
        </nav>
      </div>

      <hr className="mx-auto my-10 border border-[#2b273a] max-w-7xl" />

      <div className="flex justify-between mx-auto max-w-7xl">
        <p>&copy; CareerHub. All Rights Reversed.</p>
        <p>Powered by CareerHub</p>
      </div>
    </footer>
  );
}
