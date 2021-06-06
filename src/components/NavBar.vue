<template>
  <div>
    <b-navbar toggleable="lg" type="light" fixed="top" variant="light">
      <b-navbar-brand href="#">LOGO</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="nav__items">
          <b-nav-item href="#" active>Мероприятия</b-nav-item>
          <b-nav-item href="#">Конкурсы</b-nav-item>
          <b-nav-item href="#">Личный кабинет</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-navbar-nav class="nav__search">
            <b-nav-item class="nav__search__link" href="#">
              <img :src="require('@/assets/NavBar/search_icon.svg')" alt="Поиск"></b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav class="nav__login">
            <b-nav-item class="nav__login__link" href="#">
              <img :src="require('@/assets/NavBar/login_icon.svg')" alt="Вход">
              <span class="nav__login__link__text"> Вход</span>
            </b-nav-item>
          </b-navbar-nav>
        </b-navbar-nav>


      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style scoped>


.nav__items{
  width: 100%;
  display: flex;
  justify-content: center;
}

.nav__login__link__text {
  color: #000000;
}
</style>