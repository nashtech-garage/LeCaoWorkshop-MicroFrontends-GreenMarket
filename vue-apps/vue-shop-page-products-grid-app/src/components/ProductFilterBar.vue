<template>
  <div class="filter__item">
    <div class="row">
      <div class="col-lg-4 col-md-5">
        <div class="filter__sort">
          <span>Sort By</span>
          <select>
            <option value="0">Default</option>
            <option value="0">Default</option>
          </select>
        </div>
      </div>
      <div class="col-lg-4 col-md-4">
        <div class="filter__found">
          <h6><span>16</span> Products found</h6>
        </div>
      </div>
      <div class="col-lg-4 col-md-3">
        <div class="filter__option">
          <span class="icon_grid-2x2"></span>
          <span class="icon_ul"></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {},
  computed: {},
};
</script>
<style scoped>
.filter__sort {
  margin-bottom: 15px;
}

.filter__sort span {
  font-size: 16px;
  color: #6f6f6f;
  display: inline-block;
}

.filter__sort .nice-select {
  background-color: #fff;
  border-radius: 0;
  border: none;
  display: inline-block;
  float: none;
  height: 0;
  line-height: 0;
  padding-left: 18px;
  padding-right: 30px;
  font-size: 16px;
  color: #1c1c1c;
  font-weight: 700;
  cursor: pointer;
}

.filter__sort .nice-select span {
  color: #1c1c1c;
}

.filter__sort .nice-select:after {
  border-bottom: 1.5px solid #1c1c1c;
  border-right: 1.5px solid #1c1c1c;
  height: 8px;
  margin-top: 0;
  right: 16px;
  width: 8px;
  top: -5px;
}

.filter__sort .nice-select.open .list {
  opacity: 1;
  pointer-events: auto;
  -webkit-transform: scale(1) translateY(0);
  -ms-transform: scale(1) translateY(0);
  transform: scale(1) translateY(0);
}

.filter__sort .nice-select .list {
  border-radius: 0;
  margin-top: 0;
  top: 15px;
}

.filter__sort .nice-select .option {
  line-height: 30px;
  min-height: 30px;
}

.filter__found {
  text-align: center;
  margin-bottom: 15px;
}

.filter__found h6 {
  font-size: 16px;
  color: #b2b2b2;
}

.filter__found h6 span {
  color: #1c1c1c;
  font-weight: 700;
  margin-right: 5px;
}

.filter__option {
  text-align: right;
  margin-bottom: 15px;
}

.filter__option span {
  font-size: 24px;
  color: #b2b2b2;
  margin-right: 10px;
  cursor: pointer;
  -webkit-transition: all, 0.3s;
  -moz-transition: all, 0.3s;
  -ms-transition: all, 0.3s;
  -o-transition: all, 0.3s;
  transition: all, 0.3s;
}

.filter__option span:last-child {
  margin: 0;
}

.filter__option span:hover {
  color: #7fad39;
}
</style>
