import { ref, push, set, update } from 'firebase/database';
import { db } from '../../firebase';
import { Flash } from '../models/Flash';
import { Post } from '../models/Post';

// Upload para Cloudinary (simplificado)
const uploadToCloudinary = async (imageUri, folder) => {
  try {
    console.log('📤 Upload para Cloudinary...');
    
    const formData = new FormData();
    formData.append('file', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });
    formData.append('upload_preset', 'tattol_upload');
    formData.append('cloud_name', 'dr9ha5uhc'); // Substitua
    
    const response = await fetch(
      'https://api.cloudinary.com/v1_1/dr9ha5uhc/image/upload', // Substitua
      {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    
    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error.message);
    }
    
    console.log('✅ Upload concluído:', data.secure_url);
    return data.secure_url;
    
  } catch (error) {
    console.error('❌ Erro no upload:', error);
    throw error;
  }
};

// Adicionar Flash
export const addFlash = async (flashData, userId) => {
  try {
    console.log('➕ Adicionando Flash...');
    
    // Upload da foto
    let fotoUrl = flashData.foto;
    if (flashData.foto && !flashData.foto.startsWith('http')) {
      fotoUrl = await uploadToCloudinary(flashData.foto, 'flashes');
    }
    
    // Criar ID único
    const flashId = push(ref(db, 'flashes')).key;
    
    // Criar objeto Flash
    const flash = new Flash(
      flashId,
      fotoUrl,
      flashData.tags,
      flashData.tamanho,
      flashData.valor,
      userId
    );
    
    // Salvar no Firebase
    const flashRef = ref(db, `flashes/${userId}/${flashId}`);
    await set(flashRef, flash.toFirebase());
    
    // Atualizar lista de flashes do usuário
    const userFlashRef = ref(db, `users/${userId}/flashes/${flashId}`);
    await set(userFlashRef, true);
    
    console.log('✅ Flash salvo com sucesso!');
    return flashId;
    
  } catch (error) {
    console.error('❌ Erro ao salvar Flash:', error);
    throw error;
  }
};

// Adicionar Post
export const addPost = async (postData, userId) => {
  try {
    console.log('➕ Adicionando Post...');
    
    // Upload da foto
    let fotoUrl = postData.foto;
    if (postData.foto && !postData.foto.startsWith('http')) {
      fotoUrl = await uploadToCloudinary(postData.foto, 'posts');
    }
    
    // Criar ID único
    const postId = push(ref(db, 'posts')).key;
    
    // Criar objeto Post
    const post = new Post(
      postId,
      fotoUrl,
      postData.descricao,
      postData.tags,
      userId
    );
    
    // Salvar no Firebase
    const postRef = ref(db, `posts/${userId}/${postId}`);
    await set(postRef, post.toFirebase());
    
    // Atualizar lista de posts do usuário
    const userPostRef = ref(db, `users/${userId}/posts/${postId}`);
    await set(userPostRef, true);
    
    console.log('✅ Post salvo com sucesso!');
    return postId;
    
  } catch (error) {
    console.error('❌ Erro ao salvar Post:', error);
    throw error;
  }
};

// Buscar Flashes do usuário
export const getUserFlashes = async (userId) => {
  try {
    const flashesRef = ref(db, `flashes/${userId}`);
    const snapshot = await get(flashesRef);
    
    if (snapshot.exists()) {
      const flashesData = snapshot.val();
      return Object.keys(flashesData).map(key => 
        Flash.fromFirebase(flashesData[key])
      );
    }
    
    return [];
  } catch (error) {
    console.error('Erro ao buscar flashes:', error);
    return [];
  }
};

// Buscar Posts do usuário
export const getUserPosts = async (userId) => {
  try {
    const postsRef = ref(db, `posts/${userId}`);
    const snapshot = await get(postsRef);
    
    if (snapshot.exists()) {
      const postsData = snapshot.val();
      return Object.keys(postsData).map(key => 
        Post.fromFirebase(postsData[key])
      );
    }
    
    return [];
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    return [];
  }
};