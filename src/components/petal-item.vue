<template lang="pug">
.petal-pug-img
	.petal-item(v-for="item of petal",:key="key")
		img.petal-img(v-if="item.thumb",:src="item.thumb",mode="widthFix")
</template>

<script>
export default {
  props: {
    petal: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style lang="less" scoped>
.petal-img{
	width:100%;
	height:px;
}
.petal-pug-img{
	column-count:2;
	column-gap:2px;
	width:100%;
}
.petal-item{
	width:95%;
	background:#fefefe;
	border:2px solid #fcfcfc;
	box-shadow:0px 2px 2px rgba(34, 25, 25, 0.4);
	margin:5px 2px 2px 2px;
	padding:1px;
	padding-bottom:5px;
	transition:opacity .4s ease-in-out;
	display:inline-block;
}
</style>
