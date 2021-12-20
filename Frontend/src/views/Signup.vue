<template>
  <main>
    <div class="signup">
      <h1>Inscrivez vous ici !</h1>
    </div>
    <section id="formulaire">
      <!-- eslint-disable -->
      <form
        id="form_1"
        novalidate=""
        success-msg="Your message has been sent."
        fail-msg="Sorry it seems that our mail server is not responding, Sorry for the inconvenience!"
      >
        <!-- eslint-enable -->
        <div class="form-group">
          <label for="name">
            Nom
          </label>
          <input
            v-model="user.lastName"
            id="name"
            class="form-control"
            type="text"
            required=""
          />
        </div>
        <div class="form-group">
          <label for="firstname">
            Prénom
          </label>
          <input
            v-model="user.firstName"
            id="firstname"
            class="form-control"
            type="text"
            required=""
          />
        </div>
        <div class="form-group">
          <label for="email">
            Email
          </label>
          <input
            v-model="user.email"
            id="email"
            class="form-control"
            type="email"
            required=""
          />
        </div>
        <div class="form-group">
          <label
            >Pseudo<input
              v-model="user.pseudo"
              id="pseudo"
              class="form-control"
              type="text"
              required=""
          /></label>
        </div>
        <div class="form-group">
          <label for="password">
            Mots de passe
          </label>
          <input
            v-model="user.password"
            class="form-control"
            type="password"
            required=""
            id="password"
          />
        </div>
        <button
          v-on:click.prevent.stop="createUser"
          aria-label="Enregistrer"
          class="button"
          type="submit"
        >
          Enregistrer
        </button>
      </form>
    </section>
  </main>
</template>

<script>
export default {
  name: 'Signup',
  components: {},

  data() {
    return {
      user: {
        lastName: '',
        firstName: '',
        email: '',
        pseudo: '',
        password: '',
      },
    };
  },
  methods: {
    createUser() {
      const request = new XMLHttpRequest();
      request.open('post', 'http://localhost:3000/api/user/signup', true);
      request.setRequestHeader(
        'Content-Type',
        'application/json;charset=UTF-8',
      );
      const data = {
        lastName: this.user.lastName,
        firstName: this.user.firstName,
        email: this.user.email,
        pseudo: this.user.pseudo,
        password: this.user.password,
      };
      request.send(JSON.stringify(data));
      this.$router.push('login');
    },
  },
};
</script>

<style scoped>
form {
  display: block;
  margin-top: 0;
}
.form-group {
  text-align: left;
  width: 100%;
  padding: 6px 12px;
  font-size: 20px;
  line-height: 1.42857143;
  color: #2c3e50;
  margin-left: 375px;
}
label {
  display: inline-block;
  max-width: 100%;
  margin-bottom: 5px;
}
input {
  display: flex;
  padding-top: 5px;
  padding-right: 500px;
  padding-bottom: 5px;
  padding-left: 5px;
}
button {
  margin: 10px;
  font-size: 20px;
  border-radius: 25px;
  background: rgba(23, 35, 60);
  color: white;
}
@media (min-width: 320px) and (max-width: 520px) {
  .form-group {
    margin-left: auto;
  }
}
</style>
