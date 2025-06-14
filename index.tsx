/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

document.addEventListener('DOMContentLoaded', () => {
    // Interactive examples for math operations
    const interactiveButtons = document.querySelectorAll('.interactive-button');

    const answers: { [key: string]: string } = {
        tambah: "5 apel <span aria-hidden=\"true\">🍎🍎🍎🍎🍎</span>",
        kurang: "3 permen <span aria-hidden=\"true\">🍬🍬🍬</span>",
        kali: "12 kelereng",
        bagi: "5 cokelat <span aria-hidden=\"true\">🍫</span>"
    };

    interactiveButtons.forEach(button => {
        if (button.closest('.interactive-example')) { // Only for operation examples
            button.addEventListener('click', () => {
                const operation = button.getAttribute('data-operation');
                if (operation) {
                    const answerElement = document.getElementById(`answer-${operation}`);
                    if (answerElement) {
                        answerElement.innerHTML = answers[operation];
                        answerElement.style.opacity = '0';
                        answerElement.style.transition = 'opacity 0.5s ease-in-out';
                        requestAnimationFrame(() => {
                             answerElement.style.opacity = '1';
                        });
                    }
                }
            });
        }
    });

    // "Tahukah Kamu?" - Fun Facts
    const faktaButton = document.getElementById('tombol-fakta-baru') as HTMLButtonElement;
    const faktaTextElement = document.getElementById('fakta-matematika-text') as HTMLParagraphElement;

    const daftarFakta: string[] = [
        "Angka nol (0) sebagai konsep angka pertama kali dikembangkan di India kuno. Penting banget, kan?",
        "Pola kelopak pada banyak bunga sering mengikuti deret angka Fibonacci (1, 1, 2, 3, 5, 8...). Alam juga suka matematika!",
        "Jari tanganmu adalah salah satu 'kalkulator' pertama yang digunakan manusia. Praktis!",
        "Simbol 'sama dengan' (=) diciptakan oleh Robert Recorde pada tahun 1557 karena ia bosan menulis 'is equal to' berulang kali."
    ];

    let faktaSaatIniIndex = -1;

    if (faktaButton && faktaTextElement) {
        // Show a default message or the first fact initially
        faktaTextElement.innerHTML = "Klik tombol \"Fakta Baru!\" untuk kejutan menarik!";

        faktaButton.addEventListener('click', () => {
            let randomIndex;
            // Ensure next fact is different from the current one if possible
            if (daftarFakta.length > 1) {
                do {
                    randomIndex = Math.floor(Math.random() * daftarFakta.length);
                } while (randomIndex === faktaSaatIniIndex);
            } else {
                randomIndex = 0;
            }
            
            faktaSaatIniIndex = randomIndex;
            
            faktaTextElement.style.opacity = '0';
            setTimeout(() => {
                faktaTextElement.innerHTML = daftarFakta[faktaSaatIniIndex];
                faktaTextElement.style.opacity = '1';
                faktaTextElement.style.transition = 'opacity 0.4s ease-in-out';
            }, 200); // Wait for fade out before changing text and fading in
        });
    }
});
