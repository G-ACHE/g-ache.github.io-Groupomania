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
          <label for="pseudonyme">
            Pseudo
          </label>
          <input id="pseudo" class="form-control" type="pseudo" required="" />
        </div>
        <div class="form-group">
          <label for="password">
            Mots de passe
          </label>
          <input class="form-control" required="" id="password" />
        </div>
        <button aria-label="Connection" class="button" type="submit">
          Connection
        </button>
      </form>
    </section>
  </main>
</template>
