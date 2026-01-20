// CONFIGURAÇÃO BÁSICA - Substitua pelos seus dados
const CLOUD_NAME = 'dr9ha5uhc'; // Ex: 'dmeu6s8vh'
const UPLOAD_PRESET = 'tattol_upload'; // Crie este preset no Cloudinary Dashboard

/**
 * Upload mais simples possível para Cloudinary
 */
export const uploadPhotoToCloudinary = async (imageUri, userId) => {
  try {
    console.log('📤 Iniciando upload...');
    
    // 1. Criar FormData
    const formData = new FormData();
    
    // 2. Adicionar a imagem
    formData.append('file', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });
    
    // 3. Adicionar parâmetros obrigatórios
    formData.append('upload_preset', UPLOAD_PRESET);
    formData.append('cloud_name', CLOUD_NAME);
    
    // 4. Fazer a requisição
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    
    // 5. Processar resposta
    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error.message);
    }
    
    console.log('✅ Upload concluído!');
    return {
      url: data.secure_url,
      publicId: data.public_id,
    };
    
  } catch (error) {
    console.error('❌ Erro:', error);
    throw error;
  }
};

/**
 * Função de teste rápido
 */
export const testCloudinary = async () => {
  try {
    console.log('🔧 Testando Cloudinary...');
    
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: JSON.stringify({
          upload_preset: UPLOAD_PRESET,
        }),
      }
    );
    
    return response.ok;
  } catch (error) {
    console.error('Teste falhou:', error);
    return false;
  }
};