<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
    </p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<style>
h1 {
  margin-top: 15px;
}
img {
  width: 50%;
}
</style>
