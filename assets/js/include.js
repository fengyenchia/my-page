async function includeHTML(selector, file) {
    // 建立遮罩
    let mask = document.createElement('div');
    mask.style.position = 'fixed';
    mask.style.top = '0';
    mask.style.left = '0';
    mask.style.width = '100vw';
    mask.style.height = '100vh';
    mask.style.background = 'rgba(255,255,255,1)';
    mask.style.zIndex = '9999';
    mask.style.transition = 'opacity 0.3s';
    document.body.appendChild(mask);

    let element = document.querySelector(selector);
    if (element) {
        element.classList.add('fade-in');
        let response = await fetch(file);
        if (response.ok) {
            element.innerHTML = await response.text();
            setTimeout(() => {
                element.classList.remove('fade-in');
                // 淡出遮罩
                mask.style.opacity = '0';
                setTimeout(() => {
                    mask.remove();
                }, 400);
            }, 300);
        } else {
            mask.remove();
        }
    } else {
        mask.remove();
    }
}
