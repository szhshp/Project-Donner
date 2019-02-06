## Project Donner - Document
 
>ドン,カツ,ド,ド,カツ,ド,ドドカ,ド,カ,ド,ドドカ,カツ
 
## Main Features
 
1. Score Search
2. Score View
3. Score Download

## TODO

### Dev

- [ ] Log saved score file lists to console

### Feature

- [x] Fetch for latest version
- [ ] Handle auto download feature
- [x] Load downloaded score
- [x] Load saved score in search screen
- [x] Display the saved score in search screen and score screen
- [x] Save event in modal
- [x] Split searchscreen into 2 views (search score & saved score)
- [x] Exclude duplicated downloaded scores
- [x] Move 'savedScore' validation inside function `read_setting` 
- [x] Score download
- [x] Version history
- [x] Setting screen
- [x] Setting config file read/write
- [x] Navigation style
- [x] Score modal back event

### UI
- [x] Update history text styles


## Technology Stacks
 
- React Native
- Expo
- React Native Shoutem UI
 
## Actions
 
(TODO)
 
## IO
 
### Settings
 
- Stores settings of this application into single json file
- Path: `${FileSystem.documentDirectory}setting.json`
 
Format:
 
```json
{
    autoSave: true,
    [Other Setting Key-Values]
}
```
 
### Saved Scores
 
- Stores the downloaded score picture in local storage
- Path: `${FileSystem.documentDirectory}savedScore/`
  - Example: `${FileSystem.documentDirectory}savedScore/C6F1B0D7C5D9C9BD2FA4AAA4CB2FA4B5A4A4A4BFA4DE32303030_6F2E706E67`
  - **Although no extension name, this is directly a picture file**
  - File path contains 3 parts:
    1. Fixed path: `${FileSystem.documentDirectory}savedScore/`
    2. File name: `C6F1B0D7C5D9C9BD2FA4AAA4CB2FA4B5A4A4A4BFA4DE32303030_6F2E706E67`
       - File name is taken from the final part of picture path: 
       ```
        https://www.wikihouse.com/taiko/attach/C6F1B0D7C5D9C9BD2FA4AAA4CB2FA4B5A4A4A4BFA4DE32303030_6F2E706E67
       ```
- For enumeration of saved score, simply enumerate the files in `${FileSystem.documentDirectory}savedScore/`

## Dynamic Data
 
### States
  
```json
{
  settings: {   /* application level settings */
    autoSave: [true|false], /* autoSave when score loaded? */
    savedScore: {
      arrScore: [
        /*
        {
          relativePath: [String]
          scoreObj: {scoreObj}
          levelObj: {levelObj}
        }  
        */
      ], /* saved score file name array */
    },
  },
  search: {
    searchBar: { 
      toggleSearchBar: [true|false], /* search bar input open? */
      keyword: [''|String],
      // previousKeyword: [Array<String>], /* previous searched keyword, TBD */
    },
    selectedCategory: [undefined|categoryObj], /* selected an category? */
  },
  view: {
    scoreView: {
      selectedScore: [undefined|scoreObj], /* selected an score? */
      status: [String], /* screen status, may represents the loading status */
      selectedWikiLink: [undefined|String], /* direct wiki page of selected score and difficulty */
      selectedScoreLink: [undefined|String], /* direct wiki of selected score picture */
      selectedLevel: [undefined|levelObj], /* selected an level? */
      message: [''|String],
      modalVisible: [true|false],
    }
  },
  home: {
    releases: [], /* releases array from github */
  },
}
```
 
## Static Data
 
### Version Data
 
- Stores application version data
- Path: `data/Version.js`
- Check the final element as latest version

Format:
 
```js
const data_Version = {
  updateDate: '2019-01-06',
  updateHistory: [
    {
      version: 'V0.1',
      detail: 'Init: Framework',
    },
    {
      version: 'V0.2',
      detail: 'Updated: Async call for score details',
    },
  ]
}
```
 
### Levels Data
 
- Stores game levels data
- Path: `data/Levels.js`
 
Format:
 
```js
const levels = [
  {
    levelID: 0,
    title: 'かんたん',
    transTitle: '梅',
  },
  {
    levelID: 1,
    title: 'ふつう',
    transTitle: '竹',
  },
  {
    levelID: 2,
    title: 'むずかしい',
    transTitle: '松',
  },
  {
    levelID: 3,
    title: 'おに',
    transTitle: '鬼',
  },
],
```
 
### Scores Data
 
- Stores game scores data
- Path: `data/Scores.js`
 
> Big data file, use `data/Scores.Dev.js` for dev
 
Format:
 
```js
const scores = [
  {
    categoryID: 0,
    scores: [] // array of scores
  },
  {
    categoryID: 0,
    scores: []
  }
]
```
 
#### Score Object
 
- Description of a single score
 
Format:
 
```js
{
  id: 0,
  title: '愛唄',
  subTitle: '',
  BPM: '85',
  levels: [2, null, 2, 3], // if not available for any difficulty level, put null here
},
```
 