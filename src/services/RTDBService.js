import { ref, get, update } from 'firebase/database';
import { db } from '../../firebase';

export const RTDBService = {
  async addToFavorites(userId, artistId) {
    try {
      const userRef = ref(db, `users/${userId}`);
      const snapshot = await get(userRef);

      if (!snapshot.exists()) return;

      const userData = snapshot.val();
      const favoritos = userData.favoritos || [];

      if (!favoritos.includes(artistId)) {
        await update(userRef, {
          favoritos: [...favoritos, artistId]
        });
      }
    } catch (error) {
      console.error('Erro ao adicionar favorito:', error);
      throw error;
    }
  },

  async removeFromFavorites(userId, artistId) {
    try {
      const userRef = ref(db, `users/${userId}`);
      const snapshot = await get(userRef);

      if (!snapshot.exists()) return;

      const favoritos = snapshot.val().favoritos || [];

      await update(userRef, {
        favoritos: favoritos.filter(id => id !== artistId)
      });
    } catch (error) {
      console.error('Erro ao remover favorito:', error);
      throw error;
    }
  },

  async getUserFavorites(userId) {
    try {
      const userSnap = await get(ref(db, `users/${userId}`));
      if (!userSnap.exists()) return [];

      const favoriteIds = userSnap.val().favoritos || [];
      console.log('IDs dos favoritos:', favoriteIds);

      const favorites = await Promise.all(
        favoriteIds.map(async (artistId) => {
          const artistSnap = await get(ref(db, `users/${artistId}`));
          if (!artistSnap.exists()) return null;

          const artistData = artistSnap.val();
          
          return {
            uid: artistId,
            id: artistId,
            ...artistData
          };
        })
      );

      return favorites.filter(Boolean);
    } catch (error) {
      console.error('Erro ao buscar favoritos:', error);
      return [];
    }
  }
};