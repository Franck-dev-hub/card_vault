import axios from 'axios';

const API_BASE_URL = '/api';

/**
 * Adds one copy of a card variant to the user's collection.
 *
 * @param {string} cardId   - e.g. "pokemon-me02.5-022"
 * @param {string} variant  - e.g. "normal", "holo", "firstEdition"
 * @param {number} quantity - number of copies to add (default 1)
 * @returns {Promise<{ message: string, id: string }>}
 */
export const addToCollection = async (cardId, variant, quantity = 1) => {
  const userId = localStorage.getItem('user_id');

  const response = await axios.post(
    `${API_BASE_URL}/vault`,
    {
      user_id: userId,
      card_id: cardId,
      quantity: String(quantity),
      variant,
    },
    { withCredentials: true },
  );

  return response.data;
};
 