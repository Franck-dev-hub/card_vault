import axios from 'axios';

const API_BASE_URL = '/api';

/**
 * Adds or removes copies of a card variant in the user's collection.
 *
 * @param {string} cardId   - e.g. "pokemon-me02.5-022"
 * @param {string} variant  - e.g. "normal", "holo", "firstEdition"
 * @param {number} quantity - positive to add, negative to remove (default 1)
 * @returns {Promise<{ message: string, id: string }>}
 */
export const addToCollection = async (cardId, variant, quantity = 1) => {
  const userId = localStorage.getItem('user_id');

  const response = await axios.post(
    `${API_BASE_URL}/vault`,
    {
      user_id: userId,
      card_id: cardId,
      quantity,
      variant,
    },
    { withCredentials: true },
  );

  return response.data;
};
 