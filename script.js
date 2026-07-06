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

let data = loadData();

// ============================================================
// 2. حفظ البيانات
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

function useUploadedImageForGallery() {
  if (uploadedImageData) {
    document.getElementById('new-gallery-url').value = uploadedImageData;
    clearUpload();
    alert('✅ تم إضافة رابط الصورة في حقل معرض الصور!');
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

  // Counters
  document.getElementById('counter-students').value = data.counters.students;
  document.getElementById('counter-experience').value = data.counters.experience;
  document.getElementById('counter-courses').value = data.counters.courses;
  document.getElementById('counter-certificates').value = data.counters.certificates;
  document.getElementById('counter-students-display').textContent = data.counters.students;
  document.getElementById('counter-experience-display').textContent = data.counters.experience;
  document.getElementById('counter-courses-display').textContent = data.counters.courses;
  document.getElementById('counter-certificates-display').textContent = data.counters.certificates;

  // Accounts
  renderAccounts();
  // Certificates
  renderCertificates();
  // Gallery
  renderGallery();
  // Achievements
  renderAchievements();
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
          <div>
            <button class="btn-danger" onclick="removeAccount(${idx})">حذف</button>
          </div>
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
          <div>
            <button class="btn-warning" onclick="editCertificate(${idx})">تعديل</button>
            <button class="btn-danger" onclick="removeCertificate(${idx})">حذف</button>
          </div>
        </div>
      `).join('');
}

function renderGallery() {
  const container = document.getElementById('gallery-container');
  container.innerHTML = data.gallery.map((img, idx) => `
        <div class="gallery-item-wrapper">
          <img src="${img}" onclick="openLightbox('${img}')" onerror="this.src='https://via.placeholder.com/400x300/3b82f6/fff?text=صورة'" />
          <button class="gallery-delete-btn" onclick="event.stopPropagation();removeGalleryImage(${idx})"><i class="fas fa-trash"></i></button>
        </div>
      `).join('');

  const list = document.getElementById('gallery-list');
  list.innerHTML = data.gallery.map((img, idx) => `
        <div class="list-item">
          <span class="item-name">🖼️ صورة ${idx + 1}</span>
          <button class="btn-danger" onclick="removeGalleryImage(${idx})">حذف</button>
        </div>
      `).join('');
}

function renderAchievements() {
  const container = document.getElementById('achievements-container');
  container.innerHTML = data.achievements.map((ach) => `
        <div class="achievement-card">
          <div class="icon"><i class="fas ${ach.icon}"></i></div>
          <div class="number">${ach.number}</div>
          <div class="label">${ach.label}</div>
        </div>
      `).join('');

  const list = document.getElementById('achievement-list');
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

function updateCounters() {
  data.counters.students = parseInt(document.getElementById('counter-students').value) || 0;
  data.counters.experience = parseInt(document.getElementById('counter-experience').value) || 0;
  data.counters.courses = parseInt(document.getElementById('counter-courses').value) || 0;
  data.counters.certificates = parseInt(document.getElementById('counter-certificates').value) || 0;
  saveData();
  renderAll();
  alert('✅ تم تحديث العدادت وحفظها!');
}

// Counter Edit Popup
let currentCounterKey = '';

function openCounterEdit(key) {
  currentCounterKey = key;
  const popup = document.getElementById('counterEditPopup');
  const input = document.getElementById('counterEditInput');
  input.value = data.counters[key] || 0;
  popup.classList.add('open');
}

function closeCounterEdit() {
  document.getElementById('counterEditPopup').classList.remove('open');
}

function saveCounterEdit() {
  const value = parseInt(document.getElementById('counterEditInput').value) || 0;
  if (currentCounterKey && data.counters[currentCounterKey] !== undefined) {
    data.counters[currentCounterKey] = value;
    saveData();
    renderAll();
    closeCounterEdit();
    alert('✅ تم تحديث العداد!');
  }
}

// ============================================================
// 6. دوال الحسابات
// ============================================================
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

// ============================================================
// 7. دوال الشهادات
// ============================================================
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

function editCertificate(idx) {
  const cert = data.certificates[idx];
  const newName = prompt('اسم الشهادة:', cert.name);
  if (newName !== null && newName.trim()) {
    cert.name = newName.trim();
    saveData();
    renderCertificates();
    alert('✅ تم تعديل الشهادة!');
  }
}

// ============================================================
// 8. دوال معرض الصور
// ============================================================
function addGalleryImage() {
  const url = document.getElementById('new-gallery-url').value.trim();
  if (!url) { alert('يرجى إدخال رابط الصورة'); return; }
  data.gallery.push(url);
  saveData();
  renderGallery();
  document.getElementById('new-gallery-url').value = '';
  alert('✅ تم إضافة الصورة!');
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
  const icon = document.getElementById('new-achievement-icon').value.trim() || 'fa-award';
  const number = parseInt(document.getElementById('new-achievement-number').value) || 0;
  const label = document.getElementById('new-achievement-label').value.trim();
  if (!label) { alert('يرجى إدخال اسم الإنجاز'); return; }
  data.achievements.push({ icon, number, label });
  saveData();
  renderAchievements();
  document.getElementById('new-achievement-icon').value = 'fa-award';
  document.getElementById('new-achievement-number').value = '';
  document.getElementById('new-achievement-label').value = '';
  alert('✅ تم إضافة الإنجاز!');
}

function removeAchievement(idx) {
  if (confirm('هل أنت متأكد من حذف هذا الإنجاز؟')) {
    data.achievements.splice(idx, 1);
    saveData();
    renderAchievements();
  }
}

function editAchievement(idx) {
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
}

// ============================================================
// 10. دوال مساعدة
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
// 11. لوحة التحكم والباسورد
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
// 12. Scroll Animations & On Load
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

window.onload = function() {
  renderAll();
  setTimeout(() => {
    document.getElementById('loading-screen').classList.add('hide');
    setupScrollAnimations();
  }, 500);
};
