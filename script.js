// DOM Elements
const navbar = document.querySelector('.navbar');
const hamburgerBtn = document.getElementById('hamburger-btn');
const navLinks = document.getElementById('nav-links');
const body = document.body;

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Close mobile menu if open
            if (navLinks.classList.contains('open')) {
                toggleMenu();
            }
            
            // Smooth scroll to target
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Update URL hash without scroll
            history.pushState(null, null, targetId);
        }
    });
});

// Navbar scroll effect with throttling
let lastScrollY = window.scrollY;
const scrollThreshold = 50;

function handleScroll() {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > scrollThreshold) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = '#ffffff';
        navbar.style.boxShadow = 'none';
    }
    
    lastScrollY = currentScrollY;
}

// Throttle scroll event
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
        });
        ticking = true;
    }
});

// Mobile menu functionality
function toggleMenu() {
    hamburgerBtn.classList.toggle('active');
    navLinks.classList.toggle('open');
    body.classList.toggle('menu-open');
}

hamburgerBtn.addEventListener('click', toggleMenu);

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('open') && 
        !navLinks.contains(e.target) && 
        !hamburgerBtn.contains(e.target)) {
        toggleMenu();
    }
});

// Close mobile menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        toggleMenu();
    }
});

// Add animation to materi cards when they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target); // Stop observing once animated
        }
    });
}, observerOptions);

// Initialize animations for materi cards
document.querySelectorAll('.materi-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// Handle calculator card expansions
const cards = [
    { card: document.querySelector('.penjumlahan-card'), expand: document.querySelector('.penjumlahan-expand'), gridClass: 'expand-penjumlahan' },
    { card: document.querySelector('.pengurangan-card'), expand: document.querySelector('.pengurangan-expand'), gridClass: 'expand-pengurangan' },
    { card: document.querySelector('.perkalian-card'), expand: document.querySelector('.perkalian-expand'), gridClass: 'expand-perkalian' },
    { card: document.querySelector('.pembagian-card'), expand: document.querySelector('.pembagian-expand'), gridClass: 'expand-pembagian' }
];

const grid = document.getElementById('aritmatika-grid');

cards.forEach(({card, expand, gridClass}) => {
    if (card && expand) {
        card.addEventListener('click', (e) => {
            if (!card.classList.contains('expanded')) {
                // Close other expanded cards
                cards.forEach(({card: otherCard, expand: otherExpand, gridClass: otherGridClass}) => {
                    if (otherCard !== card && otherCard.classList.contains('expanded')) {
                        otherCard.classList.remove('expanded');
                        if (otherExpand) otherExpand.style.display = 'none';
                        if (grid) grid.classList.remove(otherGridClass);
                    }
                });
                
                // Expand clicked card
                card.classList.add('expanded');
                expand.style.display = 'block';
                if (grid) grid.classList.add(gridClass);
                e.stopPropagation();
            }
        });
    }
});

// Close expanded cards when clicking outside
document.addEventListener('click', (e) => {
    cards.forEach(({card, expand, gridClass}) => {
        if (card && card.classList.contains('expanded')) {
            if (!card.contains(e.target)) {
                card.classList.remove('expanded');
                if (expand) expand.style.display = 'none';
                if (grid) grid.classList.remove(gridClass);
            }
        }
    });
});

// Add keyboard navigation for calculator cards
cards.forEach(({card}) => {
    if (card) {
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    }
});

// Fakta Menarik Matematika
const faktaList = [
    "Angka nol pertama kali digunakan oleh matematikawan India sekitar abad ke-5.",
    "Simbol sama dengan (=) ditemukan oleh Robert Recorde pada tahun 1557.",
    "Pi (π) adalah bilangan irasional yang nilainya sekitar 3.14159 dan tidak pernah berakhir.",
    "Bangsa Babilonia sudah menggunakan sistem bilangan berbasis 60 sejak 4000 tahun lalu.",
    "Fibonacci menemukan deret angka yang banyak ditemukan di alam, seperti pada bunga matahari dan kerang.",
    "Matematika adalah bahasa universal yang dipakai di seluruh dunia."
];
function tampilkanFakta() {
    const faktaBox = document.getElementById('fakta-matematika');
    const randomFakta = faktaList[Math.floor(Math.random() * faktaList.length)];
    faktaBox.innerText = randomFakta;
    faktaBox.style.display = 'block';
}

// Kuis Matematika Sederhana
const kuisData = [
    {
        question: "Berapakah hasil dari 7 + 5?",
        options: ["10", "12", "13", "15"],
        answer: 1,
        explanation: "7 + 5 = 12 (Penjumlahan: menambahkan 7 dengan 5)"
    },
    {
        question: "Siapa yang dikenal sebagai 'Bapak Matematika'?",
        options: ["Isaac Newton", "Muhammad bin Musa Al Khawarizmi", "Albert Einstein", "Pythagoras"],
        answer: 1,
        explanation: "Muhammad bin Musa Al Khawarizmi dikenal sebagai 'Bapak Matematika' karena kontribusinya yang besar dalam pengembangan aljabar dan sistem bilangan"
    },
    {
        question: "Berapakah hasil dari 9 x 6?",
        options: ["54", "45", "36", "56"],
        answer: 0,
        explanation: "9 x 6 = 54 (Perkalian: 9 dikalikan 6)"
    },
    {
        question: "Simbol π (pi) biasanya digunakan untuk apa?",
        options: ["Keliling lingkaran", "Volume kubus", "Luas persegi", "Panjang segitiga"],
        answer: 0,
        explanation: "π (pi) adalah konstanta yang digunakan untuk menghitung keliling dan luas lingkaran. Rumus keliling lingkaran = 2πr"
    },
    {
        question: "Berapakah hasil dari 15 - 8?",
        options: ["5", "6", "7", "8"],
        answer: 2,
        explanation: "15 - 8 = 7 (Pengurangan: mengurangi 15 dengan 8)"
    },
    {
        question: "Berapakah hasil dari 4 x 7?",
        options: ["24", "28", "32", "36"],
        answer: 1,
        explanation: "4 x 7 = 28 (Perkalian: 4 dikalikan 7)"
    },
    {
        question: "Berapakah hasil dari 20 ÷ 4?",
        options: ["4", "5", "6", "8"],
        answer: 1,
        explanation: "20 ÷ 4 = 5 (Pembagian: 20 dibagi 4)"
    },
    {
        question: "Berapakah hasil dari 3² (3 pangkat 2)?",
        options: ["6", "8", "9", "12"],
        answer: 2,
        explanation: "3² = 9 (Pangkat: 3 dikalikan dengan dirinya sendiri sebanyak 2 kali, yaitu 3 x 3)"
    },
    {
        question: "Berapakah hasil dari 100 ÷ 10?",
        options: ["5", "8", "10", "12"],
        answer: 2,
        explanation: "100 ÷ 10 = 10 (Pembagian: 100 dibagi 10)"
    },
    {
        question: "Berapakah hasil dari 6 x 8?",
        options: ["42", "48", "54", "56"],
        answer: 1,
        explanation: "6 x 8 = 48 (Perkalian: 6 dikalikan 8)"
    },
    {
        question: "Berapakah hasil dari 25 - 13?",
        options: ["10", "11", "12", "13"],
        answer: 2,
        explanation: "25 - 13 = 12 (Pengurangan: mengurangi 25 dengan 13)"
    },
    {
        question: "Berapakah hasil dari 5² (5 pangkat 2)?",
        options: ["20", "25", "30", "35"],
        answer: 1,
        explanation: "5² = 25 (Pangkat: 5 dikalikan dengan dirinya sendiri sebanyak 2 kali, yaitu 5 x 5)"
    }
];
let kuisIndex = 0;
let allowNext = false;

function tampilkanKuis() {
    const q = kuisData[kuisIndex];
    document.getElementById('kuis-question').innerText = q.question;
    const optionsDiv = document.getElementById('kuis-options');
    optionsDiv.innerHTML = '';
    q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'kuis-option';
        btn.innerText = opt;
        btn.onclick = () => cekJawaban(idx);
        optionsDiv.appendChild(btn);
    });
    document.getElementById('kuis-feedback').innerText = '';
    document.getElementById('kuis-next-btn').style.display = 'none';
    allowNext = false;
}

function cekJawaban(idx) {
    const benar = kuisData[kuisIndex].answer === idx;
    const feedback = document.getElementById('kuis-feedback');
    let explanation = kuisData[kuisIndex].explanation ? `\n${kuisData[kuisIndex].explanation}` : '';
    if (benar) {
        feedback.innerText = 'Benar! 🎉' + explanation;
        feedback.style.color = '#22c55e';
        document.getElementById('kuis-next-btn').style.display = 'block';
        allowNext = true;
        // Disable all options
        document.querySelectorAll('.kuis-option').forEach(btn => btn.disabled = true);
    } else {
        feedback.innerText = 'Coba lagi!' + explanation;
        feedback.style.color = '#ef4444';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('kuis-matematika')) {
        tampilkanKuis();
        document.getElementById('kuis-next-btn').addEventListener('click', function() {
            if (allowNext) {
                kuisIndex = (kuisIndex + 1) % kuisData.length;
                tampilkanKuis();
            }
        });
    }
});

// Utility: expand/collapse card
function handleCardToggle(card, expand, grid, gridClass) {
    card.addEventListener('click', function(e) {
        const expanded = card.classList.toggle('expanded');
        expand.style.display = expanded ? 'block' : 'none';
        if (expanded) {
            setTimeout(() => {
                const input = expand.querySelector('input[type="number"]');
                if (input) input.focus();
            }, 200);
            if (grid) grid.classList.add(gridClass);
        } else {
            if (grid) grid.classList.remove(gridClass);
        }
        e.stopPropagation();
    });
    expand.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    document.addEventListener('click', function(e) {
        if (card.classList.contains('expanded') && !card.contains(e.target)) {
            card.classList.remove('expanded');
            expand.style.display = 'none';
            if (grid) grid.classList.remove(gridClass);
        }
    });
}

// Penjumlahan
(function() {
    const card = document.getElementById('penjumlahan-card');
    const expand = document.getElementById('penjumlahan-expand');
    const grid = document.getElementById('aritmatika-grid');
    if (card && expand) handleCardToggle(card, expand, grid, 'expand-penjumlahan');
    // Kalkulator penjumlahan
    const angka1 = document.getElementById('angka1');
    const angka2 = document.getElementById('angka2');
    const hasilDiv = document.getElementById('hasil-penjumlahan');
    const rumusDiv = document.getElementById('kalkulator-rumus');
    const kolomDiv = document.getElementById('kalkulator-kolom');
    const historyList = document.getElementById('history-list');
    let historyArr = [];
    function tampilkanRumus(a, b) {
        rumusDiv.innerHTML = `<b>Rumus:</b> <span style='color:#2563eb;'>${a} + ${b} = ?</span>`;
    }
    function tampilkanKolom(a, b, hasil) {
        let aStr = a.toString().padStart(Math.max(a.toString().length, b.toString().length), ' ');
        let bStr = b.toString().padStart(Math.max(a.toString().length, b.toString().length), ' ');
        let hStr = hasil.toString().padStart(Math.max(aStr.length, bStr.length, hasil.toString().length), ' ');
        let carryArr = [];
        let langkahArr = [];
        let carry = 0;
        let digitsA = aStr.split('').reverse();
        let digitsB = bStr.split('').reverse();
        let digitsH = hStr.split('').reverse();
        
        for (let i = 0; i < digitsH.length; i++) {
            let dA = isNaN(parseInt(digitsA[i])) ? 0 : parseInt(digitsA[i]);
            let dB = isNaN(parseInt(digitsB[i])) ? 0 : parseInt(digitsB[i]);
            let sum = dA + dB + carry;
            let simpan = sum >= 10 ? 1 : 0;
            carryArr[i+1] = simpan ? '1' : '';
            let kolomKe = i+1;
            let labelKolom = '';
            if (kolomKe === 1) labelKolom = 'Satuan';
            else if (kolomKe === 2) labelKolom = 'Puluhan';
            else if (kolomKe === 3) labelKolom = 'Ratusan';
            else labelKolom = `Kolom ke-${kolomKe}`;
            
            let step = `<b>${labelKolom}:</b> `;
            if (carry) {
                step += `${dA} + ${dB} + ${carry} = ${sum}`;
            } else {
                step += `${dA} + ${dB} = ${sum}`;
            }
            
            if (simpan) {
                step += ` (tulis ${sum%10}, simpan 1)`;
            } else {
                step += ` (tulis ${sum})`;
            }
            
            langkahArr.push(step);
            carry = simpan;
        }
        let carryStr = carryArr.reverse().join(' ').replace(/ /g,'&nbsp;');
        kolomDiv.innerHTML = `
            <div class='kolom-carry'>${carryStr}</div>
            <div class='kolom-angka'><span class='kolom-operator'>&nbsp;</span>${aStr.replace(/ /g,'&nbsp;')}</div>
            <div class='kolom-angka'><span class='kolom-operator'>+</span>${bStr.replace(/ /g,'&nbsp;')}</div>
            <div class='kolom-garis'></div>
            <div class='kolom-hasil'>${hStr.replace(/ /g,'&nbsp;')}</div>
            <div class='kolom-langkah'>${langkahArr.join('<br>')}</div>
        `;
    }
    function updateHistory(a, b, hasil) {
        historyArr.unshift(`${a} + ${b} = ${hasil}`);
        if (historyArr.length > 5) historyArr = historyArr.slice(0, 5);
        historyList.innerHTML = historyArr.map(h => `<li>${h}</li>`).join('');
    }
    function resetPenjumlahan() {
        angka1.value = '';
        angka2.value = '';
        hasilDiv.innerText = '?';
        hasilDiv.style.color = '#64748b';
        rumusDiv.innerHTML = '';
        kolomDiv.innerHTML = '';
    }
    function acakPenjumlahan() {
        const a = Math.floor(Math.random() * 900) + 10;
        const b = Math.floor(Math.random() * 900) + 10;
        angka1.value = a;
        angka2.value = b;
        hasilDiv.innerText = '?';
        hasilDiv.style.color = '#64748b';
        rumusDiv.innerHTML = '';
        kolomDiv.innerHTML = '';
    }
    document.getElementById('hitung-btn').addEventListener('click', function() {
        const a = parseInt(angka1.value);
        const b = parseInt(angka2.value);
        if (!isNaN(a) && !isNaN(b)) {
            hasilDiv.innerText = `${a + b}`;
            hasilDiv.style.color = '#2563eb';
            tampilkanRumus(a, b);
            tampilkanKolom(a, b, a + b);
            updateHistory(a, b, a + b);
        } else {
            resetPenjumlahan();
        }
    });
    document.getElementById('acak-btn').addEventListener('click', acakPenjumlahan);
    document.getElementById('reset-btn').addEventListener('click', resetPenjumlahan);
})();

// Pengurangan
(function() {
    const card = document.getElementById('pengurangan-card');
    const expand = document.getElementById('pengurangan-expand');
    const grid = document.getElementById('aritmatika-grid');
    if (card && expand) handleCardToggle(card, expand, grid, 'expand-pengurangan');
    // Kalkulator pengurangan
    const angka1k = document.getElementById('angka1-kurang');
    const angka2k = document.getElementById('angka2-kurang');
    const hasilDivK = document.getElementById('hasil-pengurangan');
    const rumusDivK = document.getElementById('kalkulator-rumus-kurang');
    const kolomDivK = document.getElementById('kalkulator-kolom-kurang');
    const historyListK = document.getElementById('history-list-kurang');
    let historyArrK = [];
    
    function tampilkanRumusKurang(a, b) {
        rumusDivK.innerHTML = `<b>Rumus:</b> <span style='color:#2563eb;'>${a} - ${b} = ?</span>`;
    }
    
    function tampilkanKolomKurang(a, b, hasil) {
        let aStr = a.toString().padStart(Math.max(a.toString().length, b.toString().length), ' ');
        let bStr = b.toString().padStart(Math.max(a.toString().length, b.toString().length), ' ');
        let hStr = hasil.toString().padStart(Math.max(aStr.length, bStr.length, hasil.toString().length), ' ');
        let langkahArr = [];
        let digitsA = aStr.split('').reverse().map(d => isNaN(parseInt(d)) ? 0 : parseInt(d));
        let digitsB = bStr.split('').reverse().map(d => isNaN(parseInt(d)) ? 0 : parseInt(d));
        let digitsH = hStr.split('').reverse();
        let tempA = [...digitsA];
        let dipinjam = Array(tempA.length).fill(0);
        
        // Proses peminjaman
        for (let i = 0; i < digitsH.length; i++) {
            if (tempA[i] < (digitsB[i] || 0)) {
                let k = i + 1;
                while (k < tempA.length) {
                    if (tempA[k] > 0) {
                        tempA[k]--;
                        tempA[i] += 10;
                        dipinjam[k]++;
                        break;
                    } else {
                        tempA[k] = 9;
                        dipinjam[k]++;
                        k++;
                    }
                }
            }
        }
        // Proses pengurangan dan tampilkan langkah
        for (let i = 0; i < digitsH.length; i++) {
            let dA = tempA[i];
            let dB = digitsB[i] || 0;
            let originalDA = digitsA[i];
            let afterPinjam = originalDA - dipinjam[i];
            let selisih = dA - dB;
            let labelKolom = '';
            let kolomKe = i+1;
            if (kolomKe === 1) labelKolom = 'Satuan';
            else if (kolomKe === 2) labelKolom = 'Puluhan';
            else if (kolomKe === 3) labelKolom = 'Ratusan';
            else labelKolom = `Kolom ke-${kolomKe}`;
            let step = '';
            if (dipinjam[i] > 0 && dA === originalDA) {
                // Kolom ini dipinjam oleh kolom lain, tapi tidak meminjam ke kanan
                step = `<b>${labelKolom}:</b> ${originalDA} (setelah dipinjam jadi ${afterPinjam}) - ${dB} = ${afterPinjam} - ${dB} = ${selisih}`;
            } else if (dA > originalDA) {
                // Kolom ini meminjam dari kolom lain
                step = `<b>${labelKolom}:</b> ${afterPinjam} (pinjam 1 dari kolom ke-${i+2}, ${afterPinjam} jadi ${dA}) - ${dB} = ${dA} - ${dB} = ${selisih}`;
            } else {
                step = `<b>${labelKolom}:</b> ${afterPinjam} - ${dB} = ${selisih}`;
            }
            langkahArr.push(step);
        }
        kolomDivK.innerHTML = `
            <div class='kolom-angka'><span class='kolom-operator'>&nbsp;</span>${aStr.replace(/ /g,'&nbsp;')}</div>
            <div class='kolom-angka'><span class='kolom-operator'>-</span>${bStr.replace(/ /g,'&nbsp;')}</div>
            <div class='kolom-garis'></div>
            <div class='kolom-hasil'>${hStr.replace(/ /g,'&nbsp;')}</div>
            <div class='kolom-langkah'>${langkahArr.join('<br>')}</div>
        `;
    }
    
    function updateHistoryKurang(a, b, hasil) {
        historyArrK.unshift(`${a} - ${b} = ${hasil}`);
        if (historyArrK.length > 5) historyArrK = historyArrK.slice(0, 5);
        historyListK.innerHTML = historyArrK.map(h => `<li>${h}</li>`).join('');
    }
    
    function resetPengurangan() {
        angka1k.value = '';
        angka2k.value = '';
        hasilDivK.innerText = '?';
        hasilDivK.style.color = '#64748b';
        rumusDivK.innerHTML = '';
        kolomDivK.innerHTML = '';
    }
    
    function acakPengurangan() {
        const a = Math.floor(Math.random() * 900) + 100;
        const b = Math.floor(Math.random() * a); // pastikan hasil tidak negatif
        angka1k.value = a;
        angka2k.value = b;
        hasilDivK.innerText = '?';
        hasilDivK.style.color = '#64748b';
        rumusDivK.innerHTML = '';
        kolomDivK.innerHTML = '';
    }
    
    document.getElementById('hitung-btn-kurang').addEventListener('click', function() {
        const a = parseInt(angka1k.value);
        const b = parseInt(angka2k.value);
        if (!isNaN(a) && !isNaN(b)) {
            if (a < b) {
                hasilDivK.innerText = "Error";
                hasilDivK.style.color = '#ef4444';
                rumusDivK.innerHTML = "<span style='color:#ef4444;'>Angka pertama harus lebih besar dari angka kedua untuk pengurangan cara ini.</span>";
                kolomDivK.innerHTML = "";
                return;
            }
            hasilDivK.innerText = `${a - b}`;
            hasilDivK.style.color = '#2563eb';
            tampilkanRumusKurang(a, b);
            tampilkanKolomKurang(a, b, a - b);
            updateHistoryKurang(a, b, a - b);
        } else {
            resetPengurangan();
        }
    });
    
    document.getElementById('acak-btn-kurang').addEventListener('click', acakPengurangan);
    document.getElementById('reset-btn-kurang').addEventListener('click', resetPengurangan);
})();

// Perkalian
(function() {
    const card = document.getElementById('perkalian-card');
    const expand = document.getElementById('perkalian-expand');
    const grid = document.getElementById('aritmatika-grid');
    if (card && expand) handleCardToggle(card, expand, grid, 'expand-perkalian');
    // Kalkulator perkalian
    const angka1k = document.getElementById('angka1-kali');
    const angka2k = document.getElementById('angka2-kali');
    const hasilDivK = document.getElementById('hasil-perkalian');
    const rumusDivK = document.getElementById('kalkulator-rumus-kali');
    const kolomDivK = document.getElementById('kalkulator-kolom-kali');
    const historyListK = document.getElementById('history-list-kali');
    let historyArrK = [];

    function tampilkanRumusKali(a, b) {
        rumusDivK.innerHTML = `<b>Rumus:</b> <span style='color:#2563eb;'>${a} × ${b} = ?</span>`;
    }

    function tampilkanKolomKali(a, b, hasil) {
        let aStr = a.toString();
        let bStr = b.toString();
        let hStr = hasil.toString();
        let langkahArr = [];
        let digitsA = aStr.split('').reverse().map(Number);
        let digitsB = bStr.split('').reverse().map(Number);
        let maxLen = Math.max(aStr.length, bStr.length + 1, hStr.length);
        let partials = [];
        let partialRows = [];
        let penjumlahanLangkah = [];

        // Proses perkalian satu per satu
        for (let i = 0; i < digitsB.length; i++) {
            let carry = 0;
            let row = [];
            let langkah = [];
            for (let j = 0; j < digitsA.length; j++) {
                let prod = digitsA[j] * digitsB[i] + carry;
                let simpan = Math.floor(prod / 10);
                let tulis = prod % 10;
                row[j] = tulis;
                // Jika ini digit terakhir, tidak perlu simpan
                if (j === digitsA.length - 1) {
                    langkah.push(`${digitsA[j]} × ${digitsB[i]} + simpan ${carry} = ${prod} (tulis ${prod})`);
                    if (prod >= 10) row[j+1] = simpan; // tulis sisa di depan
                } else {
                    langkah.push(`${digitsA[j]} × ${digitsB[i]} + simpan ${carry} = ${prod} (tulis ${tulis}, simpan ${simpan})`);
                }
                carry = simpan;
            }
            // Gabungkan hasil parsial dan tambahkan nol di depan sesuai posisi
            let rowStr = row.reverse().join('') + '0'.repeat(i);
            partials.push(parseInt(rowStr));
            partialRows.push(rowStr.padStart(maxLen, ' '));
            langkahArr.push(`<b>Langkah ${i+1} (${digitsB[i]} × ${aStr}):</b><br>${langkah.join('<br>')}`);
        }

        // Penjumlahan hasil parsial
        let penjumlahanVertikal = '';
        for (let i = 0; i < partialRows.length; i++) {
            penjumlahanVertikal += `<div style='text-align:right;'>${i > 0 ? '+' : '&nbsp;'}${partialRows[i]}</div>`;
        }
        penjumlahanVertikal += `<div style='text-align:right;border-top:2px solid #333;margin:2px 0;'><b>${hStr.padStart(maxLen, ' ')}</b></div>`;

        // Langkah penjumlahan
        if (partialRows.length > 1) {
            penjumlahanLangkah.push(`<b>Langkah Penjumlahan:</b>`);
            for (let i = 0; i < partialRows.length; i++) {
                penjumlahanLangkah.push(`${i === 0 ? '' : '+'}${parseInt(partialRows[i])}`);
            }
            penjumlahanLangkah.push(`<b>= ${hasil}</b>`);
        }

        kolomDivK.innerHTML = `
            <div class='kolom-angka' style='text-align:right;'><span class='kolom-operator'>&nbsp;</span>${aStr.padStart(maxLen,' ')}</div>
            <div class='kolom-angka' style='text-align:right;'><span class='kolom-operator'>×</span>${bStr.padStart(maxLen-1,' ')}</div>
            <div class='kolom-garis' style='width:${maxLen}em;'></div>
            ${penjumlahanVertikal}
            <div class='kolom-langkah'>${langkahArr.join('<br><br>')}<br><br>${penjumlahanLangkah.join('<br>')}</div>
        `;
    }

    function updateHistoryKali(a, b, hasil) {
        historyArrK.unshift(`${a} × ${b} = ${hasil}`);
        if (historyArrK.length > 5) historyArrK = historyArrK.slice(0, 5);
        historyListK.innerHTML = historyArrK.map(h => `<li>${h}</li>`).join('');
    }

    function resetPerkalian() {
        angka1k.value = '';
        angka2k.value = '';
        hasilDivK.innerText = '?';
        hasilDivK.style.color = '#64748b';
        rumusDivK.innerHTML = '';
        kolomDivK.innerHTML = '';
    }

    function acakPerkalian() {
        const a = Math.floor(Math.random() * 12) + 1; // 1-12
        const b = Math.floor(Math.random() * 12) + 1; // 1-12
        angka1k.value = a;
        angka2k.value = b;
        hasilDivK.innerText = '?';
        hasilDivK.style.color = '#64748b';
        rumusDivK.innerHTML = '';
        kolomDivK.innerHTML = '';
    }

    document.getElementById('hitung-btn-kali').addEventListener('click', function() {
        const a = parseInt(angka1k.value);
        const b = parseInt(angka2k.value);
        if (!isNaN(a) && !isNaN(b)) {
            const hasil = a * b;
            hasilDivK.innerText = `${hasil}`;
            hasilDivK.style.color = '#2563eb';
            tampilkanRumusKali(a, b);
            tampilkanKolomKali(a, b, hasil);
            updateHistoryKali(a, b, hasil);
        } else {
            resetPerkalian();
        }
    });

    document.getElementById('acak-btn-kali').addEventListener('click', acakPerkalian);
    document.getElementById('reset-btn-kali').addEventListener('click', resetPerkalian);
})();

// Pembagian
(function() {
    const card = document.getElementById('pembagian-card');
    const expand = document.getElementById('pembagian-expand');
    const grid = document.getElementById('aritmatika-grid');
    if (card && expand) handleCardToggle(card, expand, grid, 'expand-pembagian');
    // Kalkulator pembagian
    const angka1b = document.getElementById('angka1-bagi');
    const angka2b = document.getElementById('angka2-bagi');
    const hasilDivB = document.getElementById('hasil-pembagian');
    const rumusDivB = document.getElementById('kalkulator-rumus-bagi');
    const kolomDivB = document.getElementById('kalkulator-kolom-bagi');
    const historyListB = document.getElementById('history-list-bagi');
    let historyArrB = [];

    function tampilkanRumus(a, b) {
        rumusDivB.innerHTML = `<b>Rumus:</b> <span style='color:#2563eb;'>${a} ÷ ${b} = ?</span>`;
    }

    function tampilkanKolom(a, b) {
        // Long division visual (kurung panjang) dengan langkah turun ke bawah
        const hasil = Math.floor(a / b);
        const dividen = a.toString();
        const divisor = b.toString();
        const quotient = hasil.toString();
        let steps = [];
        let sisa = 0;
        let current = '';
        let idx = 0;
        let digits = dividen.split('').map(Number);
        let working = 0;
        let pointer = 0;
        let firstStep = true;
        let quotientStr = '';
        let hasilStr = '';
        let sisaStr = '';
        let visual = [];

        // Build steps for long division
        let curVal = 0;
        let sisaBagi = 0;
        let stepIdx = 0;
        let stepArr = [];
        let qStr = '';
        let divStr = '';
        let hasilArr = [];
        let sisaArr = [];
        let posArr = [];
        let qArr = [];
        let curPointer = 0;
        let hasilKali = 0;
        let sisaStep = 0;
        let stepLines = [];
        let divArr = dividen.split('').map(Number);
        let sisaLangkah = 0;
        let langkahArr = [];
        let langkahHTML = '';

        // Build the visual lines
        let html = `<div style="font-family: 'Fira Mono', 'Consolas', monospace; font-size:1.1em; line-height:1.7; margin-bottom:1em; white-space:pre;">
`;
        // Top: hasil di atas garis
        let topLine = ' '.repeat(divisor.length + 3) + quotient;
        let underTopLine = ' '.repeat(divisor.length + 2) + '─'.repeat(dividen.length);
        let firstLine = `${divisor} ) ${dividen}`;
        html += topLine + '\n';
        html += underTopLine + '\n';
        html += firstLine + '\n';

        // Proses langkah-langkah
        let sisaBagiLangkah = 0;
        let prosesLangkah = dividen.split('').map(Number);
        let curValL = 0;
        let stepsL = [];
        for (let i = 0; i < prosesLangkah.length; i++) {
            curValL = sisaBagiLangkah * 10 + prosesLangkah[i];
            let q = Math.floor(curValL / b);
            let sub = q * b;
            if (q > 0 || stepsL.length > 0) {
                stepsL.push({
                    curVal: curValL,
                    q,
                    sub,
                    sisa: curValL - sub,
                    pos: i
                });
            }
            sisaBagiLangkah = curValL - sub;
        }

        // Tampilkan langkah visual di bawah dividen
        let offset = divisor.length + 3;
        let basePos = offset;
        let sisaPos = 0;
        stepsL.forEach((step, i) => {
            // Hasil kali
            let spasi = ' '.repeat(basePos + step.pos - step.sub.toString().length + 1);
            html += spasi + step.sub + '\n';
            // Garis pengurang
            html += spasi + '─'.repeat(step.sub.toString().length) + '\n';
            // Sisa
            let sisaStr = (step.sisa === 0 && i === stepsL.length - 1) ? '' : step.sisa;
            if (sisaStr !== '') {
                html += spasi + sisaStr + '\n';
            }
        });
        html += '</div>';

        // Langkah-langkah detail (teks)
        langkahHTML = '<div class="kolom-langkah">';
        langkahHTML += '<b>Langkah-langkah Pembagian:</b><br>';
        stepsL.forEach((step, i) => {
            langkahHTML += `<div class="langkah-item">
                <b>Langkah ${i+1}:</b> ${step.curVal} ÷ ${b} = ${step.q}, ${step.q} × ${b} = ${step.sub}, sisa ${step.sisa}
            </div>`;
        });
        langkahHTML += `<div class="hasil-akhir"><b>Hasil Akhir:</b><br>${a} ÷ ${b} = ${hasil}${a % b !== 0 ? ", sisa " + (a % b) : ""}</div>`;
        langkahHTML += '</div>';

        kolomDivB.innerHTML = html + langkahHTML;
    }

    function updateHistory(a, b, hasil) {
        const operasi = `${a} ÷ ${b} = ${hasil}`;
        historyArrB.unshift(operasi);
        if (historyArrB.length > 5) historyArrB.pop();
        
        historyListB.innerHTML = historyArrB.map(item => `<li>${item}</li>`).join('');
    }

    function hitungPembagian() {
        const a = parseFloat(angka1b.value);
        const b = parseFloat(angka2b.value);
        
        if (isNaN(a) || isNaN(b)) {
            hasilDivB.textContent = '?';
            rumusDivB.innerHTML = '';
            kolomDivB.innerHTML = '';
            return;
        }
        
        if (b === 0) {
            hasilDivB.textContent = 'Tidak terdefinisi';
            rumusDivB.innerHTML = '<span style="color: #ef4444;">Pembagian dengan 0 tidak terdefinisi</span>';
            kolomDivB.innerHTML = '';
            return;
        }
        
        const hasil = a / b;
        hasilDivB.textContent = hasil;
        tampilkanRumus(a, b);
        tampilkanKolom(a, b);
        updateHistory(a, b, hasil);
    }

    function acakAngka() {
        const min = 1;
        const max = 100;
        let a, b;
        do {
            b = Math.floor(Math.random() * (max - min + 1)) + min;
            let k = Math.floor(Math.random() * (max - min + 1)) + min;
            a = b * k;
        } while (b === 0);
        angka1b.value = a;
        angka2b.value = b;
        hasilDivB.textContent = '?';
        hasilDivB.style.color = '#64748b';
        rumusDivB.innerHTML = '';
        kolomDivB.innerHTML = '';
    }

    function resetKalkulator() {
        angka1b.value = '';
        angka2b.value = '';
        hasilDivB.textContent = '?';
        rumusDivB.innerHTML = '';
        kolomDivB.innerHTML = '';
    }

    // Event listeners
    document.getElementById('hitung-btn-bagi').addEventListener('click', hitungPembagian);
    document.getElementById('acak-btn-bagi').addEventListener('click', acakAngka);
    document.getElementById('reset-btn-bagi').addEventListener('click', resetKalkulator);

    // Input event listeners
    angka1b.addEventListener('input', hitungPembagian);
    angka2b.addEventListener('input', hitungPembagian);
})();

// Kalkulator Perkalian & Pembagian (expand/collapse universal)
(function() {
    const cards = [
        {
            card: document.getElementById('penjumlahan-card'),
            expand: document.getElementById('penjumlahan-expand'),
            gridClass: 'expand-penjumlahan'
        },
        {
            card: document.getElementById('pengurangan-card'),
            expand: document.getElementById('pengurangan-expand'),
            gridClass: 'expand-pengurangan'
        },
        {
            card: document.getElementById('perkalian-card'),
            expand: document.getElementById('perkalian-expand'),
            gridClass: 'expand-perkalian'
        },
        {
            card: document.getElementById('pembagian-card'),
            expand: document.getElementById('pembagian-expand'),
            gridClass: 'expand-pembagian'
        }
    ];
    const grid = document.getElementById('aritmatika-grid');
    cards.forEach(({card, expand, gridClass}) => {
        if (card && expand) {
            card.addEventListener('click', function(e) {
                // Collapse all cards first
                cards.forEach(({card: c, expand: ex, gridClass: gc}) => {
                    if (c !== card) {
                        c.classList.remove('expanded');
                        if (ex) ex.style.display = 'none';
                        if (grid) grid.classList.remove(gc);
                    }
                });
                // Toggle this card
                const expanded = card.classList.toggle('expanded');
                expand.style.display = expanded ? 'block' : 'none';
                if (expanded) {
                    if (grid) grid.classList.add(gridClass);
                } else {
                    if (grid) grid.classList.remove(gridClass);
                }
                e.stopPropagation();
            });
            expand.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
    });
    document.addEventListener('click', function(e) {
        cards.forEach(({card, expand, gridClass}) => {
            if (card.classList.contains('expanded')) {
                if (!card.contains(e.target)) {
                    card.classList.remove('expanded');
                    if (expand) expand.style.display = 'none';
                    if (grid) grid.classList.remove(gridClass);
                }
            }
        });
    });
})(); 