class Post {
  id = '';
  foto = '';
  descricao = '';
  tags = [];

  constructor(id, foto, descricao, tags) {
    this.id = id;
    this.foto = foto;
    this.descricao = descricao;
    this.tags = tags;
  }
}
