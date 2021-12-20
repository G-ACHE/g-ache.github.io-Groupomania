<template>
  <main>
    <div class="post">
      <h1>Détails de votre post</h1>
      <form class="info">
        <div class="fieldContainer">
          <div class="inputContainer" v-if="postContaine">
            <label for="text">Changer votre texte :</label>
            <input type="text" name="text" v-model="Post.text" />
          </div>
          <p class="text" v-else>
            Commentaire : <span>{{ Post.text }}</span>
          </p>
          <img alt="post image" v-if="Post.file" :src="Post.file" />
          <div class="inputContainer" v-if="postContaine">
            <label for="file">Choisir une nouvelle image</label>
            <input name="image" id="image" type="file" @change="onFileChange" />
          </div>
        </div>
      </form>
    </div>
    <div class="btn" v-if="auth(Post.UserId)">
      <!--Affichage du bouton suppression seulement si user est admin-->
      <button
        v-on:click.prevent.stop="deletePost"
        aria-label="Suppression du post"
        class="button"
        type="submit"
      >
        Supprimer
      </button>
      <button
        v-if="!postContaine"
        v-on:click.prevent.stop="postContaine = true"
        aria-label="Modification du post"
        class="button"
        type="submit"
      >
        Modifier
      </button>
      <button
        v-else
        v-on:click.prevent.stop="modifyPost"
        aria-label="Enregistrer"
        class="button"
        type="submit"
      >
        Enregistrer
      </button>
      <router-link :to="'/home/'"
        ><button
          aria-label="retour à la page d'accueil"
          class="button"
          type="button"
        >
          Retour
        </button></router-link
      >
    </div>
  </main>
</template>

<script>
export default {
  name: 'Post',
  components: {},
  data() {
    return {
      Post: {
        text: '',
        file: null,
      },
      postContaine: false,
    };
  },
  created() {
    this.postDetail();
  },

  methods: {
    auth(PostUserId) {
      const { user } = JSON.parse(localStorage.getItem('user'));
      if (user.isAdmin) {
        return true;
      }
      if (user.id !== PostUserId) {
        return false;
      }
      return true;
    },
    postDetail() {
      const request = new XMLHttpRequest();
      request.open(
        'get',
        `http://localhost:3000/api/post/${this.$route.params.id}`,
        true,
      );
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
            const Post = JSON.parse(request.responseText);
            this.Post = Post;
          }
        }
      };
    },
    //Fonction de suppression d'un post
    deletePost() {
      if (confirm('êtes vous sûr de vouloir supprimer votre compte ?')) {
        fetch(`http://localhost:3000/api/post/${this.$route.params.id}`, {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
          .then(localStorage.clear())
          .then(this.$router.push('home'))
          .catch((error) => {
            error;
          });
      }
    },
    //Fontion de modification d'un post
    modifyPost() {
      const request = new XMLHttpRequest();
      request.open(
        'put',
        `http://localhost:3000/api/post/${this.$route.params.id}`,
        true,
      );
      request.setRequestHeader(
        'Authorization',
        'Bearer ' + localStorage.getItem('token'),
      );
      if (this.Post.file) {
        const formData = new FormData();
        formData.append('text', this.Post.text);
        formData.append('image', this.Post.file);
        request.send(formData);
      } else {
        request.setRequestHeader(
          'Content-Type',
          'application/json;charset=UTF-8',
        );
        request.send(
          JSON.stringify({
            text: this.Post.text,
          }),
        );
      }

      request.onreadystatechange = () => {
        if (request.readyState == XMLHttpRequest.DONE) {
          if (request.status == 200) {
            this.$router.go(0);
          }
        }
      };
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      console.log(files);
      if (!files.length) return;
      this.Post.file = files[0];
    },
  },
};
</script>
<style scoped>
img {
  width: 20%;
}
button {
  margin: 10px;
  font-size: 20px;
  border-radius: 25px;
  background: rgba(23, 35, 60);
  color: white;
}
.btn {
  display: flex;
  justify-content: center;
}
.text {
  font-size: 20px;
}

@media (min-width: 320px) and (max-width: 520px) {
  img {
    width: auto;
  }
}
</style>
