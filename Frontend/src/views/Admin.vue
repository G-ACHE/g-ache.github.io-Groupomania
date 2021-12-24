<template>
  <main>
    <div class="users">
      <div class="user" v-for="user in users" :key="user.id">
        <p>
          Nom: <span>{{ user.lastName }}</span>
        </p>
        <p>
          Prénom: <span>{{ user.firstName }}</span>
        </p>
        <button
          v-on:click.prevent.stop="deleteProfile"
          aria-label="Suppression du compte"
          class="button"
          type="submit"
        >
          Supprimer
        </button>
      </div>
    </div>

    <router-link :to="'/home/'"
      ><button
        aria-label="retour à la page d'accueil"
        class="button"
        type="button"
      >
        Retour
      </button></router-link
    >
  </main>
</template>

<script>
export default {
  name: 'Admin',
  components: {},
  data() {
    return {
      user: {
        lastName: '',
        firstName: '',
      },
      users: [],
    };
  },
  created() {
    this.getAllUsers();
  },

  methods: {
    getAllUsers() {
      const request = new XMLHttpRequest();
      request.open('get', 'http://localhost:3000/api/user/all', true);
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
            const users = JSON.parse(request.responseText);
            this.users = users;
          }
        }
      };
    },
    //Fonction de suppression d'un utilisateur
    deleteProfile() {
      if (confirm('êtes vous sûr de vouloir supprimer votre compte ?')) {
        fetch(
          `http://localhost:3000/api/user/${
            JSON.parse(localStorage.getItem('user')).user.id
          }`,
          {
            method: 'DELETE',
            headers: {
              'Content-type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          },
        )
          .then(this.$store.commit('logout'))
          .then(localStorage.clear())
          .then(this.$router.push('login'))
          .catch((error) => {
            error;
          });
      }
    },
  },
};
</script>

<style scoped>
h1 {
  margin-top: 15px;
}
img {
  width: 30%;
}
button {
  margin: 1rem;
  font-size: 20px;
  border-radius: 25px;
  background: rgba(23, 35, 60);
  color: white;
}
</style>
