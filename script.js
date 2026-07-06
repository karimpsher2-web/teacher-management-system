// ============================================================
// 1. تحميل البيانات
// ============================================================
function getDefaultData() {
  return {
    name: 'مستر كريم',
    title: 'معلم العلوم والعلوم المتكاملة - عام ولغات',
    bio: 'ابتدائي - إعدادي - ثانوي',
    avatar: 'https://i.pravatar.cc/300?img=12',
    counters: { students: 1250, experience: 4, courses: 24, certificates: 12 },
    accounts: [
      { name: 'يوتيوب', url: '#', icon: 'fab fa-youtube', platform: 'youtube' },
      { name: 'فيسبوك', url: 'https://www.facebook.com/share/1DnNff9zJm/', icon: 'fab fa-facebook', platform: 'facebook' },
      { name: 'تيك توك', url: '#', icon: 'fab fa-tiktok', platform: 'tiktok' },
      { name: 'تيليجرام', url: '#', icon: 'fab fa-telegram', platform: 'telegram' },
      { name: 'إنستجرام', url: 'https://www.instagram.com/karim_psher', icon: 'fab fa-instagram', platform: 'instagram' },
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
      { name: 'Marketing', url: 'https://via.placeholder.com/300x200/f97316/fff?text=Marketing' }
    ],
    gallery: [
      'https://picsum.photos/seed/teach1/400/300',
      'https://picsum.photos/seed/teach2/400/300',
      'https://picsum.photos/seed/teach3/400/300',
      'https://picsum.photos/seed/teach4/400/300'
    ],
    achievements: [
      { icon: 'fa-award', number: 12, label: 'جوائز' },
      { icon: 'fa-users', number: 300, label: 'طلاب متميزون' },
      { icon: 'fa-book-open', number: 15, label: 'كتب منشورة' }
    ]
  };
}

function loadData() {
  try {
    const saved = localStorage.getItem('teacherData');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.log('خطأ في تحميل البيانات، سيتم استخدام البيانات الافتراضية');
  }
  return getDefaultData();
}

let data = loadData();

// ============================================================
// 2. حفظ البيانات
// ============================================================
function saveData() {
  try {
    localStorage.setItem('teacherData', JSON.stringify(data));
    showSaveNotice();
  } catch (e) {
    console.log('خطأ في حفظ البيانات');
  }
}

function showSaveNotice() {
  const notice = document.getElementById('saveNotice');
  if (notice) {
    notice.style.display = 'block';
    setTimeout(() => { notice.style.display = 'none'; }, 2000);
  }
}

// ============================================================
// 3. رفع الصور من الجهاز
// ============================================================
let uploadedImageData = null;

// تأكد من وجود العناصر قبل إضافة الأحداث
document.addEventListener('DOMContentLoaded', function() {
  const fileInput = document.getElementById('fileInput');
  if (fileInput) {
    fileInput.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
          uploadedImageData = event.target.result;
          const preview = document.getElementById('uploadPreview');
          const previewImg = document.getElementById('previewImg');
          if (preview) preview.style.display = 'block';
          if (previewImg) previewImg.src = uploadedImageData;
        };
        reader.readAsDataURL(file);
      }
    });
  }
});

function useUploadedImage() {
  if (uploadedImageData) {
    data.avatar = uploadedImageData;
    const avatar = document.getElementById('profile-avatar');
    const avatarUrl = document.getElementById('avatar-url');
    if (avatar) avatar.src = uploadedImageData;
    if (avatarUrl) avatarUrl.value = uploadedImageData;
    saveData();
    clearUpload();
    alert('✅ تم تحديث الصورة الشخصية وحفظها!');
  }
}

function useUploadedImageForCert() {
  if (uploadedImageData) {
    const certUrl = document.getElementById('new-cert-url');
    if (certUrl) certUrl.value = uploadedImageData;
    clearUpload();
    alert('✅ تم إضافة رابط الصورة في حقل الشهادة!');
  }
}

function useUploadedImageForGallery() {
  if (uploadedImageData) {
    const galleryUrl = document.getElementById('new-gallery-url');
    if (galleryUrl) galleryUrl.value = uploadedImageData;
    clearUpload();
    alert('✅ تم إضافة رابط الصورة في حقل معرض الصور!');
  }
}

function clearUpload() {
  const preview = document.getElementById('uploadPreview');
  const fileInput = document.getElementById('fileInput');
  if (preview) preview.style.display = 'none';
  if (fileInput) fileInput.value = '';
  uploadedImageData = null;
}

// ============================================================
// 4. عرض البيانات (مع التحقق من وجود العناصر)
// ============================================================
function renderAll() {
  try {
    // Profile
    const displayName = document.getElementById('display-name');
    const displayTitle = document.getElementById('display-title');
    const displayBio = document.getElementById('display-bio');
    const profileAvatar = document.getElementById('profile-avatar');
    
    if (displayName) displayName.textContent = data.name;
    if (displayTitle) displayTitle.textContent = data.title;
    if (displayBio) displayBio.textContent = data.bio;
    if (profileAvatar) profileAvatar.src = data.avatar;

    // Dashboard inputs
    const editName = document.getElementById('edit-name');
    const editTitle = document.getElementById('edit-title');
    const editBio = document.getElementById('edit-bio');
    const avatarUrl = document.getElementById('avatar-url');
    
    if (editName) editName.value = data.name;
    if (editTitle) editTitle.value = data.title;
    if (editBio) editBio.value = data.bio;
    if (avatarUrl) avatarUrl.value = data.avatar;

    // Counters
    const counters = ['students', 'experience', 'courses', 'certificates'];
    counters.forEach(key => {
      const input = document.getElementById('counter-' + key);
      const display = document.getElementById('counter-' + key + '-display');
      if (input) input.value = data.counters[key] || 0;
      if (display) display.textContent = data.counters[key] || 0;
    });

    renderAccounts();
    renderCertificates();
    renderGallery();
    renderAchievements();
  } catch (e) {
    console.log('خطأ في عرض البيانات:', e);
  }
}

function renderAccounts() {
  try {
    const container = document.getElementById('accounts-container');
    if (!container) return;
    
    container.innerHTML = data.accounts.map((acc) => `
      <div class="account-card platform-${acc.platform || ''}">
        <div class="platform-icon"><i class="${acc.icon}"></i></div>
        <h4>${acc.name}</h4>
        <p>${acc.url.replace(/^https?:\/\//, '').slice(0, 20) || 'رابط'}</p>
        <a href="${acc.url}" target="_blank"><button class="btn-primary btn-sm">زيارة</button></a>
      </div>
    `).join('');

    const list = document.getElementById('account-list');
    if (list) {
      list.innerHTML = data.accounts.map((acc, idx) => `
        <div class="list-item">
          <span class="item-name"><i class="${acc.icon}"></i> ${acc.name}</span>
          <div>
            <button class="btn-danger" onclick="removeAccount(${idx})">حذف</button>
          </div>
        </div>
      `).join('');
    }
  } catch (e) {
    console.log('خطأ في عرض الحسابات:', e);
  }
}

function renderCertificates() {
  try {
    const container = document.getElementById('certificates-container');
    if (!container) return;
    
    container.innerHTML = data.certificates.map((cert) => `
      <div class="cert-card" onclick="openLightbox('${cert.url}')">
        <img src="${cert.url}" alt="${cert.name}" onerror="this.src='https://via.placeholder.com/300x200/3b82f6/fff?text=شهادة'" />
        <div class="cert-name">${cert.name}</div>
      </div>
    `).join('');

    const list = document.getElementById('cert-list');
    if (list) {
      list.innerHTML = data.certificates.map((cert, idx) => `
        <div class="list-item">
          <span class="item-name">📜 ${cert.name}</span>
          <div>
            <button class="btn-warning" onclick="editCertificate(${idx})">تعديل</button>
            <button class="btn-danger" onclick="removeCertificate(${idx})">حذف</button>
          </div>
        </div>
      `).join('');
    }
  } catch (e) {
    console.log('خطأ في عرض الشهادات:', e);
  }
}

function renderGallery() {
  try {
    const container = document.getElementById('gallery-container');
    if (!container) return;
    
    container.innerHTML = data.gallery.map((img, idx) => `
      <div class="gallery-item-wrapper">
        <img src="${img}" onclick="openLightbox('${img}')" onerror="this.src='https://via.placeholder.com/400x300/3b82f6/fff?text=صورة'" />
        <button class="gallery-delete-btn" onclick="event.stopPropagation();removeGalleryImage(${idx})"><i class="fas fa-trash"></i></button>
      </div>
    `).join('');

    const list = document.getElementById('gallery-list');
    if (list) {
      list.innerHTML = data.gallery.map((img, idx) => `
        <div class="list-item">
          <span class="item-name">🖼️ صورة ${idx + 1}</span>
          <button class="btn-danger" onclick="removeGalleryImage(${idx})">حذف</button>
        </div>
      `).join('');
    }
  } catch (e) {
    console.log('خطأ في عرض المعرض:', e);
  }
}

function renderAchievements() {
  try {
    const container = document.getElementById('achievements-container');
    if (!container) return;
    
    container.innerHTML = data.achievements.map((ach) => `
      <div class="achievement-card">
        <div class="icon"><i class="fas ${ach.icon}"></i></div>
        <div class="number">${ach.number}</div>
        <div class="label">${ach.label}</div>
      </div>
    `).join('');

    const list = document.getElementById('achievement-list');
    if (list) {
      list.innerHTML = data.achievements.map((ach, idx) => `
        <div class="list-item">
          <span class="item-name"><i class="fas ${ach.icon}"></i> ${ach.label} (${ach.number})</span>
          <div>
            <button class="btn-warning" onclick="editAchievement(${idx})">تعديل</button>
            <button class="btn-danger" onclick="removeAchievement(${idx})">حذف</button>
          </div>
        </div>
      `).join('');
    }
  } catch (e) {
    console.log('خطأ في عرض الإنجازات:', e);
  }
}

// ============================================================
// 5. دوال التعديل (مع التحقق)
// ============================================================
function updateProfile() {
  try {
    const name = document.getElementById('edit-name');
    const title = document.getElementById('edit-title');
    const bio = document.getElementById('edit-bio');
    if (name) data.name = name.value;
    if (title) data.title = title.value;
    if (bio) data.bio = bio.value;
    saveData();
    renderAll();
    alert('✅ تم تحديث البيانات وحفظها!');
  } catch (e) {
    alert('حدث خطأ: ' + e.message);
  }
}

function updateAvatar() {
  try {
    const urlInput = document.getElementById('avatar-url');
    if (!urlInput) return;
    const url = urlInput.value.trim();
    if (url) {
      data.avatar = url;
      saveData();
      renderAll();
      alert('✅ تم تغيير الصورة وحفظها!');
    } else {
      alert('⚠️ يرجى إدخال رابط الصورة');
    }
  } catch (e) {
    alert('حدث خطأ: ' + e.message);
  }
}

function updateCounters() {
  try {
    const keys = ['students', 'experience', 'courses', 'certificates'];
    keys.forEach(key => {
      const input = document.getElementById('counter-' + key);
      if (input) data.counters[key] = parseInt(input.value) || 0;
    });
    saveData();
    renderAll();
    alert('✅ تم تحديث العدادت وحفظها!');
  } catch (e) {
    alert('حدث خطأ: ' + e.message);
  }
}

// Counter Edit Popup
let currentCounterKey = '';

function openCounterEdit(key) {
  try {
    currentCounterKey = key;
    const popup = document.getElementById('counterEditPopup');
    const input = document.getElementById('counterEditInput');
    if (popup) popup.classList.add('open');
    if (input) input.value = data.counters[key] || 0;
  } catch (e) {
    console.log(e);
  }
}

function closeCounterEdit() {
  const popup = document.getElementById('counterEditPopup');
  if (popup) popup.classList.remove('open');
}

function saveCounterEdit() {
  try {
    const input = document.getElementById('counterEditInput');
    if (!input) return;
    const value = parseInt(input.value) || 0;
    if (currentCounterKey && data.counters[currentCounterKey] !== undefined) {
      data.counters[currentCounterKey] = value;
      saveData();
      renderAll();
      closeCounterEdit();
      alert('✅ تم تحديث العداد!');
    }
  } catch (e) {
    alert('حدث خطأ: ' + e.message);
  }
}

// ============================================================
// 6. دوال الحسابات
// ============================================================
function addAccount() {
  try {
    const nameInput = document.getElementById('new-account-name');
    const urlInput = document.getElementById('new-account-url');
    const iconInput = document.getElementById('new-account-icon');
    if (!nameInput) return;
    
    const name = nameInput.value.trim();
    const url = (urlInput ? urlInput.value.trim() : '#') || '#';
    const icon = (iconInput ? iconInput.value.trim() : 'fas fa-link') || 'fas fa-link';
    
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
    if (nameInput) nameInput.value = '';
    if (urlInput) urlInput.value = '';
    if (iconInput) iconInput.value = 'fab fa-youtube';
    alert('✅ تم إضافة الحساب وحفظه!');
  } catch (e) {
    alert('حدث خطأ: ' + e.message);
  }
}

function removeAccount(idx) {
  if (confirm('هل أنت متأكد من حذف هذا الحساب؟')) {
    data.accounts.splice(idx, 1);
    saveData();
    renderAccounts();
  }
}

// ============================================================
// 7. دوال الشهادات
// ============================================================
function addCertificate() {
  try {
    const nameInput = document.getElementById('new-cert-name');
    const urlInput = document.getElementById('new-cert-url');
    if (!nameInput) return;
    
    const name = nameInput.value.trim();
    const url = urlInput ? urlInput.value.trim() : '';
    
    if (!name || !url) { alert('يرجى إدخال اسم الشهادة ورابط الصورة'); return; }
    data.certificates.push({ name, url });
    saveData();
    renderCertificates();
    if (nameInput) nameInput.value = '';
    if (urlInput) urlInput.value = '';
    alert('✅ تم إضافة الشهادة وحفظها!');
  } catch (e) {
    alert('حدث خطأ: ' + e.message);
  }
}

function removeCertificate(idx) {
  if (confirm('هل أنت متأكد من حذف هذه الشهادة؟')) {
    data.certificates.splice(idx, 1);
    saveData();
    renderCertificates();
  }
}

function editCertificate(idx) {
  try {
    const cert = data.certificates[idx];
    const newName = prompt('اسم الشهادة:', cert.name);
    if (newName !== null && newName.trim()) {
      cert.name = newName.trim();
      saveData();
      renderCertificates();
      alert('✅ تم تعديل الشهادة!');
    }
  } catch (e) {
    alert('حدث خطأ: ' + e.message);
  }
}

// ============================================================
// 8. دوال معرض الصور
// ============================================================
function addGalleryImage() {
  try {
    const urlInput = document.getElementById('new-gallery-url');
    if (!urlInput) return;
    const url = urlInput.value.trim();
    if (!url) { alert('يرجى إدخال رابط الصورة'); return; }
    data.gallery.push(url);
    saveData();
    renderGallery();
    urlInput.value = '';
    alert('✅ تم إضافة الصورة!');
  } catch (e) {
    alert('حدث خطأ: ' + e.message);
  }
}

function removeGalleryImage(idx) {
  if (confirm('هل أنت متأكد من حذف هذه الصورة؟')) {
    data.gallery.splice(idx, 1);
    saveData();
    renderGallery();
  }
}

// ============================================================
// 9. دوال الإنجازات
// ============================================================
function addAchievement() {
  try {
    const iconInput = document.getElementById('new-achievement-icon');
    const numberInput = document.getElementById('new-achievement-number');
    const labelInput = document.getElementById('new-achievement-label');
    if (!labelInput) return;
    
    const icon = (iconInput ? iconInput.value.trim() : 'fa-award') || 'fa-award';
    const number = parseInt(numberInput ? numberInput.value : 0) || 0;
    const label = labelInput.value.trim();
    
    if (!label) { alert('يرجى إدخال اسم الإنجاز'); return; }
    data.achievements.push({ icon, number, label });
    saveData();
    renderAchievements();
    if (iconInput) iconInput.value = 'fa-award';
    if (numberInput) numberInput.value = '';
    if (labelInput) labelInput.value = '';
    alert('✅ تم إضافة الإنجاز!');
  } catch (e) {
    alert('حدث خطأ: ' + e.message);
  }
}

function removeAchievement(idx) {
  if (confirm('هل أنت متأكد من حذف هذا الإنجاز؟')) {
    data.achievements.splice(idx, 1);
    saveData();
    renderAchievements();
  }
}

function editAchievement(idx) {
  try {
    const ach = data.achievements[idx];
    const newLabel = prompt('اسم الإنجاز:', ach.label);
    if (newLabel !== null && newLabel.trim()) {
      ach.label = newLabel.trim();
      const newNumber = prompt('الرقم:', ach.number);
      if (newNumber !== null) {
        ach.number = parseInt(newNumber) || 0;
      }
      const newIcon = prompt('الأيقونة (مثل: fa-award):', ach.icon);
      if (newIcon !== null && newIcon.trim()) {
        ach.icon = newIcon.trim();
      }
      saveData();
      renderAchievements();
      alert('✅ تم تعديل الإنجاز!');
    }
  } catch (e) {
    alert('حدث خطأ: ' + e.message);
  }
}

// ============================================================
// 10. دوال مساعدة
// ============================================================
function openLightbox(src) {
  try {
    const existing = document.querySelector('.lightbox-overlay');
    if (existing) existing.remove();
    const overlay = document.createElement('div');
    overlay.className = 'lightbox-overlay';
    overlay.innerHTML = `<img src="${src}" onerror="this.src='https://via.placeholder.com/600x400/3b82f6/fff?text=صورة'" />`;
    overlay.onclick = () => overlay.remove();
    document.body.appendChild(overlay);
  } catch (e) {
    console.log(e);
  }
}

function toggleFaq(el) {
  try {
    const answer = el.nextElementSibling;
    const icon = el.querySelector('span');
    if (answer.classList.contains('open')) {
      answer.classList.remove('open');
      if (icon) icon.textContent = '+';
    } else {
      answer.classList.add('open');
      if (icon) icon.textContent = '−';
    }
  } catch (e) {
    console.log(e);
  }
}

function toggleTheme() {
  try {
    document.body.classList.toggle('dark');
    const icon = document.querySelector('.theme-toggle i');
    if (icon) {
      icon.classList.toggle('fa-moon');
      icon.classList.toggle('fa-sun');
    }
  } catch (e) {
    console.log(e);
  }
}

function sendMessage() {
  alert('✅ تم إرسال رسالتك بنجاح!');
}

// ============================================================
// 11. لوحة التحكم والباسورد
// ============================================================
let dashboardUnlocked = false;

function openDashboard() {
  try {
    if (dashboardUnlocked) {
      const dashboard = document.getElementById('dashboard');
      const overlay = document.getElementById('dashboardOverlay');
      if (dashboard) dashboard.classList.add('open');
      if (overlay) overlay.classList.add('open');
    } else {
      const modal = document.getElementById('passwordModal');
      const input = document.getElementById('passwordInput');
      const error = document.getElementById('passwordError');
      if (modal) modal.classList.add('open');
      if (input) input.value = '';
      if (error) error.style.display = 'none';
      setTimeout(() => { if (input) input.focus(); }, 100);
    }
  } catch (e) {
    console.log(e);
  }
}

function closeDashboard() {
  try {
    const dashboard = document.getElementById('dashboard');
    const overlay = document.getElementById('dashboardOverlay');
    if (dashboard) dashboard.classList.remove('open');
    if (overlay) overlay.classList.remove('open');
  } catch (e) {
    console.log(e);
  }
}

function checkPassword() {
  try {
    const input = document.getElementById('passwordInput');
    const error = document.getElementById('passwordError');
    if (!input) return;
    
    if (input.value === '123') {
      dashboardUnlocked = true;
      const modal = document.getElementById('passwordModal');
      if (modal) modal.classList.remove('open');
      openDashboard();
    } else {
      if (error) error.style.display = 'block';
    }
  } catch (e) {
    console.log(e);
  }
}

// Enter key for password
document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter') {
    const modal = document.getElementById('passwordModal');
    if (modal && modal.classList.contains('open')) {
      checkPassword();
    }
  }
});

// ============================================================
// 12. Scroll Animations & On Load
// ============================================================
function setupScrollAnimations() {
  try {
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
  } catch (e) {
    console.log(e);
  }
}

// ============================================================
// 13. تشغيل الموقع
// ============================================================
// استخدام DOMContentLoaded بدلاً من window.onload لضمان تحميل DOM أولاً
document.addEventListener('DOMContentLoaded', function() {
  try {
    renderAll();
    setTimeout(() => {
      const loading = document.getElementById('loading-screen');
      if (loading) loading.classList.add('hide');
      setupScrollAnimations();
    }, 500);
  } catch (e) {
    console.log('خطأ في التحميل:', e);
    // إخفاء شاشة التحميل حتى لو في خطأ
    const loading = document.getElementById('loading-screen');
    if (loading) loading.classList.add('hide');
  }
});

// تأكد من إخفاء شاشة التحميل بعد 3 ثواني كحد أقصى
setTimeout(() => {
  const loading = document.getElementById('loading-screen');
  if (loading) loading.classList.add('hide');
}, 3000);
