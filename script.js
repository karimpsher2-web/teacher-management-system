// ============================================================
// 1. تحميل البيانات من localStorage أو استخدام البيانات الافتراضية
// ============================================================
function loadData() {
  const saved = localStorage.getItem('teacherData');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      return getDefaultData();
    }
  }
  return getDefaultData();
}

function getDefaultData() {
  return {
    name: 'مستر كريم',
    title: 'معلم العلوم والعلوم المتكاملة - عام ولغات',
    bio: 'ابتدائي - إعدادي - ثانوي',
    avatar: 'https://i.pravatar.cc/300?img=12',
    accounts: [
      { name: 'يوتيوب', url: '#', icon: 'fab fa-youtube', platform: 'youtube' },
      { name: 'فيسبوك', url: 'https://www.facebook.com/share/1DnNff9zJm/', icon: 'fab fa-facebook',
        platform: 'facebook' },
      { name: 'تيك توك', url: '#', icon: 'fab fa-tiktok', platform: 'tiktok' },
      { name: 'تيليجرام', url: '#', icon: 'fab fa-telegram', platform: 'telegram' },
      { name: 'إنستجرام', url: 'https://www.instagram.com/karim_psher', icon: 'fab fa-instagram',
        platform: 'instagram' },
      { name: 'واتساب', url: 'https://wa.me/201060949401', icon: 'fab fa-whatsapp', platform: 'whatsapp' },
      { name: 'لينكدإن', url: '#', icon: 'fab fa-linkedin', platform: 'linkedin' },
      { name: 'تويتر', url: '#', icon: 'fab fa-twitter', platform: 'twitter' }
    ],
    certificates: [
      { name: 'Microsoft Certified Educator', url: 'https://via.placeholder.com/300x200/FF0000/fff?text=Microsoft' },
      { name: 'Education Expert', url: 'https://via.placeholder.com/300x200/10b981/fff?text=Education' },
      { name: 'Problem Solving Skills', url: 'https://via.placeholder.com/300x200/f59e0b/fff?text=Problem' },
      { name: 'Microsoft Office 2019', url: 'https://via.placeholder.com/300x200/ef4444/fff?text=Office' },
      { name: 'شهادة شكر', url: 'https://via.placeholder.com/300x200/8b5cf6/fff?text=%D8%B4%D9%83%D8%B1' },
      { name: 'AI & Cyber Security', url: 'https://via.placeholder.com/300x200/06b6d4/fff?text=AI' },
      { name: 'Marketing', url: 'https://via.placeholder.com/300x200/f97316/fff?text=Marketing' },
      { name: 'English Workshop', url: 'https://via.placeholder.com/300x200/14b8a6/fff?text=English' },
      { name: 'Leadership Skills', url: 'https://via.placeholder.com/300x200/6366f1/fff?text=Leadership' },
      { name: 'How to be HR', url: 'https://via.placeholder.com/300x200/8b5cf6/fff?text=HR' },
      { name: 'Soft Skills', url: 'https://via.placeholder.com/300x200/ec4899/fff?text=Soft+Skills' },
      { name: 'Core Career Skills', url: 'https://via.placeholder.com/300x200/3b82f6/fff?text=Career' }
    ],
    gallery: [
      'https://picsum.photos/seed/teach1/400/300',
      'https://picsum.photos/seed/teach2/400/300',
      'https://picsum.photos/seed/teach3/400/300',
      'https://picsum.photos/seed/teach4/400/300',
      'https://picsum.photos/seed/teach5/400/300',
      'https://picsum.photos/seed/teach6/400/300'
    ]
  };
}

let data = loadData();

// ============================================================
// 2. حفظ البيانات في localStorage
// ============================================================
function saveData() {
  localStorage.setItem('teacherData', JSON.stringify(data));
  showSaveNotice();
}

function showSaveNotice() {
  const notice = document.getElementById('saveNotice');
  notice.style.display = 'block';
  setTimeout(() => { notice.style.display = 'none'; }, 2000);
}

// ============================================================
// 3. رفع الصور من الجهاز
// ============================================================
let uploadedImageData = null;

document.getElementById('fileInput').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      uploadedImageData = event.target.result;
      document.getElementById('uploadPreview').style.display = 'block';
      document.getElementById('previewImg').src = uploadedImageData;
    };
    reader.readAsDataURL(file);
  }
});

function useUploadedImage() {
  if (uploadedImageData) {
    data.avatar = uploadedImageData;
    document.getElementById('profile-avatar').src = uploadedImageData;
    document.getElementById('avatar-url').value = uploadedImageData;
    saveData();
    clearUpload();
    alert('✅ تم تحديث الصورة الشخصية وحفظها!');
  }
}

function useUploadedImageForCert() {
  if (uploadedImageData) {
    document.getElementById('new-cert-url').value = uploadedImageData;
    clearUpload();
    alert('✅ تم إضافة رابط الصورة في حقل الشهادة!');
  }
}

function clearUpload() {
  document.getElementById('uploadPreview').style.display = 'none';
  document.getElementById('fileInput').value = '';
  uploadedImageData = null;
}

// ============================================================
// 4. عرض البيانات
// ============================================================
function renderAll() {
  // Profile
  document.getElementById('display-name').textContent = data.name;
  document.getElementById('display-title').textContent = data.title;
  document.getElementById('display-bio').textContent = data.bio;
  document.getElementById('profile-avatar').src = data.avatar;

  // Dashboard inputs
  document.getElementById('edit-name').value = data.name;
  document.getElementById('edit-title').value = data.title;
  document.getElementById('edit-bio').value = data.bio;
  document.getElementById('avatar-url').value = data.avatar;

  // Accounts
  renderAccounts();
  // Certificates
  renderCertificates();
  // Gallery
  renderGallery();
}

function renderAccounts() {
  const container = document.getElementById('accounts-container');
  container.innerHTML = data.accounts.map((acc) => `
        <div class="account-card platform-${acc.platform || ''}">
          <div class="platform-icon"><i class="${acc.icon}"></i></div>
          <h4>${acc.name}</h4>
          <p>${acc.url.replace(/^https?:\/\//, '').slice(0, 20) || 'رابط'}</p>
          <a href="${acc.url}" target="_blank"><button class="btn-primary btn-sm">زيارة</button></a>
        </div>
      `).join('');

  const list = document.getElementById('account-list');
  list.innerHTML = data.accounts.map((acc, idx) => `
        <div class="list-item">
          <span class="item-name"><i class="${acc.icon}"></i> ${acc.name}</span>
          <button class="btn-danger" onclick="removeAccount(${idx})">حذف</button>
        </div>
      `).join('');
}

function renderCertificates() {
  const container = document.getElementById('certificates-container');
  container.innerHTML = data.certificates.map((cert) => `
        <div class="cert-card" onclick="openLightbox('${cert.url}')">
          <img src="${cert.url}" alt="${cert.name}" onerror="this.src='https://via.placeholder.com/300x200/3b82f6/fff?text=شهادة'" />
          <div class="cert-name">${cert.name}</div>
        </div>
      `).join('');

  const list = document.getElementById('cert-list');
  list.innerHTML = data.certificates.map((cert, idx) => `
        <div class="list-item">
          <span class="item-name">📜 ${cert.name}</span>
          <button class="btn-danger" onclick="removeCertificate(${idx})">حذف</button>
        </div>
      `).join('');
}

function renderGallery() {
  const container = document.getElementById('gallery-grid');
  container.innerHTML = data.gallery.map(img => `
        <img src="${img}" onclick="openLightbox('${img}')" onerror="this.src='https://via.placeholder.com/400x300/3b82f6/fff?text=صورة'" />
      `).join('');
}

// ============================================================
// 5. دوال التعديل
// ============================================================
function updateProfile() {
  data.name = document.getElementById('edit-name').value;
  data.title = document.getElementById('edit-title').value;
  data.bio = document.getElementById('edit-bio').value;
  saveData();
  renderAll();
  alert('✅ تم تحديث البيانات وحفظها!');
}

function updateAvatar() {
  const url = document.getElementById('avatar-url').value.trim();
  if (url) {
    data.avatar = url;
    saveData();
    renderAll();
    alert('✅ تم تغيير الصورة وحفظها!');
  } else {
    alert('⚠️ يرجى إدخال رابط الصورة');
  }
}

function addAccount() {
  const name = document.getElementById('new-account-name').value.trim();
  const url = document.getElementById('new-account-url').value.trim() || '#';
  const icon = document.getElementById('new-account-icon').value.trim() || 'fas fa-link';
  if (!name) { alert('يرجى إدخال اسم المنصة'); return; }
  let platform = '';
  if (icon.includes('youtube')) platform = 'youtube';
  else if (icon.includes('facebook')) platform = 'facebook';
  else if (icon.includes('tiktok')) platform = 'tiktok';
  else if (icon.includes('telegram')) platform = 'telegram';
  else if (icon.includes('instagram')) platform = 'instagram';
  else if (icon.includes('whatsapp')) platform = 'whatsapp';
  else if (icon.includes('linkedin')) platform = 'linkedin';
  else if (icon.includes('twitter')) platform = 'twitter';

  data.accounts.push({ name, url, icon, platform });
  saveData();
  renderAccounts();
  document.getElementById('new-account-name').value = '';
  document.getElementById('new-account-url').value = '';
  document.getElementById('new-account-icon').value = 'fab fa-youtube';
  alert('✅ تم إضافة الحساب وحفظه!');
}

function removeAccount(idx) {
  if (confirm('هل أنت متأكد من حذف هذا الحساب؟')) {
    data.accounts.splice(idx, 1);
    saveData();
    renderAccounts();
  }
}

function addCertificate() {
  const name = document.getElementById('new-cert-name').value.trim();
  const url = document.getElementById('new-cert-url').value.trim();
  if (!name || !url) { alert('يرجى إدخال اسم الشهادة ورابط الصورة'); return; }
  data.certificates.push({ name, url });
  saveData();
  renderCertificates();
  document.getElementById('new-cert-name').value = '';
  document.getElementById('new-cert-url').value = '';
  alert('✅ تم إضافة الشهادة وحفظها!');
}

function removeCertificate(idx) {
  if (confirm('هل أنت متأكد من حذف هذه الشهادة؟')) {
    data.certificates.splice(idx, 1);
    saveData();
    renderCertificates();
  }
}

// ============================================================
// 6. دوال مساعدة
// ============================================================
function openLightbox(src) {
  const existing = document.querySelector('.lightbox-overlay');
  if (existing) existing.remove();
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML =
    `<img src="${src}" onerror="this.src='https://via.placeholder.com/600x400/3b82f6/fff?text=صورة'" />`;
  overlay.onclick = () => overlay.remove();
  document.body.appendChild(overlay);
}

function toggleFaq(el) {
  const answer = el.nextElementSibling;
  const icon = el.querySelector('span');
  if (answer.classList.contains('open')) {
    answer.classList.remove('open');
    icon.textContent = '+';
  } else {
    answer.classList.add('open');
    icon.textContent = '−';
  }
}

function toggleTheme() {
  document.body.classList.toggle('dark');
  const icon = document.querySelector('.theme-toggle i');
  icon.classList.toggle('fa-moon');
  icon.classList.toggle('fa-sun');
}

function sendMessage() {
  alert('✅ تم إرسال رسالتك بنجاح!');
}

// ============================================================
// 7. لوحة التحكم والباسورد
// ============================================================
let dashboardUnlocked = false;

function openDashboard() {
  if (dashboardUnlocked) {
    document.getElementById('dashboard').classList.add('open');
    document.getElementById('dashboardOverlay').classList.add('open');
  } else {
    document.getElementById('passwordModal').classList.add('open');
    document.getElementById('passwordInput').value = '';
    document.getElementById('passwordError').style.display = 'none';
    setTimeout(() => document.getElementById('passwordInput').focus(), 100);
  }
}

function closeDashboard() {
  document.getElementById('dashboard').classList.remove('open');
  document.getElementById('dashboardOverlay').classList.remove('open');
}

function checkPassword() {
  const input = document.getElementById('passwordInput').value;
  if (input === '123') {
    dashboardUnlocked = true;
    document.getElementById('passwordModal').classList.remove('open');
    openDashboard();
  } else {
    document.getElementById('passwordError').style.display = 'block';
  }
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    const modal = document.getElementById('passwordModal');
    if (modal.classList.contains('open')) {
      checkPassword();
    }
  }
});

// ============================================================
// 8. Counters Animation
// ============================================================
function animateCounters() {
  document.querySelectorAll('.number[data-count]').forEach(counter => {
    const target = parseInt(counter.dataset.count);
    let current = 0;
    const increment = Math.ceil(target / 40);
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.textContent = target;
        clearInterval(interval);
      } else {
        counter.textContent = current;
      }
    }, 30);
  });
}

// ============================================================
// 9. Scroll Animations
// ============================================================
function setupScrollAnimations() {
  document.querySelectorAll('.fade-up').forEach(el => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.2 });
    observer.observe(el);
  });
}

// ============================================================
// 10. On Load
// ============================================================
window.onload = function() {
  renderAll();
  setTimeout(() => {
    document.getElementById('loading-screen').classList.add('hide');
    animateCounters();
    setupScrollAnimations();
  }, 500);
};
