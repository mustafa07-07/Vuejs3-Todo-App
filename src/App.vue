<template>
 <Header /> 
  <div class="container">
    <div class="row">
      <Hero />
      <TodoApp />
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TodoApp from "@/components/TodoApp";
export default {
  name: "App",
 
  components: {
    Header,
    Hero,
    TodoApp,
  },
};
</script>

<style></style>
