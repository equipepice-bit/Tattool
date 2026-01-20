export class Flash {
  constructor(id, foto, tags, tamanho, valor, userId, createdAt) {
    this.id = id;
    this.foto = foto;
    this.tags = tags;
    this.tamanho = tamanho;
    this.valor = valor;
    this.userId = userId;
    this.createdAt = createdAt || new Date().toISOString();
  }

  toFirebase() {
    return {
      id: this.id,
      foto: this.foto,
      tags: this.tags,
      tamanho: this.tamanho,
      valor: this.valor,
      userId: this.userId,
      createdAt: this.createdAt,
    };
  }

  static fromFirebase(data) {
    return new Flash(
      data.id,
      data.foto,
      data.tags,
      data.tamanho,
      data.valor,
      data.userId,
      data.createdAt
    );
  }
}