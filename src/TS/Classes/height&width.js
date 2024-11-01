const height = item.offsetHeight; // or use item.getBoundingClientRect().height
const width = item.offsetWidth; // or use item.getBoundingClientRect().width
document.getElementById('itemHeight').value = height + 'px';
document.getElementById('itemWidth').value = width + 'px';