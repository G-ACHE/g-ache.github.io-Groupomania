<template>
  <main class="home">
    <div>
      <h1>Bienvenue sur le réseau social de votre entreprise</h1>
    </div>
    <div class="User">
      <h2>Utilisateur connecté</h2>
      <p>Pseudo: {{ user.pseudo }}</p>
      <p>Email: {{ user.email }}</p>
      <router-link to="/profile"
        ><button aria-label="profil" class="btn" type="button">
          Profil
        </button></router-link
      >
      <button
        v-on:click.prevent.stop="logout"
        aria-label="deconnexion"
        class="btn"
        type="submit"
      >
        Déconnexion
      </button>
    </div>
    <div class="posts">
      <div class="post" v-for="post in posts" :key="post.id">
        <p>
          Publication postée le :
          {{ new Date(post.createdAt).toLocaleDateString() }}
        </p>
        <p>
          par : <span>{{ post.User.pseudo }}</span>
        </p>
        <p class="text">{{ post.text }}</p>
        <img alt="post image" v-if="post.file" :src="post.file" />
        <router-link class="contenu" :to="'/post/' + post.id">
          Contenu</router-link
        >
      </div>
    </div>
    <form
      class="createPost"
      enctype="multipart/form-data"
      method="post"
      @submit.prevent="createPost()"
    >
      <h3>Créer votre post :</h3>
      <label
        >Texte :<input name="text" id="text" type="text" v-model="post.text"
      /></label>
      <label
        >Fichier :
        <input name="image" id="image" type="file" @change="onFileChange"
      /></label>
      <button
        v-on:click.prevent.stop="createPost"
        aria-label="Postez"
        class="btn"
        type="submit"
      >
        Postez
      </button>
    </form>
  </main>
</template>

<script>
export default {
  name: 'Home',
  components: {},

  data() {
    return {
      post: {
        text: '',
        file: null,
      },
      posts: [],
      user: JSON.parse(localStorage.getItem('user')).user,
    };
  },
  created() {
    this.getAll();
  },
  methods: {
    getAll() {
      const request = new XMLHttpRequest();
      request.open('get', 'http://localhost:3000/api/post/all', true);
      request.setRequestHeader(
        'Content-Type',
        'application/json;charset=UTF-8',
      );
      /* eslint-disable */
      request.setRequestHeader(
        'Authorization',
        'Bearer ' + localStorage.getItem('token'),
      );
      request.send();
      request.onreadystatechange = () => {
        if (request.readyState == XMLHttpRequest.DONE) {
          if (request.status == 200) {
            const posts = JSON.parse(request.responseText);
            this.posts = posts;
          }
        }
      };
    },
    //Fonction de création de post
    createPost() {
      const request = new XMLHttpRequest();
      request.open('post', 'http://localhost:3000/api/post/create', true);
      request.setRequestHeader(
        'Authorization',
        'Bearer ' + localStorage.getItem('token'),
      );
      const formData = new FormData();
      formData.append('text', this.post.text);
      formData.append('image', this.post.file);
      request.send(formData);
      request.onreadystatechange = () => {
        if (request.readyState == XMLHttpRequest.DONE) {
          if (request.status == 201) {
            this.$router.go(0);
          }
        }
      };
    },
    //Fonction de transfert de photo
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      console.log(files);
      if (!files.length) return;
      this.post.file = files[0];
    },
    //Fonction de déconnection
    logout() {
      this.$store.commit('logout');
      localStorage.clear();
      this.$router.push('login');
    },
  },
};
</script>

<style scoped>
img {
  width: 45%;
}

#home {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: black;
}
button {
  margin: 1rem;
  font-size: 20px;
  border-radius: 25px;
  background: rgba(23, 35, 60);
  color: white;
}
a {
  text-decoration: none;
}
.User {
  box-sizing: border-box;
  box-shadow: 1px 1px 6px grey;
  margin: 50px;
}
.btn {
  margin: 1rem;
}
input#image {
  padding-left: 95px;
}
.createPost {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  box-shadow: 1px 1px 6px grey;
  margin: 50px;
}
h3 {
  color: rgba(23, 35, 60);
}
.contenu {
  border-radius: 25px;
  background: rgba(23, 35, 60);
  color: white;
  padding: 0 10px;
  margin: 1rem;
  font-size: 20px;
}
.post {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid black;
  margin: 5px;
  width: 80%;
}
.posts {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  margin: 0 auto;
  width: 100%;
}
input {
  width: 100%;
}
.text {
  font-size: 20px;
}

@media (min-width: 320px) and (max-width: 520px) {
  form {
    width: auto;
  }
  .posts {
    width: 90%;
  }
}
</style>
