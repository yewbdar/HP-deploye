import Dashboard from "../views/Dashboard/Dashboard";
import UserProfile from "../views/UserProfile/UserProfile";
import TableList from "../views/TableList/TableList";
import Typography from "../views/Typography/Typography";
import Icons from "../views/Icons/Icons";
import Maps from "../views/Maps/Maps";
import Notifications from "../views/Notifications/Notifications";
import Upgrade from "../views/Upgrade/Upgrade";
import PositionPage from "../views/Recruiter/PositionPage";
import Register from "../views/Candidate/register";
import viewCandidateForRecruiter from "../views/Recruiter/viewCandidateforRecruter";
import viewCandidateForEmployee from "../views/Employee/viewCandidates";
import viewOpenPosition from "../views/Candidate/viewOpenPosition";
import Login from "./../views/Common/Login";
import Logout from "./../views/Common/Logout";
import ViewFeedBack from "../views/Candidate/viewFeedBack";

const dashboardRoutes = [
  {
    path: "/home",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard,
    displayFor : ["Logged In Users "]
  },
  {
    path: "/login",
    name: "Login",
    icon: "pe-7s-graph",
    component: Login,
    displayFor : ["Logged out Users "]
  },

  {
    path: "/position",
    name: "Position",
    icon: "pe-7s-user",
    component: PositionPage,
    displayFor : ["Recruiter"]
  },
  {
    path: "/viewOpenPosition",
    name: " Open Position",
    icon: "pe-7s-user",
    component: viewOpenPosition,
    displayFor : ["Candidate"]
  },
  {
    path: "/ViewFeedBack",
    name: "View FeedBack",
    icon: "pe-7s-note2",
    component: ViewFeedBack,
    displayFor : ["Candidate"]
  },
  {
    path: "/Register",
    name: "Register",
    icon: "pe-7s-user",
    component: Register,
    displayFor : ["Logged out Users "]
  },
  {
    path: "/viewCandidate",
    name: "Candidate ",
    icon: "pe-7s-user",
    component: viewCandidateForRecruiter,
    displayFor : ["Recruiter"]
  },
  {
    path: "/viewCandidateForFEmployee",
    name: "Candidates",
    icon: "pe-7s-user",
    component: viewCandidateForEmployee,
    displayFor : ["Employee"]
  },
  // {
  //   path: "/user",
  //   name: "User Profile",
  //   icon: "pe-7s-user",
  //   component: UserProfile,
  //   displayFor : ["Candidate","Recruiter","Employee"]
  // },
  // {
  //   path: "/table",
  //   name: "Table List",
  //   icon: "pe-7s-note2",
  //   component: TableList,
  //   displayFor : ["Candidate","Recruiter","Employee"]
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "pe-7s-news-paper",
  //   component: Typography,
  //   displayFor : ["Candidate","Recruiter","Employee"]
  // },
  { path: "/icons", name: "Icons", icon: "pe-7s-science", component: Icons ,
    displayFor : ["No Users"]
  },
  { path: "/maps", name: "Find Us", icon: "pe-7s-map-marker", component: Maps ,
    displayFor : ["Candidate","Recruiter","Employee"]},

  { redirect: true, path: "/", to: "/dashboard", name: "Dashboard" },
  {
    path: "/logout",
    name: "Sign-out",
    icon: "pe-7s-power",
    component: Logout,
    displayFor : ["Candidate","Recruiter","Employee"]
  }


];

export default dashboardRoutes;
