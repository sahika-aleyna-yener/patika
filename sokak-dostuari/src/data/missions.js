export const DAILY_MISSIONS = [
  {
    id: 'feed_3',
    title: '3 Hayvan Besle',
    description: 'Bugün 3 farklı sokak hayvanına mama ver',
    emoji: '🍖',
    target: 3,
    reward: { score: 30, streakBonus: true },
  },
  {
    id: 'give_medicine',
    title: 'İlaç Ver',
    description: 'Hasta bir hayvana ilaç ver',
    emoji: '💊',
    target: 1,
    reward: { score: 50 },
  },
  {
    id: 'approach_2',
    title: '2 Hayvanla Bağ Kur',
    description: 'Bugün 2 farklı hayvana yaklaş',
    emoji: '🤝',
    target: 2,
    reward: { score: 25 },
  },
  {
    id: 'login',
    title: 'Günlük Giriş',
    description: 'Bugün mahallene bak',
    emoji: '🌅',
    target: 1,
    reward: { score: 10 },
  },
]

export const SEASONAL_EVENTS = [
  {
    id: 'winter_campaign',
    title: 'Kış Kampanyası',
    description: 'Soğuk kış günlerinde her aksiyonun 2 kat puan kazandırıyor!',
    emoji: '❄️',
    multiplier: 2,
    months: [12, 1, 2],
  },
  {
    id: 'sterilization_month',
    title: 'Kısırlaştırma Ayı',
    description: 'Nisan ayında kısırlaştırma aksiyonu 3 kat puan!',
    emoji: '🏥',
    multiplier: 3,
    months: [4],
  },
  {
    id: 'world_animal_day',
    title: 'Dünya Hayvanları Koruma Günü',
    description: "4 Ekim'de tüm aksiyonlar 2 kat puan!",
    emoji: '🌍',
    multiplier: 2,
    months: [10],
    day: 4,
  },
]
