<template>
  <main>
    <div class="login">
      <h1>Connectez-vous !</h1>
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
          v-on:click.prevent.stop="logUser"
          aria-label="Connection"
          class="button"
          type="submit"
        >
          Connection
        </button>
      </form>
    </section>
  </main>
</template>
<script>
export default {
  name: 'Login',
  components: {},

  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      msgErr: null,
    };
  },
  methods: {
    logUser() {
      if (!this.user.email || !this.user.password) {
        this.msgErr = 'Remplissez tous les champs du formulaire';
        return;
      }
      const request = new XMLHttpRequest();
      request.open('post', 'http://localhost:3000/api/user/login', true);
      request.setRequestHeader(
        'Content-Type',
        'application/json;charset=UTF-8',
      );
      const data = {
        email: this.user.email,
        password: this.user.password,
      };
      request.send(JSON.stringify(data));
      request.onreadystatechange = () => {
        if (request.readyState === XMLHttpRequest.DONE) {
          if (request.status === 200) {
            const user = JSON.parse(request.responseText);
            localStorage.setItem('token', user.token);
            localStorage.setItem('user', JSON.stringify(user));
          } else {
            alert('Une erreur est survenue!');
          }
        }
      };
      this.$router.push('Home');
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
