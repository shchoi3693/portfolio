$(function(){
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
	window.addEventListener('resize', () => {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
	});
	//nav toggle
	$(".toggle").on({
		click:function(){
			$(this).toggleClass("toggleOn");
			if($(this).hasClass("toggleOn")){
				$("nav").addClass("active");
			}else{
				$("nav").removeClass("active");
			}
		},
		mouseenter:function(){
			$(this).addClass("togglehover");
		},
		mouseleave:function(){
			$(this).removeClass("togglehover");
		}
	});

	//DETAIL MORE
	$(".more").on("click", function(){
		$(this).toggleClass("moreOn");
		if($(this).hasClass("moreOn")){
			$(".portfolio_detail .portfolio_left").addClass("show");
			$(this).text("BACK");
		}else{
			$(".portfolio_detail .portfolio_left").removeClass("show");
			$(this).text("DETAIL MORE");
		}
	});
	$(".btn_more_arr").on("click", function(){
		$(".portfolio_detail .portfolio_left").removeClass("show");
		$(".more").removeClass("moreOn");
		$(".more").text("DETAIL MORE");
	});

	//portfolio tab
	var aidx = 0;
	$(".portfolio_all").not(":first").hide();
	//page click
	function pageclick(){
		$(".left_main").css({animation:"detailmain01 1s ease forwards"});
		$(".portfolio_right").css({animation:"detailmain02 1s ease forwards"});
		setTimeout(function(){
			location.href ="portfolio.html?"+aidx
		},1000);
	}
	$(".portfolio_all").eq(aidx).find(".portfolio_right").on("click", function(){
		pageclick()
	});
	$(".portfolio_all").eq(aidx).find(".btn_wrap .btn_more").on("click", function(){
		pageclick()
	});
	$(".portfolio_card .btn_tab li").on("click", function(){
		aidx = $(this).index();
		$(".portfolio_all").css({display:"none"});
		$(".portfolio_all").eq(aidx).css({
			display:"flex"
		});
		$(".portfolio_all").eq(aidx).find(".portfolio_right").on("click", function(){
			pageclick()
		});
		$(".portfolio_all").eq(aidx).find(".btn_wrap .btn_more").on("click", function(){
			pageclick()
		});

		$(".portfolio_card .btn_tab li").removeClass("on");
		$(".portfolio_index").css({visibility:"hidden"});
		$(this).addClass("on");
	});

	$(".scroll_arr").on("click", function(){
		var scrollclick = $("#portfolio_main").offset().top;
		$("body,html").animate({
			scrollTop: scrollclick
		},600);
	});

});
//main scroll
function mainScroll(){
	$(window).on('mousewheel DOMMouseScroll', function(u){
		var delta = u.originalEvent.wheelDelta || u.originalEvent.detail*-1;
		if(delta < 0){
			var aboutTop = $("#portfolio_main").offset().top;
		}else{
			var aboutTop =  $(".about").offset().top;
		}
		$("body,html").stop().animate({
			scrollTop: aboutTop
		},600);
	});
}

//portfolio Detail
function listFn(){
	$.ajax({
		url:"web.xml",
		dataType:'text',
		success:function(data){
			//성공 start
			var pageUrl ='', pageSP ='', page = 0, pageName ='', itemNum = 0;
			var imgUrl='', concept='', color='', colorTag ='', colorSP='', imgSP = '', imgTag = '', imgW = '', skill='', tit='', idx = 0, tag = '', j=0, detailurl='';
			pageUrl = location.href;
			pageSP = pageUrl.split('?');
			page = parseInt(pageSP[1]);
				
			function dataLoad(){
				itemNum = 0, imgUrl='', concept='', color='', colorTag ='',colorSP='',imgSP = '', imgTag = '', imgW = '', skill='', tit='', idx = 0, tag = '', j=0 , k='', detailurl='';
				switch(page){
					case 0:pageName = "Web"; break; //PC Mobile
					case 1:pageName = "Promotion"; break; //프로모션
					case 2:pageName = "Study"; break; //자기개발
				}

				$(".portfolio_all").hide().eq(page).css({display:"flex"});
				
				//Allindex num
				$(data).find("item").each(function(i){
					if($(this).attr("name") == pageName){
						j<9 ? k = '0' : k='';
						tag += `<span name=${i}>${k}${++j}</span>`;
					}
				});
				$(".portfolio_index").html(tag);
				//left index span
				$(".portfolio_index span").eq(idx).addClass("on");
				//left portfolio_card tab
				$(".portfolio_card .btn_tab li").removeClass("on");
				$(".portfolio_card .btn_tab li").eq(page).addClass("on");

				//right scroll mark
				$(".portfolio_detailright ul").on('mousewheel DOMMouseScroll', function(u){
					var delta = u.originalEvent.wheelDelta || u.originalEvent.detail*-1;
					if(delta < 0){
						$(".scrollmark_right").hide();
					}
				});

				dbdata();
			}dataLoad();

			//left portfolio_card tab
			$(".portfolio_card .btn_tab li").on("click", function(){
				$(".portfolio_all").css({display:"none"});
				$(".portfolio_all").eq($(this).index()).css({display:"flex"});
				page = $(this).index();
				location.href = "portfolio.html?"+page;
				dataLoad();
			});

			function dbdata(){
				itemNum = parseInt($(".portfolio_index span").eq(idx).attr("name"));

				//detail animate right show
				$(".portfolio_all").eq(page).find(".portfolio_detailright ul").stop().delay(200).animate({
					left:"32px", opacity:0
				},500,function(){
					//right images
					imgTag = '';
					imgUrl = $(data).find("item").eq(itemNum).find("imgsrc").text();
					imgSP = imgUrl.split(',');
					for(var i=0; i<imgSP.length; i++){
						imgTag += `<li><img src=${imgSP[i]} alt="${concept}" /></li>`;
					}
					$(".portfolio_all").eq(page).find(".portfolio_detailright ul").html(imgTag);

					imgW = $(data).find("item").eq(itemNum).find("imgClass").text();
					$(".portfolio_all").eq(page).find(".portfolio_detailright ul li").addClass(imgW);

					setTimeout(function(){
						$(".portfolio_all").eq(page).find(".portfolio_detailright ul").stop().animate({
							left:0 , opacity:1
						},500);
					},100);
					
					$(".portfolio_detailright").mCustomScrollbar();
					$(".portfolio_detailright").mCustomScrollbar("scrollTo", 0)
				});

				//detail animate left
				$(".portfolio_all").eq(page).find(".left_detail").stop().animate({
					left:"-120px", opacity:0
				},500,function(){
					colorTag = '';
					tit = $(data).find("item").eq(itemNum).attr("name");
					detailurl = $(data).find("item").eq(itemNum).find("durl").html();
					concept = $(data).find("item").eq(itemNum).find("concept").text();
					skill = $(data).find("item").eq(itemNum).find("skill").html();
					color = $(data).find("item").eq(itemNum).find("color").text();
					colorSP = color.split(",");
					for(var i=0; i<colorSP.length; i++){
						colorTag += "<p><span style='background:"+colorSP[i]+"'></span> "+colorSP[i]+"</p>";
					}

					//bottom index
					const idxNum = $(".portfolio_index span").eq(idx).text();
					j<9 ? h = '0' : h='';
					$(".all_index").find("code:first").text(idxNum);
					$(".all_index").find("code:nth-of-type(2)").text(h+($(".portfolio_index span").length));
					
					//portfolio detail
					$(".portfolio_all").eq(page).find(".left_detail h4").text(tit+" "+idxNum);
					if(detailurl===undefined || detailurl===''){
						$(".portfolio_all").eq(page).find(".detailurl").html('');
					}else{
						$(".portfolio_all").eq(page).find(".detailurl").html(detailurl);
					}
					$(".portfolio_all").eq(page).find(".left_detail ul li:first-child span").text(concept);
					if(color==='' || color===undefined){
						$(".portfolio_all").eq(page).find(".left_detail ul li:nth-of-type(2)").hide();
					}else{
						$(".portfolio_all").eq(page).find(".left_detail ul li:nth-of-type(2)").show();
						$(".portfolio_all").eq(page).find(".color_detail").html(colorTag);
					}
					$(".portfolio_all").eq(page).find(".left_detail ul li:last-child span").html(skill);
					$(".portfolio_all").eq(page).find(".left_detail").stop().animate({
						left:"0px", opacity:1
					},500);
				});
			} 

			//left scroll
			scr = true;
			$(".portfolio_left").on('mousewheel DOMMouseScroll', function(u){
				var whDelta = u.originalEvent.wheelDelta || u.originalEvent.detail * -1;
				var leftix_all = $(".portfolio_index span").length;

				if(scr == true){
					if(whDelta < 0){
						idx++;
						itemNum++;
						$(".scrollmark_left").css({display:"none"});
					}else{
						idx--;
						itemNum--;
					}
					if(idx == leftix_all){idx=0;}
					if(idx==-1){idx=leftix_all-1;}

					$(".portfolio_index span").removeClass("on");
					$(".portfolio_index span").eq(idx).addClass("on");
					scr = false;
					setTimeout(function(){scr = true;},500);

					//data
					dbdata();
				}
			});

			//index click
			$(".portfolio_index span").on("click", function(){
				idx = $(this).index();
				$(".portfolio_index span").removeClass("on");
				$(".portfolio_index span").eq(idx).addClass("on");
				//data
				dbdata();
			});

		//성공 end
		},
		error:function(){
			alert("호출실패");
		}
	});
}

