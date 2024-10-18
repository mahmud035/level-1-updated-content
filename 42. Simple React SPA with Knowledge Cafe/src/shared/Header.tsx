import ProfileAvatar from '../assets/images/profile.png';

export default function Header() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="text-3xl btn btn-ghost">Knowledge Cafe</a>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img alt="Profile avatar" src={ProfileAvatar} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
