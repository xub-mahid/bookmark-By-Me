let allBookmarks = []

fetch('./datas.json')
  .then(res => res.json())
  .then(data => {
    allBookmarks = data.bookmarks
    
    const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
    allBookmarks = [...allBookmarks, ...savedBookmarks];

    // Archived bookmarks
    const Archivedx = document.getElementById('Archivedx');
    const archived = allBookmarks.filter(item =>item.isArchived === true);
      archived.forEach(bookmarkInArchived => {
      const cardA = document.createElement('div');
    cardA.className = "bg-white rounded-xl p-4 shadow-sm border border-gray-200 w-full max-w-[400px]";
    cardA.innerHTML = `  
      <div class="border-b-2 mb-2 p-1 flex flex-col sm:flex-row gap-2">
    <div class="flex gap-3 flex-1 min-w-0">
      <div class="w-8 h-8 flex-shrink-0"><img src=${bookmarkInArchived.favicon} alt="404"></div>
      <div class="min-w-0 flex-1">
      <h3 class="text-base sm:text-lg font-semibold truncate">${bookmarkInArchived.title}</h3>
      <a href=${bookmarkInArchived.url} target="_blank" class="text-xs sm:text-sm text-gray-500 truncate block">${bookmarkInArchived.url}</a></div>
    </div>
  <div class="relative group flex-shrink-0">
    <button class="menu-button text-gray-500 hover:text-gray-700">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-5 h-5" viewBox="0 0 16 16">
        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
      </svg>
    </button>
    <div class="dropdown absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-lg hidden z-10">
      <ul class="text-sm text-gray-700">
        <li>
          <a href=${bookmarkInArchived.url} target="_blank" class="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
            <i class="bi bi-box-arrow-up-right"></i> Visit
          </a>
        </li>
        <li>
          <button class="copy-url flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100" data-url="${bookmarkInArchived.url}">
            <i class="bi bi-link-45deg"></i> Copy URL
          </button>
        </li>
        <li>
          <button class="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100">
            <i class="bi bi-pin-angle"></i> Unpin
          </button>
        </li>
        <li>
          <button class="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100">
            <i class="bi bi-pencil"></i> Edit
          </button>
        </li>
        <li>
          <button class="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100">
            <i class="bi bi-archive"></i> Archive
          </button>
        </li>
      </ul>
    </div>
  </div>
</div>

<div class="h-[100px] sm:h-[130px] overflow-auto scroll-auto">
  <p class="text-xs sm:text-sm text-gray-600 mb-3">${bookmarkInArchived.description}</p>
</div>

<div class="flex gap-2 flex-wrap mb-2">
  <span class="bg-sky-50 text-gray-700 px-2 py-1 rounded text-xs">${bookmarkInArchived.tags[0]}</span>
  <span class="bg-sky-50 text-gray-700 px-2 py-1 rounded text-xs">${bookmarkInArchived.tags[1]}</span>
  <span class="bg-sky-50 text-gray-700 px-2 py-1 rounded text-xs">${bookmarkInArchived.tags[2]}</span>
  
</div>

<div class="text-xs text-gray-400 flex flex-wrap gap-2 mt-1 border-t p-1">
<span><i class="bi bi-eye-fill"></i> ${bookmarkInArchived.visitCount}</span>
<span><i class="bi bi-calendar-check"></i> ${bookmarkInArchived.createdAt}</span>
<span><i class="bi bi-clock"></i> ${bookmarkInArchived.lastVisited}</span>
<span class="bg-sky-50 text-gray-700 px-2 font-extralight rounded">Archived</span>
</div>  
      `;
    Archivedx.appendChild(cardA);
  });

    // Display all bookmarks
    displayBookmarks(allBookmarks);

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function(){
      const text = searchInput.value.toLowerCase();
      const filterData = allBookmarks.filter(fData => fData.title.toLowerCase().includes(text))
      displayBookmarks(filterData);
    });

    //  TAG FILTER FUNCTIONALITY 
    const tagFilters = document.querySelectorAll('.tag-filter');
    tagFilters.forEach(filter => {
      filter.addEventListener('change', function() {
        filterBookmarks();
      });
    });

    function filterBookmarks() {
      const checkedTags = Array.from(tagFilters)
        .filter(cb => cb.checked)
        .map(cb => cb.nextSibling.textContent.trim().toLowerCase());
      
      if (checkedTags.length === 0) {
        displayBookmarks(allBookmarks);
      } else {
        const filtered = allBookmarks.filter(bookmark => 
          bookmark.tags.some(tag => checkedTags.includes(tag.toLowerCase()))
        );
        displayBookmarks(filtered);
      }
    }

  })
  .catch(err => console.error("Error loading data:", err));

//  DISPLAY BOOKMARKS FUNCTION 
function displayBookmarks(bookmarks) {
  const cardBox = document.getElementById('cardBox');
  cardBox.innerHTML = "";

  bookmarks.forEach(bookmark => {
    const card = document.createElement('div');
    card.className = "bg-white rounded-xl p-4 shadow-sm border border-gray-200 w-full max-w-[400px]";
    card.innerHTML = `  
      <div class="border-b-2 mb-2 p-1 flex flex-col sm:flex-row gap-2">
    <div class="flex gap-3 flex-1 min-w-0">
      <div class="w-8 h-8 flex-shrink-0"><img src=${bookmark.favicon} alt="404"></div>
      <div class="min-w-0 flex-1">
      <h3 class="text-base sm:text-lg font-semibold truncate">${bookmark.title}</h3>
      <a href=${bookmark.url} target="_blank" class="text-xs sm:text-sm text-gray-500 truncate block">${bookmark.url}</a></div>
    </div>

  <div class="relative group flex-shrink-0">
    <button class="menu-button text-gray-500 hover:text-gray-700">
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-5 h-5" viewBox="0 0 16 16">
        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
      </svg>
    </button>

    <div class="dropdown absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-lg hidden z-10">
      <ul class="text-sm text-gray-700">
        <li>
          <a href=${bookmark.url} target="_blank" class="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
            <i class="bi bi-box-arrow-up-right"></i> Visit
          </a>
        </li>
        <li>
          <button class="copy-url flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100" data-url="${bookmark.url}">
            <i class="bi bi-link-45deg"></i> Copy URL
          </button>
        </li>
        <li>
          <button class="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100">
            <i class="bi bi-pin-angle"></i> Unpin
          </button>
        </li>
        <li>
          <button class="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100">
            <i class="bi bi-pencil"></i> Edit
          </button>
        </li>
        <li>
          <button class="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100">
            <i class="bi bi-archive"></i> Archive
          </button>
        </li>
      </ul>
    </div>
  </div>
</div>

<div class="h-[100px] sm:h-[130px] overflow-auto scroll-auto">
  <p class="text-xs sm:text-sm text-gray-600 mb-3">${bookmark.description}</p>
</div>

<div class="flex gap-2 flex-wrap mb-2">
  <span class="bg-sky-50 text-gray-700 px-2 py-1 rounded text-xs">${bookmark.tags[0]}</span>
  <span class="bg-sky-50 text-gray-700 px-2 py-1 rounded text-xs">${bookmark.tags[1]}</span>
  <span class="bg-sky-50 text-gray-700 px-2 py-1 rounded text-xs">${bookmark.tags[2]}</span>
</div>

<div class="text-xs text-gray-400 flex flex-wrap gap-2 mt-1 border-t p-1">
  <span><i class="bi bi-eye-fill"></i> ${bookmark.visitCount}</span>
  <span><i class="bi bi-calendar-check"></i> ${bookmark.createdAt}</span>
  <span><i class="bi bi-clock"></i> ${bookmark.lastVisited}</span>
</div>  
    `;
    cardBox.appendChild(card);
  });

  // ✅ 3 DOT MENU TOGGLE - 
  document.querySelectorAll('.menu-button').forEach(button => {
    button.addEventListener('click', function(e) {
      e.stopPropagation();
      const dropdown = this.nextElementSibling;
      
      document.querySelectorAll('.dropdown').forEach(d => {
        if (d !== dropdown) d.classList.add('hidden');
      });
     
      dropdown.classList.toggle('hidden');
    });
  });

  //  COPY URL FUNCTIONALITY -
  document.querySelectorAll('.copy-url').forEach(btn => {
    btn.addEventListener('click', function() {
      const url = this.getAttribute('data-url');
      navigator.clipboard.writeText(url).then(() => {
        alert('✅ URL কপি হয়েছে!');
      });
    });
  });
}

//  CLOSE DROPDOWN WHEN CLICKING OUTSIDE 
document.addEventListener('click', function() {
  document.querySelectorAll('.dropdown').forEach(dropdown => {
    dropdown.classList.add('hidden');
  });
});

  const addBookMark = document.getElementById('addBookMark');
  const addBookmarkBtn = document.getElementById('addBookmarkBtn');
  const HomeArchived = document.getElementsByClassName('HomeArchived');
  addBookmarkBtn.addEventListener('click', () => {
    addBookMark.classList.remove('hidden');
  });

  const closeAddBookmark = document.getElementById('CancelBookMark1');
  closeAddBookmark.addEventListener('click', () => {
    addBookMark.classList.add('hidden');
  });

  const CancelBookMark2 = document.getElementById('CancelBookMark2');
  CancelBookMark2.addEventListener('click', () => {
    addBookMark.classList.add('hidden');
  });

 function archivedF(){
   cardBox.classList.remove('grid');
   cardBox.classList.add('hidden');
   Archivedx.classList.remove('hidden')
   Archivedx.classList.add('grid')
   HomeArchived[1].classList.add('bg-gray-200')
   HomeArchived[0].classList.remove('bg-gray-200')

}
function homeF(){
  cardBox.classList.remove('hidden')
  cardBox.classList.add('grid')
  Archivedx.classList.add('hidden')
  HomeArchived[0].classList.add('bg-gray-200')
  HomeArchived[1].classList.remove('bg-gray-200')
}

const addBookmark = document.getElementById('addBookmark');
if (addBookmark) {
  addBookmark.addEventListener('click', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const WebsiteURL = document.getElementById('WebsiteURL').value;
    const textarea = document.getElementById('textarea').value;
    const tags = document.getElementById('tags').value;
    
    if (!title || !WebsiteURL) {
      alert('Please fill in all required fields.');
      return;
    }

  const bookmark = {
    title: title,
    url: WebsiteURL,
    description: textarea || 'No description',
    tags: tags ? tags.split(',').map(tag => tag.trim()) : [''],
    visitCount: 0,
    createdAt: new Date().toLocaleString(),
    lastVisited: 'NOT VISITED',
    pinned: false,
    isArchived: false,
    favicon: 'https://www.google.com/s2/favicons?domain=' + WebsiteURL
  };

  let savedBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
  savedBookmarks.push(bookmark);
  localStorage.setItem('bookmarks', JSON.stringify(savedBookmarks));
  
  allBookmarks.push(bookmark);
  
  const cardBox = document.getElementById('cardBox');
  
  if (!cardBox) {
    alert('Error: cardBox element not found!');
    return;
  }
  const card = document.createElement('div');
  card.className = "bg-white rounded-xl p-4 shadow-sm border border-gray-200 w-full max-w-[400px]";
  card.innerHTML = `  
    <div class="border-b-2 mb-2 p-1 flex flex-col sm:flex-row gap-2">
      <div class="flex gap-3 flex-1 min-w-0">
        <div class="w-8 h-8 flex-shrink-0"><img src="${bookmark.favicon}" alt="404"></div>
        <div class="min-w-0 flex-1">
          <h3 class="text-base sm:text-lg font-semibold truncate">${bookmark.title}</h3>
          <a href="${bookmark.url}" target="_blank" class="text-xs sm:text-sm text-gray-500 truncate block">${bookmark.url}</a>
        </div>
      </div>
      <div class="relative group flex-shrink-0">
        <button class="menu-button text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-5 h-5" viewBox="0 0 16 16">
            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
          </svg>
        </button>
        <div class="dropdown absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-xl shadow-lg hidden z-10">
          <ul class="text-sm text-gray-700">
            <li><a href="${bookmark.url}" target="_blank" class="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"><i class="bi bi-box-arrow-up-right"></i> Visit</a></li>
            <li><button class="copy-url flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100" data-url="${bookmark.url}"><i class="bi bi-link-45deg"></i> Copy URL</button></li>
            <li><button class="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100"><i class="bi bi-pin-angle"></i> Unpin</button></li>
            <li><button class="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100"><i class="bi bi-pencil"></i> Edit</button></li>
            <li><button class="flex items-center gap-2 w-full text-left px-4 py-2 hover:bg-gray-100"><i class="bi bi-archive"></i> Archive</button></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="h-[100px] sm:h-[130px] overflow-auto scroll-auto">
      <p class="text-xs sm:text-sm text-gray-600 mb-3">${bookmark.description}</p>
    </div>
    <div class="flex gap-2 flex-wrap mb-2">
      ${bookmark.tags.map(tag => `<span class="bg-sky-50 text-gray-700 px-2 py-1 rounded text-xs">${tag}</span>`).join('')}
    </div>
    <div class="text-xs text-gray-400 flex flex-wrap gap-2 mt-1 border-t p-1">
      <span><i class="bi bi-eye-fill"></i> ${bookmark.visitCount}</span>
      <span><i class="bi bi-calendar-check"></i> ${bookmark.createdAt}</span>
      <span><i class="bi bi-clock"></i> ${bookmark.lastVisited}</span>
      <span class="bg-green-100 text-green-700 px-2 py-1 rounded text-xs ml-auto">JUST ADDED</span>
    </div>  
  `;
  
  cardBox.insertBefore(card, cardBox.firstChild);
  
  document.getElementById('title').value = '';
  document.getElementById('WebsiteURL').value = '';
  document.getElementById('textarea').value = '';
  document.getElementById('tags').value = '';
  addBookMark.classList.add('hidden');
  
  alert('Bookmark added!');
  
  setTimeout(() => {
    const badge = card.querySelector('.bg-green-100');
    if (badge) badge.remove();
  }, 5000);
});
} else {
  console.error('addBookmark button not found!');
}

// ✅ SORT FUNCTIONALITY - 
const sortButton = document.getElementById("menu-button");
const sortDropdown = document.getElementById("dropdown");

if (sortButton && sortDropdown) {
  const sortOptions = sortDropdown.querySelectorAll('a');
  
  sortOptions.forEach(option => {
    option.addEventListener('click', function(e) {
      e.preventDefault();
      const sortType = this.textContent.trim();
      
      let sortedBookmarks = [...allBookmarks];
      
      if (sortType === 'Recently added') {
        sortedBookmarks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      } else if (sortType === 'Recently visited') {
        sortedBookmarks.sort((a, b) => {
          if (a.lastVisited === 'NOT VISITED') return 1;
          if (b.lastVisited === 'NOT VISITED') return -1;
          return new Date(b.lastVisited) - new Date(a.lastVisited);
        });
      } else if (sortType === 'Most visited') {
        sortedBookmarks.sort((a, b) => b.visitCount - a.visitCount);
      }
      
      displayBookmarks(sortedBookmarks);
      sortDropdown.classList.add('hidden');
    });
  });
}