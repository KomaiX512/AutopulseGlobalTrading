import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Charts = React.lazy(() => import('./views/charts/Charts'));
const Widgets = React.lazy(() => import('./views/widgets/Widgets'));
const Transaction = React.lazy(() => import('./views/transactions/TransactionApp'));
const Orders = React.lazy(() => import('./views/orders/OrdersApp'));
const ProfileUpdate = React.lazy(() => import('../../Pages/Profile/Edit'));
const Quries = React.lazy(() => import('../admin/views/quries/index'));
const HomeSettings = React.lazy(() => import('../admin/views/pages/homepage/HomeSettingApp'));
const AboutUSApp = React.lazy(() => import('../admin/views/pages/about_us/AboutUsApp'));
const ContactUSApp = React.lazy(() => import('../admin/views/pages/contact/ContactIndex'));
const UserReviews = React.lazy(() => import('../admin/views/pages/user_reviews/UserReviewIndex'));
const FAQs = React.lazy(() => import('../admin/views/pages/faq/FAQIndex'));
const Blogs = React.lazy(() => import('../admin/views/pages/blogs/Blogs'));
const AttachmentForm = React.lazy(() => import('../admin/views/attachments/AttachmentForm'));
const Solutions = React.lazy(() => import('../admin/views/solutions/Solutions'));
const SolutionForm = React.lazy(() => import('../admin/views/solutions/SolutionForm'));

const routes = [

  { path: '/', exact: true, name: 'Home' },
  { path: '/home', name: 'Dashboard', element: Dashboard },
  { path: '/widgets', name: 'Widgets', element: Widgets },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/transactions', name: 'Transaction', element: Transaction },
  { path: '/customers/orders', name: 'Orders', element: Orders },
  { path: '/profile/settings', name: 'Profile', element: ProfileUpdate },
  { path: '/user/quries', name: 'Quries', element: Quries },
  { path: '/home/index/setting', name: 'Home Settings', element: HomeSettings },
  { path: '/home/about/setting', name: 'About Settings', element: AboutUSApp },
  { path: '/home/contact/setting', name: 'Contact Settings', element: ContactUSApp },
  { path: '/home/user/reviews', name: 'User Reviews', element: UserReviews },
  { path: '/home/faqs', name: 'FAQs', element: FAQs },
  { path: '/home/blogs', name: 'Blogs', element: Blogs },
  { path: '/attachments/add', name: 'Add Attachment', element: AttachmentForm },
  { path: '/solutions/products/:id', name: 'Manage Solution Products', element: React.lazy(() => import('../admin/views/solutions/SolutionProductsManager')) },

];

export default routes
