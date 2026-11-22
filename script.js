/* =========================================================
   TANVIR HOSSAIN (@T4nviRhossain) - SCRIPT.JS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const footer = document.querySelector("footer") || document.body;

  // 1. Live Italy Local Time (Europe/Rome)
  const clockEl = document.createElement("div");
  clockEl.id = "italy-live-clock";
  clockEl.style.cssText =
    "margin-bottom:14px; font-family:'Sora',sans-serif; font-size:0.85rem; color:#00f5d4; letter-spacing:0.06em;";
  footer.prepend(clockEl);

  const updateItalyTime = () => {
    const italyTime = new Date().toLocaleTimeString("en-GB", {
      timeZone: "Europe/Rome",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
    clockEl.textContent = `🇮🇹 Italy Local Time • ${italyTime}`;
  };
  updateItalyTime();
  setInterval(updateItalyTime, 1000);

  // 2. One-Click "Save Contact" (vCard Generator)
  const vcardBtn = document.createElement("button");
  vcardBtn.textContent = "Save Contact (@T4nviRhossain)";
  vcardBtn.style.cssText =
    "margin: 0 auto 18px auto; display: inline-flex; padding: 10px 20px; font-size: 0.85rem; border-radius: 12px; cursor: pointer;";
  clockEl.after(vcardBtn);

  vcardBtn.addEventListener("click", () => {
    const vcardData = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      "N:Hossain;Tanvir;;;",
      "FN:Tanvir Hossain (@T4nviRhossain)",
      "TITLE:TANVIR TRADER",
      "ADR;TYPE=HOME:;;;;;Italy",
      "URL:https://github.io",
      "X-SOCIALPROFILE;type=telegram:https://t.me",
      "X-SOCIALPROFILE;type=instagram:https://instagram.com",
      "END:VCARD"
    ].join("\n");

    const blob = new Blob([vcardData], { type: "text/vcard" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Tanvir_Hossain.vcf";
    link.click();
    showToast("Contact card downloaded!");
  });

  // 3. Smooth 3D Tilt Effect on Cards
  const cards = document.querySelectorAll(".card, article, .stat-box");
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y - rect.height / 2) / rect.height) * -8;
      const rotateY = ((x - rect.width / 2) / rect.width) * 8;
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
    });
  });

  // 4. Custom Neon Toast Notification Helper
  function showToast(message) {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.style.cssText =
      "position:fixed; bottom:24px; right:24px; background:rgba(12,14,24,0.92); color:#00f5d4; border:1px solid #00f5d4; padding:12px 20px; border-radius:12px; font-family:'Sora',sans-serif; font-size:0.85rem; box-shadow:0 0 20px rgba(0,245,212,0.35); z-index:9999; transition:opacity 0.4s ease;";
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => toast.remove(), 400);
    }, 2500);
  }
});
