<!--  -->
<template>
  <div class="com-container">
    <div class="com-chart" ref="map_ref"></div>
  </div>
</template>

<script>
export default {
  name: "Map",
  data() {
    return {
      chartInstance: null,
      allData: null,
    };
  },
  mounted() {
    this.initChart();
    this.getData();
    window.addEventListener("resize", this.screenAdapter);
    this.screenAdapter();
  },
  destroyed() {
    window.removeEventListener("resize", this.screenAdapter);
  },
  components: {},

  computed: {},

  created() {},

  methods: {
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.map_ref);
      const initOption = {};
      this.chartInstance.setOption(initOption);
    },
    getData() {
      this.$axios({
        method: "",
        url: "",
      })
        .then((res) => {

            this.updateChart()
        })
        .catch((err) => {});
    },
    updateChart(){
        const dataOption = {}
        this.chartInstance.setOption(dataOption)
    },
    screenAdapter(){
        const adapterOption = {}
        this.chartInstance.setOption(adapterOption)
        this.chartInstance.resize()
    }
  },
};
</script>
<style lang='less' scoped>
</style>