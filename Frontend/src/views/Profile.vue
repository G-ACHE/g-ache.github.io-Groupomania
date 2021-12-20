<template>
  <main>
    <div class="profil">
      <h1>Détails de votre compte</h1>
      <form class="info">
        <div class="fieldContainer">
          <div class="inputContainer" v-if="Profile">
            <label for="pseudo">Changer de pseudo :</label>
            <input type="text" name="pseudo" v-model="User.pseudo" />
          </div>
          <p v-else>
            Pseudo: <span>{{ User.pseudo }}</span>
          </p>
        </div>
        <div class="fieldContainer">
          <div class="inputContainer" v-if="Profile">
            <label for="firstName">Changer de prénom :</label>
            <input type="text" name="firstName" v-model="User.firstName" />
          </div>
          <p v-else>
            Prénom: <span>{{ User.firstName }}</span>
          </p>
        </div>
        <div class="fieldContainer">
          <div class="inputContainer" v-if="Profile">
            <label for="lastName">Changer de nom :</label>
            <input type="text" name="lastName" v-model="User.lastName" />
          </div>
          <p v-else>
            Nom: <span>{{ User.lastName }}</span>
          </p>
        </div>
        <div class="fieldContainer">
          <div class="inputContainer" v-if="Profile">
            <label for="email">Changer email :</label>
            <input type="email" name="email" v-model="User.newEmail" />
          </div>
          <p v-else>
            Email: <span>{{ User.email }}</span>
          </p>
        </div>
        <div class="fieldContainer">
          <div class="inputContainer" v-if="Profile">
            <label for="password">Changer de mot de passe :</label>
            <input type="password" name="password" v-model="User.newPassword" />
          </div>
          <p v-else>
            Mot de passe : <span>{{ User.password }}</span>
          </p>
        </div>
        <p>
          Date d'inscription:
          <span>{{ new Date(User.createdAt).toLocaleDateString() }}</span>
        </p>
      </form>
    </div>
    <button
      v-on:click.prevent.stop="deleteProfile"
      aria-label="Suppression du compte"
      class="button"
      type="submit"
    >
      Supprimer
    </button>
    <button
      v-if="!Profile"
      v-on:click.prevent.stop="Profile = true"
      aria-label="Modification du profil"
      class="button"
      type="submit"
    >
      Modifier
    </button>
    <button
      v-else
      v-on:click.prevent.stop="modifyProfile"
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
  </main>
</template>

<script>
export default {
  name: 'Profile',
  components: {},
  data() {
    return {
      User: {},
      Profile: false,
    };
  },
  created() {
    this.account();
  },

  methods: {
    account() {
      const request = new XMLHttpRequest();
      request.open('get', 'http://localhost:3000/api/user/me', true);
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
            const User = JSON.parse(request.responseText);
            this.User = User;
          }
        }
      };
    },
    //Fonction de suppression d'un utilisateur
    deleteProfile() {
      if (confirm('êtes vous sûr de vouloir supprimer votre compte ?')) {
        fetch(
          `http://localhost:3000/api/user/${
            JSON.parse(localStorage.getItem('user')).userId
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
    //Fonction de modification d'un profil utilisateur
    modifyProfile() {
      const request = new XMLHttpRequest();
      request.open(
        'put',
        'http://localhost:3000/api/user/' + this.User.id,
        true,
      );
      request.setRequestHeader(
        'Authorization',
        'Bearer ' + localStorage.getItem('token'),
      );
      request.setRequestHeader(
        'Content-Type',
        'application/json;charset=UTF-8',
      );
      request.send(
        JSON.stringify({
          pseudo: this.User.pseudo,
          firstName: this.User.firstName,
          lastName: this.User.lastName,
          email: this.User.newEmail,
          password: this.User.newPassword,
        }),
      );
      request.onreadystatechange = () => {
        if (request.readyState == XMLHttpRequest.DONE) {
          if (request.status == 200) {
            this.$router.go(0);
          }
        }
      };
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
