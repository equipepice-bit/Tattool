import { ref, get, set, remove } from 'firebase/database';
import { db } from '../../firebase';

export const FavoriteService = {
  async getFavorites(userId) {
    const snapshot = await get(ref(db, `users/${userId}`));

    if (!snapshot.exists()) return [];

    return Object.values(snapshot.val());
  },

  async addFavorite(userId, item) {
    const favRef = ref(db, `users/${userId}/favorites/${item.id}`);
    await set(favRef, item);
  },

  async removeFavorite(userId, itemId) {
    const favRef = ref(db, `users/${userId}/favorites/${itemId}`);
    await remove(favRef);
  }
};
