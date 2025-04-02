import Fuse from 'fuse.js';

export const searchCommands = (commands, searchText) => {
  const fuse = new Fuse(commands, {
    includeScore: true,
    keys: ['command', 'description', 'category', 'tags'],
    threshold: 0.3,
  });

  if (searchText) {
    return fuse.search(searchText).map((resultItem) => resultItem.item);
  } else {
    return [];
  }
};

export default searchCommands;