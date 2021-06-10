<template>
  <div>
    <b-navbar toggleable="lg" type="light" fixed="top" variant="light">
      <div class="container">
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
                <img class="nav__search-img" :src="require('@/assets/NavBar/search_icon.svg')" alt="Поиск">
                <span class="nav__search__text">Поиск</span>
              </b-nav-item>
            </b-navbar-nav>

            <b-navbar-nav class="nav__login">
              <b-nav-item class="nav__login__link" href="#">
                <img class="nav__login-img" :src="require('@/assets/NavBar/login_icon.svg')" alt="Вход">
                <span class="nav__login__text"> Вход</span>
              </b-nav-item>
            </b-navbar-nav>
          </b-navbar-nav>


        </b-collapse>
      </div>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "NavBar"
}
</script>

<style scoped>

.navbar{
  background-color: #FFFFFFFF !important;
}

.navbar .show{
  height: 100vh !important;
}

.nav-item {
  margin: 5px 22px;

}

.nav-link {
  font-size: 18px !important;
}

.nav__items {
  width: 100%;
  display: flex;
  justify-content: center;
}

.nav__search-img, .nav__login-img {
  width: 24px !important;
  display: none !important;
}

.nav__login__link{
   display: none !important;
}

.nav__search__text {
  display: inline !important;
}

@media (min-width: 960px) {
  .nav__search-img, .nav__login-img {
    display: inline !important;
  }

  .nav__search__text {
    display: none !important;
  }

  .nav__login__link{
   display: inline !important;
}

}

.nav__login {
  white-space: nowrap;
}

.nav__login li {
  white-space: nowrap;
  margin-left: 0;
  margin-right: 0;
  padding-left: 15px;
}

.nav__search li {
  white-space: nowrap;
  margin-right: 0;
}

.nav__login__text {
  color: #212223;
}
</style>