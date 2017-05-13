<template>
    <div class="main-i-index">
        <swiper class="my-swipe" :options="swiperOption" ref="mySwiper">
            <swiper-slide class="slide1 slide">
                <a target="_blank" href="http://www.hiyd.com/jianfei/3456/" class="news-body">
                    <!--http://www.hiyd.com/jianfei/3456/-->
                    <span><a href="javascript:void(0)" title="咖啡对身体影响的4个误解！适量咖啡对健身有益">咖啡对身体影响的4个误解！适量咖啡对健身有益</a></span>
                </a>
            </swiper-slide>
            <swiper-slide class="slide2 slide">
                <a target="_blank" href="http://www.hiyd.com/jianfei/3462/" class="news-body">
                    <!--http://www.hiyd.com/jianfei/3462/-->
                    <span><a href="javascript:void(0)" title="减肥太快容易反弹！科学减脂每周瘦1斤最健康">减肥太快容易反弹！科学减脂每周瘦1斤最健康</a></span>
                </a>
            </swiper-slide>
            <swiper-slide class="slide3 slide">
                <a target="_blank" href="http://www.hiyd.com/jianfei/3448/" class="news-body">
                    <!--http://www.hiyd.com/zengji/3448/-->
                    <span><a href="javascript:void(0)" title="缺乏运动身体会有哪些毛病？体检报告给出答案">缺乏运动身体会有哪些毛病？体检报告给出答案</a></span>
                </a>
            </swiper-slide>
            <swiper-slide class="slide4 slide">
                <a target="_blank" href="http://www.hiyd.com/jianfei/3434/" class="news-body">
                    <!--http://www.hiyd.com/zengji/3434/-->
                    <span><a href="javascript:void(0)" title="新人健身基础知识：前3个月必学的4堂课">
			  		新人健身基础知识：前3个月必学的4堂课
			  	</a></span>
                </a>
            </swiper-slide>
            <swiper-slide class="slide5 slide">
                <a target="_blank" href="http://www.hiyd.com/jianfei/3417/" class="news-body">
                    <!--http://www.hiyd.com/zengji/3417/-->
                    <span><a href="javascript:void(0)" title="恢复期5个方法提升力量！应降低难度安全第一">
			  		恢复期5个方法提升力量！应降低难度安全第一
			  	</a></span>
                </a>
            </swiper-slide>
            <swiper-slide class="slide6 slide">
                <a target="_blank" href="http://www.hiyd.com/jianfei/3416/" class="news-body">
                    <!--http://www.hiyd.com/zengji/3416/-->
                    <span><a href="javascript:void(0)" title="从心跳速度看健康！运动多久才是健身不伤身？">
			  		从心跳速度看健康！运动多久才是健身不伤身？
			  	</a></span>
                </a>
            </swiper-slide>
            <swiper-slide class="slide7 slide">
                <a target="_blank" href="http://www.hiyd.com/jianfei/3409/" class="news-body">
                    <!--http://www.hiyd.com/zengji/3409/-->
                    <span><a href="javascript:void(0)" title="5个必会的徒手训练动作，不去健身房也能健身">
			  		5个必会的徒手训练动作，不去健身房也能健身
			  	</a></span>
                </a>
            </swiper-slide>
            <swiper-slide class="slide8 slide">
                <a target="_blank" href="http://www.hiyd.com/jianfei/3407/" class="news-body">
                    <!--http://www.hiyd.com/zengji/3407/-->
                    <span><a href="javascript:void(0)" title="方法不对，努力白费！3个办法检测健身效果">
		  		方法不对，努力白费！3个办法检测健身效果
		  	</a></span>
                </a>
            </swiper-slide>
            <swiper-slide class="slide9 slide">
                <a target="_blank" href="http://www.hiyd.com/jianfei/3404/" class="news-body">
                    <!--http://www.hiyd.com/zengji/3404/-->
                    <span><a href="javascript:void(0)" title="20岁开始健身不仅有好身材！还能培养这7大成功素质">
			  		20岁开始健身不仅有好身材！还能培养这7大成功素质...
			  	</a></span>
                </a>
            </swiper-slide>
            <swiper-slide class="slide10 slide">
                <a target="_blank" href="http://www.hiyd.com/jianfei/3403/" class="news-body">
                    <!--http://www.hiyd.com/zengji/3403/-->
                    <span><a href="javascript:void(0)" title="运动后避免做这5件事！别让健身成果付之东流">
		  		运动后避免做这5件事！别让健身成果付之东流
		  	</a></span>
                </a>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
            <div class="swiper-scrollbar" slot="scrollbar"></div>
        </swiper>
        <div class="all-pub">
            <hot-pub :type="hotPub" :class="hotPub"></hot-pub>
            <new-pub :type="newPub" :class="newPub"></new-pub>
        </div>
    </div>
</template>

<script>
	import listPage from '../components/listPage'
	export default {
		data() {
			return {
				newPub: "newPub",
				hotPub: "hotPub",
				swiperOption: {
					// NotNextTick is a component's own property, and if notNextTick is set to true, the component will not instantiate the swiper through NextTick, which means you can get the swiper object the first time (if you need to use the get swiper object to do what Things, then this property must be true)
					// notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
					initialSlide: 0,
					direction: 'horizontal',
					speed: 1000,
					autoplay: 3000,
					autoplayDisableOnInteraction: false,
					autoHeight: true,
					notNextTick: true,
					setWrapperSize :true,
					autoHeight: true,
					pagination : '.swiper-pagination',
					paginationClickable :true,
					prevButton:'.swiper-button-prev',
					nextButton:'.swiper-button-next',
					scrollbar:'.swiper-scrollbar',
					slidesPerView: 3,
					spaceBetween: 30,
					mousewheelControl : true,
					observeParents:true
				}
			}
		},
		components: {
			'newPub': listPage,
			'hotPub': listPage
		}
	}
</script>

<style lang="less">
	.main-i-index {
	    width: 100%;
	    padding-bottom: 0px;
	    margin-top: 20px;
		.my-swipe {
			width: 80%;
			height: 300px;
			text-align: center;
			.news-body {
				display: block;
				text-decoration: none;
				width: 100%;
				height: 100%;
			}
			.slide {
			  height: 100%;
			  color: #fff;
			  position: relative;
			  cursor: pointer;
			  span {
				display: inline-block;
			    margin: 0;
			    height: 40px;
			    width: 100%;
			    padding: 0 7px;
			    position: relative;
			    top: 216px;
			    background: #000;
			    opacity: 0.7;
			    overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
			  	a {
				    color: #fff;
				    line-height: 40px;
				    font-size: 16px;
			  	}
			  }
			}
			.slide1 {
				background: url('../static/images/new-small-banner-1.jpg') no-repeat center;
			}
			.slide2 {
				background: url('../static/images/new-small-banner-2.jpg') no-repeat center;
			}
			.slide3 {
				background: url('../static/images/new-small-banner-3.jpg') no-repeat center;
			}
			.slide4 {
				background: url('../static/images/new-small-banner-4.jpg') no-repeat center;	
			}
			.slide5 {
				background: url('../static/images/new-small-banner-5.jpg') no-repeat center;
			}
			.slide6 {
				background: url('../static/images/new-small-banner-6.jpg') no-repeat center;
			}
			.slide7 {
				background: url('../static/images/new-small-banner-7.jpg') no-repeat center;
			}
			.slide8 {
				background: url('../static/images/new-small-banner-8.jpg') no-repeat center;
			}
			.slide9 {
				background: url('../static/images/new-small-banner-9.jpg') no-repeat center;
			}
			.slide10 {
				background: url('../static/images/new-small-banner-10.jpg') no-repeat center;
			}
		}
		.all-pub {
			margin: 30px auto 0px;
			display: flex;
		    width: 80%;
		    flex-direction: row;
		    justify-content: space-between;
		}
	}

</style>