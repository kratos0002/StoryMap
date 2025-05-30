import { Story } from './stories';
import { updateStoriesWithEmbeddedText } from './embeddedTexts';

// Update the stories array to use embedded texts
export const getUpdatedStories = (originalStories: Story[]): Story[] => {
  return updateStoriesWithEmbeddedText(originalStories);
};
