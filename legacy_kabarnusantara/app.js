/**
 * KabarNusantara - Portal Berita Indonesia Terkini
 * Logic & State Management
 */

// Dataset Berita Indonesia Terkini
const defaultNews = [
  {
    id: 1,
    title: "Pemerintah Resmikan Proyek Kereta Cepat Trans-Jawa Tahap II Menuju Surabaya",
    summary: "Proyek strategis nasional ini ditargetkan mampu memangkas waktu tempuh Jakarta-Surabaya menjadi hanya 3,5 jam dengan teknologi ramah lingkungan terbaru.",
    content: `
      <p><strong>JAKARTA</strong> — Pemerintah Republik Indonesia hari ini secara resmi melakukan peletakan batu pertama (groundbreaking) untuk perluasan jalur Kereta Cepat Trans-Jawa Tahap II yang menghubungkan Bandung hingga Surabaya.</p>
      <p>Menteri Koordinator Bidang Kemaritiman dan Investasi bersama Menteri Perhubungan menyampaikan bahwa proyek ini merupakan lompatan besar dalam modernisasi transportasi massal di Indonesia. Jalur sepanjang 500 kilometer ini akan melintasi kota-kota strategis seperti Cirebon, Semarang, Purwokerto, hingga finis di Stasiun Pasar Turi, Surabaya.</p>
      <p>"Konektivitas antarkota di pulau Jawa akan melonjak drastis. Mobilitas masyarakat yang efisien akan mendorong perputaran ekonomi baru di wilayah pesisir utara dan tengah Jawa," ungkap pejabat dalam sambutannya di Stasiun Halim.</p>
      <p>Proyek ini menggunakan rangkaian kereta berteknologi hemat energi generasi kelima dengan kecepatan operasional hingga 350 km/jam, dilengkapi sensor ketahanan gempa canggih yang terintegrasi langsung dengan BMKG.</p>
    `,
    category: "Nasional",
    author: "Budi Santoso",
    source: "KabarNusantara Antara",
    date: "15 Menit lalu",
    timestamp: Date.now() - 15 * 60 * 1000,
    readTime: "4 menit baca",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
    tags: ["Transportasi", "Kereta Cepat", "Infrastruktur", "Jawa"],
    isHeadline: true,
    isPopular: true,
    isBreaking: true
  },
  {
    id: 2,
    title: "BI Catat Cadangan Devisa Menguat Jadi USD 152 Miliar Didorong Ekspor Manufaktur",
    summary: "Kinerja ekspor produk elektronik dan hilirisasi nikel serta nikel sulfat memperkokoh stabilitas nilai tukar Rupiah di pasar valuta global.",
    content: `
      <p><strong>JAKARTA</strong> — Bank Indonesia (BI) merilis posisi cadangan devisa Indonesia pada akhir bulan lalu yang mengalami peningkatan signifikan hingga menembus angka USD 152,4 miliar.</p>
      <p>Direktur Eksekutif Departemen Komunikasi BI menjelaskan bahwa posisi cadangan devisa tersebut setara dengan pembiayaan 6,8 bulan impor atau 6,6 bulan impor dan pembayaran utang luar negeri pemerintah, jauh berada di atas standar kecukupan internasional sekitar 3 bulan impor.</p>
      <p>"Peningkatan cadangan devisa ini terutama ditopang oleh penerimaan pajak dan devisa hasil ekspor sektor manufaktur berteknologi tinggi, serta penguatan sektor hilirisasi mineral," jelasnya.</p>
      <p>Pasar merespons positif data tersebut dengan penguatan tipis kurs Rupiah terhadap Dolar AS di level Rp 15.420 per dolar AS pada penutupan perdagangan sesi pertama hari ini.</p>
    `,
    category: "Ekonomi",
    author: "Ratna Sari Dewi",
    source: "Ekonomi Bisnis ID",
    date: "35 Menit lalu",
    timestamp: Date.now() - 35 * 60 * 1000,
    readTime: "3 menit baca",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=800&q=80",
    tags: ["Bank Indonesia", "Rupiah", "Ekonomi", "Devisa"],
    isHeadline: false,
    isPopular: true,
    isBreaking: false
  },
  {
    id: 3,
    title: "Startup AI Indonesia Luncurkan Model Bahasa Dialek Nusantara Pertama untuk Pendidikan",
    summary: "Model kecerdasan buatan ini mampu memahami lebih dari 30 bahasa daerah Indonesia mulai dari Jawa, Sunda, Minang, hingga Bugis secara presisi.",
    content: `
      <p><strong>BANDUNG</strong> — Ekosistem teknologi tanah air kembali mencetak prestasi membanggakan. Kolaborasi konsorsium startup AI lokal dan akademisi ITB meluncurkan LLM (Large Language Model) berarsitektur lokal bernama 'Nusantara-LM'.</p>
      <p>Model kecerdasan artifisial ini dirancang khusus guna melestarikan dan menjembatani pembelajaran digital di daerah-daerah 3T (Terdepan, Terpencil, dan Tertinggal) menggunakan bahasa ibu masing-masing siswa.</p>
      <p>"Banyak anak didik di daerah pedalaman lebih cepat menyerap materi sains ketika diterangkan dengan analogi dialek setempat. Nusantara-LM mampu menerjemahkan modul kurikulum nasional ke 34 dialek daerah secara natural," jelas ketua tim peneliti.</p>
      <p>Aplikasi ini akan diintegrasikan secara cuma-cuma ke dalam tablet belajar yang didistribusikan ke ribuan sekolah dasar di pelosok nusantara.</p>
    `,
    category: "Teknologi",
    author: "Dimas Arya",
    source: "TeknoNusantara",
    date: "1 Jam lalu",
    timestamp: Date.now() - 60 * 60 * 1000,
    readTime: "5 menit baca",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    tags: ["Kecerdasan Buatan", "AI", "Startup", "Pendidikan"],
    isHeadline: false,
    isPopular: true,
    isBreaking: true
  },
  {
    id: 4,
    title: "Timnas Sepak Bola Indonesia Amankan Tiket Putaran Final Piala Asia Usai Kalahkan Lawan 2-0",
    summary: "Gol sundulan spektakuler di babak kedua memastikan Garuda melangkah mulus dengan rekor tak terkalahkan di babak kualifikasi grup.",
    content: `
      <p><strong>SURABAYA</strong> — Stadion Gelora Bung Tomo bergemuruh saat peluit panjang tanda berakhirnya pertandingan dibunyikan. Tim Nasional Indonesia sukses mengunci kemenangan krusial 2-0 atas lawannya dalam laga pamungkas babak kualifikasi.</p>
      <p>Gol pembuka lahir pada menit ke-38 lewat tendangan bebas melengkung dari luar kotak penalti. Di menit ke-72, serangan balik kilat yang dibangun dari lini sayap kanan diakhiri tandukan tajam yang mempertegas keunggulan merah-putih.</p>
      <p>Pelatih kepala mengapresiasi determinasi tinggi dan kedisiplinan taktik para pemain muda. "Anak-anak bermain dengan hati dan disiplin taktik luar biasa sepanjang 90 menit," ujarnya dalam konferensi pers usai laga.</p>
      <p>Dengan hasil ini, Indonesia kokoh di puncak klasemen grup dan resmi mengamankan satu tempat di panggung bergengsi Piala Asia mendatang.</p>
    `,
    category: "Olahraga",
    author: "Rizky Firmansyah",
    source: "Kabar Olahraga",
    date: "2 Jam lalu",
    timestamp: Date.now() - 120 * 60 * 1000,
    readTime: "3 menit baca",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80",
    tags: ["Timnas Indonesia", "Sepak Bola", "Piala Asia", "Garuda"],
    isHeadline: false,
    isPopular: true,
    isBreaking: false
  },
  {
    id: 5,
    title: "Mobil Listrik Karya Anak Bangsa Resmi Masuk Jalur Produksi Massal di Cikarang",
    summary: "Dibanderol dengan harga kompetitif di bawah Rp 200 juta, kendaraan ramah lingkungan ini memiliki jangkauan baterai hingga 380 km per pengisian penuh.",
    content: `
      <p><strong>BEKASI</strong> — Industri otomotif nasional menorehkan babak baru. Pabrik perakitan kendaraan listrik berteknologi tinggi di Cikarang resmi memulai produksi skala komersial untuk mobil listrik kompak buatan insinyur Indonesia.</p>
      <p>Kendaraan perkotaan ini mengusung baterai berbasis LFP yang diproduksi menggunakan bahan baku olahan dalam negeri dengan Tingkat Kandungan Dalam Negeri (TKDN) mencapai 72 persen.</p>
      <p>"Kami membuktikan bahwa tenaga ahli Indonesia mampu merancang mobil listrik yang modern, aman, dan terjangkau bagi keluarga muda," jelas Direktur Utama PT Industri Kendaraan Nasional.</p>
      <p>Pemesanan pre-order batch pertama sebanyak 5.000 unit langsung ludes dalam waktu kurang dari 48 jam sejak pemesanan dibuka.</p>
    `,
    category: "Otomotif",
    author: "Hendri Prasetyo",
    source: "OtoUpdate Indonesia",
    date: "3 Jam lalu",
    timestamp: Date.now() - 180 * 60 * 1000,
    readTime: "4 menit baca",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80",
    tags: ["Mobil Listrik", "EV", "Otomotif", "Karya Bangsa"],
    isHeadline: false,
    isPopular: false,
    isBreaking: false
  },
  {
    id: 6,
    title: "Festival Film Internasional Indonesia 2026 Dibuka: 120 Sinema Dunia Tayang",
    summary: "Sineas muda lokal mendominasi nominasi karya cerita pendek dan dokumenter budaya nusantara yang memukau kurator mancanegara.",
    content: `
      <p><strong>YOGYAKARTA</strong> — Pembukaan Festival Film Internasional yang digelar di kawasan cagar budaya Yogyakarta berlangsung meriah dihadiri para sutradara, aktor, dan produser dari 45 negara.</p>
      <p>Festival tahun ini menyoroti tema 'Suara Samudra: Refleksi Budaya Kepulauan', menampilkan ragam film indie, fiksi ilmiah, serta dokumenter yang mendokumentasikan kekayaan tradisi lisan di Indonesia timur.</p>
      <p>Kementerian Kebudayaan menyatakan komitmennya untuk terus memperbesar dana abadi perfilman guna mendorong sinema Indonesia menembus kompetisi bergengsi di Cannes dan Berlin.</p>
    `,
    category: "Hiburan",
    author: "Siti Rahmawati",
    source: "Kultura Media",
    date: "4 Jam lalu",
    timestamp: Date.now() - 240 * 60 * 1000,
    readTime: "3 menit baca",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
    tags: ["Film", "Budaya", "Festival", "Yogyakarta"],
    isHeadline: false,
    isPopular: false,
    isBreaking: false
  },
  {
    id: 7,
    title: "Kemendikbud Rilis Kurikulum Eksplorasi Digital untuk Siswa SMP dan SMA Se-Indonesia",
    summary: "Pembelajaran pemrograman dasar, etika bermedia digital, dan literasi keamanan siber kini resmi menjadi bagian mata pelajaran wajib.",
    content: `
      <p><strong>JAKARTA</strong> — Menyikapi perkembangan teknologi kecerdasan buatan dan ruang digital yang sangat pesat, Kementerian Pendidikan resmi meluncurkan kurikulum baru 'Eksplorasi Digital dan Komputasi'.</p>
      <p>Melalui kurikulum ini, siswa tidak hanya diajarkan cara mengoperasikan perangkat, melainkan dilatih berpikir komputasional, membedakan disinformasi (hoaks), menjaga privasi data pribadi, dan memanfaatkan tools digital secara produktif.</p>
      <p>"Anak-anak kita harus dipersiapkan menjadi pencipta teknologi, bukan sekadar konsumen teknologi dari negara lain," tegas Menteri Pendidikan dalam peluncuran kurikulum di Jakarta.</p>
    `,
    category: "Edukasi",
    author: "Dra. Nurul Hidayah",
    source: "Edukasi Pos",
    date: "5 Jam lalu",
    timestamp: Date.now() - 300 * 60 * 1000,
    readTime: "4 menit baca",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    tags: ["Edukasi", "Kurikulum", "Siswa", "Literasi Digital"],
    isHeadline: false,
    isPopular: false,
    isBreaking: false
  },
  {
    id: 8,
    title: "Survei Pariwisata: Labuan Bajo dan Raja Ampat Masuk 10 Destinasi Terindah Dunia",
    summary: "Penerapan konsep ecotourism dan pembatasan kuota pengunjung berbasis konservasi menuai pujian tinggi dari badan wisata internasional.",
    content: `
      <p><strong>LABUAN BAJO</strong> — Dua surga bahari Indonesia, Labuan Bajo di Nusa Tenggara Timur dan Raja Ampat di Papua Barat Daya, dinobatkan sebagai salah satu dari 10 destinasi alam terindah di dunia oleh survei tahunan majalah perjalanan global terkemuka.</p>
      <p>Penilaian didasarkan pada keaslian keanekaragaman terumbu karang, keramahan komunitas lokal, serta keberhasilan implementasi retribusi konservasi lingkungan yang transparan.</p>
      <p>Kunjungan wisatawan yang teredukasi diproyeksikan memberikan multiplier effect bagi UMKM kuliner lokal, persewaan kapal pinisi, dan kerajinan tenun tradisional setempat.</p>
    `,
    category: "Nasional",
    author: "Wayan Sudirman",
    source: "Pesona Nusantara",
    date: "6 Jam lalu",
    timestamp: Date.now() - 360 * 60 * 1000,
    readTime: "3 menit baca",
    image: "https://images.unsplash.com/photo-1516690561799-46d8f74f9abf?auto=format&fit=crop&w=800&q=80",
    tags: ["Pariwisata", "Labuan Bajo", "Raja Ampat", "Wisata Alam"],
    isHeadline: false,
    isPopular: true,
    isBreaking: false
  }
];

// App State
class NewsApp {
  constructor() {
    this.articles = [...defaultNews];
    this.currentCategory = 'all';
    this.searchQuery = '';
    this.savedIds = JSON.parse(localStorage.getItem('kabarnusantara_saved') || '[]');
    this.isShowingSavedOnly = false;
    this.currentModalArticle = null;
    this.isSpeaking = false;
    this.speechUtterance = null;

    this.init();
  }

  init() {
    this.initTheme();
    this.initDateTime();
    this.initEventListeners();
    this.renderBreakingTicker();
    this.renderTrendingTags();
    this.renderPopularList();
    this.render();
    this.updateBookmarkBadge();
    
    // Check if live RSS feed can be fetched gracefully
    this.fetchLiveFeed();
  }

  // Live RSS Integration with graceful fallback
  async fetchLiveFeed() {
    try {
      // Trying RSS-to-JSON for Antara Terkini or CNN Indonesia
      const response = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https://www.antaranews.com/rss/terkini.xml', {
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(4000)
      });
      if (!response.ok) return;
      const data = await response.json();
      if (data && data.status === 'ok' && Array.isArray(data.items) && data.items.length > 0) {
        const liveArticles = data.items.slice(0, 6).map((item, index) => {
          return {
            id: 1000 + index,
            title: item.title,
            summary: item.description ? item.description.replace(/<[^>]*>?/gm, '').slice(0, 140) + '...' : 'Berita terkini dari koresponden Antara News.',
            content: `<p>${item.description || item.content || item.title}</p><p>Sumber berita resmi: <a href="${item.link}" target="_blank" rel="noopener" class="text-brand-600 underline">Baca artikel asli di Antara</a>.</p>`,
            category: item.categories && item.categories.length > 0 ? this.mapCategory(item.categories[0]) : "Nasional",
            author: item.author || "Antara News Terkini",
            source: "Antara News",
            date: "Baru saja",
            timestamp: new Date(item.pubDate).getTime() || Date.now(),
            readTime: "3 menit baca",
            image: item.enclosure?.link || item.thumbnail || "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80",
            tags: ["Terkini", "Live Update", "Nasional"],
            isHeadline: false,
            isPopular: false,
            isBreaking: true
          };
        });

        // Merge without duplicates
        this.articles = [...liveArticles, ...this.articles];
        this.renderBreakingTicker();
        this.render();
      }
    } catch (e) {
      // Offline or network error: defaultNews handles everything seamlessly
      console.log("Menggunakan arsip berita terkini kurasi lokal:", e.message);
    }
  }

  mapCategory(raw) {
    const lower = (raw || '').toLowerCase();
    if (lower.includes('ekonomi') || lower.includes('bisnis') || lower.includes('pasar')) return 'Ekonomi';
    if (lower.includes('tekno') || lower.includes('gadget') || lower.includes('digital')) return 'Teknologi';
    if (lower.includes('bola') || lower.includes('sport') || lower.includes('olahraga')) return 'Olahraga';
    if (lower.includes('hiburan') || lower.includes('seleb') || lower.includes('film')) return 'Hiburan';
    if (lower.includes('otomotif') || lower.includes('mobil') || lower.includes('motor')) return 'Otomotif';
    if (lower.includes('edukasi') || lower.includes('pendidikan')) return 'Edukasi';
    return 'Nasional';
  }

  // Theme Management
  initTheme() {
    const isDark = localStorage.getItem('kabarnusantara_theme') === 'dark' ||
      (!('kabarnusantara_theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', () => {
        const currentlyDark = document.documentElement.classList.contains('dark');
        if (currentlyDark) {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('kabarnusantara_theme', 'light');
          this.showToast('Mode terang diaktifkan', 'fas fa-sun text-amber-500');
        } else {
          document.documentElement.classList.add('dark');
          localStorage.setItem('kabarnusantara_theme', 'dark');
          this.showToast('Mode gelap diaktifkan', 'fas fa-moon text-indigo-400');
        }
      });
    }
  }

  // Date and Live Clock WIB
  initDateTime() {
    const dateEl = document.getElementById('current-date');
    const clockEl = document.getElementById('live-clock');

    const updateClock = () => {
      const now = new Date();
      
      // Indonesian Date Format
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Jakarta' };
      const dateStr = now.toLocaleDateString('id-ID', options);
      if (dateEl) {
        dateEl.innerHTML = `<i class="far fa-calendar-alt text-brand-600"></i> ${dateStr}`;
      }

      // 24 Hour clock
      const timeStr = now.toLocaleTimeString('id-ID', { hour12: false, timeZone: 'Asia/Jakarta' });
      if (clockEl) {
        clockEl.innerHTML = `<i class="far fa-clock text-brand-600"></i> ${timeStr} WIB`;
      }
    };

    updateClock();
    setInterval(updateClock, 1000);
  }

  // Event Listeners
  initEventListeners() {
    // Category Tabs
    const tabsContainer = document.getElementById('category-tabs');
    if (tabsContainer) {
      tabsContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.cat-pill');
        if (!btn) return;
        const category = btn.getAttribute('data-category');
        this.setCategory(category);
      });
    }

    // Search Inputs (Desktop & Mobile)
    const searchInput = document.getElementById('search-input');
    const mobileSearchInput = document.getElementById('mobile-search-input');
    const clearSearchBtn = document.getElementById('clear-search');

    const handleSearch = (query) => {
      this.searchQuery = query.trim().toLowerCase();
      this.isShowingSavedOnly = false;
      if (clearSearchBtn) {
        clearSearchBtn.classList.toggle('hidden', this.searchQuery.length === 0);
      }
      this.render();
    };

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        if (mobileSearchInput) mobileSearchInput.value = e.target.value;
        handleSearch(e.target.value);
      });
    }

    if (mobileSearchInput) {
      mobileSearchInput.addEventListener('input', (e) => {
        if (searchInput) searchInput.value = e.target.value;
        handleSearch(e.target.value);
      });
    }

    if (clearSearchBtn) {
      clearSearchBtn.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        if (mobileSearchInput) mobileSearchInput.value = '';
        handleSearch('');
      });
    }

    // Bookmark Nav Button
    const bookmarkBtnNav = document.getElementById('bookmark-btn-nav');
    if (bookmarkBtnNav) {
      bookmarkBtnNav.addEventListener('click', () => {
        this.toggleShowSaved();
      });
    }

    // Refresh Button
    const refreshBtn = document.getElementById('refresh-btn');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => {
        const icon = refreshBtn.querySelector('i');
        icon.classList.add('animate-spin');
        this.fetchLiveFeed().finally(() => {
          setTimeout(() => {
            icon.classList.remove('animate-spin');
            this.showToast('Berita berhasil diperbarui', 'fas fa-arrows-rotate text-emerald-500');
          }, 600);
        });
      });
    }

    // Reset filter banner
    const resetFilterBtn = document.getElementById('reset-filter-btn');
    if (resetFilterBtn) {
      resetFilterBtn.addEventListener('click', () => {
        this.resetFilters();
      });
    }

    // Modal Events
    const closeBtn = document.getElementById('modal-close-btn');
    const modal = document.getElementById('article-modal');
    if (closeBtn) closeBtn.addEventListener('click', () => this.closeModal());
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) this.closeModal();
      });
    }

    // Modal Action Buttons
    const modalShareBtn = document.getElementById('modal-share-btn');
    if (modalShareBtn) {
      modalShareBtn.addEventListener('click', () => this.shareCurrentArticle());
    }

    const modalBookmarkBtn = document.getElementById('modal-bookmark-btn');
    if (modalBookmarkBtn) {
      modalBookmarkBtn.addEventListener('click', () => this.toggleBookmarkCurrentModal());
    }

    const modalTtsBtn = document.getElementById('modal-tts-btn');
    if (modalTtsBtn) {
      modalTtsBtn.addEventListener('click', () => this.toggleTextToSpeech());
    }

    // Keyboard navigation (Escape closes modal)
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeModal();
    });
  }

  // Set Category
  setCategory(category) {
    this.currentCategory = category;
    this.isShowingSavedOnly = false;
    
    // Update tab pills
    const tabs = document.querySelectorAll('.cat-pill');
    tabs.forEach(tab => {
      const cat = tab.getAttribute('data-category');
      if (cat === category) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    this.render();
  }

  // Toggle Show Saved Articles
  toggleShowSaved() {
    this.isShowingSavedOnly = !this.isShowingSavedOnly;
    this.render();
  }

  // Reset Filters
  resetFilters() {
    this.currentCategory = 'all';
    this.searchQuery = '';
    this.isShowingSavedOnly = false;
    const searchInput = document.getElementById('search-input');
    const mobileSearchInput = document.getElementById('mobile-search-input');
    if (searchInput) searchInput.value = '';
    if (mobileSearchInput) mobileSearchInput.value = '';
    
    const tabs = document.querySelectorAll('.cat-pill');
    tabs.forEach(tab => {
      tab.classList.toggle('active', tab.getAttribute('data-category') === 'all');
    });

    this.render();
  }

  // Filtered Articles
  getFilteredArticles() {
    return this.articles.filter(article => {
      // Saved check
      if (this.isShowingSavedOnly && !this.savedIds.includes(article.id)) {
        return false;
      }

      // Category check
      if (this.currentCategory !== 'all' && article.category.toLowerCase() !== this.currentCategory.toLowerCase()) {
        return false;
      }

      // Search Query check
      if (this.searchQuery) {
        const q = this.searchQuery;
        const matchesTitle = article.title.toLowerCase().includes(q);
        const matchesSummary = article.summary.toLowerCase().includes(q);
        const matchesCategory = article.category.toLowerCase().includes(q);
        const matchesAuthor = article.author.toLowerCase().includes(q);
        const matchesTags = article.tags && article.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesSummary && !matchesCategory && !matchesAuthor && !matchesTags) {
          return false;
        }
      }

      return true;
    });
  }

  // Render Method
  render() {
    const filtered = this.getFilteredArticles();
    const heroSection = document.getElementById('hero-section');
    const filterBanner = document.getElementById('filter-banner');
    const filterTitle = document.getElementById('filter-title');
    const filterIcon = document.getElementById('filter-icon');
    const emptyState = document.getElementById('empty-state');
    const feedHeading = document.getElementById('feed-heading');
    const articleCountBadge = document.getElementById('article-count-badge');

    // Update count badge
    if (articleCountBadge) {
      articleCountBadge.textContent = `${filtered.length} Berita`;
    }

    // Handle Filter Banner & Hero Visibility
    const isFiltered = this.isShowingSavedOnly || this.currentCategory !== 'all' || this.searchQuery.length > 0;
    
    if (filterBanner) {
      if (isFiltered) {
        filterBanner.classList.remove('hidden');
        if (this.isShowingSavedOnly) {
          filterTitle.textContent = `Artikel Disimpan (${this.savedIds.length})`;
          filterIcon.innerHTML = `<i class="fas fa-bookmark text-brand-600"></i>`;
        } else if (this.searchQuery) {
          filterTitle.textContent = `Pencarian: "${this.searchQuery}"`;
          filterIcon.innerHTML = `<i class="fas fa-search text-brand-600"></i>`;
        } else {
          filterTitle.textContent = `Kategori: ${this.currentCategory}`;
          filterIcon.innerHTML = `<i class="fas fa-folder text-brand-600"></i>`;
        }
      } else {
        filterBanner.classList.add('hidden');
      }
    }

    if (heroSection) {
      // Only show hero when on default view (no search, no saved, category == all)
      if (!isFiltered) {
        heroSection.classList.remove('hidden');
        this.renderHero();
      } else {
        heroSection.classList.add('hidden');
      }
    }

    // Feed Heading title
    if (feedHeading) {
      if (this.isShowingSavedOnly) {
        feedHeading.innerHTML = `<i class="fas fa-bookmark text-brand-600"></i> Daftar Baca Nanti`;
      } else if (this.searchQuery) {
        feedHeading.innerHTML = `<i class="fas fa-magnifying-glass text-brand-600"></i> Hasil Pencarian`;
      } else if (this.currentCategory !== 'all') {
        feedHeading.innerHTML = `<i class="fas fa-folder-open text-brand-600"></i> Berita ${this.currentCategory}`;
      } else {
        feedHeading.innerHTML = `<i class="fas fa-bolt text-amber-500"></i> Berita Terkini`;
      }
    }

    // Grid Articles (omit headline if in default view to prevent duplication)
    let gridArticles = filtered;
    if (!isFiltered && filtered.length > 0) {
      // Find headline article
      const headline = this.articles.find(a => a.isHeadline) || this.articles[0];
      gridArticles = filtered.filter(a => a.id !== headline.id);
    }

    const gridContainer = document.getElementById('news-grid');
    if (!gridContainer) return;

    if (gridArticles.length === 0) {
      gridContainer.innerHTML = '';
      if (emptyState) emptyState.classList.remove('hidden');
    } else {
      if (emptyState) emptyState.classList.add('hidden');
      gridContainer.innerHTML = gridArticles.map(article => this.createArticleCardHTML(article)).join('');
    }
  }

  // Create Card HTML
  createArticleCardHTML(article) {
    const isSaved = this.savedIds.includes(article.id);
    return `
      <article class="news-card bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-700/60 shadow-sm hover:shadow-xl hover:border-brand-500/30 transition-all duration-300 flex flex-col group cursor-pointer" onclick="app.openModal(${article.id})">
        <!-- Thumbnail -->
        <div class="relative overflow-hidden aspect-[16/10] bg-gray-100 dark:bg-slate-700">
          <img src="${article.image}" alt="${article.title}" loading="lazy" class="news-card-img w-full h-full object-cover">
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <!-- Category Badge -->
          <span class="absolute top-3 left-3 bg-white/95 dark:bg-slate-900/95 backdrop-blur text-brand-600 dark:text-brand-400 text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
            ${article.category}
          </span>

          <!-- Bookmark Toggle inside Card -->
          <button onclick="event.stopPropagation(); app.toggleBookmark(${article.id});" class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur flex items-center justify-center text-gray-700 dark:text-gray-200 hover:text-brand-600 transition shadow-sm" title="Simpan artikel">
            <i class="${isSaved ? 'fas text-brand-600' : 'far'} fa-bookmark text-xs"></i>
          </button>
        </div>

        <!-- Body -->
        <div class="p-5 flex-1 flex flex-col justify-between">
          <div class="space-y-2.5">
            <div class="flex items-center gap-2 text-xs text-gray-400 font-medium">
              <span><i class="far fa-clock mr-1"></i>${article.date}</span>
              <span>•</span>
              <span>${article.readTime}</span>
            </div>

            <h3 class="font-bold text-gray-900 dark:text-white group-hover:text-brand-600 transition-colors line-clamp-2 text-base leading-snug">
              ${article.title}
            </h3>

            <p class="text-xs text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
              ${article.summary}
            </p>
          </div>

          <div class="pt-4 mt-4 border-t border-gray-100 dark:border-slate-700/60 flex items-center justify-between text-xs text-gray-400">
            <span class="font-medium text-gray-700 dark:text-gray-300 truncate max-w-[150px]"><i class="far fa-user mr-1 text-gray-400"></i>${article.author}</span>
            <span class="text-brand-600 dark:text-brand-400 font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
              Baca <i class="fas fa-arrow-right text-[10px]"></i>
            </span>
          </div>
        </div>
      </article>
    `;
  }

  // Render Hero Section
  renderHero() {
    const headline = this.articles.find(a => a.isHeadline) || this.articles[0];
    const mainContainer = document.getElementById('main-headline-container');
    const sideContainer = document.getElementById('side-headlines-container');

    if (mainContainer && headline) {
      const isSaved = this.savedIds.includes(headline.id);
      mainContainer.innerHTML = `
        <div class="news-card relative rounded-2xl overflow-hidden shadow-lg border border-gray-200/50 dark:border-slate-800 bg-slate-900 h-full min-h-[380px] lg:min-h-[440px] flex flex-col justify-end group cursor-pointer" onclick="app.openModal(${headline.id})">
          <img src="${headline.image}" alt="${headline.title}" class="news-card-img absolute inset-0 w-full h-full object-cover">
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
          
          <div class="relative z-10 p-6 sm:p-8 space-y-3.5">
            <div class="flex items-center gap-3">
              <span class="bg-brand-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-md">
                HEADLINE UTAMA
              </span>
              <span class="text-xs text-gray-300 font-medium flex items-center gap-1">
                <i class="far fa-clock"></i> ${headline.date}
              </span>
            </div>

            <h2 class="text-xl sm:text-2xl md:text-3xl font-extrabold text-white font-serif leading-tight group-hover:text-rose-200 transition">
              ${headline.title}
            </h2>

            <p class="text-sm text-gray-200 line-clamp-2 max-w-2xl leading-relaxed">
              ${headline.summary}
            </p>

            <div class="flex items-center justify-between pt-2">
              <div class="flex items-center gap-2 text-xs text-gray-300">
                <div class="w-6 h-6 rounded-full bg-brand-600 flex items-center justify-center text-white font-bold text-[10px]">KN</div>
                <span>${headline.author}</span>
                <span>•</span>
                <span>${headline.source}</span>
              </div>
              
              <button onclick="event.stopPropagation(); app.toggleBookmark(${headline.id});" class="text-white hover:text-brand-400 p-2 rounded-lg transition" title="Simpan Headline">
                <i class="${isSaved ? 'fas text-brand-500' : 'far'} fa-bookmark text-base"></i>
              </button>
            </div>
          </div>
        </div>
      `;
    }

    if (sideContainer) {
      // Pick next 3 prominent articles
      const secondary = this.articles.filter(a => a.id !== headline.id).slice(0, 3);
      sideContainer.innerHTML = secondary.map((item, idx) => `
        <div class="news-card bg-white dark:bg-slate-800 p-3.5 rounded-xl border border-gray-100 dark:border-slate-700/60 shadow-sm hover:shadow-md transition flex gap-3.5 items-center group cursor-pointer" onclick="app.openModal(${item.id})">
          <div class="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden shrink-0 bg-gray-100 dark:bg-slate-700">
            <img src="${item.image}" alt="${item.title}" class="news-card-img w-full h-full object-cover">
          </div>
          <div class="flex-1 min-w-0 space-y-1">
            <span class="text-[10px] uppercase font-bold text-brand-600 dark:text-brand-400 tracking-wider">
              ${item.category}
            </span>
            <h4 class="font-bold text-xs sm:text-sm text-gray-900 dark:text-gray-100 group-hover:text-brand-600 transition line-clamp-2 leading-snug">
              ${item.title}
            </h4>
            <div class="flex items-center gap-2 text-[11px] text-gray-400">
              <span>${item.date}</span>
            </div>
          </div>
        </div>
      `).join('');
    }
  }

  // Breaking News Ticker
  renderBreakingTicker() {
    const ticker = document.getElementById('breaking-ticker');
    if (!ticker) return;
    const breaking = this.articles.filter(a => a.isBreaking || a.isHeadline);
    if (breaking.length === 0) return;

    const html = breaking.map(b => `
      <span class="inline-flex items-center gap-2 mx-4 cursor-pointer hover:text-brand-600 hover:underline transition" onclick="app.openModal(${b.id})">
        <i class="fas fa-circle text-[6px] text-brand-600"></i>
        <span><strong>${b.category}:</strong> ${b.title}</span>
      </span>
    `).join('  •  ');

    // Duplicate string for seamless looping marquee
    ticker.innerHTML = html + " &nbsp;&nbsp;&nbsp;&nbsp; " + html;
  }

  // Render Trending Tags
  renderTrendingTags() {
    const container = document.getElementById('trending-tags');
    if (!container) return;
    const allTags = new Set();
    this.articles.forEach(a => (a.tags || []).forEach(t => allTags.add(t)));
    const tagList = Array.from(allTags).slice(0, 8);

    container.innerHTML = tagList.map(tag => `
      <button onclick="app.filterByTag('${tag}')" class="text-xs font-semibold px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-brand-50 hover:text-brand-600 dark:bg-slate-700/60 dark:hover:bg-slate-700 dark:hover:text-brand-400 text-gray-600 dark:text-gray-300 transition">
        #${tag}
      </button>
    `).join('');
  }

  filterByTag(tag) {
    const searchInput = document.getElementById('search-input');
    const mobileSearchInput = document.getElementById('mobile-search-input');
    if (searchInput) searchInput.value = tag;
    if (mobileSearchInput) mobileSearchInput.value = tag;
    this.searchQuery = tag.toLowerCase();
    this.isShowingSavedOnly = false;
    this.render();
  }

  // Render Most Popular List
  renderPopularList() {
    const container = document.getElementById('popular-list');
    if (!container) return;
    const popular = this.articles.filter(a => a.isPopular).slice(0, 4);

    container.innerHTML = popular.map((item, index) => `
      <div class="flex items-start gap-3.5 group cursor-pointer py-1.5" onclick="app.openModal(${item.id})">
        <span class="text-2xl font-black text-gray-300 dark:text-slate-700 group-hover:text-brand-600 transition font-serif w-6">
          0${index + 1}
        </span>
        <div class="flex-1 space-y-1">
          <span class="text-[10px] font-bold text-gray-400 uppercase tracking-wider">${item.category}</span>
          <h4 class="font-bold text-xs sm:text-sm text-gray-800 dark:text-gray-200 group-hover:text-brand-600 transition line-clamp-2 leading-snug">
            ${item.title}
          </h4>
          <span class="text-[11px] text-gray-400">${item.date}</span>
        </div>
      </div>
    `).join('');
  }

  // Bookmark Management
  toggleBookmark(id) {
    const index = this.savedIds.indexOf(id);
    if (index > -1) {
      this.savedIds.splice(index, 1);
      this.showToast('Artikel dihapus dari simpanan', 'far fa-bookmark text-gray-400');
    } else {
      this.savedIds.push(id);
      this.showToast('Artikel berhasil disimpan ke daftar baca!', 'fas fa-bookmark text-brand-600');
    }
    localStorage.setItem('kabarnusantara_saved', JSON.stringify(this.savedIds));
    this.updateBookmarkBadge();
    this.render();
    
    // Update modal if opened
    if (this.currentModalArticle && this.currentModalArticle.id === id) {
      this.updateModalBookmarkButton(this.savedIds.includes(id));
    }
  }

  toggleBookmarkCurrentModal() {
    if (this.currentModalArticle) {
      this.toggleBookmark(this.currentModalArticle.id);
    }
  }

  updateBookmarkBadge() {
    const badge = document.getElementById('saved-badge');
    if (badge) {
      if (this.savedIds.length > 0) {
        badge.textContent = this.savedIds.length;
        badge.classList.remove('hidden');
      } else {
        badge.classList.add('hidden');
      }
    }
  }

  updateModalBookmarkButton(isSaved) {
    const btn = document.getElementById('modal-bookmark-btn');
    if (btn) {
      btn.innerHTML = `<i class="${isSaved ? 'fas text-brand-600' : 'far'} fa-bookmark"></i>`;
    }
  }

  // Modal Open & Close
  openModal(id) {
    const article = this.articles.find(a => a.id === id);
    if (!article) return;
    this.currentModalArticle = article;

    document.getElementById('modal-category').textContent = article.category;
    document.getElementById('modal-date').textContent = article.date;
    document.getElementById('modal-title').textContent = article.title;
    document.getElementById('modal-author').textContent = article.author;
    document.getElementById('modal-source').textContent = article.source;
    document.getElementById('modal-read-time').textContent = article.readTime;
    document.getElementById('modal-image').src = article.image;
    document.getElementById('modal-caption').textContent = `Foto dokumentasi ilustrasi: ${article.title}. Sumber: ${article.source}.`;
    document.getElementById('modal-content').innerHTML = article.content;

    // Tags
    const tagsContainer = document.getElementById('modal-tags');
    if (tagsContainer) {
      tagsContainer.innerHTML = (article.tags || []).map(t => `
        <span class="text-xs bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 px-2.5 py-1 rounded-md font-medium">#${t}</span>
      `).join('');
    }

    // Bookmark state
    this.updateModalBookmarkButton(this.savedIds.includes(article.id));

    // Reset TTS
    this.stopTextToSpeech();

    const modal = document.getElementById('article-modal');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  closeModal() {
    const modal = document.getElementById('article-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
    document.body.style.overflow = '';
    this.stopTextToSpeech();
    this.currentModalArticle = null;
  }

  // Share Article
  async shareCurrentArticle() {
    if (!this.currentModalArticle) return;
    const shareData = {
      title: this.currentModalArticle.title,
      text: this.currentModalArticle.summary,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        this.showToast('Berita berhasil dibagikan', 'fas fa-share-nodes text-brand-600');
      } catch (err) {
        // User cancelled share
      }
    } else {
      // Fallback copy link to clipboard
      navigator.clipboard.writeText(`${this.currentModalArticle.title} - Baca di KabarNusantara`);
      this.showToast('Judul & tautan disalin ke clipboard!', 'fas fa-clipboard-check text-emerald-500');
    }
  }

  // Text-To-Speech (Membacakan Berita)
  toggleTextToSpeech() {
    if (!('speechSynthesis' in window)) {
      this.showToast('Fitur suara tidak didukung browser ini', 'fas fa-exclamation-circle text-amber-500');
      return;
    }

    if (this.isSpeaking) {
      this.stopTextToSpeech();
      this.showToast('Pembacaan berita dihentikan', 'fas fa-volume-xmark text-gray-400');
    } else {
      if (!this.currentModalArticle) return;
      const cleanContent = this.currentModalArticle.title + '. ' + 
        this.currentModalArticle.summary + '. ' + 
        this.currentModalArticle.content.replace(/<[^>]*>?/gm, '');

      this.speechUtterance = new SpeechSynthesisUtterance(cleanContent);
      this.speechUtterance.lang = 'id-ID'; // Bahasa Indonesia
      this.speechUtterance.rate = 1.0;

      this.speechUtterance.onstart = () => {
        this.isSpeaking = true;
        const btn = document.getElementById('modal-tts-btn');
        if (btn) btn.innerHTML = `<i class="fas fa-volume-xmark text-brand-600 animate-pulse"></i>`;
        this.showToast('Membacakan berita...', 'fas fa-volume-high text-brand-600');
      };

      this.speechUtterance.onend = () => {
        this.stopTextToSpeech();
      };

      this.speechUtterance.onerror = () => {
        this.stopTextToSpeech();
      };

      window.speechSynthesis.speak(this.speechUtterance);
    }
  }

  stopTextToSpeech() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.isSpeaking = false;
    const btn = document.getElementById('modal-tts-btn');
    if (btn) btn.innerHTML = `<i class="fas fa-volume-high"></i>`;
  }

  // Newsletter Handle
  handleNewsletter() {
    const input = document.getElementById('newsletter-email');
    if (input && input.value) {
      this.showToast(`Terima kasih! Buletin harian akan dikirim ke ${input.value}`, 'fas fa-envelope-circle-check text-emerald-500');
      input.value = '';
    }
  }

  // Toast Notification
  showToast(message, iconClass = 'fas fa-check-circle text-emerald-500') {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    const toastIcon = document.getElementById('toast-icon');

    if (toast && toastMsg && toastIcon) {
      toastMsg.textContent = message;
      toastIcon.className = iconClass;
      
      toast.classList.remove('translate-y-20', 'opacity-0', 'pointer-events-none');
      toast.classList.add('translate-y-0', 'opacity-100');

      clearTimeout(this.toastTimeout);
      this.toastTimeout = setTimeout(() => {
        toast.classList.remove('translate-y-0', 'opacity-100');
        toast.classList.add('translate-y-20', 'opacity-0', 'pointer-events-none');
      }, 3000);
    }
  }
}

// Instantiate App
let app;
document.addEventListener('DOMContentLoaded', () => {
  app = new NewsApp();
});
