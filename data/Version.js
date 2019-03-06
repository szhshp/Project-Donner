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
      version: 'V0.3',
      detail: [
        'Updated: Download score',
        'Fixed: Error when toggle autoSave from on to off',
      ],
    },
    {
      date: '2019-01-28',
      version: 'V0.31',
      detail: ['Fixed: Exclude duplicated downloaded scores'],
    },
    {
      date: '2019-01-30',
      version: 'V0.4',
      detail: [
        'Updated: Saved score screen',
        'Updated: Save event in modal',
        'Updated: Load downloaded score',
        'Updated: Display saved score in search screen and score screen',
      ],
    },
    {
      date: '2019-02-01',
      version: 'V0.41',
      detail: ['Updated: Styles'],
    },
    {
      date: '2019-02-06',
      version: 'V0.42',
      detail: [
        'Updated: History text styles',
        'Updated: Fetch for latest version',
      ],
    },
     {
      date: '2019-02-10',
      version: 'V0.43',
      detail: [
        'Updated: Handle auto download feature',
        'Updated: Project Demo Site',
      ],
    },
    {
      date: '2019-02-16',
      version: 'V0.44',
      detail: [
        'Fixed: Critical compatibility bug',
        'Updated: Application performance',
      ],
    },
    {
      date: '2019-02-17',
      version: 'V0.45',
      detail: [
        'Fixed: Prevent redownload sore if downloaded in score screen',
      ],
    },
    {
      date: '2019-02-17',
      version: 'V0.5',
      detail: [
        'Fixed: Prevent redownload sore if downloaded in score screen',
      ],
    },
    {
      date: '2019-03-03',
      version: 'V0.6',
      detail: [
        'Fixed: Scores list now shown after provided category and keyword',
      ],
    },
    {
      date: '2019-03-05',
      version: 'V0.61',
      detail: [
        'Updated: Delete score feature',
        'Fixed: UX Issues',
        'Fixed: Links to new version',
      ],
    },
  ],
};

/* version array are sorted by time, from start to end, always check final elem for latest version */

export default data_version;
