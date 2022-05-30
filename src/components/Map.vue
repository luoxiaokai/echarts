<!--  -->
<template>
  <div class="com-container" @dblclick="revertMap">
    <div class="com-chart" ref="map_ref"></div>
  </div>
</template>

<script>
import axios from "axios";
import { getProvinceMapInfo } from "../utils/map_utils";
import { mapState } from 'vuex';

export default {
  name: "Map",
  data() {
    return {
      chartInstance: null,
      allData: null,
      mapData: {}, //所获取的省份地图矢量数据的缓存
    };
  },
  mounted() {
    this.initChart();
    // this.getData();
    this.$socket.send({
      action: "getData",
      socketType: "mapData",
      chartName: "map",
      value: "",
    });
    window.addEventListener("resize", this.screenAdapter);
    this.screenAdapter();
  },
  destroyed() {
    window.removeEventListener("resize", this.screenAdapter);
    this.$socket.unRegisterCallBack("mapData");
  },
  components: {},

  computed: {
    ...mapState(['theme'])
  },
  watch:{
    theme(){
      this.chartInstance.dispose()
      this.initChart()
      this.screenAdapter()
      this.updateChart()
    }
  },
  created() {
    this.$socket.registerCallBack("mapData", this.getData);
  },

  methods: {
    async initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.map_ref, this.theme);
      // 获取中国地图的矢量数据
      const ret = await axios.get(
        "http://localhost:8999/static/map/china.json"
      );
      this.$echarts.registerMap("china", ret.data);
      console.log(ret);
      const initOption = {
        title: {
          text: "▎商家分布",
          left: 20,
          top: 20,
        },
        geo: {
          type: "map",
          map: "china",
          top: "5%",
          bottom: "5%",
          itemStyle: {
            //   图标颜色
            areaColor: "#2E72BF",
            borderColor: "#333",
          },
        },
        legend: {
          left: "5%",
          bottom: "5%",
          orient: "vertical",
        },
      };
      this.chartInstance.setOption(initOption);
      //   点击事件
      this.chartInstance.on("click", async (arg) => {
        const provinceInfo = getProvinceMapInfo(arg.name);
        console.log(provinceInfo);
        // 判断当前所点击的这个省份的地图矢量数据在mapData中是否存在
        if (!this.mapData[provinceInfo.key]) {
          const ret = await axios.get(
            "http://localhost:8999" + provinceInfo.path
          );
          this.mapData[provinceInfo.key] = ret.data;
          this.$echarts.registerMap(provinceInfo.key, ret.data);
        }
        const changeOption = {
          geo: {
            map: provinceInfo.key,
          },
        };
        this.chartInstance.setOption(changeOption);
      });
    },
    getData(res) {
      // this.$axios({
      //   method: "get",
      //   url: "map",
      // })
      //   .then((res) => {
      //     this.allData = res.data;
      //     console.log(this.allData);
      //     this.updateChart();
      //   })
      //   .catch((err) => {});
      console.log(11111111111,res);
       this.allData = res;
          console.log(this.allData);
          this.updateChart();
    },
    updateChart() {
      // 处理图标需要的数据
      const legendArr = this.allData.map((item) => {
        return item.name;
      });
      const seriesArr = this.allData.map((item) => {
        // return的这个对象就是表带的是一个类别下的所有散点数据
        // 如果想在地图中显示散点的数据,所有我们需要给散点的图标增加一个配置,coordinateSystem:geo
        return {
          type: "effectScatter",
          rippleEffect: {
            scale: 5,
            //   涟漪效果 空心效果
            brushType: "stroke",
          },
          name: item.name,
          data: item.children,
          coordinateSystem: "geo",
        };
      });
      const dataOption = {
        legend: {
          data: legendArr,
        },
        series: seriesArr,
      };
      this.chartInstance.setOption(dataOption);
    },
    screenAdapter() {
      const titleFontSize = (this.$refs.map_ref.offsetWidth / 100) * 3.6;
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize,
          },
        },
        legend: {
          itemWidth: titleFontSize / 2,
          itemHeight: titleFontSize / 2,
          //   设置之间的间隔
          itemGap: titleFontSize / 2,
          textStyle: {
            fontSize: titleFontSize / 2,
          },
        },
      };
      this.chartInstance.setOption(adapterOption);
      this.chartInstance.resize();
    },
    // 回到中国地图
    revertMap() {
      const revertOption = {
        geo: {
          map: "china",
        },
      };
      this.chartInstance.setOption(revertOption);
    },
  },
};
</script>
<style lang='less' scoped>
</style>