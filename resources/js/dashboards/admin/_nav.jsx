import React from 'react';

import {
  // GrUserSettings,
  GrDeliver,
  GrCart,
  GrList,
  GrCreditCard,
  GrMultiple,
  // GrAppsRounded,
  GrHome,
  GrContact,
  GrContactInfo,
  GrCircleInformation,
  GrBarChart,
  GrProjects,
  // GrChatOption,
  GrUserExpert,
  GrCircleQuestion,
  GrBlog,
  GrServices,
  GrCar,
  GrAttachment
} from "react-icons/gr";

import { CNavGroup, CNavItem, CNavTitle, } from '@coreui/react';

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    icon: <GrBarChart size={20} color='white' />,
    to: '/home',
    role: ['instructor', 'owner'],
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: '',
  },
  {
    component: CNavItem,
    name: 'Categories',
    to: '/categories/list',
    icon: <GrList size={20} color='white' />,
  },
  {
    component: CNavItem,
    name: 'Brands',
    to: '/brands/list',
    icon: <GrProjects size={20} color='white' />,
  },
  // {
  //   component: CNavItem,
  //   name: 'Products',
  //   to: '/products/list',
  //   icon: <GrDeliver size={20} color='white' />,
  // },
  {
    component: CNavItem,
    name: 'Transactions',
    to: '/transactions',
    icon: <GrCreditCard size={20} color='white' />,
  },
  {
    component: CNavItem,
    name: 'Orders',
    to: '/customers/orders',
    icon: <GrCart size={20} color='white' />,
  },

  {
    component: CNavGroup,
    name: 'Products ',
    to: '/home',
    icon: <GrMultiple size={20} color='white' />,
    items: [

      {
        component: CNavItem,
        name: 'B2B',
        to: '/machinery-vehicles/list',
        icon: <GrCar size={20} color='white' />,
      },  
      {
        component: CNavItem,
        name: 'Machine Parts',
        to: '/spare-parts/list',
        icon: <GrServices size={20} color='white' />,
      },

    ],
  },

  {
    component: CNavGroup,
    name: 'Attachments & Accessories',
    to: '/home',
    icon: <GrAttachment size={20} color='white' />,
    items: [
      {
        component: CNavItem,
        name: 'All Attachments',
        to: '/attachments/list',
        icon: <GrList size={20} color='white' />,
      },
      {
        component: CNavItem,
        name: 'Add Attachment',
        to: '/attachments/add',
        icon: <GrDeliver size={20} color='white' />,
      },
    ],
  },

  {
    component: CNavGroup,
    name: 'Pages ',
    to: '/home',
    icon: <GrMultiple size={20} color='white' />,
    items: [

      {
        component: CNavItem,
        name: 'Home Page',
        to: '/home/index/setting',
        icon: <GrHome size={20} color='white' />,
      },
      {
        component: CNavItem,
        name: 'About Us',
        to: '/home/about/setting',
        icon: <GrCircleInformation size={20} color='white' />,
      },

      {
        component: CNavItem,
        name: 'Contact Us',
        to: '/home/contact/setting',
        icon: <GrContact size={20} color='white' />,
      },
      {
        component: CNavItem,
        name: 'User Reviews',
        to: '/home/user/reviews',
        icon: <GrUserExpert size={20} color='white' />,
      },
      {
        component: CNavItem,
        name: 'Blogs',
        to: '/home/blogs',
        icon: <GrBlog size={20} color='white' />,
      },

    ],
  },
  {
    component: CNavItem,
    name: 'Quries',
    to: '/user/quries',
    icon: <GrContactInfo size={20} color='white' />,
  },

  {
    component: CNavItem,
    name: 'FAQs',
    to: '/home/faqs',
    icon: <GrCircleQuestion size={20} color='white' />,
  },
  {
    component: CNavItem,
    name: 'Solutions',
    to: '/solutions/list',
    icon: <GrProjects size={20} color='white' />,
  },

]

export default _nav
