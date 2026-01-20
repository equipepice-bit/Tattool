export class Post {
  constructor(id, foto, descricao, tags, userId, createdAt) {
    this.id = id;
    this.foto = foto;
    this.descricao = descricao;
    this.tags = tags;
    this.userId = userId;
    this.createdAt = createdAt || new Date().toISOString();
  }

  toFirebase() {
    return {
      id: this.id,
      foto: this.foto,
      descricao: this.descricao,
      tags: this.tags,
      userId: this.userId,
      createdAt: this.createdAt,
    };
  }

  static fromFirebase(data) {
    return new Post(
      data.id,
      data.foto,
      data.descricao,
      data.tags,
      data.userId,
      data.createdAt
    );
  }
}