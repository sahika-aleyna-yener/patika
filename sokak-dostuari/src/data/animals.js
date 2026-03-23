export const INITIAL_ANIMALS = [
  {
    id: 'portakal',
    name: 'Portakal',
    emoji: '🐱',
    species: 'cat',
    gender: 'female',
    age: 3,
    bond: 10,
    health: 65,
    trust: 8,
    hunger: 40,
    need: 'food',
    isAdoptable: false,
    isAdopted: false,
    isSterilized: false,
    isVaccinated: false,
    x: 22,
    y: 35,
    color: '#FF8C42',
    personality: 'Ürkek ve temkinli',
    story: 'Beni bir kafenin önünden kovdular. Artık buraya sığınıyorum...',
    backstory:
      'Portakal, bir kafenin önünde doğdu. Bir süre orada beslenirken, yeni sahip gelince kovuldu. Soğuk kış gecelerinde çöp kovalarının yanında uyudu. İnsanlara güvenmesi çok zor ama sen sabırlıysan...',
    reactions: {
      food: [
        'Nihayet... Çok acıkmıştım.',
        'Teşekkür ederim. Belki sen kötü değilsin...',
        'Mama! En sevdiğim şey!',
      ],
      approach: [
        'Lütfen dokunma... Henüz hazır değilim.',
        'Biraz daha uzakta dur, tamam mı?',
        'Yavaş ol. Ben yavaş insanları seviyorum.',
      ],
      medicine: [
        'Ah, acıtıyor ama... iyileşeceğim galiba.',
        'İlaç istemiyorum ama sanırım lazım.',
        'Sağlığıma kavuşunca daha mutlu olacağım.',
      ],
    },
  },
  {
    id: 'bobo',
    name: 'Bobo',
    emoji: '🐶',
    species: 'dog',
    gender: 'male',
    age: 2,
    bond: 35,
    health: 80,
    trust: 45,
    hunger: 60,
    need: 'attention',
    isAdoptable: false,
    isAdopted: false,
    isSterilized: false,
    isVaccinated: true,
    x: 60,
    y: 55,
    color: '#8B6914',
    personality: 'Oyuncu ve enerjik',
    story: 'HEY! HEY! BEN BURADAYIM! OYNAYABİLİR MİYİZ?!',
    backstory:
      'Bobo, bir ailenin bahçesinde büyüdü. Ama taşınma sırasında unutuldu. Şimdi her geçen insanın dikkatini çekmeye çalışıyor. Onun tek istediği: birinin ona gerçekten bakması.',
    reactions: {
      food: [
        'YUM YUM YUM! En iyi şeysin!',
        'MAMA! MAMA! MAMA! Teşekkürler!',
        'Hmm... lezzetli. Daha var mı?',
      ],
      approach: [
        'GEL GEL GEL! Seni çok seviyorum zaten!',
        'Bak bak! Kuyruğumu sallıyorum! Gördün mü?',
        'Oyun oynayalım mı? Koşabiliriz!',
      ],
      medicine: [
        'Acıtıyor ama sen yapıyorsan iyidir!',
        'İğne mi? Tamam, tamam. Senin için katlanırım.',
        'Hep sağlıklı olmak istiyorum ki daha çok koşabileyim!',
      ],
    },
  },
  {
    id: 'minik',
    name: 'Minik',
    emoji: '🐱',
    species: 'cat',
    gender: 'female',
    age: 0.5,
    bond: 55,
    health: 30,
    trust: 60,
    hunger: 20,
    need: 'medicine',
    isAdoptable: false,
    isAdopted: false,
    isSterilized: false,
    isVaccinated: false,
    x: 40,
    y: 70,
    color: '#9E9E9E',
    personality: 'Hassas ve nazik',
    story: 'Midem ağrıyor... ve çok üşüyorum...',
    backstory:
      'Minik, geçen ay bir çöp kutusunun yanında bulundu. Annesi yoktu. Çok küçücük, çok zayıf. Sokağın sertliğini henüz tam öğrenmedi ama sen ona şans verirsen, belki öğrenmesi gerekmez.',
    reactions: {
      food: [
        'Midem ağrıyor, çok yiyemiyorum ama teşekkür ederim...',
        'Yumuşak mama daha iyi olur benim için.',
        'Her lokma için şükürler.',
      ],
      approach: [
        'Sıcaksın. Yanında durmak istiyorum.',
        'Hafifçe dokun, tamam mı? İnce kemiklerim var.',
        'Miyav... Beni tutabilirsin.',
      ],
      medicine: [
        'Bu beni iyileştirecek mi? Umuyorum...',
        'İlaç acı ama sen iyisin, veriyorsun.',
        'Teşekkürler. Belki yarın daha iyi hissederim.',
      ],
    },
  },
  {
    id: 'karabas',
    name: 'Karabaş',
    emoji: '🐕',
    species: 'dog',
    gender: 'male',
    age: 8,
    bond: 70,
    health: 55,
    trust: 75,
    hunger: 50,
    need: null,
    isAdoptable: false,
    isAdopted: false,
    isSterilized: true,
    isVaccinated: true,
    x: 75,
    y: 30,
    color: '#5D4037',
    personality: 'Bilge ve sakin',
    story: 'Yıllar geçti. Ama sen hâlâ buradasın. Bu güzel.',
    backstory:
      'Karabaş bu mahallenin en eski sakinlerinden. Yıllarca binlerce insan gelip geçti. Kimisi merhaba dedi, kimisi taş attı. O hepsini gördü, hepsini affetti. Şimdi sadece huzuru seviyor.',
    reactions: {
      food: [
        'Sağ ol evladım. İyi kalp var sende.',
        'Yaşlılıkta bir iyi insan bulmak nimetmiş.',
        'Hep böyle ol. Hayvanları sevenler güzel insan olur.',
      ],
      approach: [
        'Gel otur yanıma. Acele etme.',
        'Sıcak eller var senin. İyi işaret.',
        'Bu mahalleyi seninle paylaşmaktan mutluyum.',
      ],
      medicine: [
        'Eklemlerim biraz zayıfladı. Anlıyorum.',
        'Yaşlılık böyle... Teşekkürler ilgin için.',
        'Sen beni iyileştirmeye çalışıyorsun. Bu yeter.',
      ],
    },
  },
]

export const SPECIES_LABELS = {
  cat: 'Kedi',
  dog: 'Köpek',
}

export const GENDER_LABELS = {
  male: 'Erkek',
  female: 'Dişi',
}

export const NEED_LABELS = {
  food: 'Aç',
  medicine: 'Hasta',
  attention: 'Yalnız',
}

export const NEED_EMOJI = {
  food: '🍖',
  medicine: '💊',
  attention: '💛',
}
