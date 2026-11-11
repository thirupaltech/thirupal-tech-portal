import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ChevronDown, ExternalLink, Menu, UserRound, X } from "lucide-react";
import ThemeToggle from "../common/ThemeToggle";
import { getCommunityRoute } from "../../utils/communityRoutes";

type CommunityMember = {
  name: string;
  email: string;
};

function readCommunityMember(): CommunityMember | null {
  try {
    return JSON.parse(sessionStorage.getItem("thirupal-community-member") ?? "null") as CommunityMember | null;
  } catch {
    return null;
  }
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [appsOpen, setAppsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [member, setMember] = useState<CommunityMember | null>(null);
  const location = useLocation();
  const isCommunityApp = location.pathname.startsWith("/apps/my-community");
  const communityAppUrl = `${window.location.pathname}#/apps/my-community`;

  const mainLinks = [
    { label: "Home", path: "/" },
    { label: "About", path: "/about" },
    { label: "Blogs", path: "/blogs" },
    { label: "Community", path: "/community" },
    { label: "Mission", path: "/mission" },
    { label: "Initiatives", path: "/initiatives" },
    { label: "Tech Hub", path: "/techhub" },
    { label: "Future", path: "/future" },
    { label: "Contact", path: "/contact" },
  ];
  const communityLinks = [
    { label: "Dashboard", path: "/apps/my-community" },
    { label: "Community", path: getCommunityRoute(location.pathname, "/community") },
    { label: "Festivals", path: getCommunityRoute(location.pathname, "/community/festivals") },
    { label: "Agriculture", path: getCommunityRoute(location.pathname, "/community/agriculture") },
    { label: "Education", path: getCommunityRoute(location.pathname, "/community/education") },
    { label: "Sports", path: getCommunityRoute(location.pathname, "/community/sports") },
  ];
  const links = isCommunityApp ? communityLinks : mainLinks;

  const toggleProfile = () => {
    setMember(readCommunityMember());
    setProfileOpen((isOpen) => !isOpen);
  };

  const profileMenu = (
    <div className="absolute right-0 top-full z-50 mt-3 w-72 border border-slate-200 bg-white p-4 shadow-xl">
      {member ? (
        <>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#59806d]">Community account</p>
          <p className="mt-3 truncate font-semibold text-slate-900">{member.name}</p>
          <p className="mt-1 truncate text-sm text-slate-600">{member.email}</p>
          <div className="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-500">Signed in to My Community</div>
        </>
      ) : (
        <>
          <p className="font-semibold text-slate-900">No account signed in</p>
          <p className="mt-1 text-sm text-slate-600">Sign in or register to access your community profile.</p>
          <Link
            to="/apps/my-community"
            onClick={() => setProfileOpen(false)}
            className="mt-3 inline-flex text-sm font-semibold text-[#176347] hover:underline"
          >
            Go to account access
          </Link>
        </>
      )}
    </div>
  );

  return (
    <>
      <header
        className="
          glass-navbar
          fixed
          top-0
          left-0
          right-0
          z-50
        "
      >
        <div
          className="
            max-w-7xl
            mx-auto
            px-6
            h-20
            flex
            items-center
            justify-between
          "
        >
          <Link to={isCommunityApp ? "/apps/my-community" : "/"}>
            <div>
              <h1
                className="
                  text-2xl
                  font-black
                  text-primary
                "
              >
                ThirupalTech
              </h1>

              <p
                className="
                  text-xs
                  text-gray-500
                "
              >
                {isCommunityApp ? "My Community" : "Technology for Communities"}
              </p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {links.map((link) => (
              <NavLink
                key={link.label}
                to={link.path}
                className={({ isActive }) => `nav-link font-medium ${isActive ? 'active' : ''}`}
              >
                {link.label}
              </NavLink>
            ))}

            {!isCommunityApp && (
              <div className="relative">
                <button
                  type="button"
                  aria-expanded={appsOpen}
                  aria-haspopup="true"
                  onClick={() => setAppsOpen((isOpen) => !isOpen)}
                  className="nav-link inline-flex items-center gap-1 font-medium"
                >
                  Apps
                  <ChevronDown size={16} aria-hidden="true" />
                </button>
                {appsOpen && (
                  <div className="absolute right-0 top-full mt-3 w-56 border border-slate-200 bg-white py-2 shadow-xl">
                    <a
                      href={communityAppUrl}
                      target="_blank"
                      rel="noreferrer"
                      onClick={() => setAppsOpen(false)}
                      className="flex items-center justify-between px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-amber-50 hover:text-amber-800"
                    >
                      My Community
                      <ExternalLink size={15} aria-hidden="true" />
                    </a>
                  </div>
                )}
              </div>
            )}

            {/* Breadcrumb for Community > Festivals */}
            {
              (location.pathname === '/community/festivals' || location.pathname.endsWith('/community/festivals')) && (
                <div className="text-sm text-slate-600 flex items-center gap-2">
                  <Link to={getCommunityRoute(location.pathname, "/community")} className="text-amber-700 hover:underline">Community</Link>
                  <span>/</span>
                  <span>Festivals</span>
                </div>
              )
            }

            <ThemeToggle />
            {isCommunityApp && (
              <div className="relative">
                <button
                  type="button"
                  aria-label="Show account information"
                  aria-expanded={profileOpen}
                  aria-haspopup="true"
                  onClick={toggleProfile}
                  className="grid h-10 w-10 place-items-center rounded-full border border-[#cad7cc] bg-white text-[#35564a] transition hover:bg-[#edf7ef]"
                >
                  <UserRound size={19} aria-hidden="true" />
                </button>
                {profileOpen && profileMenu}
              </div>
            )}
          </nav>

          <div className="flex items-center gap-3 md:hidden">
            {isCommunityApp && (
              <div className="relative">
                <button
                  type="button"
                  aria-label="Show account information"
                  aria-expanded={profileOpen}
                  aria-haspopup="true"
                  onClick={toggleProfile}
                  className="grid h-10 w-10 place-items-center rounded-full border border-[#cad7cc] bg-white text-[#35564a] transition hover:bg-[#edf7ef]"
                >
                  <UserRound size={19} aria-hidden="true" />
                </button>
                {profileOpen && profileMenu}
              </div>
            )}
            <button
              className="md:hidden"
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div
          className="
            fixed
            top-20
            left-0
            right-0
            bg-white
            shadow-xl
            z-40
            md:hidden
          "
        >
          <div className="flex flex-col p-6 gap-6">
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {!isCommunityApp && (
              <a
                href={communityAppUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 font-medium text-amber-800"
              >
                Apps <span className="text-slate-400">/</span> My Community
                <ExternalLink size={15} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
}