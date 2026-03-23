# 🐾 Sokak Dostları

> Sokak hayvanlarını besle, bağ kur, sahiplendir — hem oyna, hem gerçekten yardım et!

Sokak Dostları, sokak hayvanlarını konu alan empati tabanlı bir mobil-öncelikli React oyunudur. Günlük bakım, güven inşası ve sahiplendirme mekanikleriyle hem eğlenceli hem de eğitici bir deneyim sunar. Oyun içi reklam ve bağış sistemiyle gerçek sokak hayvanlarına destek olunabilir.

---

## Ekran Görüntüleri

| Onboarding | Oyun Ekranı | Sahiplendirme | Premium |
|---|---|---|---|
| Karşılama & tanıtım | Mahalle haritası + hayvan paneli | Aile seçimi + tebrik | Pro plan + bağış |

---

## Özellikler

### Oyun Mekanikleri
- **4 benzersiz sokak hayvanı** — her birinin kendi kişiliği, geçmişi ve tepki cümleleri var
  - 🐱 **Portakal** — ürkek tekir kedi
  - 🐶 **Bobo** — enerjik oyuncu köpek
  - 🐱 **Minik** — hasta yavru kedi
  - 🐕 **Karabaş** — yaşlı bilge köpek
- **Aksiyon sistemi**: Besle / Yaklaş / İlaç Ver / Kısırlaştır / Aşıla / Sahiplendir
- **4 stat**: Bağ · Güven · Sağlık · Açlık — her aksiyon bunları farklı etkiler
- **Dinamik story bubble** — her aksiyonda hayvanın bakış açısından değişen cümleler
- **Sahiplendirme akışı** — aile seç, karar ver, tebrik ekranı, aileden mektup

### Bağımlılık Mekanikleri
- **Streak sistemi** — her gün giriş yaparak zinciri koru
- **Günlük görevler** — gün sonunda sıfırlanan 4 görev
- **12 rozet** — "İlk Mama"dan "Aylık Kahraman"a
- **Puan sistemi** — her aksiyon puan kazandırır, sezonsal olaylarda çarpan artar

### Empati & Eğitim
- Yanlış aksiyon yapıldığında (örn. hasta hayvana yaklaşmak) → yargılamadan öğreten modal
- Her hayvanın detaylı backstory'si — hikaye modalından okunabilir
- Çocuklar için doğal empati kurulum mekanizması

### Sosyal Etki & Monetizasyon
| Özellik | Detay |
|---|---|
| **Ücretsiz** | 4 hayvan, temel aksiyonlar, görevler, rozetler |
| **Pro (₺49/ay)** | Sınırsız hayvan, 2x puan, özel tema, reklamsız, özel rozet |
| **Reklam izle** | İzlenen reklam → sponsor adına gerçek mama/aşı bağışı |
| **Doğrudan bağış** | ₺10 / ₺25 / ₺50 — vakıflara aktarılır |

---

## Kurulum

```bash
# Bağımlılıkları kur
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production build
npm run build
```

---

## Teknoloji Yığını

| Teknoloji | Kullanım |
|---|---|
| **React 19 + Vite** | UI ve geliştirme ortamı |
| **Tailwind CSS v3** | Stil sistemi |
| **Zustand** | Global state yönetimi |
| **Zustand/persist** | localStorage ile kalıcı kayıt |
| **Framer Motion** | Animasyonlar ve geçişler |
| **React Hot Toast** | Bildirim sistemi |

---

## Klasör Yapısı

```
sokak-dostuari/
├── src/
│   ├── components/
│   │   ├── animal/
│   │   │   ├── AnimalPanel.jsx        # Sağ panel: stat, aksiyon, story
│   │   │   └── AnimalStoryModal.jsx   # Hayvan hikayesi bottom sheet
│   │   ├── map/
│   │   │   └── NeighborhoodMap.jsx    # Mahalle haritası + hayvan noktaları
│   │   ├── screens/
│   │   │   ├── OnboardingScreen.jsx   # Karşılama ekranı
│   │   │   ├── GameScreen.jsx         # Ana oyun ekranı
│   │   │   ├── AdoptionScreen.jsx     # Sahiplendirme akışı
│   │   │   └── PremiumScreen.jsx      # Pro plan + reklam + bağış
│   │   └── ui/
│   │       ├── TopBar.jsx             # Üst bar: logo, puan, streak
│   │       ├── MissionBar.jsx         # Günlük görevler
│   │       ├── BadgeRow.jsx           # Kazanılan rozetler
│   │       ├── StatBar.jsx            # İlerleme çubuğu bileşeni
│   │       └── EmpathyModal.jsx       # Yanlış aksiyon uyarısı
│   ├── data/
│   │   ├── animals.js                 # 4 hayvan şablonu + sabitler
│   │   ├── badges.js                  # 12 rozet tanımı
│   │   └── missions.js                # Günlük görevler + sezonsal olaylar
│   ├── store/
│   │   └── gameStore.js               # Zustand store (tüm oyun state)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
```

---

## Oyun Döngüsü

```
Haritadan hayvan seç
        ↓
İhtiyacını gör (🍖 Aç / 💊 Hasta / 💛 Yalnız)
        ↓
Doğru aksiyonu seç
        ↓
Stat değişiklikleri + story bubble güncellenir
        ↓
Bağ ≥ 70 ve Sağlık ≥ 60 → Sahiplendirme butonu açılır
        ↓
Aile seç → Sahiplendir → Mektup al
```

---

## Hayvan Veri Modeli

```js
{
  id: string,
  name: string,
  emoji: string,
  species: 'cat' | 'dog',
  gender: 'male' | 'female',
  age: number,           // yıl (0.5 = 6 aylık)
  bond: 0-100,           // bağ düzeyi
  health: 0-100,         // sağlık
  trust: 0-100,          // güven
  hunger: 0-100,         // tokluk
  need: null | 'food' | 'medicine' | 'attention',
  isAdoptable: boolean,
  isAdopted: boolean,
  isSterilized: boolean,
  isVaccinated: boolean,
  x: number,             // haritada % konum
  y: number,
  story: string,         // anlık durum cümlesi
  backstory: string,     // geçmiş hikayesi
  reactions: {           // aksiyon başına tepki cümleleri
    food: string[],
    approach: string[],
    medicine: string[],
  }
}
```

---

## Katkı

Projeye katkıda bulunmak istiyorsan:

1. Fork et
2. `feature/özellik-adı` branch'i aç
3. Değişikliklerini commit et
4. Pull Request gönder

---

## Lisans

MIT — dilediğin gibi kullanabilirsin, ancak sokak hayvanlarına yardımı unutma! 🐾
