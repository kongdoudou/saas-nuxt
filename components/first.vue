<template>
    <div>
        <h1>组件1</h1>
        <ul class="lequ-ul">
            <li class="lequ-li" v-for="(item, index) in sourceData" :key="index">
                <div class="lequ-img smallVideo-link ">
                    <a class="img-link smallTitleColor" :href="item.url"
                       :style="{backgroundImage:'url('+item.imageUrl+')'}">
                    </a>
                </div>
                <div class="lequ-titleRow">
                    <div class="lequ-title bigTitleColor">
                        <a class="bigTitleColor " :href="item.url">{{item.subtitle}}</a>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
  export default {
    name: "first",
    props: ['sourceData']

  }
</script>

<style scoped>
    .lequ-ul{
        padding: 10px 10px 0 10px;
        box-sizing: border-box;
        background-color: red;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .lequ-li{
        background-color: pink;
        width: 172px;
        height: 155px;
        margin-bottom: 10px;
        border-radius: 2px;
        overflow: hidden;
    }
    .lequ-img{
        position: relative;
    }
    .smallVideo-link{
        height: 97px;
        border-radius: 2px;
        overflow: hidden;
    }
    .lequ-img .img-link{
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background-position: center;
        background-size: cover;
    }
    .lequ-titleRow {
        height: 64px;
        padding: 6.5px 2px 20px;
        box-sizing: border-box;
        overflow: hidden;
        text-align: left;
        font-size: 14px;
    }
    .lequ-title{
        padding: 0 2px;
    }
</style>
