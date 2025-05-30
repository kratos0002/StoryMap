import { Story } from './stories';
import tellTaleHeartText from './tellTaleHeartText';
import giftOfTheMagiText from './giftOfTheMagiText';

// Function to update stories with embedded full text
export const updateStoriesWithEmbeddedText = (stories: Story[]): Story[] => {
  return stories.map(story => {
    // For The Tell-Tale Heart, use the embedded text
    if (story.id === 'tell-tale-heart') {
      return {
        ...story,
        fullText: tellTaleHeartText
      };
    }
    
    // For The Gift of the Magi, use the embedded text
    if (story.id === 'gift-of-the-magi') {
      return {
        ...story,
        fullText: giftOfTheMagiText
      };
    }
    
    // Return other stories unchanged for now
    // Additional embedded texts will be added in subsequent updates
    return story;
  });
};
