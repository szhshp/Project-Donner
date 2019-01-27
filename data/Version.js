const data_version = {
  scoreData: {
    updateDate: '2019-01-09',
  },
  updateHistory: [
    {
      date: '2019-01-04',
      version: 'V0.1',
      detail: ['Init: Framework'],
    },
    {
      date: '2019-01-20',
      version: 'V0.2',
      detail: [
        'Updated: Async call for score details',
        'Updated: Home screen',
        'Updated: Search screen',
        'Updated: Score screen',
      ],
    },
    {
      date: '2019-01-24',
      version: 'V0.21',
      detail: [
        'Updated: Score modal',
        'Updated: Score modal back event',
        'Updated: Navigation Style',
      ],
    },
    {
      date: '2019-01-25',
      version: 'V0.22',
      detail: ['Updated: Setting screen', 'Updated: Global styles'],
    },
    {
      date: '2019-01-26',
      version: 'V0.23',
      detail: ['Updated: Setting config file read/write'],
    },
    {
      date: '2019-01-27',
      version: 'V0.24',
      detail: ['Updated: Download score'],
    },
  ],
};

/* version array are sorted by time, from start to end, always check final elem for latest version */

export default data_version;
