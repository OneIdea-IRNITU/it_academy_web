<template>
  <!-- Footer start -->
  <footer class="footer text-center text-lg-start">
    <!-- Copyright -->
    <div class="bg-light text-center p-3">
      <div class="container">
        <div class="footer__authors authors">
          <p>
            <span>Created by </span>
            <a class="footer__link authors__link" target="_blank" href="https://github.com/NaniB0ots">NaniB0ots</a>
            <span> and </span>
            <a class="footer__link authors__link" target="_blank" href="https://github.com/OneIdea-IRNITU">OneIdea</a>
          </p>
          <p>
            <span>©&nbsp;</span>
            <a href="http://elc.istu.edu/" target="_blank"><span>Центр электронного обучения</span></a>&nbsp;<br>
            <a href="http://www.istu.edu" title="IRNITU" target="_blank">
              <span>ИРНИТУ</span></a><span>.</span>
          </p>
        </div>

        <div>

        </div>

        <div class="footer__info">
          <div class="row">
            <div class="col-md-6">
              <p>
                <a href="mailto:support@el.istu.edu">
                  support@el.istu.edu
                </a>
              </p>

              <p>
                <a href="https://open.istu.edu/login/policy.php" target="_blank" rel="noreferrer noopener">
                  Пользовательское
                  соглашение
                </a>
              </p>

              <p>
                <a href="https://open.istu.edu/enrol/robokassa/pay_policy1.php" target="_blank">
                  Публичная оферта на оказание платных образовательных услуг с проведением оценки результатов освоения
                  курсов и выдачей ИРНИТУ удостоверения о прохождении курсов
                </a>
              </p>
            </div>

            <div class="col-md-6">
              <p>
                <a href="https://open.istu.edu/enrol/robokassa/pay_policy0.php" target="_blank">
                  Публичная оферта на оказание платных образовательных услуг по пользовательским соглашениям
                </a>
              </p>

              <p>
                <a target="_blank" href="https://open.istu.edu/admin/tool/dataprivacy/summary.php">
                  Сводка хранения данных
                </a>
              </p>

              <p>
                <a target="_blank" href="https://open.istu.edu/course/view.php?id=80">
                  НИ_1
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- Copyright -->
  </footer>
  <!-- Footer end -->
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>
.footer {
  font-weight: normal !important;
  font-size: 13px !important;
  line-height: 15px !important;
  background-color: #FFFFFFFF !important;
}

@media (min-width: 960px) {
  .footer {
    font-weight: normal !important;
    font-size: 18px !important;
    line-height: 21px !important;
  }
}

.footer__authors {

}

.footer__info {
  margin-top: 40px;
}

.footer__info a{

  color: rgba(0, 0, 0, 0.5)!important;
}

</style>