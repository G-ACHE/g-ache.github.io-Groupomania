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
          <input id="name" class="form-control" required="" />
        </div>
        <div class="form-group">
          <label for="firstname">
            Prénom
          </label>
          <input id="firstname" class="form-control" required="" />
        </div>
        <div class="form-group">
          <label for="email">
            Email
          </label>
          <input id="email" class="form-control" type="email" required="" />
        </div>
        <div class="form-group">
          <label for="pseudonyme">
            Pseudo
          </label>
          <input
            id="pseudo"
            class="form-control"
            type="pseudonyme"
            required=""
          />
        </div>
        <div class="form-group">
          <label for="password">
            Mots de passe
          </label>
          <input class="form-control" required="" id="password" />
        </div>
        <button aria-label="Enregistrer" class="button" type="submit">
          Enregistrer
        </button>
      </form>
    </section>
  </main>
</template>

<script>
/*
export default {
  name: 'Signup',
  components: {
  }

  data (){
    return {
      user:
      {
        lastName: "",
        firstName: "",
        email: "",
        pseudo: "",
        password: ""
      }}},
  methods: {
    createUser(){
      let data = {
        lastName: this.user.lastName,
        firstName: this.user.firstName,
        email: this.user.email,
        pseudo: this.user.pseudo,
        password: this.user.password
      }}}}
*/
</script>

<style>
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
}
label {
  display: inline-block;
  max-width: 100%;
  margin-bottom: 5px;
}
input {
  display: flex;
  padding-top: 5px;
  padding-right: 600px;
  padding-bottom: 5px;
  padding-left: 5px;
}
button {
  display: flex;
  margin-left: 46%;
  margin-right: 46%;
  margin-top: 8%;
  font-size: 20px;
}
</style>
