const items = [
  {
    id: 1,
    baseUrl: 'businesses',
    title: 'Lists',
    options: [{
      id: 1,
      title: 'Businesses',
      link: '/businesses/list',
    },
    {
      id: 3,
      title: 'Waiting Verification',
      link: '/businesses/waiting-verification',
    },
    {
      id: 4,
      title: 'Delete Businesses',
      link: '/businesses/delete-list',
    },
    {
      id: 5,
      title: 'Request Delete Review',
      link: '/businesses/deleted-review',
    },
    {
      id: 6,
      title: 'Reported Review',
      link: '/businesses/reported-review',
    },
    {
      id: 7,
      title: 'Deleted Users',
      link: '/businesses/deleted-users',
    },
    {
      id: 8,
      title: 'Categories',
      link: '/businesses/category',
    },
    {
      id: 9,
      title: 'Registered Users',
      link: '/businesses/registered-users',
    }],
  },
  {
    id: 2,
    title: 'Statistics',
    baseUrl: 'statistics',
    options: [
      {
        id: 1,
        title: 'Registered Users',
        link: '/statistics/registered-users',
      },
      {
        id: 2,
        title: 'Uncompleted Registration',
        link: '/statistics/uncompleted-registration',
      },
      {
        id: 3,
        title: 'Unregistered Visitors',
        link: '/statistics/unregistered-visitors',
      },
    ],
  },
  // {
  //   id: 3,
  //   title: 'Dashboard',
  //   link: '/dashboard',
  // },
];
export default items;
