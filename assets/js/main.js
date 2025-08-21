// 導覽列漢堡按鈕動畫切換
document.addEventListener('DOMContentLoaded', function () {
	// 綁定 Bootstrap 展開/收合事件，切換動畫 class
	function setupNavbarToggle() {
		var toggler = document.querySelector('.navbar-toggler');
		var navCollapse = document.getElementById('navbarNav');
		if (!toggler || !navCollapse) return;

		// 展開時加上動畫 class
		navCollapse.addEventListener('show.bs.collapse', function () {
			toggler.querySelector('.line1').classList.add('line1-active');
			toggler.querySelector('.line2').classList.add('line2-active');
			toggler.querySelector('.line3').classList.add('line3-active');
		});
		// 關閉時移除動畫 class
		navCollapse.addEventListener('hide.bs.collapse', function () {
			toggler.querySelector('.line1').classList.remove('line1-active');
			toggler.querySelector('.line2').classList.remove('line2-active');
			toggler.querySelector('.line3').classList.remove('line3-active');
		});
	}

	// 因為導覽列是動態載入，需輪詢直到元素出現再綁定
	let tries = 0;
	function trySetup() {
		if (document.querySelector('.navbar-toggler') && document.getElementById('navbarNav')) {
			setupNavbarToggle();
		} else if (tries < 20) {
			tries++;
			setTimeout(trySetup, 100);
		}
	}
	trySetup();
});
