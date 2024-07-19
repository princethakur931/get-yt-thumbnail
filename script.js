document.addEventListener("DOMContentLoaded", function() {
    loadHistory();
});

function loadHistory() {
    const history = JSON.parse(localStorage.getItem('urlHistory')) || [];
    const datalist = document.getElementById('urlHistory');
    const historyList = document.getElementById('historyList');
    datalist.innerHTML = '';
    historyList.innerHTML = '';

    history.forEach((url, index) => {
        const option = document.createElement('option');
        option.value = url;
        datalist.appendChild(option);

        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
            <span>${url}</span>
            <button class="btn btn-danger btn-sm" onclick="deleteUrl(${index})">Delete</button>
        `;
        historyList.appendChild(li);
    });
}

function dynamicUrl(type) {
    let url = document.getElementById('url').value;
    let match = url.match(/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube(-nocookie)?\.com|youtu.be))(\/(?:[\w\-]+\?v=|shorts\/|embed\/|v\/)?)([\w\-]+)(\S+)?$/);
    if (!match) {
        alert("Invalid YouTube URL");
        return;
    }
    let id = match[6];
    let imgUrl;
    if (type === 1) {
        imgUrl = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
    } else if (type === 2) {
        imgUrl = `https://img.youtube.com/vi_webp/${id}/maxresdefault.webp`;
    } else {
        imgUrl = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
    }
    let img = document.getElementById('img');
    img.src = imgUrl;
    img.setAttribute('data-url', imgUrl);

    saveUrl(url);

    return imgUrl;
}

function saveUrl(url) {
    let history = JSON.parse(localStorage.getItem('urlHistory')) || [];
    if (!history.includes(url)) {
        history.push(url);
        localStorage.setItem('urlHistory', JSON.stringify(history));
        loadHistory();
    }
}

function deleteUrl(index) {
    let history = JSON.parse(localStorage.getItem('urlHistory'));
    if (history) {
        history.splice(index, 1);
        localStorage.setItem('urlHistory', JSON.stringify(history));
        loadHistory();
    }
}

function download() {
    let img = document.getElementById('img');
    let imgUrl = img.getAttribute('data-url') || img.src;
    let link = document.createElement('a');
    link.style.display = 'none';
    link.href = imgUrl;
    link.download = 'get-yt-thumb.jpg';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function fullPage() {
    const fullPage = document.querySelector('#fullpage');
    fullPage.style.backgroundImage = 'url(' + document.getElementById('img').src + ')';
    fullPage.style.display = 'block';
}
