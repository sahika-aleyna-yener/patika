// Dinamik hikaye metinleri — bond düzeyine göre seçilir

export const BOND_STORIES = {
  low: [
    // bond < 30
    'Kim olduğunu bilmiyorum. Ama bir şeyler bıraktın. Belki iyi birisin...',
    'Şüpheyle bakıyorum. Ama gitmiyorum. Bu da bir şey sayılır mı?',
    'Sesini duydukça biraz daha az kaçmak istiyorum.',
  ],
  growing: [
    // bond 30–60
    'Seni görünce artık kaçmıyorum. Bu çok büyük bir şey benim için.',
    'Belki... belki sen farklısın. Biraz daha bekleyeyim.',
    'Isınmak ne güzel hissettiriyor. Teşekkürler.',
  ],
  bonded: [
    // bond 60–90
    'Seni bekliyordum. Her gün bekliyorum artık.',
    'Yanında olmak iyi hissettiriyor. Güvendeyim.',
    'Sen iyi birisin. Bunu bilmeni istedim.',
  ],
  ready: [
    // bond 90+
    'Bir ailem olabilir miydi? Belki şimdi olabilir...',
    'Seni seviyorum. Bunu söylemek istedim sadece.',
    'Hazırım. Her şey için hazırım. ❤️',
  ],
}

export function getStoryByBond(bond) {
  let pool
  if (bond < 30) pool = BOND_STORIES.low
  else if (bond < 60) pool = BOND_STORIES.growing
  else if (bond < 90) pool = BOND_STORIES.bonded
  else pool = BOND_STORIES.ready
  return pool[Math.floor(Math.random() * pool.length)]
}

// Empati dersleri — yanlış aksiyon yapıldığında gösterilir
export const EMPATHY_LESSONS = {
  sick_approach: {
    title: 'Dikkat!',
    message: 'Hasta bir hayvan dokunulmak istemez. Önce iyileşmesi lazım.',
    lesson: 'Hasta insanlar da sakin kalmayı tercih eder. Empati, zamanlamayı bilmektir.',
  },
  hungry_approach: {
    title: 'Önce Aç!',
    message: 'Bu hayvan çok aç. Önce beslemek daha doğru olur.',
    lesson: 'Aç karnına sevgi zor kabul edilir. Temel ihtiyaçlar önce gelir.',
  },
}
